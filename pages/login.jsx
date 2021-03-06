import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import singing from "../Assets/images/hobbies_e.svg";
import NavFavlogo from "../Assets/images/appicon.svg";
import styles from "../styles/Login.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema, initialValues } from "../lib/models";
import { signIn } from "../controllers/auth";
import { useRouter } from "next/dist/client/router";

function Login() {
  const [screenWidth, setScreenWidth] = useState(0);
  const router = useRouter();
  const onSubmit = async (values) => {
    const result = await signIn(values);

    if (result && result.token) {
      document.cookie = `user=${JSON.stringify(result.result)}`;
      localStorage.setItem("token", result.token);
      localStorage.setItem("profile", JSON.stringify(result.result));
      router.push("/");
      toast.success("sign in successfull", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      console.log(result.error.response.data);
      toast.error(result.error.response.data, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    let header = document.getElementsByClassName("header");
    console.log(header[0].classList.add("display-none"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onResize() {
    setScreenWidth(window.innerWidth);
  }

  return (
    <div className="container login-main-container">
      <Head>
        <title>Hobbies - Login</title>
      </Head>
      <ToastContainer />
      <div className={`container ${styles.containerHeight}`}>
        <div className="row">
          <div
            className={`${styles.loginContainerImage} col-lg-6 col-md-6 d-none d-md-block d-lg-block`}
          ></div>
          <div
            className={`${styles.loginContainer} col-lg-6 col-md-6 col-sm-12`}
          >
            {screenWidth < 768 && <Image src={singing} />}
            {screenWidth > 768 && (
              <Image src={NavFavlogo} width={60} height={60} />
            )}
            <h3>Sign in to continue</h3>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={loginValidationSchema}
            >
              <Form>
                <div className="mt-3">
                  <Field type="email" name="email" placeholder="Email" />
                  <span className={`${styles.validationError}`}>
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <span className={`${styles.validationError}`}>
                    <ErrorMessage name="password" />
                  </span>
                </div>
                <div className="mt-3">
                  <button type="submit">Login</button>
                </div>
              </Form>
            </Formik>
            <div className="mt-3 message">
              Dont have an account?
              <strong>
                <Link href="/signup"> Sign Up</Link>
              </strong>
            </div>
            <div>
              <Link href="/">Back to hobbies</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
