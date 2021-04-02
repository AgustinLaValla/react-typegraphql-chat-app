import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createUserInputValidator } from '../../utils/createUserInputValidator';
import { generateToken } from '../../utils/authentication';
import { internalServerErrorMessage } from '../../utils/internalServerErrorMessage';
import { loginUserValidator } from '../../utils/loginUserInputValidator';
import { customErrorMessage } from '../../utils/customErrorMessage';
import { User } from "../../entity/User";
import { AuthReponse } from '../types/AuthResponse';
import { CreateUserInput } from '../types/CreateUserInput';
import { LoginUserInput } from "../types/LoginUserInput";

@Resolver()
export class AuthResolver {

    @Mutation(() => AuthReponse)
    async register(@Arg('createUserInput') createUserInput: CreateUserInput): Promise<AuthReponse> {
        const errors = createUserInputValidator(createUserInput);
        if (errors.length) {
            return { error: errors }
        }

        const { username, email, password } = createUserInput;

        try {

            const user = await User.findOne({ where: { email } });
            if (user) {
                return { error: [{ message: 'Email already exists', status: 400 }] }
            }

            const newUser = await User.create({ username, email, password });
            await newUser.hashPassword();
            await newUser.save();

            const payload = { id: newUser.id, username, email, imageUrl: newUser.imageUrl, createdAt: newUser.createdAt };
            const token = generateToken(payload);

            delete newUser.password;

            return { user: newUser, token }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Mutation(() => AuthReponse)
    async login(@Arg('loginUserInput') loginUserInput: LoginUserInput): Promise<AuthReponse> {
        const errors = loginUserValidator(loginUserInput);
        if (errors.length) return { error: errors };

        const { email, password } = loginUserInput;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) return { error: customErrorMessage('User not Found') };

            const isValid = await user.isPasswordValid(password);
            if (!isValid) return { error: customErrorMessage('Email or Password is wrong') };

            const payload = {
                id: user.id,
                username: user.username,
                email,
                imageUrl: user.imageUrl,
                createdAt: user.createdAt
            };

            const token = generateToken(payload);

            return { user, token }
        } catch (error) {
            return { error: internalServerErrorMessage() };
        }
    }

    @Query(() => String)
    hello(): String {
        return 'world'
    }
}