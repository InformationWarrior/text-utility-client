import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToTimer } from "../redux/slices/actions";

const TimerComponent = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.textUtility.timer);

  useEffect(() => {
    dispatch(subscribeToTimer());
  }, [dispatch]);

  return (
    <div className="container">
      <div>
        <h3>GraphQL Timer Subscription</h3>
        Timer: {timer !== null ? timer : "Waiting for updates..."}
      </div>
    </div>
  );
};

export default TimerComponent;
