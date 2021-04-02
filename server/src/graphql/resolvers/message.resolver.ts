import { Arg, Args, Ctx, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";
import { Message } from "../../entity/Message";
import { User } from "../../entity/User";
import { isAuthenticated } from '../../utils/authentication';
import { CreateMessageInput } from '../types/message/CreateMessageInput';
import { MessageResponse } from "../types/message/MessageResponse";
import { internalServerErrorMessage } from '../../utils/internalServerErrorMessage';
import { customErrorMessage } from "../../utils/customErrorMessage";
import { MessageSubscriptionArgs } from '../types/message/MessageSubscriptionArgs';

@Resolver()
export class MessageResolver {

    @Query(() => [Message])
    async messages(
        @Arg('receiverId') receiverId: number,
        @Ctx() ctx: any
    ) {
        const { error, decodedToken } = isAuthenticated(ctx);
        if (error?.length) return { error }

        const messages = await Message.find({
            where: [
                { senderId: decodedToken?.id, receiverId },
                { senderId: receiverId, receiverId: decodedToken?.id },
            ],
            relations: ['sender', 'receiver'],
            order: { createdAt: 'ASC' }
        });

        messages.forEach(msg => {
            delete msg.sender.password;
            delete msg.receiver.password;
        });

        return messages;
    }

    @Mutation(() => MessageResponse)
    async sendMessage(
        @Arg('createMessageInput') createMessageInput: CreateMessageInput,
        @PubSub() pubsub: PubSubEngine,
        @Ctx() ctx: any
    ): Promise<MessageResponse> {
        const { error, decodedToken } = isAuthenticated(ctx);
        if (error?.length) return { error }

        const { receiverId, content } = createMessageInput;

        if (!content) return {
            error: customErrorMessage('Content should not be empty')
        }

        try {
            const sender = await User.findOne({ where: { id: decodedToken?.id } });
            const receiver = await User.findOne(({ where: { id: receiverId } }));

            if (!receiver) return {
                error: customErrorMessage('User Not Found')
            }

            const message = await Message.create({ content, sender, receiver }).save();

            pubsub.publish('MESSAGE', message);

            return { message };

        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }


    @Mutation(() => MessageResponse)
    async reactToMessage(
        @Arg('messageId') messageId: number,
        @Arg('reaction') reaction: string,
        @PubSub() pubsub: PubSubEngine,
        @Ctx() ctx: any
    ): Promise<MessageResponse> {
        const { error } = isAuthenticated(ctx);
        if (error?.length) return { error };

        const reactions = ['❤️', '😂', '👍', '👎', '😡', '😮'];

        if (!reactions.includes(reaction)) return {
            error: customErrorMessage('Invalid Reaction')
        }

        try {
            const message = await Message.findOne({ where: { id: messageId } });
            if (!message) return { error: customErrorMessage('Message Not Found') }
            message.reaction = reaction;
            pubsub.publish('MESSAGE', message);
            return { message }
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }

    @Subscription({
        topics: 'MESSAGE',
        filter: ({ payload, args }) => {
            return payload?.sender?.id === args?.userId || payload?.receiver?.id === args?.userId
        }
    })
    messageSent(
        @Root() message: Message,
        @Args() { userId }: MessageSubscriptionArgs
    ): Message {
        return message;
    }
}