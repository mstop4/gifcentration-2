import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchQuery from './SearchQuery';
import '@testing-library/jest-dom';

describe('SearchQuery', () => {
  it('renders a SearchQuery', () => {
    const { container } = render(
      <SearchQuery searchQuery="" setSearchQuery={jest.fn()} />,
    );
    const query = container.querySelector('#searchQuery');

    expect(query).toBeInTheDocument();
  });

  it('sets search query when inputting text', async () => {
    const setSearchQueryMock = jest.fn();
    const { container } = render(
      <SearchQuery searchQuery="" setSearchQuery={setSearchQueryMock} />,
    );
    const query = container.querySelector('#searchQuery') as Element;
    fireEvent.change(query, { target: { value: 'F' } });

    await waitFor(() => {
      expect(setSearchQueryMock).toBeCalled();
    });
  });

  it('clears search query after clicking clear button if text field is not blank', async () => {
    const setSearchQueryMock = jest.fn();
    const { container } = render(
      <SearchQuery searchQuery="Text" setSearchQuery={setSearchQueryMock} />,
    );
    const clear = container.querySelector('#searchClear') as Element;
    fireEvent.click(clear);

    await waitFor(() => {
      expect(setSearchQueryMock).toBeCalled();
    });
  });

  it('does nothing after clicking clear button if text field is blank', async () => {
    const setSearchQueryMock = jest.fn();
    const { container } = render(
      <SearchQuery searchQuery="" setSearchQuery={setSearchQueryMock} />,
    );
    const clear = container.querySelector('#searchClear') as Element;
    fireEvent.click(clear);

    await waitFor(() => {
      expect(setSearchQueryMock).not.toBeCalled();
    });
  });
});
