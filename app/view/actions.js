export function openFile(fileName) {
  return {
    type: "OPEN_FILE",
    fileName
  };
}

export function closeFile(fileName) {
  return {
    type: "CLOSE_FILE",
    fileName
  };
}
