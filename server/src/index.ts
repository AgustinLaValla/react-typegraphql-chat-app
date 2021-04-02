import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { magenta } from 'colors';
import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { MessageResolver } from './graphql/resolvers/message.resolver';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { isAuthenticated } from './utils/authentication';

const port = process.env.PORT || 4000;

async function main() {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [
            AuthResolver,
            MessageResolver,
            UserResolver
        ],
    });

    const server = await new ApolloServer({
        schema,
        context: ctx => ctx,
        subscriptions: {
            path: '/subscriptions',
            onConnect: (auth) => {
                const { error } = isAuthenticated(auth, true);
                if (error?.length) throw new Error(error[0].message);
                console.log("Client connected for subscriptions");
            },
        }
    });
    await server.listen(port);
    console.log(magenta(`Server listening on Port: ${port}`));
}

main();