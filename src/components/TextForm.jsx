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
    <>
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
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLowerClick}>
          Convert to Lowercase
        </button>
      </div>
      <div className="container my-3">
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").length - 1} words and {text.length} characters.
        </p>
        <p>{(text.split(" ").length - 1) * 0.008} minutes read.</p>
        <h3>Preview</h3>
        <p>{text}</p>
      </div>
    </>
  );
}

export default TextForm;
