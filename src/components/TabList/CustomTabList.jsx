import React from "react";
import { TabList } from "@mui/lab";

const CustomTabList = ({
  onChange,
  ariaLabel,
  variant,
  scrollButtons,
  allowScrollButtonsMobile,
  children,
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
      {children}
    </TabList>
  );
};

export default CustomTabList;
