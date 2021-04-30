import { render, screen  } from '@testing-library/react';
import App from '../App';

test('app renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});

test('applies the expected language', () => {
  render(<App />);
  var lng = navigator.language || navigator.userLanguage;
  if(lng.startsWith("es")) {
    const element = screen.getByText("¡ Bienvenido a Radarin !");
    expect(element).toBeInTheDocument();
  }
  else {
    const element = screen.getByText("Welcome to Radarin !");
    expect(element).toBeInTheDocument();
  }
});
