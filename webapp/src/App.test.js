import { render, screen } from '@testing-library/react';
import App from './App';
import i18n from 'i18next'; 

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(i18n.t('welcome.bienvenida'));
  expect(linkElement).toBeInTheDocument();
});
