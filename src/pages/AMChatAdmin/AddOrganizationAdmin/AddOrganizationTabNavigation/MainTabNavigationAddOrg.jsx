import React from "react";
import { Tabs } from "antd";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "ForE Tab",
    children: "Content of ForE Tab Pane",
  },
];

const MainTabNavigationAddOrg = () => (
  <div>
    <h1>MainTabNavigationAddOrg Component</h1>
    <Tabs defaultActiveKey="1" onChange={onChange}>
      {items.map((item) => (
        <Tabs.TabPane key={item.key} tab={item.label}>
          {item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  </div>
);

export default MainTabNavigationAddOrg;
