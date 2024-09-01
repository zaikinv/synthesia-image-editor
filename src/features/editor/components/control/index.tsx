import { FC } from 'react';
import './style.scss';
import { Control as ControlEnum } from '../../types';

interface ControlProps {
  type: 'input' | 'checkbox' | 'slider';
  label: string;
  id: ControlEnum;
  value: number | boolean;
  min?: number;
  max?: number;
  className?: string;
  handleChange: (
    id: ControlEnum,
    newValue: string | number | boolean,
    updateStart: boolean,
    updateEnd: boolean,
  ) => void;
}

export const Control: FC<ControlProps> = ({
  type,
  label,
  id,
  value,
  min,
  max,
  handleChange,
}) => {
  const onChange = (
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
    handleChange(id, newValue, updateStart, updateEnd);
  };

  const numberInput = (
    <input
      type="number"
      id={id}
      value={value as number}
      onChange={(e) => onChange(e, false, false)}
      onMouseDown={(e) => onChange(e, true, false)}
      onMouseUp={(e) => onChange(e, false, true)}
    />
  );

  const checkboxInput = (
    <input
      type="checkbox"
      id={id}
      checked={value as boolean}
      onChange={(e) => onChange(e, true, true)}
    />
  );

  const sliderInput = (
    <input
      type="range"
      id={id}
      min={min}
      max={max}
      value={value as number}
      onInput={(e) => onChange(e, false, false)}
      onMouseDown={(e) => onChange(e, true, false)}
      onTouchStart={(e) => onChange(e, true, false)}
      onMouseUp={(e) => onChange(e, false, true)}
      onTouchEnd={(e) => onChange(e, false, true)}
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
