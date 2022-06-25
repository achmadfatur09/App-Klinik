import React, {useState, useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    GetStarted,
    Login,
    Register,
    Splash,
    UploadPhoto,
    Doctor,
    Messages,
    MessagesDoctor,
    Hospitals,
    ChooseDoctor,
    Chatting,
    ChattingDocter,
    UserProfile,
    UpdateProfile,
    DoctorProfile,
    RsProfile,
    Antrian,
} from "../pages";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from "../components";
import { getData } from '../utils';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    const [profile, setProfile] = useState({});
    useEffect(() => {
        getData('user').then(res => {
            const data = res;
            setProfile(data);
        });
    }, [])
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen
                name="Doctor"
                component={Doctor}
                options={{ headerShown: false }} />
            {/* {
                profile.role == 3 &&
                <Tab.Screen
                    name="Antrian"
                    component={Antrian}
                    options={{ headerShown: false }} /> 
            } */}
            
            {
                profile.role == 3 ?
                <Tab.Screen
                    name="Messages"
                    component={Messages}
                    options={{ headerShown: false }}
                    />
                : 
                <Tab.Screen
                    name="Messages"
                    component={MessagesDoctor}
                    options={{ headerShown: false }}
                    />
            }
            <Tab.Screen
                name="Hospitals"
                component={Hospitals}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GetStarted"
                component={GetStarted}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UploadPhoto"
                component={UploadPhoto}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainApp"
                component={MainApp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChooseDoctor"
                component={ChooseDoctor}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Chatting"
                component={Chatting}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChattingDocter"
                component={ChattingDocter}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DocterProfile"
                component={DoctorProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RsProfile"
                component={RsProfile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default Router;