import ReactDOM from "react-dom";
import "./index.css";
import { makeAuthRouting } from "./routing";

ReactDOM.render(makeAuthRouting(), document.getElementById("root"));
