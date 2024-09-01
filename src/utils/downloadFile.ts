export const downloadFromUrl = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to download file: ${response.status} ${response.statusText}`,
      );
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error during file download:', error);
  }
};
