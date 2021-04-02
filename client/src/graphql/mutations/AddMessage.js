import gql from "graphql-tag";

export const AddMessage = gql`
    mutation SendMessage(
        $content: String!
        $receiverId: Int!
    ) {
        sendMessage(
            createMessageInput: {
                content: $content
                receiverId: $receiverId
            }) {

                message {
                    id
                    content
                    sender {
                        id
                        username
                        email
                        imageUrl
                    }
                    receiver {
                        id
                        username
                        email
                        imageUrl
                    }

                    createdAt
                }

                error {
                    message
                }
        }
    }
`;