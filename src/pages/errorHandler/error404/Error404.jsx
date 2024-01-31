import React from "react";
// import Style from "../InternalServerError/page505.module.css";
import Style from "./error404.module.css";
import image404 from '../../../asset/404-error.jpg'

import GeneralButton from "../../../components/common/buttons/GeneralButton";

function Error404() {
  return (
    <div className={Style.page404}>
      <div className={Style.container}>
        <div>
          <img className={Style.image} src={image404} alt="" />
        </div>
        <div className={Style.internalServerErrorDiv}>
          <div>
            <h1>Uh-Ah</h1>
            <p>Page not found!</p>
          </div>
          <div>
            {/* <button>Back to dashboard</button> */}
            <GeneralButton
              name={"Page not found !"}
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

export default Error404;
