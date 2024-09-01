import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  state,
  setEditorState,
  undo,
  redo,
  initializeEditorState,
  reset,
  canUndo,
  canRedo,
  hasChanges,
  createHistorySnapshot,
} from './index';
import { controlsConfig } from '../config';

const LOCAL_STORAGE_KEY = 'editorState';

describe('Editor State', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'removeItem');
    reset();
  });

  it('should initialize with default values', () => {
    expect(state.value.width.value).toBe(controlsConfig.width.max);
    expect(state.value.height.value).toBe(controlsConfig.height.max);
    expect(state.value.grayscale.value).toBe(false);
    expect(state.value.blur.value).toBe(0);
    expect(state.value.undoStack.value).toEqual([]);
    expect(state.value.redoStack.value).toEqual([]);
  });

  it('should set editor state', () => {
    createHistorySnapshot();
    setEditorState('width', 500);
    expect(state.value.width.value).toBe(500);
    expect(state.value.undoStack.value.length).toBe(1);
  });

  it('should undo the last change', () => {
    createHistorySnapshot();
    setEditorState('width', 500);
    undo();
    expect(state.value.width.value).toBe(controlsConfig.width.max);
    expect(state.value.redoStack.value.length).toBe(1);
  });

  it('should redo the undone change', () => {
    createHistorySnapshot();
    setEditorState('width', 500);
    undo();
    redo();
    expect(state.value.width.value).toBe(500);
  });

  it('should return true for canUndo and canRedo when appropriate', () => {
    expect(canUndo.value).toBe(false);
    expect(canRedo.value).toBe(false);

    createHistorySnapshot();
    setEditorState('width', 500);
    expect(canUndo.value).toBe(true);
    expect(canRedo.value).toBe(false);

    undo();
    expect(canRedo.value).toBe(true);
  });

  it('should initialize state from localStorage', () => {
    const savedState = JSON.stringify({
      id: 'test-id',
      width: 300,
      height: 200,
      grayscale: true,
      blur: 5,
      undoStack: [],
      redoStack: [],
    });

    // @ts-expect-error import glitch
    (Storage.prototype.getItem as vi.Mock).mockReturnValueOnce(savedState);
    initializeEditorState('test-id');

    expect(state.value.id.value).toBe('test-id');
    expect(state.value.width.value).toBe(300);
    expect(state.value.height.value).toBe(200);
    expect(state.value.grayscale.value).toBe(true);
    expect(state.value.blur.value).toBe(5);
  });

  it('should reset state and remove it from localStorage', () => {
    createHistorySnapshot();
    setEditorState('width', 500);
    reset();

    expect(Storage.prototype.removeItem).toHaveBeenCalledWith(
      `${LOCAL_STORAGE_KEY}-${state.value.id.value}`,
    );
    expect(state.value.width.value).toBe(controlsConfig.width.max);
  });

  it('should track if there are changes', () => {
    expect(hasChanges.value).toBe(false);
    createHistorySnapshot();
    setEditorState('width', 500);
    expect(hasChanges.value).toBe(true);
  });
});
