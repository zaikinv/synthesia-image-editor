export enum ControlType {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  SLIDER = 'slider',
}

export enum Control {
  WIDTH = 'width',
  HEIGHT = 'height',
  GRAYSCALE = 'grayscale',
  BLUR = 'blur',
}

export interface ControlConfig {
  type: ControlType;
  label: string;
  id: Control;
  stateKey: Control;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}
