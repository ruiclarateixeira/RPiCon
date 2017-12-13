import { h, textarea, div, render, Component } from "preact";
import {
  Header,
  Title,
  Footer,
  Button,
  ButtonGroup,
  NavGroup,
  Table
} from "preact-photon";
import { CodeEditor, FilePicker } from "./code.jsx";
import { saveFile } from "../public/js/files.js";
import { run } from "../public/js/code.js";

class Code extends Component {
  render({ code }, state) {
    return (
      <div id="code" class="pane">
        <CodeEditor code={code} onUpdate={this.onUpdate} />
        <div id="termout" />
      </div>
    );
  }
}

class RPiCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  render(props, { code }) {
    return (
      <div class="window">
        <Header>
          <Title>RPi Con</Title>
        </Header>
        <div class="window-content">
          <Code code={code} />
          <FilePicker
            onLoadFile={path => {
              this.setState({ code: path });
            }}
          />
          <div class="clearfix" />
          <div>
            <button onClick={saveFile}>Save</button>
            <button onClick={run}>Run</button>
          </div>
        </div>
      </div>
    );
  }
}

render(<RPiCon />, document.body);
