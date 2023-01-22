import { useFormik } from "formik";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import UserContext from "../context/user/UserContext";
import UserAction from "../context/user/UserAction";
import Toast from "./Toast";
import axios from "axios";
import * as Yup from "yup";
import { Button, Box, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import SignIn from "./SignIn";
import Login from "./Login";

function Home() {
  const [log, setLog]= useState(false)
  const { user, _id,  } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (_id !== 1) {
      navigate("/user");
    }

    if (!_id) {
      navigate("/");
    }
  }, [user, navigate, _id]);

  const handleClick= () =>{
    setLog(!log)
  }

  return (
    <>
    <Box mt={2} mr={2}  sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
          onClick={handleClick}
          sx={{padingRight: '2rem'}}
          variant="text">
            
              Log in
          </Button>
          </Box>
      <div className="sign-container">
        
        <Button
          startIcon={<KeyboardCommandKeyIcon />}
          size="large"
          margin="normal"
        >
          Slack
        </Button>
        <Typography variant="h3" mt={2}>
          Sign in to Slack
        </Typography>
        <Typography variant="subtitle1" mt={2} gutterBottom={true}>
          We suggest using the email address you use at work.
        </Typography>
        <Button
          className="google-button"
          variant="outlined"
          size="large"
          fullWidth
          startIcon={<GoogleIcon />}
          margin="normal"
        >
          Sign in with Google
        </Button>
        <Typography variant="subtitle1" mt={2} gutterBottom={true}>
          Or
        </Typography>
        
       { (log===true)?(<Login/>): (<SignIn/>)}
      </div>
    </>
  );
}
export default Home;

/* <Form className="sign-form">
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" placeholder="Email" />
              <ErrorMessage
                className="sign-error"
                component="div"
                name="email"
              />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage
                className="sign-error"
                component="div"
                name="password"
              />

              <label htmlFor="password2">Confirm password</label>
              <Field name="password2" type="password2" />
              <ErrorMessage
                className="sign-error"
                component="div"
                name="password2"
              />

              <button className="sign-submit" type="submit">
                Create a Account
              </button>
            </Form>
            */
