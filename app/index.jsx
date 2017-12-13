import { h, textarea, div, render } from "preact";
import {
  Header,
  Title,
  Footer,
  Button,
  ButtonGroup,
  NavGroup,
  Table
} from "preact-photon";
import { saveFile } from "../public/js/files.js";
import { run } from "../public/js/code.js";

console.log(saveFile);
console.log(run);

const Code = () => (
  <div id="code" class="pane">
    <textarea id="codeArea" />
    <div id="termout" />
  </div>
);

const FileSelect = () => (
  <div id="fileSelection">
    <input id="dirPath" type="text" />
    <select id="files" size="10" />
  </div>
);

render(
  <div class="window">
    <Header>
      <Title>RPi Con</Title>
    </Header>
    <div class="window-content">
      <Code />
      <FileSelect />
      <div class="clearfix" />
      <div>
        <button onClick={saveFile}>Save</button>
        <button onClick={run}>Run</button>
      </div>
    </div>
  </div>,
  document.body
);
