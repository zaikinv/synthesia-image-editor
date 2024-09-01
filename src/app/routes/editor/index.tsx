import { FC, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import './style.scss';

import { Controls } from '../../../features/editor/components/controls';
import { Preview } from '../../../features/editor/components/preview';
import { HistoryControls } from '../../../features/editor/components/historyControls';
import {
  reset,
  initializeEditorState,
  hasChanges,
} from '../../../features/editor/store';
import { Download } from '../../../features/editor/components/download';
import { LoaderData } from '../../../types';

export const ImageEditorRoute: FC = () => {
  const { image } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    initializeEditorState(image?.id);
    if (hasChanges.value) {
      // display message only when returning back to the page
      setHasUnsavedChanges(true);
    }
  }, [image]);

  const handleReset = () => {
    reset();
    setHasUnsavedChanges(false);
  };

  if (!image) {
    return <p>Image can not be loaded!</p>;
  }

  return (
    <div className="editor">
      <div className="editor__content">
        <div className="editor__preview">
          <Preview />
        </div>
        <div className="editor__sidebar">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="back-link"
          >
            ← Back to Gallery
          </a>
          {hasUnsavedChanges && (
            <p className="info-box">
              You image was restored from the last session. Would you like to{' '}
              <a
                href="#"
                className="info-box__link"
                onClick={(e) => {
                  e.preventDefault();
                  handleReset();
                }}
              >
                reset
              </a>
              ?
            </p>
          )}
          <HistoryControls />
          <Controls />
          <Download />
        </div>
      </div>
    </div>
  );
};
