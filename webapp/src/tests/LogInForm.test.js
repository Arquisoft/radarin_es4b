import React from 'react'
import { render, screen } from "@testing-library/react";
import LogIn from "../components/LogIn";

test('logIn page renders without crashing', () => {
  const { container } = render(<LogIn />);
  expect(container).toBeTruthy();
});

test('check that the login button is available', async () => {
  render(<LogIn/>)
  let element = screen.getByText("Access with your POD");
  expect(element).toBeInTheDocument();
});