import React from "react";
import Style from "./pageNotFound.module.css";
import { SearchOutlined } from "@ant-design/icons";
import PageNotFoundImage from "../../../asset/404.jpg";

const PageNotFound = () => {
  return (
    <div className={Style.PageNotFound}>
      <div className={Style.container}>
        <div>
          <img src={PageNotFoundImage} alt="" />
          <h1>Page Not Found !</h1>
          <p>Looks like,page doesn't exist</p>
        </div>
        <div>
          <button>Back to dashboard</button>
          <form typeof="submit">
            <div>
              <input type="search" />
              <button type="submit">
                <i>
                  <SearchOutlined />
                </i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
