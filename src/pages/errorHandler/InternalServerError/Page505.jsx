import React from "react";
import Style from "./page505.module.css";
import Image505 from "../../../asset/error/500error.jpg";
import GeneralButton from "../../../components/common/buttons/GeneralButton";

function Page505() {
  return (
    <div className={Style.page505}>
      <div className={Style.container}>
        <div>
          <img className={Style.image} src={Image505} alt="" />
        </div>
        <div className={Style.internalServerErrorDiv}>
          <div>
            <h1>Uh-Ah</h1>
            <p>Internal Server Error !</p>
          </div>
          <div>
            {/* <button>Back to dashboard</button> */}
            <GeneralButton
              name={"Internal Server Error !"}
              type={"submit"}
              backgroundColor={"var(--Brand-500, #6366F1)"}
              color={"#fff"}
            />
          </div>
          <div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "-30px",
              }}
            >
              --OR--
            </div>
            <p>Please try after some time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page505;
