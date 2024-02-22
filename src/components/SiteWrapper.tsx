import React, { ReactNode } from "react";
import PropTypes from 'prop-types';
import Header from "./common/Header";

interface SiteWrapperProps {
    children?: ReactNode;
  }
  
  const SiteWrapper: React.FC<SiteWrapperProps> = ({ children }) => {
    return (
      <React.Fragment>
        <Header />
        {children}
      </React.Fragment>
    );
  };
  
  SiteWrapper.propTypes = {
    children: PropTypes.node,
  };
  
  SiteWrapper.defaultProps = {
    children: undefined,
  };
  
  export default SiteWrapper;
  