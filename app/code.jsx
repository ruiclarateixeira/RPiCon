import { h, Component } from "preact";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/github";

const ENTER_KEY_CODE = 13;

export class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: "/",
      files: [],
      selected: ""
    };
    this.loadFiles();
  }

  loadFiles = () => {
    fetch("http://localhost:3000/dir?path=" + this.state.path)
      .then(result => result.json())
      .then(files => this.setState({ files }));
  };

  keyUp = event => {
    if (event.keyCode == ENTER_KEY_CODE) {
      this.loadFiles();
    }
  };

  handleInputChange = event => {
    this.setState({ path: event.target.value });
  };

  select = file => {
    this.setState({ selected: file });
  };

  getItemClass = file => {
    var className = "list-group-item";
    if (this.state.selected == file) className += " Active";

    return className;
  };

  render({ onLoadFile }, { path, files }) {
    if (!path.endsWith("/")) path += "/";

    return (
      <ul class="list-group">
        <li class="list-group-header">
          <input
            class="form-control"
            type="text"
            value={path}
            placeholder="Path"
            onKeyUp={this.keyUp}
            onChange={this.handleInputChange}
          />
        </li>

        {files.map(file => (
          <li
            class=""
            onDblClick={() => {
              onLoadFile(path + file);
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
