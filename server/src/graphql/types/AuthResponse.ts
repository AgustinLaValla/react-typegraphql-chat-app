import { Field, ObjectType } from "type-graphql";
import { User } from "../../entity/User";
import { ErrorMessage } from "./ErrorMessage";

@ObjectType()
export class AuthReponse {
    @Field(() => User, { nullable: true })
    user?: User;

    @Field(() => String, { nullable: true })
    token?: string;

    @Field(() => [ErrorMessage], { nullable: true })
    error?: ErrorMessage[];


}