import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../Firebase";
import { AuthContext } from "./Auth.js";
import {Button, Card, Form} from 'react-bootstrap';


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
    
  if (currentUser) {
    return <Redirect to="/" />;
  }
  

  return (
    <Card className="border-black border-2 mx-10 rounded-lg shadow-md">
        <Card.Header>Melden Sie sich an.</Card.Header>
        
        <Card.Body className="pb-2">
        
            <Form onSubmit={handleLogin}>
                    
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Addresse</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Email Adresse eingeben..." />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Passwort eingeben..." />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Anmelden
                </Button>
               
            </Form>
            
        </Card.Body>

        <span className="text-sm">Um unseren Dienst nutzen zu können müssen Sie sich zunächst anmelden oder ein Konto erstellen.</span>

        <Card.Footer>
            Noch kein Konto? Probleme bei der Anmeldung? Kontaktieren Sie uns!
        </Card.Footer>
    </Card>
  );
};

export default withRouter(Login);