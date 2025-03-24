import "./App.css";
import { Routes, Route } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import Navbar from "./components/Navbar";
import TimerComponent from "./components/TimerComponent";

function App() {
  return (
    <div className="App">
      <Navbar title="Text Utility" />
      <TimerComponent />
      <Routes>
        {routesConfig.map((route, index) => (
          <Route
            key={index}
            title={route.title}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
