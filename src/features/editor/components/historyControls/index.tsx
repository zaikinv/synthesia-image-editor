import { FC } from 'react';
import './style.scss';
import { undo, redo, canUndo, canRedo } from '../../store';

export const HistoryControls: FC = () => {
  return (
    <div className="history-controls">
      <button onClick={undo} disabled={!canUndo.value}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo.value}>
        Redo
      </button>
    </div>
  );
};
