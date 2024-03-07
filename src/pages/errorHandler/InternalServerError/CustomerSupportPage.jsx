import React from "react";
import Style from "./page505.module.css";
import Image505 from "../../../asset/error/500error.jpg";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import { useNavigate } from 'react-router-dom';

function CustomerSupportPage() {
 const navigate = useNavigate();

  const buttonHandler = () => {
    navigate('/signIn');
  }

  return (
    <div className={Style.page505}>
      <div className={Style.container}>
        {/* <div>
          <img className={Style.image} src={Image505} alt="" />
        </div> */}
        <div className={Style.internalServerErrorDiv}>
          <div>
            {/* <h1>Uh-Ah</h1> */}
            <p>Something went wrong, Please contact our customer support team !</p>
          </div>
          <div className={Style.buttonContainer}>
            <GeneralButton
              name={"Try again !"}
              type={"submit"}
              backgroundColor={"var(--Brand-500, #6366F1)"}
              color={"#fff"}
              buttonHandler = {buttonHandler}
            />
          </div>
          <div>
            <br />
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "-30px",
              }}
            >
              --OR--
            </div> */}
            {/* <p>Please try after some time</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSupportPage;
