import { FC } from 'react';
import './style.scss';
import { controlsConfig } from '../../config';
import { Control } from '../control';
import { appConfig } from '../../../../config.ts';
import { state } from '../../store';

export const Controls: FC = () => {
  return (
    <div className="controls">
      {appConfig.editor.enabledControls.map((control) => (
        <Control
          key={controlsConfig[control].id}
          type={controlsConfig[control].type}
          label={controlsConfig[control].label}
          id={controlsConfig[control].id}
          value={state.value[control].value!}
          min={controlsConfig[control].min}
          max={controlsConfig[control].max}
        />
      ))}
    </div>
  );
};
