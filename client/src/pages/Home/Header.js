import React from 'react'
import { Row, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function Header({dispatch}) {
    const history = useHistory();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    return (
        <Row className="mt-3 bg-white justify-content-around home__header">
            <Link to="/login">
                <Button variant="link">Login</Button>
            </Link>

            <Link to="/register">
                <Button variant="link">Register</Button>
            </Link>

            <Link to="/login">
                <Button onClick={logout} variant="link">Logout</Button>
            </Link>
        </Row>
    )
}
