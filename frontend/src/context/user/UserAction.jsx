import axios from "axios";
const API_URL = process.env.REACT_APP_TITLE + "/api/users/";

// Register user
const register = async (userData) => {
  const res = await axios
    .post(API_URL, userData)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return res;
};

// Login user
const login = async (userData) => {
  const res = await axios
    .post(API_URL + "login", userData)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });

  return res;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const UserAction = {
  register,
  logout,
  login,
};

export default UserAction;
