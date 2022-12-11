import styles from "../styles/SignIn.module.scss";
import PageMotion from "../components/PageMotion";
import Head from "next/head";
import {useRouter} from "next/router";
import { useCookies } from 'react-cookie';
import { useEffect, useContext, useState, useRef } from "react";
import PageLoadingContext from "../context/PageLoadingContext";
import LoginDetailsContext from "../context/LoginDetailsContext";
import Link from "next/link";
import axios from "axios";

export default function SignIn() {
    const { setPageLoading } = useContext(PageLoadingContext);
    const router = useRouter();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [cookies, setCookie] = useCookies(['auth']);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const submit = async () =>{
   const res = await axios.post("https://uko.raqamyat.com/uko/public/api/auth/login",{
    email:emailRef?.current?.value,
    password:passwordRef?.current?.value,
   })

   if ( res.status === 200) {
    setCookie("auth",res.data)
   window.location.href = "/" 
  }

  }


  return (
    <>
      <Head>
        <title>Sign In - Uko Sushi</title>
        <meta
          name="description"
          content="UKO is an authentic high end digital restaurant, Spanish origin & Japanese heritage contemporary cul"
        />
      </Head>
      <PageMotion>
        <div className={styles.page}>
          <h1 className={styles.header}>Sign In</h1>
          <div className={styles.signinContainer}>
            <div className={styles.title}>Sign In</div>
            <div className={styles.divider} />
            <div className={styles.labelContainer}>
              <div className={styles.label}>Email</div>
              <div className={styles.label}>*</div>
            </div>
            <div className={styles.inputContainer}>
              <input name="email" ref={emailRef} className={styles.input} type="email" />
              <div className={styles.bar} />
            </div>
            <div className={styles.labelContainer}>
              <div className={styles.label}>Password</div>
              <div className={styles.label}>*</div>
            </div>
            <div className={styles.inputContainer}>
              <input
              name="password"
                ref={passwordRef}
                className={styles.input}
                type={`${hiddenPassword ? "password" : "regular"}`}
              />
              <img
                className={styles.eye}
                style={{ height: "100%" }}
                src={`${
                  hiddenPassword ? "/img/eye.svg" : "/img/eye-slash.svg"
                }`}
                alt="eye"
                onClick={() => {
                  setHiddenPassword(!hiddenPassword);
                }}
              />
              <div className={styles.bar} />
            </div>
            <div className={styles.forgot}>
              Forgot password?{" "}
              <Link href="/reset-password">Reset password</Link>
            </div>
            <div onClick={submit} className={styles.submitBtn}>Sign In</div>
            <div className={styles.forgot}>
              Don't have an account yet? <Link href="/sign-up">Sign Up</Link>
            </div>
          </div>
        </div>
      </PageMotion>
    </>
  );
}
