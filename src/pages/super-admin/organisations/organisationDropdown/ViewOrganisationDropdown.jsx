import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../../Layout";
import { Grid, useMediaQuery } from "@mui/material";
import GeneralButton from "../../../../components/common/buttons/GeneralButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import "./ViewOrganisationDropdown.css";
import Organisation from "../organisation";
import OrganisationSecondOption from "./OrganisationSecondOption";
import { useSelector } from "react-redux";
import { selectOrganisation } from "../../../../store/authSlice";

function ViewOrganisationDropdown() {
  const organisation = useSelector(selectOrganisation);
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log("organisation data", organisation);
  const pageTitle = organisation?.organisationData?.name;
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Layout componentName={pageTitle}>
      <div
        className="organization-info"
        style={{
          paddingTop: isMobile ? "15px" : "0px",
          paddingRight: isMobile ? "25px" : "0px",
        }}
      >
        <RadioGroup
          row
          aria-label="organization-option"
          name="organization-option"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <FormControlLabel
            value="option1"
            control={<Radio />}
            label="Organization Info"
          />
          <FormControlLabel
            value="option2"
            control={<Radio />}
            label="Organization Statistic"
          />
        </RadioGroup>
      </div>
      {selectedOption === "option1" ? (
        <Organisation pageTitle={pageTitle} />
      ) : (
        <OrganisationSecondOption pageTitle={pageTitle} />
      )}
    </Layout>
  );
}

export default ViewOrganisationDropdown;
