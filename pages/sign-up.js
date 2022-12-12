import styles from "../styles/SignUp.module.scss";
import PageMotion from "../components/PageMotion";
import Head from "next/head";
import { useCookies } from "react-cookie";
import { useEffect, useContext, useState, useRef } from "react";
import { useSnackbar } from "notistack";
import PageLoadingContext from "../context/PageLoadingContext";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignUp() {
  const { setPageLoading } = useContext(PageLoadingContext);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [cookies, setCookie] = useCookies(["auth"]);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const mobileRef = useRef("");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const submit = async () => {
    if (passwordRef?.current.value === confirmPasswordRef?.current.value) {
      try {
        const res = await axios.post(
          "https://uko.raqamyat.com/uko/public/api/auth/register",
          {
            name: nameRef?.current?.value,
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
            mobile: mobileRef?.current?.value,
          }
        );
        if (res.status === 200) {
          setCookie("auth", res.data);
          if (router?.query?.signin === "please-signin") {
            window.location.href = "/the-menu";
          } else {
            window.location.href = "/";
          }
        }
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.message, {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("Passwords are not matched.", {
        variant: "error",
      });
    }
  };
  return (
    <>
      <Head>
        <title>Sign Up - Uko Sushi</title>
        <meta
          name="description"
          content="UKO is an authentic high end digital restaurant, Spanish origin & Japanese heritage contemporary cul"
        />
      </Head>
      <PageMotion>
        <div className={styles.page}>
          <h1 className={styles.header}>{`${
            router?.query?.signup === "please-signup"
              ? "Please Sign Up To Make Orders"
              : "Sign Up"
          }`}</h1>
          <div className={styles.signinContainer}>
            <div className={styles.title}>Sign Up New Account</div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>Name</div>
                  <div className={styles.label}>*</div>
                </div>
                <div className={styles.inputContainer}>
                  <input name="name" ref={nameRef} className={styles.input} />
                  <div className={styles.bar} />
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>Email</div>
                  <div className={styles.label}>*</div>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    name="email"
                    ref={emailRef}
                    className={styles.input}
                    type="email"
                  />
                  <div className={styles.bar} />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
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
              </div>
              <div className={styles.field}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>Confirm Password</div>
                  <div className={styles.label}>*</div>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    name="password"
                    ref={confirmPasswordRef}
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
              </div>
            </div>
            <div className={styles.row}>
              <div style={{ width: "100%" }} className={styles.field}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>Phone</div>
                  <div className={styles.label}>*</div>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    name="password"
                    ref={mobileRef}
                    className={styles.input}
                    type="tel"
                  />
                  <div className={styles.bar} />
                </div>
              </div>
            </div>
            <div className={styles.forgot}>
              Have Account Already? <Link href="/sign-in">Sign In</Link>
            </div>
            <div onClick={submit} className={styles.submitBtn}>
              Sign Up
            </div>
          </div>
        </div>
      </PageMotion>
    </>
  );
}
