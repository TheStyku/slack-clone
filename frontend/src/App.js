import Home from "./components/Home";
import User from "./components/User"
import {Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/user/UserContext";

function App() {
  return (
    <>
  
    <UserProvider>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="user" element={<User/>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
      </UserProvider>
    </>
  );
}

export default App;
