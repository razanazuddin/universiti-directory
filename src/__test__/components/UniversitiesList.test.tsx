import { render, fireEvent, waitFor } from "@testing-library/react";
import http from '../../http-common';
import { mocked } from 'ts-jest/utils';

import UniversitiesList from '../../components/UniversitiesList';

jest.mock('../../http-common', () => {
  return { get: jest.fn() };
});

const setup = () => {
  const utils = render(<UniversitiesList />)
  const input = utils.getByLabelText('search-input')
  return {
    input,
    ...utils,
  }
}

describe('<UniversitiesList />', () => {
  test('fetches and displays university list', async () => {
    mocked(http.get).mockResolvedValue({
      data: [
        {
          "country": "United States",
          "state-province": null,
          "web_pages": [
            "http://www.middlebury.edu/"
          ],
          "alpha_two_code": "US",
          "name": "Middlebury College",
          "domains": [
            "middlebury.edu"
          ]
        }
      ]
    });
    const { container } = setup();
    await waitFor(() => expect(container.textContent?.includes('name')).toBeTruthy);
    expect(container).toBeDefined();
    expect(http.get).toBeCalledWith('/search?name=');
  });
  test('catches error', async () => {
    const getError = new Error('network error');
    mocked(http.get).mockRejectedValue(getError);
    const { container } = setup();
    await waitFor(() => expect(container.textContent?.includes('name')).toBeFalsy);
    expect(container).toBeDefined();
    expect(http.get).toBeCalledWith('/search?name=');
  });

  test('successfully search university', async () => {
    mocked(http.get).mockResolvedValue({
      data: [
        {
          "country": "United States",
          "state-province": null,
          "web_pages": [
            "http://www.middlebury.edu/"
          ],
          "alpha_two_code": "US",
          "name": "Middlebury College",
          "domains": [
            "middlebury.edu"
          ]
        }
      ]
    });
    const { input, container } = setup();

    fireEvent.change(input, { target: { value: 'College' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(container.textContent?.includes('College')).toBeTruthy);
  });


  test('successfully search university', async () => {
    const getError = new Error('network error');
    mocked(http.get).mockRejectedValue(getError);
    const { input, container } = setup();

    fireEvent.change(input, { target: { value: 'College' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(container.textContent?.includes('College')).toBeFalsy);
  });
});