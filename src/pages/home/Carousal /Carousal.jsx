import React from "react";
import { Carousel } from "antd";
import Style from "./carousal.module.css";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

// data = [
//   {
//     img: "",
//     content: "",
//     heading: "",
//   },
// ];

const Carousal = ({ data }) => {
  return (
    <div>
      <Carousel autoplay vertical>
        {data.map((index, key) => {
          return (
            <div className={Style.carousal} key={key}>
              <div className={Style.carousalDetails}>
                <div className={Style.carousalImage}>
                  <img src={index.img} alt="" />
                </div>
                <div className={Style.carousalContent}>
                  <p className={Style.contentPara}> {index.content}</p>
                  <h3 className={Style.contentHeading}>{index.heading}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Carousal;
