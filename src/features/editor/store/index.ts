import {
  computed,
  ReadonlySignal,
  Signal,
  signal,
} from '@preact/signals-react';
import { controlsConfig } from '../config';

const LOCAL_STORAGE_KEY = 'editorState';

type EditorStateCurrent = {
  id: string | null;
  width: number | null;
  height: number | null;
  grayscale: boolean | null;
  blur: number | null;
};

type EditorState = {
  [K in keyof EditorStateCurrent]: Signal<EditorStateCurrent[K]>;
} & {
  undoStack: Signal<EditorStateCurrent[]>;
  redoStack: Signal<EditorStateCurrent[]>;
};

const editorState: Readonly<EditorState> = {
  id: signal(''),
  width: signal(controlsConfig.width.max!),
  height: signal(controlsConfig.height.max!),
  grayscale: signal(false),
  blur: signal(0),
  undoStack: signal([]),
  redoStack: signal([]),
};

const initDefaultState = () => {
  editorState.width.value = controlsConfig.width.max!;
  editorState.height.value = controlsConfig.height.max!;
  editorState.grayscale.value = false;
  editorState.blur.value = 0;
  editorState.undoStack.value = [];
  editorState.redoStack.value = [];
};

const createStateSnapshot = (): EditorStateCurrent => ({
  id: editorState.id.value,
  width: editorState.width.value,
  height: editorState.height.value,
  grayscale: editorState.grayscale.value,
  blur: editorState.blur.value,
});

const applyStateSnapshot = (snapshot: EditorStateCurrent) => {
  editorState.id.value = snapshot.id;
  editorState.width.value = snapshot.width;
  editorState.height.value = snapshot.height;
  editorState.grayscale.value = snapshot.grayscale;
  editorState.blur.value = snapshot.blur;

  saveStateToLocalStorage();
};

const saveStateToLocalStorage = () => {
  localStorage.setItem(
    `${LOCAL_STORAGE_KEY}-${editorState.id.value}`,
    JSON.stringify({
      id: editorState.id.value,
      width: editorState.width.value,
      height: editorState.height.value,
      grayscale: editorState.grayscale.value,
      blur: editorState.blur.value,
      undoStack: editorState.undoStack,
      redoStack: editorState.redoStack,
    }),
  );
};

export const undo = () => {
  if (editorState.undoStack.value.length > 0) {
    editorState.redoStack.value = [
      ...editorState.redoStack.value,
      createStateSnapshot(),
    ];

    // apply last state from the undo stack
    applyStateSnapshot(editorState.undoStack.value.slice(-1)[0]);

    // after applying - remove
    editorState.undoStack.value = editorState.undoStack.value.slice(0, -1);
  }
};

export const redo = () => {
  if (editorState.redoStack.value.length > 0) {
    editorState.undoStack.value = [
      ...editorState.undoStack.value,
      createStateSnapshot(),
    ];

    // apply last state from the redo stack
    applyStateSnapshot(editorState.redoStack.value.slice(-1)[0]);

    // after applying - remove it
    editorState.redoStack.value = editorState.redoStack.value.slice(0, -1);
  }
};

export const reset = () => {
  localStorage.removeItem(`${LOCAL_STORAGE_KEY}-${editorState.id.value}`);
  initDefaultState();
};

export const initializeEditorState = (id: string) => {
  const storedState = localStorage.getItem(`${LOCAL_STORAGE_KEY}-${id}`);
  if (storedState) {
    console.log(
      `Stored state found for the image: ${id}. Initializing the state.`,
    );

    const state = JSON.parse(storedState);
    editorState.id.value = state.id;
    editorState.width.value = state.width;
    editorState.height.value = state.height;
    editorState.grayscale.value = state.grayscale;
    editorState.blur.value = state.blur;
    editorState.undoStack.value = state.undoStack;
    editorState.redoStack.value = state.redoStack;
  } else {
    console.log(
      `No stored state found for the image ${id}. Initializing a new state.`,
    );

    editorState.id.value = id;
    initDefaultState();
  }
};

export const setEditorState = (
  field: keyof EditorState,
  value: string | number | boolean,
  stateUpdateStart: boolean = false,
  stateUpdateEnd: boolean = false,
) => {
  if (!editorState[field]) return;

  if (stateUpdateStart) {
    editorState.undoStack.value = [
      ...editorState.undoStack.value,
      createStateSnapshot(),
    ];
    editorState.redoStack.value = [];
  }

  editorState[field].value = value;

  if (stateUpdateEnd) {
    saveStateToLocalStorage();
  }
};

export const canUndo = computed(() => editorState.undoStack.value.length > 0);

export const canRedo = computed(() => editorState.redoStack.value.length > 0);

export const hasChanges = computed(() => canUndo.value || canRedo.value);

export const state: ReadonlySignal<Readonly<EditorState>> = computed(
  () => editorState,
);
