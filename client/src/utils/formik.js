export const initialValues = { username: '', email: '', password: '', confirmPassword: '' };

export const signUpValidation = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username = 'Username is required';
    }

    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
        errors.email = 'Invalid email format'
    }

    if (!values.password) {
        errors.password = 'Password is Required'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(values.password)) {
        errors.passwordValidators =
            `Password: must contain at least 1 lowercase alphabetical character, 
must contain at least 1 uppercase alphabetical character, 
must contain at least 1 numeric character,The string must be six characters or longer`;
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match';
    }
    return errors
}

export const loginValidation = values => {
    let errors = {};

    if (!values.email) {
        errors.email = 'Email is required'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
        errors.email = 'Invalid email format'
    }

    if (!values.password) {
        errors.password = 'Password is Required'
    }

    return errors;
}