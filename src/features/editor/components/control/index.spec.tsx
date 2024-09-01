import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Control } from './index.tsx';
import { Control as ControlEnum, ControlType } from '../../types';

describe('Control', () => {
  // @ts-expect-error import glitch
  let handleChangeMock: vi.Mock;

  beforeEach(() => {
    handleChangeMock = vi.fn();
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
        handleChange={handleChangeMock}
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
        handleChange={handleChangeMock}
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
        handleChange={handleChangeMock}
      />,
    );

    const slider = screen.getByLabelText('Test Slider:') as HTMLInputElement;
    expect(slider).not.toBeNull();
    expect(slider.type).toBe('range');
    expect(slider.value).toBe('50');
    expect(slider.min).toBe('0');
    expect(slider.max).toBe('100');
  });

  it('calls handleChange when input control value changes', () => {
    render(
      <Control
        type={ControlType.INPUT}
        label="Test Input"
        id={ControlEnum.HEIGHT}
        value={10}
        handleChange={handleChangeMock}
      />,
    );

    const input = screen.getByLabelText('Test Input:') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '20' } });

    expect(handleChangeMock).toHaveBeenCalledWith(
      ControlEnum.HEIGHT,
      20,
      false,
      false,
    );
  });

  it('calls handleChange when checkbox control value changes', () => {
    render(
      <Control
        type={ControlType.CHECKBOX}
        label="Test Checkbox"
        id={ControlEnum.GRAYSCALE}
        value={false}
        handleChange={handleChangeMock}
      />,
    );

    const checkbox = screen.getByLabelText(
      'Test Checkbox:',
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handleChangeMock).toHaveBeenCalledWith(
      ControlEnum.GRAYSCALE,
      true,
      true,
      true,
    );
  });

  it('calls handleChange when slider control value changes', () => {
    render(
      <Control
        type={ControlType.SLIDER}
        label="Test Slider"
        id={ControlEnum.BLUR}
        value={50}
        min={0}
        max={100}
        handleChange={handleChangeMock}
      />,
    );

    const slider = screen.getByLabelText('Test Slider:') as HTMLInputElement;
    fireEvent.input(slider, { target: { value: '75' } });

    expect(handleChangeMock).toHaveBeenCalledWith(
      ControlEnum.BLUR,
      75,
      false,
      false,
    );
  });
});
