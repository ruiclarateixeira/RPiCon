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
      files: []
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

  render({ onLoadFile }, { path, files }) {
    if (!path.endsWith("/")) path += "/";

    return (
      <div>
        <input
          id="dirPath"
          type="text"
          value={path}
          onKeyUp={this.keyUp}
          onChange={this.handleInputChange}
        />
        <select id="files" size="10">
          {files.map(file => (
            <option
              onDblClick={() => {
                onLoadFile(path + file);
              }}
            >
              {file}
            </option>
          ))}
        </select>
      </div>
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

    console.log("Loading file");
    fetch("http://localhost:3000/file?path=" + path)
      .then(result => result.text())
      .then(code => {
        this.setState({ code, path });
        onLoad(code);
      });
  }

  render({ path, onChange }, { code }) {
    var options = {
      lineNumbers: true
    };
    return (
      <AceEditor
        mode="python"
        theme="github"
        id="codeArea"
        width="100%"
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
