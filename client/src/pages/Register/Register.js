import React from 'react'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { REGISTER_USER } from '../../graphql/mutations/Register';
import { signUpValidation, initialValues } from '../../utils/formik';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import './Register.scss';


export default function Register() {
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        onCompleted({ register }) {
            if (register.error?.length) {
                setErrorMessage(register.error[0].message);
                setTimeout(() => setErrorMessage(''), 6000);
            }
        },
        update(_, __) {
            history.push('/login');
        }
    });

    const history = useHistory();

    const [errorMessage, setErrorMessage] = React.useState('');

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched
    } = useFormik({
        initialValues,
        validate: signUpValidation,
        onSubmit: () => registerUser({
            variables: {
                username: values.username,
                email: values.email,
                password: values.password
            }
        })
    })

    return (
        <>
            {errorMessage &&
                <Alert variant="danger" className="register__errorMessage">{errorMessage}</Alert>
            }
            <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Col sm={8} md={6} lg={4} className="bg-white py-5 p-md-3 rounded">
                    <h1 className="text-center">Register</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className={errors.username && touched.username && 'text-danger'}>
                                Username
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.username && touched.username ? 'is-invalid' : null}
                            />
                            {errors.username && touched.username &&
                                <Form.Text style={{ color: '#dc3545' }}>
                                    {errors.username}
                                </Form.Text>
                            }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className={errors.email && touched.email && 'text-danger'}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
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
                            <Form.Label
                                className={
                                    (errors.password && touched.password
                                        || errors.passwordValidators && touched.password)
                                    && 'text-danger'}
                            >
                                Enter Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="*********"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password ? 'is-invalid' : null}
                            />
                            {touched.password && (errors.password) &&
                                <Form.Text style={{ color: '#dc3545' }}>{errors.password}</Form.Text>
                            }
                            {errors.passwordValidators && touched.password &&
                                <Form.Text style={{ color: '#dc3545' }}>{errors.passwordValidators}</Form.Text>
                            }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label
                                className={touched.confirmPassword && errors.confirmPassword && 'text-danger'}>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : null}
                            />
                            {touched.confirmPassword && errors.confirmPassword &&
                                <Form.Text style={{ color: '#dc3545' }}>{errors.confirmPassword}</Form.Text>
                            }
                        </Form.Group>

                        <div className="text-center mt-4">
                            <Button
                                variant="success"
                                type="submit"
                                className="btn-block"
                                disabled={Object.keys(errors).length}
                            >
                                {loading ? 'Loading...' : 'Register'}
                            </Button>
                        </div>
                    </Form>
                    <span className="d-block mt-3 text-center">
                        Don't you have an account?
                    <Link to='/login'>Log In</Link>
                    </span>
                </Col>
            </Row>
        </>
    )
}
