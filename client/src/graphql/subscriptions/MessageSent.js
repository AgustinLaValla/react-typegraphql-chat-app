import gql from "graphql-tag";

export const MessageSent = gql`
    subscription MessageSent($userId: Int!) {
        messageSent(userId: $userId) {
            id
            content
            sender {
                id
                username
            }
            receiver {
                id
                username
            }
            createdAt
            reaction
        }
    }
`