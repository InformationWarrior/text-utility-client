import About from "../components/About";
import TextForm from "../components/TextForm";

const routesConfig = [
  {
    "label": "Home",
    "title": "Home",
    "path": "/",
    "element": <TextForm />
  },
  {
    "label": "About",
    "title": "About",
    "path": "/about",
    "element": <About />
  }
];

export default routesConfig;
