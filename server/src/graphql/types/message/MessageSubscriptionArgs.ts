import { ArgsType, Field, Int } from 'type-graphql';


@ArgsType()
export class MessageSubscriptionArgs {
    @Field(() => Int)
    userId!: number;
}