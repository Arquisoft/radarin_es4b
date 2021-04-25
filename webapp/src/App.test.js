import { render, screen } from '@testing-library/react';
import App from './App';
import { getText } from './translations/i18n'; 

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(getText("welcome.bienvenida"));
  expect(linkElement).toBeInTheDocument();
});
