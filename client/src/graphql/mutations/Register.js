import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    ) {
    register(
      createUserInput: {
        username: $username,
        email: $email,
        password: $password
      }
    ) {
      user {
        id
        username
        createdAt
      }

      token

      error {
        message
      }
    }
  }
`;
