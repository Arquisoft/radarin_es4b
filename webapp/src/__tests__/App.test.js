import { render, cleanup } from '@testing-library/react';
import App from '../App';
// import { getText } from '../translations/i18n'; 

test('app renders correctly', () => {
  afterAll(cleanup);
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
