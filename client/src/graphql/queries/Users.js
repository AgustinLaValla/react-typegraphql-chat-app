import gql from "graphql-tag";

export const Users = gql`
    query Users {
        users {
            users {
                id
                username,
                email,
                createdAt,
                imageUrl,
                lastMessage {
                    content
                }
            }
        }
    }
`;