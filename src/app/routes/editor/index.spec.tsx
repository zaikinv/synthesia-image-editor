import { render, screen, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ImageEditorRoute } from './index.tsx';
import { BrowserRouter } from 'react-router-dom';
import {
  initializeEditorState,
  hasChanges,
} from '../../../features/editor/store';
import { useLoaderData } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(() => ({
      image: {},
    })),
  };
});

vi.mock('../../../features/editor/store', () => ({
  state: {
    value: {
      id: { value: '' },
      width: { value: 0 },
      height: { value: 0 },
      grayscale: { value: false },
      blur: { value: 0 },
      undoStack: { value: [] },
      redoStack: { value: [] },
    },
  },
  reset: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
  canUndo: vi.fn(),
  canRedo: vi.fn(),
  initializeEditorState: vi.fn(),
  hasChanges: { value: false },
}));

describe('ImageEditorRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders "Image cannot be loaded!" when image data is not available', () => {
    // @ts-expect-error import glitch
    (useLoaderData as vi.Mock).mockReturnValueOnce({ image: null });

    render(
      <BrowserRouter>
        <ImageEditorRoute />
      </BrowserRouter>,
    );

    expect(screen.getByText('Image can not be loaded!')).not.toBeNull();
  });

  it('initializes the editor state with the correct image ID', () => {
    const mockImage = { id: 'image-123' };
    // @ts-expect-error import glitch
    (useLoaderData as vi.Mock).mockReturnValueOnce({ image: mockImage });

    render(
      <BrowserRouter>
        <ImageEditorRoute />
      </BrowserRouter>,
    );

    expect(initializeEditorState).toHaveBeenCalledWith(mockImage.id);
  });

  it('shows the unsaved changes message when there are unsaved changes', () => {
    // @ts-expect-error import glitch
    (useLoaderData as vi.Mock).mockReturnValueOnce({
      image: { id: 'image-123' },
    });
    // @ts-expect-error TS2540
    // noinspection JSConstantReassignment
    hasChanges.value = true;

    const { container } = render(
      <BrowserRouter>
        <ImageEditorRoute />
      </BrowserRouter>,
    );
    expect(container.querySelector('.info-box')).not.toBeNull();
  });

  it('does not show the unsaved changes message when there are no unsaved changes', () => {
    // @ts-expect-error import glitch
    (useLoaderData as vi.Mock).mockReturnValueOnce({
      image: { id: 'image-123' },
    });
    // @ts-expect-error TS2540
    // noinspection JSConstantReassignment
    hasChanges.value = false;

    const { container } = render(
      <BrowserRouter>
        <ImageEditorRoute />
      </BrowserRouter>,
    );
    expect(container.querySelector('.info-box')).toBeNull();
  });
});
