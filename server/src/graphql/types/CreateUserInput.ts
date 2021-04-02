import { Field, InputType } from "type-graphql";
import { LoginUserInput } from './LoginUserInput';

@InputType()
export class CreateUserInput extends LoginUserInput{
    @Field(() => String, { nullable: false })
    username!: string;    
}