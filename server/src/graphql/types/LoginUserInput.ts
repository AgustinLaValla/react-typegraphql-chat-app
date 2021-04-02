import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginUserInput {

    @Field(() => String, { nullable: false })
    email!: string;

    @Field(() => String, { nullable: false })
    password!: string;
}