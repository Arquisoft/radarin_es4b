import { render } from '@testing-library/react';
import App from '../App';
// import { getText } from '../translations/i18n'; 

test('app renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
