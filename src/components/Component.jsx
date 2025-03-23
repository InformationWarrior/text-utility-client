import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../redux/slices/actions";

function Component() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.textUtility.message);
  useEffect(() => {
    console.log("Dispatching getmessage");
    dispatch(getMessage());
  }, [dispatch]);
  return (
    <div>
      {message ? (
        <>
          <h1>{message.success}</h1>
          <h2>{message.message}</h2>
        </>
      ) : (
        <p>Loading message...</p>
      )}
    </div>
  );
}

export default Component;
