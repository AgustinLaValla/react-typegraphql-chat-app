import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorMessage{

    @Field(() => String, { nullable: true })
    message?: string;

    @Field(() => Int, { nullable: true })
    status?: number;
}