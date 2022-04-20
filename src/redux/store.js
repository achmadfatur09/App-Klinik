import { createStore } from 'redux';

// const [profile, setProfile] = useState("Achmad");

// setProfile("Faturohman")

const initialState = {
    loading: false,
    name: 'Achmad Faturohman',
    address: 'Ciamis, Jawa Barat',
};

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_LOADING') {
        return {
            ...state,
            loading: action.value,
        };
    }
    if (action.type === 'SET_NAME') {
        return {
            ...state,
            name: 'Faturohman',
        };
    }
    return state;
};

const store = createStore(reducer);

export default store;
