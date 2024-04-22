import { Box, Typography, Grid } from "@mui/material";
import GeneralButton from "../common/buttons/GeneralButton";
import frame from '../../asset/Frame 1.png'
import Tick1 from "../../asset/tick.png"
import "../PlanCard/Plancard.css"
import { BUTTON_COLOUR } from "../../constants/Constant";


const PlanCard = ({
    title,
    description,
    price,
    handleClick,
    planDetails
}) => {

    console.log("price---->",price);
  return (
    <div className="Right_Plan_Content">
    <div>
      <Typography
        variant="h5"
        fontWeight="600"
        className="Right_Plan_Content_Title"
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        mt={2}
        className="Right_Plan_Content_Sub_Div"
      >
        {description}
      </Typography>
    </div>
    <div>
      <p className="Right_Plan_Content_Price">
        <span className="price">{price}</span>
        <Typography variant="caption" className="per-month">
        {price === "" || price === "Free" ? "" : "/Month"}
        </Typography>
      </p>
    </div>
    <div
      className="Right_Plan_Gernal_Button"
      onClick={() => handleClick()}
    >
      <GeneralButton
        name={"Get Started"}
        type={"Get Started"}
        color={"#f8fafc"}
        borderRadius={"30px"}
        backgroundColor={BUTTON_COLOUR}
        icons={frame}
        width={"282.001px"}
        height={"45px"}
      />
    </div>
    <div className="Right_Plan_Below_Content">
      {Object.keys(planDetails).length > 0 &&
        planDetails.hasOwnProperty([title]) &&
        planDetails[title].map((item, index) => {
          return (
            <div
              className="Right_Plan_below_Content_Sub_Div"
              key={`${title}${index}`}
            >
              <img src={ Tick1 } alt="" />
              <Typography
                variant="body2"
                className="Right_Plan_below_Content_P_Tag"
              >
                {item}
              </Typography>
            </div>
          );
        })}
    </div>
  </div>
  );
};

export default PlanCard;
