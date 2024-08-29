import { Control, ControlConfig, ControlType } from '../types';

export const controlsConfig: Record<Control, ControlConfig> = {
  [Control.WIDTH]: {
    type: ControlType.SLIDER,
    label: 'Width',
    id: Control.WIDTH,
    stateKey: Control.WIDTH,
    min: 10,
    max: 900,
    step: 1,
  },
  [Control.HEIGHT]: {
    type: ControlType.SLIDER,
    label: 'Height',
    id: Control.HEIGHT,
    stateKey: Control.HEIGHT,
    min: 10,
    max: 600,
    step: 1,
  },
  [Control.GRAYSCALE]: {
    type: ControlType.CHECKBOX,
    label: 'Grayscale',
    id: Control.GRAYSCALE,
    stateKey: Control.GRAYSCALE,
  },
  [Control.BLUR]: {
    type: ControlType.SLIDER,
    label: 'Blur',
    id: Control.BLUR,
    stateKey: Control.BLUR,
    min: 0,
    max: 10,
    step: 1,
  },
};
