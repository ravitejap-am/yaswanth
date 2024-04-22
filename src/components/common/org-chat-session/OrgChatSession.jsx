import React from "react";
import styles from "./OrgChatSession.module.css";
import { Box, Card, Divider, Typography } from "@mui/material";
import placeHolderImage from "../../../asset/profilePlaceholder.png";
import { BASE_USER_IMAGE_URL } from "../../../constants/Constant";
import { timeExtracter } from "../../../utils/timeStampGenerateUtils";

const OrgChatSession = ({ activeUserList }) => {
  return (
    <Card sx={{ padding: "20px 30px", overflowY: "auto" }}>
      <Box>
        <Typography className={styles.Heading}>
          Organisation Chat Session
        </Typography>
      </Box>
      {activeUserList ? (
        activeUserList.map((item) => {
          const imagePath = item?.imageUrl
            ? `${BASE_USER_IMAGE_URL}${item?.imageUrl}`
            : placeHolderImage;
          return (
            <>
              <Divider />
              <Box sx={{ display: "flex", padding: "15px 0" }}>
                <Box sx={{ padding: " 0 15px 0 0", margin: "0" }}>
                  <img className={styles.userImg} alt="" src={imagePath} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography className={styles.UserNameHeading}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption">
                    {`Last session Time: ${timeExtracter(item.lastChatTime)}`}
                  </Typography>
                </Box>
              </Box>
            </>
          );
        })
      ) : (
        <Box sx={{ textAlign: "center" }}>No data available.</Box>
      )}
    </Card>
  );
};

export default OrgChatSession;
