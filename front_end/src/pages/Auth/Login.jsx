import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider"; 
import "./auth.scss";
import emailIcon from "../../assets/img/mail.png";
import lockIcon from "../../assets/img/lock.png";
import { PATHS } from "../../constants/paths";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../../utils/authValidation";

const Login = () => {
  const { login } = useAuth();
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (values) => login(values),
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate(PATHS.BASE_PATH);
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  const handleSubmit = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="auth-container">
      {/* Sign In Form (Left side on desktop) */}
      <div className="auth-form-side">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="form-wrapper">
              <h2>Sign In to<br/>Your Account</h2>

              <div className="input-group">
                <img src={emailIcon} alt="email icon" />
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  placeholder="Email"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error-text">{formik.errors.email}</div>
                )}
              </div>

              <div className="input-group">
                <img src={lockIcon} alt="lock icon" />
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  placeholder="Password"
                  required
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error-text">{formik.errors.password}</div>
                )}
              </div>

              <a href="#" className="forgot-password">forgot password?</a>

              <button type="submit" className="btn-primary" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Welcome Content (Right side on desktop) */}
      <div className="auth-info-side">
        <div className="shape-circle"></div>
        <div className="shape-triangle"></div>
        <div className="shape-square"></div>
        
        <h1>Hello Friend!</h1>
        <p>Enter your personal details and start your journey with us</p>
        <button
          type="button"
          className="btn-outline"
          onClick={() => navigate(PATHS.REGISTER)}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Login;
