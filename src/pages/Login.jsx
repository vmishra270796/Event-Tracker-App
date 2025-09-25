import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav("/");
  };

  return (
    <div className="container py-5">
      <Card className="mx-auto" style={{ maxWidth: 420 }}>
        <CardBody>
          <CardTitle tag="h5">Login</CardTitle>
          <Form onSubmit={submit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/signup">Create an account</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
