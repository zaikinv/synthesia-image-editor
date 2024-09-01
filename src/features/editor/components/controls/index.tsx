import { FC } from 'react';
import './style.scss';
import { controlsConfig } from '../../config';
import { Control } from '../control';
import { appConfig } from '../../../../config.ts';
import {
  state,
  setEditorState,
  createHistorySnapshot,
  persistState,
} from '../../store';
import type { EditorState } from '../../store';

export const Controls: FC = () => {
  const handleChange = (
    id: string,
    newValue: string | number | boolean,
    updateStart: boolean,
    updateEnd: boolean,
  ) => {
    const field = id as keyof EditorState;

    if (updateStart) {
      createHistorySnapshot();
    }

    setEditorState(field, newValue);

    if (updateEnd) {
      persistState();
    }
  };

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
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};
