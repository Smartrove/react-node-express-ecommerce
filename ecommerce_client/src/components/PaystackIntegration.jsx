import React from "react";
import { useState, useEffect } from "react";
import PaystackPop from "@paystack/inline-js";
import styled from "styled-components";
import { mobileDevices } from "../responsive";
import axios from "axios";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(5, 255, 255, 0.5), rgba(25, 25, 255, 0.5)),
    url("product-1.jpg");
  background-repeat: repeat-y;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: rgba(200, 200, 200, 0.3);
  ${mobileDevices({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 30px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 20px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 10px;
  margin-top: 15px;
  background: rgba(255, 5, 5, 0.2);
  color: white;

  &:hover {
    background: rgba(2, 2, 200, 0.3);
  }
`;
const PaystackIntegration = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    const makeRequest = async (req, res) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/ecommerce/v1/paystack",
          { name: "", amount: 50000 }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);
  const payWithPaystack = (e) => {
    e.preventDefault();
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_506d06eca10936827e72eaf8e21d1d66c9aea9a5",
      amount: amount * 100,
      email,
      firstName,
      lastName,
      onSuccess(transaction) {
        let message = `Payment completed with #${amount} and ${transaction.reference} reference number`;
        alert(message);
        setEmail("");
        setAmount("");
        setFirstName("");
        setLastName("");
      },
      onCancel() {
        alert(`you have cancelled the transaction`);
      },
    });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Create Account</Title>
        <Form>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <Input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <Input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
          />
          <Input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
          />

          <Button type="submit" onClick={payWithPaystack}>
            Pay
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default PaystackIntegration;
