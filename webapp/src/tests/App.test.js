import { render, screen } from '@testing-library/react';
import App from '../App';

test('app renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});

test('applies the expected language', () => {
  render(<App />);
  const element = screen.getByText("Welcome to Radarin !");
  expect(element).toBeInTheDocument();
});
