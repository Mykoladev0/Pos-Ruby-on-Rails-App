import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Tabs } from "@bigcommerce/big-design";
import { useRouter } from "next/router";
import { StyledTabs } from "./styled";
import StoreContext from "../contexts/store";

export default function FallbackNav(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab);
  const router = useRouter();
  const { storeId } = useContext(StoreContext);

  const items = [
    { id: "overview", title: "Overview" },
    { id: "catalog", title: "Catalog" },
    { id: "settings", title: "Settings" },
  ];

  function changeTab(tab) {
    setActiveTab(tab);
    router.push(`/${tab}`);
  }

  // Don't return navigation if section parameter is present
  if (storeId) return null;

  return (
    <StyledTabs marginBottom="medium">
      <Tabs activeTab={activeTab} items={items} onTabClick={changeTab} />
    </StyledTabs>
  );
}

FallbackNav.propTypes = {
  activeTab: PropTypes.any,
};
