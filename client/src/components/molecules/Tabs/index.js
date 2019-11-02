import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Tab from "../../atoms/Tab";
import { StyledTabList } from "./StyledTabs";

const Tabs = React.memo(({ children }) => {
  const [activeTab, setActiveTab] = useState(children[1].props.label);

  const onClickTabItem = useCallback(tab => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="tabs">
      <StyledTabList>
        {children.map(child => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            ></Tab>
          );
        })}
      </StyledTabList>
      <div className="tab-content">
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
});

Tabs.defaultProps = {
  children: PropTypes.instanceOf(Array).isRequired
};

export default Tabs;
