import { h, textarea, div, render, Component } from "preact";
import { Header, Title, Button, ButtonGroup, NavGroup } from "preact-photon";
import { CodeEditor, FilePicker, TerminalOutput } from "./code.jsx";
import { notifyMe } from "./utils.js";
const { remote } = require("electron");
const mainProcess = remote.require("./app.js");

const HEADER_HEIGHT = 61;

class AppHeader extends Component {
  render({ onSave, onRun, onStop, running }, state) {
    if (running)
      var button = (
        <Button class="btn btn-large" onClick={onStop}>
          <span class="icon icon-stop" />&nbsp;Stop
        </Button>
      );
    else
      var button = (
        <Button class="btn btn-large" onClick={onRun}>
          <span class="icon icon-play" />&nbsp;Run
        </Button>
      );

    return (
      <Header>
        <Title>RPi Con</Title>
        <div class="toolbar-actions">
          <div class="btn-group pull-right">
            <Button class="btn btn-large" onClick={onSave}>
              <span class="icon icon-floppy" />&nbsp;Save
            </Button>
            {button}
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
      filePath: "",
      initialCode: "",
      currentCode: "",
      width: 0,
      height: 0,
      running: false
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
      .saveFile(
        this.state.filePath,
        this.state.initialCode,
        this.state.currentCode
      )
      .then(responseJson =>
        this.setState({ initialCode: this.state.currentCode })
      )
      .catch(error =>
        notifyMe("ERROR Saving File", this.state.filePath + ": " + error)
      );
  };

  render(props, { filePath, height, running }) {
    console.log(running);
    var codeHeight = height * 0.7;
    return (
      <div class="window">
        <AppHeader
          onSave={this.saveFile}
          onRun={() =>
            this.termout.run(
              filePath,
              token => this.setState({ token, running: true }),
              () => this.setState({ token: null, running: false })
            )
          }
          onStop={() => this.termout.stop(this.state.token)}
          running={running}
        />
        <div class="window-content">
          <div class="pane-group">
            <div class="pane pane-sm sidebar">
              <FilePicker
                onLoadFile={filePath => this.setState({ filePath })}
              />
            </div>
            <div class="pane">
              <CodeEditor
                path={filePath}
                onChange={currentCode => this.setState({ currentCode })}
                onLoad={initialCode =>
                  this.setState({ initialCode, currentCode: initialCode })
                }
                height={codeHeight.toString()}
              />
              <TerminalOutput
                height={height * 0.3}
                ref={instance => (this.termout = instance)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<RPiCon />, document.body);
