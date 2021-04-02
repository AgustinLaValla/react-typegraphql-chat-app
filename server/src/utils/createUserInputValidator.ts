import { CreateUserInput } from '../graphql/types/CreateUserInput';
import { ErrorMessage } from '../graphql/types/ErrorMessage';

export const createUserInputValidator = (createUserInput: CreateUserInput) => {
    const { email, username, password } = createUserInput;

    let errors: ErrorMessage[] = [];

    if (!email) {
        errors.push({ message: 'Email is Required', status: 400 });
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
        errors.push({ message: 'Invalid Email Format' })
    }

    if (!username) {
        errors.push({ message: 'Username is Required', status: 400 });
    }

    if (!password) {
        errors.push({ message: 'Password is Required', status: 400 });
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(password)) {
        errors.push({
            message: `Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, and the string must be six characters or longer`,
            status: 400
        });
    }

    return errors;
}