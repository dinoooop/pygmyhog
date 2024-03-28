import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const LoginScreen = () => {

    const [login, setLogin] = useState({
        email: "", password: ""
    })
    const [errors, setErrors] = useState({})

    const validateForm = (key, value) => {

        switch (key) {
            case "email":
                if (value.length === 0) {
                    return "Email required"
                } else {
                    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                    return (!regex.test(value)) ? "Email not valid" : false
                }
            case "password":
                return (value.length === 0) ? "Password required" : false
            
        }
        return false
    }

    const onChangeForm = (e) => {
        setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
        const error = validateForm(e.target.name, e.target.value)
        setErrors(prev => ({ ...prev, [e.target.name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedErrors = {}
        Object.entries(login).forEach(([key, value]) => {
            updatedErrors[key] = validateForm(key, value)
        })
        setErrors(prev => ({ ...prev, ...updatedErrors }))
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        if (allErrorsFalse) {
            console.log("submit the form")
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h1>Login</h1>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group controlId="formBasicEmail" className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={login.email}
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
                                value={login.password}
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