import React from "react";
import PropTypes from "prop-types";
import { StyledTabListItem } from "./StyledTab";

const Tab = React.memo(({ activeTab, label, onClick }) => {
  return (
    <StyledTabListItem
      active={label === activeTab}
      onClick={() => onClick(label)}
    >
      {label}
    </StyledTabListItem>
  );
});

Tab.defaultProps = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tab;
