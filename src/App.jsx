import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

function App() {
  return (
    <div className="App">
      <Navbar title="Text Utility" />
      <TextForm heading="Enter the text to analyze below." />
    </div>
  );
}

export default App;
