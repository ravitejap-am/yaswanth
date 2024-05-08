import React from "react";
import Layout from "../../../../Layout";

export default function OrganisationLayout({
  action,
  children,
  componentName,
}) {
  console.log("action message--->", action);
  switch (action) {
    case 'edit':
      return <Layout componentName={componentName}>{children}</Layout>;
    case 'view':
      return children;
    default:
      return children;
  }
}
