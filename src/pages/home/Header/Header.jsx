// Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import Logo from "../../../asset/images/logo.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import { Layout, Menu, Grid, Drawer } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [visible, setVisible] = useState(false);
  const { Header } = Layout;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = [
    {
      key: "Home_page",
      label: "Home",
      onClick: () => scrollToElement("Home_page"),
    },
    {
      key: "ai_page",
      label: "Solutions",
      onClick: () => scrollToElement("ai_page"),
    },
    {
      key: "How_it_works",
      label: "How it Works",
      onClick: () => scrollToElement("How_it_works"),
    },
    {
      key: "Plan_Page",
      label: "Plans",
      onClick: () => scrollToElement("Plan_Page"),
    },
    {
      key: "Contact_Up",
      label: "Contact Us",
      onClick: () => scrollToElement("Contact_Up"),
    },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    // <div className={`${Styles.headerMain} ${scroll ? Styles.scrolled : ""}`}>
    //   <div className={Styles.appLogo}>
    //     {/* <span className={Styles.amChatTitle}>AM-Chat</span> */}
    //     {/* <span className={Styles.appName}> */}
    //     <img src={Logo} alt="" />
    //     {/* </span> */}
    //   </div>
    //   <div className={Styles.appNavigation}>
    //     <span
    //       className={Styles.navigation}
    //       onClick={() => scrollToElement("Home_page")}
    //     >
    //       Home
    //     </span>
    //     <span
    //       className={Styles.navigation}
    //       onClick={() => scrollToElement("ai_page")}
    //     >
    //       Solutions
    //     </span>
    //     <span
    //       className={Styles.navigation}
    //       onClick={() => scrollToElement("How_it_works")}
    //     >
    //       How it Works
    //     </span>
    //     <span
    //       className={Styles.navigation}
    //       onClick={() => scrollToElement("Plan_Page")}
    //     >
    //       Plans
    //     </span>
    //     <span
    //       className={Styles.navigation}
    //       onClick={() => scrollToElement("Contact_Up")}
    //     >
    //       Contact Us
    //     </span>
    //   </div>
    //   <div className={Styles.navigationButton}>
    //     <div className="btn-color">
    //       <Link to={"/signIn"} style={{ textDecoration: "none" }}>
    //         <GeneralButton name={"Sign In"} type={"submit"} color={"#F8FAFC"} />
    //       </Link>
    //     </div>
    //     <div className="btn-color-signup">
    //       <Link to={"/registerUser"} style={{ textDecoration: "none" }}>
    //         <GeneralButton name={"Sign Up"} type={"submit"} color={"#F8FAFC"} />
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <Layout>
      <Header className={Styles.mainHeader}>
        <div className={Styles.appLogo}>
          <img src={Logo} alt="" width={120} />
        </div>
        {screens.sm || screens.md || screens.lg ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["Home_page"]}
            items={items}
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {items?.map((item) => (
              <Menu.Item key={item?.key} onClick={item.onClick}>
                {item?.label}
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <>
            <AppstoreOutlined
              onClick={showDrawer}
              style={{ color: "white", fontSize: "30px" }}
            />
            <Drawer
              className={Styles.drawer}
              title="Menu"
              placement="top"
              closable={true}
              onClose={onClose}
              open={visible}
              mask
            >
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["Home_page"]}
              >
                {items.map((item) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => {
                      item.onClick();
                      onClose();
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            </Drawer>
          </>
        )}
        {screens.sm || screens.md || screens.lg ? (
          <div className={Styles.navigationButton}>
            <div className="btn-color">
              <Link to={"/signIn"} style={{ textDecoration: "none" }}>
                <GeneralButton
                  name={"Sign In"}
                  type={"submit"}
                  color={"#F8FAFC"}
                />
              </Link>
            </div>
            <div className="btn-color-signup">
              <Link to={"/registerUser"} style={{ textDecoration: "none" }}>
                <GeneralButton
                  name={"Sign Up"}
                  type={"submit"}
                  color={"#F8FAFC"}
                />
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </Header>
    </Layout>
  );
};

export default Header;
