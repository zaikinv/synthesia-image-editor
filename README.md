# Image Editor

## Description

A handy content creation tool that lets you browse, edit, and download images using the free image gallery
API Lorem Picsum.

## Prerequisites

- Node: v20.14.0 (_recommended_)
- NPM: 10.8.2 (_recommended_)

## Run Locally

Clone the project

```bash
  git clone https://github.com/zaikinv/synthesia-image-editor.git
```

Go to the project directory

```bash
  cd synthesia-image-editor
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

Open `http://localhost:5173/` in your browser.

## Configuration

See the `src/config.js` file for the application configuration. 

Example:

```javascript
const appConfig = {
  apiBaseUrl: 'https://picsum.photos',
  editor: {
    enabledControls: [
      'width', 
      'height', 
      'grayscale', 
      'blur'
    ],
  },
  gallery: {
    imagesPerPage: 10,
    imagePreviewWidth: 300,
    imagePreviewHeight: 200,
    showMeta: [
      'author', 
      'url'
    ],
  },
};
```

## Build for Production

```bash
npm run build
```

Also available on Vercel: [Synthesia Image Editor](https://synthesia-image-editor-fawn.vercel.app/).

## Run Production Preview

```bash
npm run preview
```

Open `http://localhost:4173/` in your browser.

## Storybook

### Run locally

```bash
npm run test:unit
```

Also available on Vercel: [Synthesia Image Editor Storybook](https://synthesia-image-editor-storybook.vercel.app).

## Unit Tests

### Unit

```bash
npm run test:unit
```

### E2E

#### Headless mode

```bash
npm run test:e2e
```

#### UI mode

```bash
npm run test:e2e:ui  
```
