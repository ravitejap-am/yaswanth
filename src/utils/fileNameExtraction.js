export const trimFileNameBeforeExtension = (fileName) => {
  const lastDotIndex = fileName.lastIndexOf('.');

  if (lastDotIndex !== -1 && lastDotIndex !== 0) {
    const trimmedFileName = fileName.substring(0, lastDotIndex);
    return trimmedFileName;
  }

  return fileName;
};
