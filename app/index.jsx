import { h, textarea, div, render, Component } from "preact";
import { Header, Title, Button, ButtonGroup } from "preact-photon";
import { CodeEditor, FilePicker } from "./code.jsx";
import { saveFile } from "../public/js/files.js";
import { run } from "../public/js/code.js";

class RPiCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: ""
    };
  }

  loadFile = path => {
    this.setState({ path: path });
  };

  render(props, { path }) {
    return (
      <div class="window">
        <Header>
          <Title>RPi Con</Title>
        </Header>
        <div class="window-content">
          <div id="code" class="pane">
            <CodeEditor path={path} />
            <div id="termout" />
          </div>
          <FilePicker onLoadFile={this.loadFile} />
          <div class="clearfix" />
          <ButtonGroup>
            <Button onClick={saveFile}>Save</Button>
            <Button onClick={run}>Run</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

render(<RPiCon />, document.body);
