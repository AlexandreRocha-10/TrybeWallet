import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

function Header({ email, total }) {
  const totalFixed = total.toFixed(2);

  return (
    <div className="header">
      <h4>TrybeWallet</h4>
      <h4 data-testid="email-field">{`Email: ${email}`}</h4>
      <h4 data-testid="total-field">
        {total < 0 ? '0.00' : totalFixed}
      </h4>
      <h4 data-testid="header-currency-field">BRL</h4>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
};

Header.defaultProps = {
  email: '',
  total: 0,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalConverted,
});

export default connect(mapStateToProps)(Header);
