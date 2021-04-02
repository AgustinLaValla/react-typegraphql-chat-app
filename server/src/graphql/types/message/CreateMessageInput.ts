import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateMessageInput {
    @Field(() => String, { nullable: false })
    content!: string;

    @Field(() => Int, { nullable: false })
    receiverId!: number;
}