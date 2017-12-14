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
              <div id="termout" />
              <div class="clearfix" />
              <ButtonGroup>
                <Button
                  onClick={() =>
                    saveFile(path, this.state.initialCode, this.state.code)
                  }
                >
                  Save
                </Button>
                <Button onClick={() => run(path)}>Run</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<RPiCon />, document.body);
