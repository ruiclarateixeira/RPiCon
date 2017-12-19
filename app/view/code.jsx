import { h, Component } from "preact";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/github";
import { notifyMe } from "./utils.js";
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
      inputValue: "/",
      files: [],
      selected: ""
    };
    this.loadFiles("/");
  }

  loadFiles = path => {
    mainProcess
      .listDirectory(path)
      .then(files => this.setState({ files, path, inputValue: path }))
      .catch(error => notifyMe("ERROR Loading File ", path + ": " + error));
  };

  keyUp = event => {
    if (event.keyCode == ENTER_KEY_CODE) {
      var path = this.state.inputValue;
      if (!path.endsWith("/")) path += "/";
      this.loadFiles(path);
    }
  };

  handleInputChange = event =>
    this.setState({ inputValue: event.target.value });

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
            class=""
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
