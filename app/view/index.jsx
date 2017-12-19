import { h, textarea, div, render, Component } from "preact";
import { Header, Title, Button, ButtonGroup, NavGroup } from "preact-photon";
import { CodeEditor, FilePicker } from "./code.jsx";
import { notifyMe } from "./utils.js";
import { run } from "./code.js";
const { remote } = require("electron");
const mainProcess = remote.require("./app.js");

const HEADER_HEIGHT = 61;

class AppHeader extends Component {
  render({ onSave, onRun }, state) {
    return (
      <Header>
        <Title>RPi Con</Title>
        <div class="toolbar-actions">
          <div class="btn-group pull-right">
            <Button class="btn btn-large" onClick={onSave}>
              <span class="icon icon-floppy" />&nbsp;Save
            </Button>
            <Button class="btn btn-large" onClick={onRun}>
              <span class="icon icon-play" />&nbsp;Run
            </Button>
          </div>
        </div>
      </Header>
    );
  }
}

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

  saveFile = () => {
    mainProcess
      .saveFile(this.state.path, this.state.initialCode, this.state.code)
      .then(responseJson => this.setState({ initialCode: this.state.code }))
      .catch(error =>
        notifyMe("ERROR Saving File", this.state.path + ": " + error)
      );
  };

  render(props, { path, height }) {
    var codeHeight = height * 0.7;
    return (
      <div class="window">
        <AppHeader onSave={this.saveFile} onRun={() => run(path)} />
        <div class="window-content">
          <div class="pane-group">
            <div class="pane pane-sm sidebar">
              <FilePicker onLoadFile={path => this.setState({ path: path })} />
            </div>
            <div class="pane">
              <CodeEditor
                path={path}
                onChange={code => this.setState({ code })}
                onLoad={initialCode =>
                  this.setState({ initialCode, code: initialCode })
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
