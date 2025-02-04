import { BrowserRouter as Router, Route } from "react-router-dom";

import styles from "./App.scss";

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Route path="/"></Route>
        <Route path="/:id_task"></Route>
      </Router>
    </div>
  );
}

export default App;
