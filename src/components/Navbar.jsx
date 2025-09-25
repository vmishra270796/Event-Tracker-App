import React from 'react';
import { Navbar as RSNavbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const isSharedPage = location.pathname.startsWith('/shared/');
  return (
    <RSNavbar color="light" light expand="md" className="px-3">
      <NavbarBrand tag={Link} to="/">Event Tracker</NavbarBrand>
      <Nav className="ms-auto" navbar>
         {!isSharedPage && user && (
          <NavItem>
            <Button color="secondary" onClick={logout}>Logout</Button>
          </NavItem>
        )}
      </Nav>
    </RSNavbar>
  );
}
