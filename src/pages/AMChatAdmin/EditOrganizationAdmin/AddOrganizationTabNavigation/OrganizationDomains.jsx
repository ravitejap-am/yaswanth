// OrganizationDomains.js

import React, { useState, useEffect } from "react";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import { ReactComponent as PlusSign } from "../../../../asset/AmChatSuperAdmin/plus-solid.svg";
import { ReactComponent as DeleteIcon } from "../../../../asset/AmChatSuperAdmin/trash-solid.svg";
import Style from "./OrganizationDomain.module.css";

function  OrganizationDomains() {
  const [newDomains, setNewDomains] = useState([""]);

  useEffect(() => {
    // Update dropdownDomains if needed
  }, [newDomains]);

  const handlePlusClick = () => {
    setNewDomains((prevDomains) => [...prevDomains, ""]);
  };

  const handleDomainChange = (index, value) => {
    setNewDomains((prevDomains) => {
      const updatedDomains = [...prevDomains];
      updatedDomains[index] = value;
      return updatedDomains;
    });
  };

  const handleRemoveDomain = (index) => {
    if (newDomains.length > 1) {
      setNewDomains((prevDomains) => {
        const updatedDomains = [...prevDomains];
        updatedDomains.splice(index, 1);
        return updatedDomains;
      });
    }
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {},
    isSubmit: false,
    formElements: newDomains.map((domain, index) => ({
      name: `domain-${index}`,
      label: `Domain ${index + 1}`,
      type: "text",
      value: domain,
      onChange: (e) => handleDomainChange(index, e.target.value),
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        marginBottom: "10px",
      },
      labelName: false,
      rules: [
        {
          required: true,
          message: "Please enter domains",
        },
      ],
      removeButton: (
        <button onClick={() => handleRemoveDomain(index)}>Remove</button>
      ),
    })),
    formType: "normal",
  };

  return (
    <div>
      <div className={Style.container}>
        <GeneralForm className={Style.generalForm} {...feedingVariable} />
        <div className={Style.iconsContainer}>
          <PlusSign className={Style.plusSign} onClick={handlePlusClick} />
          <DeleteIcon
            className={Style.deleteIcon}
            onClick={() => handleRemoveDomain(newDomains.length - 1)}
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizationDomains;
