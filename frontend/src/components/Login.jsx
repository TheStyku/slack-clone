import { useFormik } from "formik";
import { useContext } from "react";
import UserContext from "../context/user/UserContext";
import Toast from "./Toast";
import * as Yup from "yup";
import { Button, Box, TextField } from "@mui/material";
import UserAction from "../context/user/UserAction";

function Login() {
  const { dispatch } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .required("No password provided."),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch({ type: "API_CALL" });
      const getData = async () => {
        const useData = await UserAction.login(values);
        if (typeof useData ==='string') {
          dispatch({ type: "ERROR", payload: {message: useData}});
        } else {
          localStorage.setItem("user", JSON.stringify(useData));
          dispatch({ type: "REGISTER_USER", payload: useData });
        }
      };
      getData();
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
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            size="large"
          >
            Log in
          </Button>
        </form>
        <Toast />
      </Box>
    </>
  );
}
export default Login;
