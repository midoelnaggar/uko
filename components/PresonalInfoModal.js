import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "../styles/PersonalInfoModal.module.scss";

const PersonalInfoModal = ({loginDetails , user, style, setPersonalInfoModalOpen }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookies] = useCookies(["auth"]);
  const [formData, setformData] = useState({});
  const [newCookie, setNewCookie] = useState(cookies?.auth);

  const router = useRouter();

  useEffect(() => {
    console.log(newCookie)
    setCookies("auth",newCookie);
  }, [newCookie]);

  useEffect(() => {
    setformData({ name: user?.name, email: user?.email, mobile: user?.mobile });
  }, [user]);




  const handleSave = async () => {
    try {
      const res = await axios.post(
        "https://uko.raqamyat.com/uko/public/api/profile/update",
        formData,
        {
          headers: {
            Authorization: "Bearer " + loginDetails?.item?.data?.token,
          },
        }
      );
      const newData = await res.data.item.data
      setNewCookie(current => {
    
        return {
          ...current,
          item: {
            ...current.item,
    
            data: {
                ...current.item.data, user : 
                    newData
                
            },
          },
        };
      });
      if (res.status === 200){
      enqueueSnackbar("Personal information updated.", {
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
    setPersonalInfoModalOpen(false);
    setformData({ name: user?.name, email: user?.email, mobile: user?.mobile });
  };

  return (
    <div style={style} className={styles.PersonalInfoModal}>
      <div className={styles.header}>Personal Information</div>
      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.label}>Name</div>
          <input
            onChange={(e) => setformData({ ...formData, name: e.target.value })}
            value={formData?.name}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Email</div>
          <input
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
            value={formData?.email}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Phone</div>
          <input
            onChange={(e) =>
              setformData({ ...formData, mobile: e.target.value })
            }
            value={formData?.mobile}
          />
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

export default PersonalInfoModal;
