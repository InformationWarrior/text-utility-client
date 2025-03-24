import { gql } from "@apollo/client";

export const TIMER_SUBSCRIPTION = gql`
  subscription TimerRunning {
    timerRunning {
      timeRemaining
    }
  }
`;
