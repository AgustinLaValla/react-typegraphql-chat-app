import { ErrorMessage } from '../graphql/types/ErrorMessage';

export function customErrorMessage(message: string, status: number = 400): ErrorMessage[] {
    return [{ message, status }]
}
