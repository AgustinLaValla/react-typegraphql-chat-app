import { config } from 'dotenv';
import { Secret, sign, verify } from 'jsonwebtoken';
import { AuthorizationResponse, DecodedToken } from '../graphql/types/AuthorizationResponse';
import { customErrorMessage } from '../utils/customErrorMessage';

config();

const SECRET = process.env.SECRET as Secret;

export function generateToken(payload: any) {
    return sign(payload, SECRET, { expiresIn: '4h' });
}

export function isAuthenticated(ctx: any, fromSubscription: boolean = false): AuthorizationResponse {
    const bearerToken: string = !fromSubscription ? ctx.req.headers.authorization : ctx.Authorization;
    if (!bearerToken) return {
        error: customErrorMessage('No Token Provided')
    }

    const token = bearerToken.split(' ')[1];
    if (!token) return {
        error: customErrorMessage('Token must be Bearer Format')
    }

    const decodedToken = verify(token, SECRET) as DecodedToken;

    if (decodedToken.exp * 1000 < Date.now()) {
        return { error: customErrorMessage('Token has expired. Please Login and Try Again') };
    }

    return { decodedToken };
}