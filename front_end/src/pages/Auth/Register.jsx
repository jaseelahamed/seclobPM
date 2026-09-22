import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import "./auth.scss";
import emailIcon from "../../assets/img/mail.png";
import lockIcon from "../../assets/img/lock.png";
import userIcon from "../../assets/img/user.png";
import { PATHS } from "../../constants/paths";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { RegisterValidationSchema } from "../../utils/authValidation";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const registerMutation = useMutation({
    mutationFn: (values) => {
      const { confirmPassword, ...rest } = values;
      return register(rest);
    },
    onSuccess: () => {
      toast.success("Registered successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });

  const handleSubmit = (values) => {
    registerMutation.mutate(values);
  };

  return (
    <div className="auth-container">
      {/* Welcome Content (Left side on desktop) */}
      <div className="auth-info-side">
        <div className="shape-circle"></div>
        <div className="shape-triangle"></div>
        <div className="shape-square"></div>
        
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button
          type="button"
          className="btn-outline"
          onClick={() => navigate(PATHS.LOGIN)}
        >
          SIGN IN
        </button>
      </div>

      {/* Sign Up Form (Right side on desktop) */}
      <div className="auth-form-side">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "", // Keeping for validation schema compatibility
          }}
          validationSchema={RegisterValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="form-wrapper">
              <h2>Create Account</h2>

              <div className="input-group">
                <img src={userIcon} alt="user icon" />
                <input
                  {...formik.getFieldProps("name")}
                  type="text"
                  placeholder="Name"
                  required
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error-text">{formik.errors.name}</div>
                )}
              </div>

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

              <button type="submit" className="btn-primary" disabled={registerMutation.isPending} style={{ marginTop: '2rem' }}>
                {registerMutation.isPending ? "SIGNING UP..." : "SIGN UP"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
