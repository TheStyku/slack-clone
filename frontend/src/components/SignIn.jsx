import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/user/UserContext";
import Toast from "./Toast";
import axios from "axios";
import * as Yup from "yup";
import { Button, Box, TextField } from "@mui/material";

function SignIn() {
  const { dispatch } = useContext(UserContext);
  const API_URL = process.env.REACT_APP_TITLE+"/api/users/";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(3, "Name must be minimum 3 chars long"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .required("No password provided."),
      password2: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch({ type: "API_CALL" });
      await axios
        .post(API_URL, values)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({ type: "REGISTER_USER", payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: "ERROR", payload: err.response.data });
        });
      resetForm();
    },
  });

  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            id="name"
            name="name"
            type="text"
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            label="password"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            label="password2"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            id="password2"
            name="password2"
            type="password"
            {...formik.getFieldProps("password2")}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            size="large"
          >
            Submit
          </Button>
        </form>
        <Toast />
      </Box>
    </>
  );
}
export default SignIn;
