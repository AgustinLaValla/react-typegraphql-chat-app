import gql from "graphql-tag";

export const Messages = gql`
    query Messages($receiverId: Float!) {
        messages(receiverId: $receiverId) {
            id
            content
            receiver {
                username
            }

        sender {
            id
            username
        }

        createdAt
        reaction
        }
    }    
`;