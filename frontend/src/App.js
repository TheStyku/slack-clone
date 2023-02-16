import Home from "./components/Home";
import User from "./components/User"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        </Routes>
      </Router>
      </UserProvider>
    </>
  );
}

export default App;
