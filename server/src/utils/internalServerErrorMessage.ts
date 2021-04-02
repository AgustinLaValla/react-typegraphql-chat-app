import { ErrorMessage } from '../graphql/types/ErrorMessage';

export function internalServerErrorMessage(): ErrorMessage[] {
    return [{ message: 'Internal Server Error', status: 500 }];
}