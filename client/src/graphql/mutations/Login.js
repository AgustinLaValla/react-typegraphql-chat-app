import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
        login(loginUserInput: {
            email: $email,
            password: $password
      }) {
        user {
            id
            username
            email
            imageUrl
            createdAt
        }

          token 

        error {
            message
        }
      }
  }
`;