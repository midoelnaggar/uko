import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import styles from "../styles/my-account.module.scss";
import PageLoadingContext from "../context/PageLoadingContext";
import axios from "axios";
import LoginDetailsContext from "../context/LoginDetailsContext";
import PageMotion from "../components/PageMotion";
import Head from "next/head";
import PersonalInfoModal from "../components/PresonalInfoModal";
import AddAddressModal from "../components/AddAddressModal";
import EditAddressModal from "../components/EditAddressModal";
import { useRouter } from "next/router";

function MyAccount() {
  const [personalInfoModalOpen, setPersonalInfoModalOpen] = useState(false);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [editAddressModalOpen, setEditAddressModalOpen] = useState(false);
  const [toEditAddress, setToEditAddress] = useState(false);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const { loginDetails } = useContext(LoginDetailsContext);
  const { setPageLoading } = useContext(PageLoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [loginDetails]);

  const handleDelete = async (itemId) => {
    try {
      const res = await axios.post(
        "https://uko.raqamyat.com/uko/public/api/profile/address/delete",
        {id:itemId},
        {
          headers: {
            Authorization: "Bearer " + loginDetails?.item?.data?.token,
          },
        }
      );
      if (res.status === 200) {
        enqueueSnackbar("Address deleted successfully.", {
          variant: "success",
        });
        setTimeout(() => router.reload(), 1000);
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
    }
  };



  return (
    <PageMotion>
      <Head>
        <title>My Account - Uko Sushi</title>
        <meta
          name="description"
          content="UKO is an authentic high end digital restaurant, Spanish origin & Japanese heritage contemporary cul"
        />
      </Head>
      <div
        onClick={() => {
          setPersonalInfoModalOpen(false);
          setAddAddressModalOpen(false);
          setEditAddressModalOpen(false);
        }}
        style={{
          display: `${
            personalInfoModalOpen || addAddressModalOpen || editAddressModalOpen
              ? "block"
              : "none"
          }`,
          backdropFilter: `${
            personalInfoModalOpen || addAddressModalOpen || editAddressModalOpen
              ? "blur(20px)"
              : "none"
          }`,
        }}
        
        className={styles.bluredBg}
      />

<PersonalInfoModal setPersonalInfoModalOpen={setPersonalInfoModalOpen} loginDetails={loginDetails} user={loginDetails?.item?.data?.user} style={{display:personalInfoModalOpen?"flex":"none"}} />
<AddAddressModal setAddAddressModalOpen={setAddAddressModalOpen} loginDetails={loginDetails}  style={{display:addAddressModalOpen?"flex":"none"}} />
<EditAddressModal setPersonalInfoModalOpen={setEditAddressModalOpen} loginDetails={loginDetails} address={toEditAddress} style={{display:editAddressModalOpen?"flex":"none"}} />
      <div className={styles.page}>
        <div className={styles.pageTitle}>Account Dashboard</div>
        {orders[orders?.length - 1] &&
          orders[orders?.length - 1]?.status !== "delivered" && (
            <div className={styles.lastOrder}>
              <img src="/img/chef.svg" alt="preparing" />
              <div className={styles.orderNumberAndProgress}>
                <div className={styles.orderNumber}>
                  Order {orders[0]?.order_number}
                </div>
                <div className={styles.orderProgerss}>
                  <div
                    style={{
                      opacity: `${
                        orders[0]?.status === "confirmed" ||
                        orders[0]?.status === "preparing" ||
                        orders[0]?.status === "delivering"
                          ? "1"
                          : "0.35"
                      }`,
                    }}
                    className={styles.orderConfirmed}
                  >
                    <img
                      src={`${
                        orders[0]?.status === "confirmed" ||
                        orders[0]?.status === "preparing" ||
                        orders[0]?.status === "delivering"
                          ? "/img/check.svg"
                          : "/img/minus-circle.svg"
                      }`}
                      alt="status"
                    />
                    <div>Order Confirmed</div>
                  </div>
                  <div
                    style={{
                      opacity: `${
                        orders[0]?.status === "preparing" ||
                        orders[0]?.status === "delivering"
                          ? "1"
                          : "0.35"
                      }`,
                    }}
                    className={styles.progressDots}
                  />
                  <div
                    style={{
                      opacity: `${
                        orders[0]?.status === "preparing" ||
                        orders[0]?.status === "delivering"
                          ? "1"
                          : "0.35"
                      }`,
                    }}
                    className={styles.orderPreparing}
                  >
                    <img
                      src={`${
                        orders[0]?.status === "preparing" ||
                        orders[0]?.status === "delivering"
                          ? "/img/check.svg"
                          : "/img/minus-circle.svg"
                      }`}
                      alt="status"
                    />
                    <div>Preparing Order</div>
                  </div>
                  <div
                    style={{
                      opacity: `${
                        orders[0]?.status === "delivering" ? "1" : "0.35"
                      }`,
                    }}
                    className={styles.progressDots}
                  />
                  <div
                    style={{
                      opacity: `${
                        orders[0]?.status === "delivering" ? "1" : "0.35"
                      }`,
                    }}
                    className={styles.orderOutForDelivery}
                  >
                    <img
                      src={`${
                        orders[0]?.status === "delivering"
                          ? "/img/check.svg"
                          : "/img/minus-circle.svg"
                      }`}
                      alt="status"
                    />
                    <div>Out for Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        <div className={styles.account}>
          <div className={styles.details}>
            <div className={styles.personalInfo}>
              <div className={styles.sectionTitle}>
                <div>Personal Information</div>
                <div
                  onClick={() => setPersonalInfoModalOpen(true)}
                  className={styles.sectionEditIcon}
                >
                  <img src="/img/edit.svg" alt="edit" />{" "}
                </div>
              </div>
              <div className={styles.sectionContent}>
                <div>{loginDetails.item?.data?.user?.name}</div>
                <div>{loginDetails.item?.data?.user?.email}</div>
                <div>{loginDetails.item?.data?.user?.mobile}</div>
              </div>
            </div>
            <div className={styles.addressBook}>
              <div className={styles.sectionTitle}>
                <div>Address Book</div>
                <div className={styles.sectionEditIcon}>
                  <img onClick={()=>setAddAddressModalOpen(true)} src="/img/add.svg" alt="add" />
                </div>
              </div>
              <div className={styles.sectionContent}>
                {Array.isArray(addresses) &&
                  addresses.map((address, index) => {
                    return (
                      <div key={index} className={styles.address}>
                        <div className={styles.details}>
                          <div className={styles.addressLine}>
                            {address?.address}
                          </div>
                          <div className={styles.addressLine}>
                            {`Building no. ${address?.building_number}`}
                          </div>
                          <div className={styles.addressLine}>
                            {`Floor no. ${address?.floor_number}`}
                          </div>
                          <div className={styles.addressLine}>
                            {`Apt. no. ${address?.apartment_number}`}
                          </div>{" "}
                        </div>
                        <div className={styles.editAndDeleteIcon}>
                          <div onClick={()=>{setEditAddressModalOpen(true);setToEditAddress(address)}} className={styles.edit}>
                            <img src="/img/edit.svg" alt="edit" />{" "}
                          </div>
                          <div onClick={()=>handleDelete(address?.id)} className={styles.delete}>
                            <img src="/img/delete.svg" alt="delete" />{" "}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={styles.orderHistory}>
            <div className={styles.sectionTitle}>
              <div>Order History</div>
            </div>
            <div className={styles.sectionContent}>
              <div className={styles.orders}>
                {orders?.map((order) => {
                  return (
                    <div className={styles.order}>
                      <div className={styles.orderHeader}>
                        <div className={styles.date}>{order?.date}</div>
                        <div
                          style={{
                            color:
                              order?.status === "pending"
                                ? "#00F19F"
                                : "#F58C8C",
                          }}
                          className={styles.status}
                        >
                          {order?.status}
                        </div>
                      </div>
                      <div className={styles.orderItems}>
                        {order?.orderDetails?.data?.map((item) => {
                          return (
                            <div className={styles.item}>
                              <div className={styles.left}>
                                <div className={styles.itemNameAndSize}>
                                  <div className={styles.name}>
                                    {item?.name}
                                  </div>
                                  <div style={{ marginInline: "5px" }}>/</div>
                                  <div className={styles.size}>
                                    {item?.size}
                                  </div>
                                </div>
                                <div className={styles.itemTypeAndResults}>
                                  <div className={styles.type}>
                                    {item?.type}
                                  </div>
                                  <div className={styles.results}></div>
                                </div>
                              </div>
                              <div className={styles.right}>
                                <div className={styles.itemTotalPrice}>
                                  <strong>{item?.price}</strong>EGP
                                </div>
                                <div className={styles.itemQty}>
                                  {`${item?.item_price} x ${item?.qty}`}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className={styles.orderFooter}>
                        <div>{order?.comment}</div>
                        <div className={styles.right}>
                          <div className={styles.totalTitle}>Total</div>
                          <div className={styles.totalNumber}>
                            {`${order?.total_price} EGP`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageMotion>
  );
}

export default MyAccount;
