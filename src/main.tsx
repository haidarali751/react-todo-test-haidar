import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClunkyTodoList } from "./ClunkyTodoList.js";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ClunkyTodoList />
  </StrictMode>
);
