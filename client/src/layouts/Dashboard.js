import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, toggleTheme } from '../auth/authSlice';

const Dashboard = (props) => {

  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, theme } = useSelector(state => state.auth)
  const isDarkMode = theme === 'dark';

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [dispatch, user])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleThemeHandler = () => {
    const newTheme = theme == 'dark' ? 'light' : 'dark';
    dispatch(toggleTheme(newTheme))
  };

  const logoutHandler = () => {
    dispatch(logout())
  };

  return (
    <Container fluid className={`${isDarkMode ? 'dark-mode' : ''}`}>
      <Row>
        {/* Sidebar */}
        <Col md={2} className={`min-vh-100 dark-mode-sidebar ${showSidebar ? 'd-block' : 'd-none d-md-block'}`}>
          <div className="d-flex justify-content-end">
            <FontAwesomeIcon
              icon={faTimes}
              size="2x"
              className="m-2 d-md-none"
              onClick={toggleSidebar}
            />
          </div>
          <Nav className={`flex-column`}>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            {/* Add more links as needed */}
          </Nav>
        </Col>
        {/* Main content */}
        <Col md={10} className={`min-vh-100 ${isDarkMode ? 'dark-mode-content' : ''}`}>
          <div className="d-flex align-items-center gap-1 mt-2">
            <div className="d-md-none" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} size="1x" />
            </div>
            <div className="d-flex flex-row-reverse align-items-center gap-2 ms-auto">
              <Dropdown show={showDropdown} onToggle={toggleDropdown}>
                <Dropdown.Toggle as="div" className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant={isDarkMode ? 'dark' : 'light'} onClick={toggleThemeHandler}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </Button>
            </div>
          </div>

          <div className='main-content'>
            {props.children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
