import { render, fireEvent } from "@testing-library/react";

import Subscription from '../../components/Subscription';

const setup = () => {
  const utils = render(<Subscription />);
  const input = utils.getByLabelText('email-input');
  const button = utils.getByLabelText('submit-button');
  const successMessage = utils.getByLabelText('success-message');
  const errorMessage = utils.getByLabelText('error-message');
  return {
    input,
    button,
    successMessage,
    errorMessage,
    ...utils,
  }
}

describe('<Subscription />', () => {
  test('change email input', async () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  test('display message at submit', async () => {
    const { input, button, successMessage } = setup();
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(button);
    expect(successMessage.classList.contains('is-valid')).toBeTruthy;
    fireEvent.submit(button);
    expect(successMessage.classList.contains('is-invalid')).toBeTruthy;
  });
});