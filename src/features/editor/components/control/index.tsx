import { FC } from 'react';
import './style.scss';
import { Control as ControlEnum } from '../../types';
import { setEditorState } from '../../store';

interface ControlProps {
  type: 'input' | 'checkbox' | 'slider';
  label: string;
  id: ControlEnum;
  value: number | boolean;
  min?: number;
  max?: number;
  className?: string;
}

export const Control: FC<ControlProps> = ({
  type,
  label,
  id,
  value,
  min,
  max,
}) => {
  const handleChange = (
    e:
      | React.MouseEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.TouchEvent<HTMLInputElement>
      | React.FormEvent<HTMLInputElement>,
    updateStart: boolean,
    updateEnd: boolean,
  ) => {
    const target = e.target as HTMLInputElement;
    const newValue =
      target.type === 'checkbox' ? target.checked : Number(target.value);
    setEditorState(id, newValue, updateStart, updateEnd);
  };

  const numberInput = (
    <input
      type="number"
      id={id}
      value={value as number}
      onChange={(e) => handleChange(e, false, false)}
      onMouseDown={(e) => handleChange(e, true, false)}
      onMouseUp={(e) => handleChange(e, false, true)}
    />
  );

  const checkboxInput = (
    <input
      type="checkbox"
      id={id}
      checked={value as boolean}
      onChange={(e) => handleChange(e, true, true)}
    />
  );

  const sliderInput = (
    <input
      type="range"
      id={id}
      min={min}
      max={max}
      value={value as number}
      onInput={(e) => handleChange(e, false, false)}
      onMouseDown={(e) => handleChange(e, true, false)}
      onTouchStart={(e) => handleChange(e, true, false)}
      onMouseUp={(e) => handleChange(e, false, true)}
      onTouchEnd={(e) => handleChange(e, false, true)}
    />
  );

  return (
    <div className={`control control--${type}`}>
      <label htmlFor={id} className="control__label">
        {label}:
      </label>
      {type === 'input' && numberInput}
      {type === 'checkbox' && checkboxInput}
      {type === 'slider' && sliderInput}
    </div>
  );
};
