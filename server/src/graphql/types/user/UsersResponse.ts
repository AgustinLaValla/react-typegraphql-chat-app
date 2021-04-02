import { Field, ObjectType } from "type-graphql";
import { User } from '../../../entity/User';
import { ErrorMessage } from '../ErrorMessage';

@ObjectType()
export class UsersResponse {
    @Field(() => [User], { nullable: true })
    users?: User[]

    @Field(() => [ErrorMessage], { nullable: true })
    error?: ErrorMessage[]
}