import { ObjectType, Field, Int } from "type-graphql";
import { ErrorMessage } from './ErrorMessage';

@ObjectType()
export class DecodedToken {
    @Field(() => String, { nullable: false })
    id!: number;

    @Field(() => String, { nullable: false })
    username!: string;

    @Field(() => String, { nullable: false })
    email!: string;

    @Field(() => String, { nullable: true })
    imageUrl?: string;

    @Field(() => String, { nullable: true })
    createdAt?: string;

    @Field(() => Int, { nullable: true })
    iat?: number;

    @Field(() => Int, { nullable: false })
    exp!: number;
}

@ObjectType()
export class AuthorizationResponse {
    @Field(() => [ErrorMessage], { nullable: true })
    error?: ErrorMessage[];

    @Field(() => DecodedToken, { nullable: true })
    decodedToken?: DecodedToken;
}