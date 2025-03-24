import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToTimer } from "../redux/slices/actions";

const TimerComponent = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.textUtility.timer);

  useEffect(() => {
    dispatch(subscribeToTimer());
  }, [dispatch]);

  return <div>Timer: {timer !== null ? timer : "Waiting for updates..."}</div>;
};

export default TimerComponent;
