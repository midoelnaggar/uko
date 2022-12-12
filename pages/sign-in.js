import styles from "../styles/SignIn.module.scss";
import PageMotion from "../components/PageMotion";
import { useSnackbar } from "notistack"
import Head from "next/head";
import { useCookies } from 'react-cookie';
import { useEffect, useContext, useState, useRef } from "react";
import PageLoadingContext from "../context/PageLoadingContext";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const { setPageLoading } = useContext(PageLoadingContext);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [cookies, setCookie] = useCookies(['auth']);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();


  useEffect(() => {
    setPageLoading(false);
  }, []);

  const submit = async () =>{
    try {
   const res = await axios.post("https://uko.raqamyat.com/uko/public/api/auth/login",{
    email:emailRef?.current?.value,
    password:passwordRef?.current?.value,
   })
   console.log(res.status)
   if ( res.status === 200) {
    setCookie("auth",res.data)
   if (router?.query?.signin === "please-signin"){
    window.location.href = "/the-menu"
   }
    else{window.location.href = "/" }
  }
}
  catch (error)  {
if (error.response) {
    enqueueSnackbar(error?.response?.data?.message,{
      variant:"error"
  })
}
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
          <h1 className={styles.header}>{`${router?.query?.signin === "please-signin"?"Please Sign In To Add Items To The Cart":"Sign In"}`}</h1>
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
              <Link href="">Reset password</Link>
            </div>
            <div onClick={submit} className={styles.submitBtn}>Sign In</div>
            <div className={styles.forgot}>
              Don't have an account yet? <Link href={router?.query?.signin === "please-signin"?{pathname:"/sign-up",query:{signup:"please-signup"}}:"/sign-up"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </PageMotion>
    </>
  );
}
