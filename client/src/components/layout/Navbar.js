import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'LifeLine',
  icon: 'fas fa-phone-volume'
};

export default Navbar;
