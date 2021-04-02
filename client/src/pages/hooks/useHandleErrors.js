import React from 'react';

const initialState = {
    username: '',
    email: '',
    password: ''
};

export const useHandleErrors = () => {
    const [errors, setErrors] = React.useState(initialState);

    const handleErrors = (responseError) => {
        let errorObj = { email: '', password: '' };
        responseError.map(error => {
            if (error.message.indexOf('Email') > -1) {
                errorObj.email = error.message;
            }

            if (error.message.indexOf('Password') > -1) {
                errorObj.password = error.message;
            }
        });

        setErrors(errorObj);
    }

    const reset = () => setErrors(initialState);

    return { errors, handleErrors, reset };
}