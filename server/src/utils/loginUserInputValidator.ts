import { LoginUserInput } from '../graphql/types/LoginUserInput';
import { ErrorMessage } from '../graphql/types/ErrorMessage';

export function loginUserValidator(loginUserInput: LoginUserInput): ErrorMessage[] {
    const { email, password } = loginUserInput;
    let errors: ErrorMessage[] = [];

    if (!email) {
        errors.push({ message: 'Email is Required', status: 400 });
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
        errors.push({ message: 'Invalid Email Format' })
    }
    if (!password) {
        errors.push({ message: 'Password is Required', status: 400 });
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
        errors.push({
            message: 'Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, and the string must be six characters or longer',
            status: 400
        });
    }

    return errors;
}