import { h, Component } from "preact";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/github";
import { notifyMe } from "./utils.js";

const ENTER_KEY_CODE = 13;

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
    fetch("http://localhost:3000/dir?path=" + path)
      .then(result => result.json())
      .then(files => {
        this.setState({ files, path, inputValue: path });
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        notifyMe("Failed to load " + path);
      });
  };

  keyUp = event => {
    if (event.keyCode == ENTER_KEY_CODE) {
      var path = this.state.inputValue;
      if (!path.endsWith("/")) path += "/";
      this.loadFiles(path);
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  select = file => {
    this.setState({ selected: file });
  };

  loadItem = (name, callback) => {
    var fullPath = this.state.path + name;
    fetch("http://localhost:3000/file/meta?path=" + fullPath)
      .then(result => result.json())
      .then(stats => {
        if (stats.isDirectory) this.loadFiles(fullPath + "/");
        else callback(fullPath);
      });
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
            onDblClick={() => {
              this.loadItem(file, onLoadFile);
            }}
            onClick={() => this.select(file)}
            className={this.getItemClass(file)}
          >
            {file}
          </li>
        ))}
      </ul>
    );
  }
}

export class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "", path: "" };
  }

  componentWillReceiveProps({ path, onLoad }, { code }) {
    if (path == this.state.path) return;

    fetch("http://localhost:3000/file?path=" + path)
      .then(result => result.text())
      .then(code => {
        this.setState({ code, path });
        onLoad(code);
      });
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
