import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Control } from './index.tsx';
import { Control as ControlEnum, ControlType } from '../../types';
import { setEditorState } from '../../store';

vi.mock('../../store', () => ({
  setEditorState: vi.fn(),
}));

describe('Control', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders an input control correctly', () => {
    render(
      <Control
        type={ControlType.INPUT}
        label="Test Input"
        id={ControlEnum.WIDTH}
        value={10}
        className="custom-input"
      />,
    );

    const input = screen.getByLabelText('Test Input:') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.type).toBe('number');
    expect(input.value).toBe('10');
  });

  it('renders a checkbox control correctly', () => {
    render(
      <Control
        type={ControlType.CHECKBOX}
        label="Test Checkbox"
        id={ControlEnum.GRAYSCALE}
        value={true}
        className="custom-checkbox"
      />,
    );

    const checkbox = screen.getByLabelText(
      'Test Checkbox:',
    ) as HTMLInputElement;
    expect(checkbox).not.toBeNull();
    expect(checkbox.type).toBe('checkbox');
    expect(checkbox.checked).toBe(true);
  });

  it('renders a slider control correctly', () => {
    render(
      <Control
        type={ControlType.SLIDER}
        label="Test Slider"
        id={ControlEnum.BLUR}
        value={50}
        min={0}
        max={100}
        className="custom-slider"
      />,
    );

    const slider = screen.getByLabelText('Test Slider:') as HTMLInputElement;
    expect(slider).not.toBeNull();
    expect(slider.type).toBe('range');
    expect(slider.value).toBe('50');
    expect(slider.min).toBe('0');
    expect(slider.max).toBe('100');
  });

  it('calls setEditorState when input control value changes', () => {
    render(
      <Control
        type={ControlType.INPUT}
        label="Test Input"
        id={ControlEnum.HEIGHT}
        value={10}
      />,
    );

    const input = screen.getByLabelText('Test Input:') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '20' } });

    expect(setEditorState).toHaveBeenCalledWith(
      ControlEnum.HEIGHT,
      20,
      false,
      false,
    );
  });

  it('calls setEditorState when checkbox control value changes', () => {
    render(
      <Control
        type={ControlType.CHECKBOX}
        label="Test Checkbox"
        id={ControlEnum.GRAYSCALE}
        value={false}
      />,
    );

    const checkbox = screen.getByLabelText(
      'Test Checkbox:',
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(setEditorState).toHaveBeenCalledWith(
      ControlEnum.GRAYSCALE,
      true,
      true,
      true,
    );
  });

  it('calls setEditorState when slider control value changes', () => {
    render(
      <Control
        type={ControlType.SLIDER}
        label="Test Slider"
        id={ControlEnum.BLUR}
        value={50}
        min={0}
        max={100}
      />,
    );

    const slider = screen.getByLabelText('Test Slider:') as HTMLInputElement;
    fireEvent.input(slider, { target: { value: '75' } });

    expect(setEditorState).toHaveBeenCalledWith(
      ControlEnum.BLUR,
      75,
      false,
      false,
    );
  });
});
