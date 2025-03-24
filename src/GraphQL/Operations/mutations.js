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

export const CHECK_PALINDROME = gql`
  mutation CheckPalindrome($text: String!) {
    checkPalindrome(text: $text) {
      text
    }
  }
`;

export const CLEAR_TEXT = gql`
  mutation ClearText {
    clearText {
      text
    }
  }
`;