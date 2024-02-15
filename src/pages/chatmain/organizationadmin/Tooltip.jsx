
import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Tooltip.module.css';

const Tooltip = ({ text, children, onClick }) => {
  return (
    <div className={Styles.tooltipContainer} onClick={onClick}>
      {children}
      <span className={Styles.tooltipText}>{text}</span>
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Tooltip;
