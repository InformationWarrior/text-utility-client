import { gql } from "@apollo/client";

export const CONVERT_TO_UPPERCASE = gql`
  mutation ConvertToUpperCase($text: String!) {
    convertToUpperCase(text: $text) {
      text
    }
  }
`;

export const CONVERT_TO_LOWERCASE = gql`
  mutation ConvertToLowerCase($text: String!) {
    convertToLowerCase(text: $text) {
      text
    }
  }
`;