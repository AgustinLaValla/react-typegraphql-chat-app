import { Field, ObjectType } from "type-graphql";
import { ErrorMessage } from './ErrorMessage';

@ObjectType()
export class SuccessResponse {
    @Field(() => String, { nullable: true })
    message?: string;

    @Field(() => [ErrorMessage], { nullable: true })
    error?: ErrorMessage[]
}