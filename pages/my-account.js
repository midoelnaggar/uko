import { useContext, useEffect, useState } from "react";
import styles from "../styles/MyAccount.module.scss";
import PageLoadingContext from "../context/PageLoadingContext";
import axios from "axios";
import LoginDetailsContext from "../context/LoginDetailsContext";

function MyAccount() {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const { loginDetails } = useContext(LoginDetailsContext);
  const { setPageLoading } = useContext(PageLoadingContext);
  useEffect(() => {
    const starting = async () => {
      if (loginDetails?.item?.data?.token) {
        const ordersRes = await axios.get(
          "https://uko.raqamyat.com/uko/public/api/profile/orders",
          {
            headers: {
              Authorization: "Bearer " + loginDetails?.item?.data?.token,
            },
          }
        );

        setOrders(await ordersRes?.data?.item?.data);

        const addressesRes = await axios.get(
          "https://uko.raqamyat.com/uko/public/api/profile/address",
          {
            headers: {
              Authorization: "Bearer " + loginDetails?.item?.data?.token,
            },
          }
        );
        setAddresses(await addressesRes?.data?.item?.data);

        await setPageLoading(false);
      }
    };
    starting();
  }, [loginDetails]);
  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>Account Dashboard</div>
      {orders[orders?.length - 1] &&
        orders[orders?.length - 1]?.status !== "delivered"  && (
          <div className={styles.lastOrder}>
            <img src="/img/chef.svg" alt="preparing" />
            <div className={styles.orderNumberAndProgress}>
              <div className={styles.orderNumber}>
                Order {orders[0]?.order_number}
              </div>
              <div className={styles.orderProgess}> {orders[0]?.status}</div>
            </div>
          </div>
        )}
    </div>
  );
}

export default MyAccount;
