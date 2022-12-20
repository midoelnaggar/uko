import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import styles from "../styles/PersonalInfoModal.module.scss";

const AddAddressModal = ({loginDetails , style, setAddAddressModalOpen }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setformData] = useState({});
  const router = useRouter();







  const handleSave = async () => {
    try {
      const res = await axios.post(
        "https://uko.raqamyat.com/uko/public/api/profile/address/store",
        formData,
        {
          headers: {
            Authorization: "Bearer " + loginDetails?.item?.data?.token,
          },
        }
      );
      if (res.status === 200){
      enqueueSnackbar("Address added successfully.", {
        variant: "success",
      }
      );
      setTimeout(()=>router.reload(),1000)
    }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    setAddAddressModalOpen(false);
    setformData({});
  };

  return (
    <div style={style} className={styles.PersonalInfoModal}>
      <div className={styles.header}>Address</div>
      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.label}>Address name</div>
          <input
            onChange={(e) => setformData({ ...formData, address: e.target.value })}
            value={formData?.address}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Building no.</div>
          <input
            onChange={(e) =>
              setformData({ ...formData, building_number: e.target.value })
            }
            value={formData?.building_number}
          />
        </div>
        <div className={styles.field} style={{display:"flex",margin:"0px"}} >
        <div style={{marginInlineEnd:"10px"}}>
          <div className={styles.label}>Floor no.</div>
          <input
            onChange={(e) =>
              setformData({ ...formData, flat_no: e.target.value })
            }
            value={formData?.flat_no}
          />
        </div>
        <div className={styles.field} style={{marginInlineStart:"10px"}}>
          <div className={styles.label}>Apartment no.</div>
          <input
            onChange={(e) =>
              setformData({ ...formData, apartment_no: e.target.value })
            }
            value={formData?.apartment_no}
          />
        </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div onClick={handleSave} className={styles.save}>
          Save
        </div>
        <div onClick={handleCancel} className={styles.cancel}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
