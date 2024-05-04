import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "../../../../Layout";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./ViewOrganisationDropdown.css";
import {
  setOrganisationStatus,
  setOrganisationData,
} from "../../../../store/authSlice";

function ViewOrganisationDropdown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageTitle = "View Organisation Dropdown";
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === "option1") {
      const id = "";
      handleViewOrganisation(id);
    }
  };

  const handleViewOrganisation = (id) => {
    dispatch(setOrganisationStatus("view"));
    dispatch(setOrganisationData({ id: id }));
    navigate("/organisation");
  };

  return (
    <Layout componentName={pageTitle}>
      <div className="organization-info">
        {/* <h2>Select an Organization</h2> */}
        <Select
          variant="outlined"
          value={selectedOption}
          onChange={handleOptionChange}
          className="custom-select"
        >
          <MenuItem value="">Select Organization</MenuItem>
          <MenuItem value="option1">Organization Info</MenuItem>
          <MenuItem value="option2">Organization</MenuItem>
        </Select>
      </div>
    </Layout>
  );
}

export default ViewOrganisationDropdown;
