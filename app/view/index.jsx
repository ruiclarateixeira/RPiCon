import { h, textarea, div, render, Component } from "preact";
import { Header, Title, Button, ButtonGroup, NavGroup } from "preact-photon";
import { CodeEditor, FilePicker } from "./code.jsx";
import { saveFile } from "../../public/js/files.js";
import { run } from "../../public/js/code.js";

const HEADER_HEIGHT = 61;

class RPiCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "",
      initialCode: "",
      code: "",
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - HEADER_HEIGHT
    });
  };

  loadFile = path => {
    this.setState({ path: path });
  };

  render(props, { path, height }) {
    var codeHeight = height * 0.7;
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
                height={codeHeight.toString()}
              />
              <p
                id="termout-title"
                style={{ height: height * 0.04, marginTop: height * 0.01 }}
              >
                Console Output
              </p>
              <div id="termout" style={{ height: height * 0.25 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<RPiCon />, document.body);
