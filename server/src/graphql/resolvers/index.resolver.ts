import { AuthResolver } from './auth.resolver';
import { MessageResolver } from './message.resolver';
import { UserResolver } from './user.resolver';

export const RESOLVERS = [
    AuthResolver,
    MessageResolver,
    UserResolver
]