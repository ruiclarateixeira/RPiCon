import { h, textarea, div, render, Component } from "preact";
import { Header, Title, Button, ButtonGroup, NavGroup } from "preact-photon";
import { CodeEditor, FilePicker } from "./code.jsx";
import { saveFile } from "../public/js/files.js";
import { run } from "../public/js/code.js";

class RPiCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "",
      initialCode: "",
      code: ""
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
          <div class="toolbar-actions">
            <div class="btn-group pull-right">
              <Button
                class="btn btn-large"
                onClick={() =>
                  saveFile(path, this.state.initialCode, this.state.code)
                }
              >
                <span class="icon icon-floppy" />&nbsp;Save
              </Button>
              <Button class="btn btn-large" onClick={() => run(path)}>
                <span class="icon icon-play" />&nbsp;Run
              </Button>
            </div>
          </div>
        </Header>
        <div class="window-content">
          <div class="pane-group">
            <div class="pane pane-sm sidebar">
              <FilePicker onLoadFile={this.loadFile} />
            </div>
            <div class="pane">
              <CodeEditor
                path={path}
                onChange={code => this.setState({ code })}
                onLoad={initialCode =>
                  this.setState({ initialCode: initialCode, code: initialCode })
                }
              />
              <p>Output:</p>
              <div id="termout" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<RPiCon />, document.body);
