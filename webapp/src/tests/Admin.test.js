import { render, screen } from '@testing-library/react';
import Admin from '../components/Admin';

test('admin renders without crashing', () => {
  const { container } = render(<Admin />);
  expect(container).toBeTruthy();
});

test('check that number of users is displayed', () => {
  render(<Admin />);
  const element = screen.getByText("Users in total: ");
  expect(element).toBeInTheDocument();
});
