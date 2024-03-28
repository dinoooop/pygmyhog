import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Dropdown, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './DashboardScreen.css';

const DashboardScreen = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Sample data for the table
    const tableData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Admin' },
    ];

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
                                    <Dropdown.Item>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant={isDarkMode ? 'dark' : 'light'} onClick={toggleTheme}>
                                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                            </Button>
                        </div>
                    </div>

                    <div className='main-content'>

                        <h1>Dashboard</h1>

                        <Table striped bordered hover variant={isDarkMode ? 'dark' : 'light'}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardScreen;