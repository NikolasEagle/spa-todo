import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProjectsPage from "./routes/ProjectsPage";
import TasksPage from "./routes/TasksPage";

function App() {
  return (
    <Router path="/*">
      <Routes>
        <Route path="/" element={<ProjectsPage />}></Route>
        <Route path="/:projectId/:projectName" element={<TasksPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
