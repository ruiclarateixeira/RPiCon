import { h, Component } from "preact";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/github";
import { notifyMe } from "./utils";
const { remote } = require("electron");
const mainProcess = remote.require("./app.js");

const ENTER_KEY_CODE = 13;

/**
 * FilePicker - Browse files on disk
 */
export class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: mainProcess.getArgv(2) == null ? "/" : mainProcess.getArgv(2),
      files: [],
      selected: ""
    };

    this.loadFiles(this.state.inputValue);
  }

  /**
   * Load files from a given path and set {files, path, inputValue}
   */
  loadFiles = path => {
    mainProcess
      .listDirectory(path)
      .then(files => this.setState({ files, path, inputValue: path }))
      .catch(error => notifyMe("ERROR Loading File ", path + ": " + error));
  };

  /**
   * Handle key press on the input
   * Enter - load files in path
   */
  keyUp = event => {
    if (event.keyCode == ENTER_KEY_CODE) {
      var path = this.state.inputValue;
      if (!path.endsWith("/")) path += "/";
      this.loadFiles(path);
    }
  };

  /**
   * When input changes update {inputValue}
   */
  handleInputChange = event =>
    this.setState({ inputValue: event.target.value });

  /**
   * Load item from file list
   * if item is a directory it will just load the files in directory
   * else it will callback with the full path to the item
   */
  loadItem = (name, callback) => {
    var fullPath = this.state.path + name;
    mainProcess
      .getFileStats(fullPath)
      .then(stats => {
        if (stats.isDirectory) this.loadFiles(fullPath + "/");
        else callback(fullPath);
      })
      .catch(error =>
        notifyMe("ERROR Getting file metadata", fullPath + ": " + error)
      );
  };

  /**
   * Get the class for an item in the list
   */
  getItemClass = file => {
    var className = "list-group-item";
    if (this.state.selected == file) className += " Active";

    return className;
  };

  render({ onLoadFile }, { inputValue, files }) {
    return (
      <ul class="list-group">
        <li class="list-group-header">
          <input
            class="form-control"
            type="text"
            value={inputValue}
            placeholder="Path"
            onKeyUp={this.keyUp}
            onChange={this.handleInputChange}
          />
        </li>

        {files.map(file => (
          <li
            onDblClick={() => this.loadItem(file, onLoadFile)}
            onClick={() => this.setState({ selected: file })}
            className={this.getItemClass(file)}
          >
            {file}
          </li>
        ))}
      </ul>
    );
  }
}

/**
 * CodeEditor - Edit files
 */
export class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "", path: "" };
  }

  /**
   * Ensures the files get loaded when the path changes
   * @param {*Object} props {path to file, onLoad function when the file is loaded from disk}
   * @param {*Object} state {code in the editor}
   */
  componentWillReceiveProps({ path, onLoad }, { code }) {
    if (path == this.state.path) return;

    mainProcess
      .getFile(path)
      .then(code => {
        this.setState({ code, path });
        onLoad(code);
      })
      .catch(error => notifyMe("ERROR Loading file", path + ": " + error));
  }

  render({ path, onChange, height }, { code }) {
    var options = {
      lineNumbers: true
    };
    return (
      <AceEditor
        mode="python"
        theme="github"
        id="codeArea"
        width="100%"
        height={height}
        value={code}
        onChange={code => {
          this.setState({ code });
          onChange(code);
        }}
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}

export class TerminalOutput extends Component {
  /**
   * Append data into the output
   * @param {*String} data to append
   */
  appendContent = data => {
    var current = this.state.content == null ? "" : this.state.content;
    this.setState({ content: current + data });
  };

  /**
   * Start process and callback when pocess is start
   * NOTE: This is meant to be called from the parent
   * @param {*String} path Full absolute path to file
   * @param {*Function} onStart function to run when process is successfully started
   * @param {*Function} onStop function to run when process is successfully stopped
   */
  run = (path, onStart, onStop) => {
    this.setState({ path: path, content: null });
    var token = mainProcess.runPython(path);
    mainProcess.runProcessForToken(token, this.appendContent, onStop);
    onStart(token);
  };

  /**
   * Stop process
   * @param {*String} token that uniquely identifies the process in the app
   */
  stop = token => {
    mainProcess.stopProcessForToken(token);
  };

  render({ height }, { content }) {
    return (
      <div>
        <p
          id="termout-title"
          style={{ height: height * 0.15, marginTop: height * 0.05 }}
        >
          Console Output
        </p>
        <div id="termout" style={{ height: height * 0.8 }}>
          <pre style={{ margin: 0 }}>{content}</pre>
        </div>
      </div>
    );
  }
}
