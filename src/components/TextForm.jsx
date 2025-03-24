import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/slices/textUtilitySlice";
import {
  convertToUpperCase,
  convertToLowerCase,
} from "../redux/slices/actions";

function TextForm(props) {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.textUtility.text);

  const handleUpClick = () => {
    if (text) dispatch(convertToUpperCase({ text }));
    else dispatch(convertToUpperCase({ text: "No text entered" }));
  };

  const handleLowerClick = () => {
    if (text) dispatch(convertToLowerCase({ text }));
    else dispatch(convertToLowerCase({ text: "No text entered" }));
  };

  const handleOnChange = (event) => {
    dispatch(setText(event.target.value));
  };

  return (
    <div className="container my-3">
      <h1>{props.heading}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
        ></textarea>
      </div>
      <button className="btn btn-primary mx-2" onClick={handleUpClick}>
        Convert to Uppercase
      </button>
      <button className="btn btn-primary" onClick={handleLowerClick}>
        Convert to Lowercase
      </button>
    </div>
  );
}

export default TextForm;
