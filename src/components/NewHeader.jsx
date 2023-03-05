/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import { FaBitcoin } from 'react-icons/fa';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function NewHeader({ email, total }) {
  const [showNavColor, setShowNavColor] = useState(false);

  const totalFixed = total.toFixed(2);

  return (
    <MDBNavbar expand="lg" dark bgColor="primary">
      <MDBContainer fluid>

        <MDBNavbarBrand href="#">
          <FaBitcoin />
          TrybeWallet
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={ () => setShowNavColor(!showNavColor) }
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={ showNavColor } navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarItem className="active">
              <MDBNavbarLink
                aria-current="page"
                href="#"
                data-testid="email-field"
              >
                {`Email: ${email}`}
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">
                {total < 0 ? '0.00' : totalFixed}
                {' '}
                BRL
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

NewHeader.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
};

NewHeader.defaultProps = {
  email: '',
  total: 0,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalConverted,
});

export default connect(mapStateToProps)(NewHeader);
