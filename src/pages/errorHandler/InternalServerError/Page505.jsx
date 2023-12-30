import React from "react";
import Style from "./page505.module.css";
import Image505 from "../../../asset/500.jpg";

function Page505() {
  return (
    <div className={Style.page505}>
      <div className={Style.container}>
        <div>
          <img src={Image505} alt="" />
        </div>
        <div>
          <h1>Uh-Ah</h1>
          <p>Internal Server Error !</p>
        </div>
        <div>
          <button>Back to dashboard</button>
        </div>
        <div>
          --OR--
          <p>PLease try some time</p>
        </div>
      </div>
    </div>
  );
}

export default Page505;
