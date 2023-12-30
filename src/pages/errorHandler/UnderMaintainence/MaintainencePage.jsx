import React from "react";
import Style from "./underMaintianence.module.css";
import { Flex, Spin } from "antd";

const MaintainencePage = () => {
  return (
    <div className={Style.maintainencePage}>
      <div className={Style.container}>
        <Flex align="center" gap="middle">
          <Spin size="large"  />
        </Flex>
        <div>
          <h1>UNDER MAINTENANCE!</h1>
          <p>We're sorry for the inconvenience.</p>
          <p>Please check back later.</p>
        </div>
      </div>
    </div>
  );
};

export default MaintainencePage;
