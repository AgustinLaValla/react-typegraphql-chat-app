import { Field, ObjectType } from "type-graphql";
import { Message } from '../../../entity/Message';
import { ErrorMessage } from '../ErrorMessage';

@ObjectType()
export class MessageResponse{
    @Field(() => Message, { nullable: true })
    message?: Message;
    
    @Field(() => [ErrorMessage], { nullable: true })
    error?: ErrorMessage[];
}