import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { login } from './authSlice'
import { validateLoginForm } from './authValidation'

const LoginScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setLogin] = useState({ email: "admin@mail.com", password: "welcome" })
    const [errors, setErrors] = useState({})
    const authUser = useSelector(state => state.auth.user)
    const serverError = useSelector(state => state.auth.error)

    useEffect(() => {
        if (authUser) {
            navigate('/projects')
        }
    }, [authUser])

    const onChangeForm = (e) => {
        setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
        const error = validateLoginForm(e.target.name, e.target.value)
        setErrors(prev => ({ ...prev, [e.target.name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedErrors = {}
        Object.entries(formData).forEach(([key, value]) => {
            updatedErrors[key] = validateLoginForm(key, value)
        })
        setErrors(prev => ({ ...prev, ...updatedErrors }))
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        if (allErrorsFalse) {
            dispatch(login(formData))
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h1>Login</h1>
                    {
                        serverError &&
                        <Alert variant='danger'>{serverError}</Alert>
                    }
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group controlId="formBasicEmail" className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={formData.email}
                                name="email"
                                onChange={onChangeForm}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={onChangeForm}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen