import { ObjectType, Field, Resolver, Mutation, Ctx, Query } from 'type-graphql';
import { User } from '../../entity/User';
import { UsersResponse } from '../types/user/UsersResponse';
import { internalServerErrorMessage } from '../../utils/internalServerErrorMessage';
import { isAuthenticated } from '../../utils/authentication';
import { Equal, Not } from 'typeorm';
import { Message } from '../../entity/Message';

@Resolver()
export class UserResolver {

    @Query(() => UsersResponse)
    async users(
        @Ctx() ctx: any
    ): Promise<UsersResponse> {
        const { error, decodedToken } = isAuthenticated(ctx);

        if (error?.length) return { error };

        try {
            const users = await User.find({
                where: { id: Not(Equal(decodedToken?.id)) },
                select: ['username', 'email', 'imageUrl', 'id', 'createdAt']
            });

            const allUserMessages = await Message.find({
                where: [
                    { senderId: decodedToken?.id },
                    { receiverId: decodedToken?.id }
                ],
                order: {createdAt: 'DESC'}
            });


            const usersWithLastMessage = users.map((user, idx) => {
                const latestMessage  = allUserMessages.find(m => m.senderId === user.id || m.receiverId === user.id);
                users[idx].lastMessage = latestMessage;
                return users[idx];
            })

            return { users: usersWithLastMessage };
        } catch (error) {
            return { error: internalServerErrorMessage() }
        }
    }
}