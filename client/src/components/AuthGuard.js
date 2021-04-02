import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export default ({ component: Component, authenticated,...rest }) => {

    return <Route
        {...rest}
        render={() => !authenticated ? <Redirect to='/login' /> : <Component />}
    />
}