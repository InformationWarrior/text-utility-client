import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import TimerComponent from "./components/TimerComponent";

function App() {
  return (
    <div className="App">
      <Navbar title="Text Utility" />
      <TextForm heading="Enter the text to analyze below." />
      <div>
        <h1>GraphQL Timer Subscription</h1>
        <TimerComponent duration={1800} />
      </div>
    </div>
  );
}

export default App;
