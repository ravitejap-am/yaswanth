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

function ViewOrganisationDropdown() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const pageTitle = "View Organisation Dropdown";
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Layout componentName={pageTitle}>
      <div className="organization-info">
        <h2>Select an Organization</h2>
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
        <Organisation />
      ) : (
        <OrganisationSecondOption />
      )}

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={isMobile ? "center" : "flex-end"}
        alignItems={isMobile ? "center" : "flex-end"}
        marginTop={"0.3rem"}
      >
        <Grid item>
          <Link to="/organisations" style={{ textDecoration: "none" }}>
            <div>
              <GeneralButton
                name="Cancel"
                buttonProps={{}}
                type="default"
                color="#334155"
                backgroundColor="transparent"
                width="130px"
                height="50px"
                borderRadius="30px"
              />
            </div>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ViewOrganisationDropdown;
