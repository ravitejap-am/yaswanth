import React from "react";
import { TabList } from "@mui/lab";
import { Tab, Typography } from "@mui/material";

const CustomTabList = ({
  tabs,
  onChange,
  ariaLabel,
  variant,
  scrollButtons,
  allowScrollButtonsMobile,
  tabSx,
}) => {
  return (
    <TabList
      onChange={onChange}
      aria-label={ariaLabel}
      variant={variant}
      scrollButtons={scrollButtons}
      allowScrollButtonsMobile={allowScrollButtonsMobile}
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        ...tabSx,
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          label={<Typography fontWeight="bold">{tab.label}</Typography>}
          value={tab.value}
          {...tab.props} 
        />
      ))}
    </TabList>
  );
};

export default CustomTabList;
