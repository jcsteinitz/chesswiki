import "./App.css";
import User from "./pages/User";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <h1 className="header_text">Chess.com Wiki</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
