import { gql } from "@apollo/client";

export const GET_MESSAGE = gql`
  query GetMessage {
    getMessage {
      success
      message
    }
  }
`;