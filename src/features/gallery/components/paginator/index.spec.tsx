import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { Paginator } from './index.tsx';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as never;

  return {
    // @ts-expect-error for simplicity
    ...actual,
    useLoaderData: vi.fn(() => ({})),
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe('Paginator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the current page and total pages', () => {
    render(
      <BrowserRouter>
        <Paginator currentPage={2} totalPages={5} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Page 2 of 5')).not.toBeNull();
  });

  it('disables the previous button on the first page', () => {
    render(
      <BrowserRouter>
        <Paginator currentPage={1} totalPages={5} />
      </BrowserRouter>,
    );

    const previousButton = screen.getByText('←');
    // @ts-expect-error type glitch
    expect(previousButton.disabled).toBe(true);
  });

  it('disables the next button on the last page', () => {
    render(
      <BrowserRouter>
        <Paginator currentPage={5} totalPages={5} />
      </BrowserRouter>,
    );

    const nextButton = screen.getByText('→');
    // @ts-expect-error type glitch
    expect(nextButton.disabled).toBe(true);
  });

  it('calls navigate with the correct URL on previous button click', () => {
    const navigate = vi.fn();
    // @ts-expect-error import glitch
    (useNavigate as vi.Mock).mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Paginator currentPage={3} totalPages={5} />
      </BrowserRouter>,
    );

    const previousButton = screen.getByText('←');
    fireEvent.click(previousButton);

    expect(navigate).toHaveBeenCalledWith('/gallery?page=2');
  });

  it('calls navigate with the correct URL on next button click', () => {
    const navigate = vi.fn();
    // @ts-expect-error import glitch
    (useNavigate as vi.Mock).mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Paginator currentPage={3} totalPages={5} />
      </BrowserRouter>,
    );

    const nextButton = screen.getByText('→');
    fireEvent.click(nextButton);

    expect(navigate).toHaveBeenCalledWith('/gallery?page=4');
  });
});
