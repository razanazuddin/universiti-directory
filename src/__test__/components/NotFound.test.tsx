import { render, fireEvent } from "@testing-library/react";

import NotFound from '../../components/NotFound';

describe('<NotFound />', () => {
  test('render text contains 404', async () => {
    const renderNotFound = render(<NotFound />)
    expect(renderNotFound.findByDisplayValue('404 - Not Found!')).toBeTruthy;
  });
});