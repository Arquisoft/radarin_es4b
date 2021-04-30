import { render, cleanup, screen  } from '@testing-library/react';
import App from '../App';

test('app renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});

test('applies the expected language', () => {
  var lng = navigator.language || navigator.userLanguage;
  if(lng.startsWith("es")) {
    const linkElement = screen.getByText("¡ Bienvenido a Radarin !");
    expect(linkElement).toBeInTheDocument();
  }
  else {
    render(<App />);
    const linkElement = screen.getByText("Welcome to Radarin !");
    expect(linkElement).toBeInTheDocument();
  }
});
