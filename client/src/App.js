import React from 'react';
import './App.scss';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql/ApolloProvider';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import AuthGuard from './components/AuthGuard';
import { useStateLayer } from './StateLayer/StateLayer';

function App() {

  const [{ isAuthenticated }] = useStateLayer();

  return (
    <Router>
      <Switch>
        <ApolloProvider client={apolloClient}>
          <Container>
            <AuthGuard exact path='/' authenticated={isAuthenticated} component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Container>
        </ApolloProvider>
      </Switch>
    </Router>
  );
}

export default App;
