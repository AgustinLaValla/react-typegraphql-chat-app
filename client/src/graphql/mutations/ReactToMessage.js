import gql from "graphql-tag";

export const ReactToMessage = gql`
    mutation ReactToMessage($messageId: Float!, $reaction: String!) {
        reactToMessage(messageId: $messageId, reaction: $reaction) {
            message {
                id
                content
            }

            error {
                message
            }
        }
    }
`;