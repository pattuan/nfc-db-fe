import { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";

function Banner() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>IOT</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {/* Your Navbar items go here */}
            <MDBNavbarItem onClick={() => setOpenBasic(false)}><Link to='/register'><MDBNavbarLink active>Register </MDBNavbarLink></Link></MDBNavbarItem>
            <MDBNavbarItem onClick={() => setOpenBasic(false)}><Link to='/login'><MDBNavbarLink active>Login </MDBNavbarLink></Link></MDBNavbarItem>
            <MDBNavbarItem onClick={() => setOpenBasic(false)}><Link to='/cart'><MDBNavbarLink active>Cart </MDBNavbarLink></Link></MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Banner;
