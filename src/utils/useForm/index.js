import { useState } from 'react';

export const useForm = (initialValue) => {
    const [values, setValues] = useState(initialValue);
    return [
        values,
        (formType, formValue) => {
<<<<<<< HEAD
=======
            if (formType === 'reset') {
                return setValues(initialValue);
            }
>>>>>>> master
            return setValues({ ...values, [formType]: formValue })
        },
    ];
};