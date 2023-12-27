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

data = [
  {
    img: "",
    content: "",
  },
];

const Carousal = ({ data }) => {
  return (
    <div>
      <Carousel autoplay>
        {data.map((index, key) => {
          return (
            <div key={key}>
              <div>
                <img src={index.img} alt="" />
              </div>
              <div>
                <p>{index.content}</p>
                <h3>{index.heading}</h3>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Carousal;
