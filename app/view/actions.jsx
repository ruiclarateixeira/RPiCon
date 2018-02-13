export function openFile(fileName) {
  return {
    type: "OPEN_FILE",
    fileName
  };
}
