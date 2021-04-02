import React from 'react'
import { useMutation } from '@apollo/client';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN } from '../../graphql/mutations/Login';
import { useFormik } from 'formik';
import { initialValues, loginValidation } from '../../utils/formik';
import './Login.scss';
import { useStateLayer } from '../../StateLayer/StateLayer';

export default function Login() {
    const [state, dispatch] = useStateLayer();

    const [loginUser, { loading, error }] = useMutation(LOGIN, {
        onCompleted({ login }) {

            if (login.error?.length) {
                setErrorMessage(login.error[0].message);
                setTimeout(() => setErrorMessage(''), 6000);
            } else {
                dispatch({ type: 'LOGIN', payload: login.user })
                localStorage.setItem('token', login.token);
                setTimeout(() => history.push('/'), 100);
            }
        }
    });
    const [errorMessage, setErrorMessage] = React.useState('');

    const history = useHistory();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        initialValues,
        validate: loginValidation,
        onSubmit: () => loginUser({ variables: { email: values.email, password: values.password } })
    })

    return (
        <>
            {errorMessage &&
                <Alert variant="danger" className="login__errorAlert">{errorMessage}</Alert>

            }
            <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Col sm={8} md={6} lg={4} className="bg-white py-5 p-md-3 rounded">
                    <h1 className="text-center">Log In</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email ? 'is-invalid' : null}
                            />
                            {errors.email && touched.email &&
                                <Form.Text style={{ color: '#dc3545' }}>
                                    {errors.email}
                                </Form.Text>
                            }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="*********"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password ? 'is-invalid' : null}
                            />
                            {errors.password && touched.password &&
                                <Form.Text style={{ color: '#dc3545' }}>{errors.password}</Form.Text>
                            }
                        </Form.Group>

                        <div className="text-center mt-4">
                            <Button
                                variant="success"
                                type="submit"
                                className="btn-block"
                                disabled={Object.keys(errors).length}
                            >
                                {loading ? 'Loading' : 'Login'}
                            </Button>
                        </div>
                    </Form>
                    <span className="d-block mt-3 text-center">
                        Already have an account?
                        <Link to='/register'>Register</Link>
                    </span>
                </Col>
            </Row>
        </>
    )
}
