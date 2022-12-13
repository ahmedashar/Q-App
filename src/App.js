import "./App.css";
import Router from "./config/router";

import Login from "./views/Login";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Q-App</h1>

      <Router />
    </div>
  );
}

export default App;
