import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { register } from './authSlice';
import { validateRegisterForm } from './authValidation';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: 'vinod',
        email: 'vinod@mail.com',
        password: 'welcome',
        password_confirmation: 'welcome'
    })

    const [errors, setErrors] = useState({})
    const serverError = useSelector(state => state.auth.error)
    const authUser = useSelector(state => state.auth.user)

    useEffect(() => {
        if (authUser) {
            navigate('/projects')
        }
    }, [authUser])

    const onChangeForm = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateRegisterForm(name, value, formData);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const updatedErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            updatedErrors[key] = validateRegisterForm(key, value, formData);
        });
        setErrors(updatedErrors);
        const allErrorsFalse = Object.values(updatedErrors).every(error => !error);
        if (allErrorsFalse) {
            dispatch(register(formData));
         }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h1>Register</h1>
                    {serverError && <Alert variant="danger">{serverError}</Alert>}
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group controlId="formBasicName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={onChangeForm}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={onChangeForm}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={onChangeForm}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={onChangeForm}
                                isInvalid={!!errors.password_confirmation}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password_confirmation}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterScreen;
