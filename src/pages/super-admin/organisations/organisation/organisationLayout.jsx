import React from "react";
import Layout from "../../../../Layout";

export default function OrganisationLayout({
  action,
  children,
  componentName,
}) {
  console.log("action message--->", action);
  switch (action) {
    case "edit":
      return <Layout componentName={componentName}>{children}</Layout>;
    case "view":
      return children;
    case "Add Organisation":
      return <Layout componentName={componentName}>{children}</Layout>;
    default:
      return children;
  }
}
