import { h, Component } from "preact";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/github";

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

  render({ onLoadFile }, { path, files }) {
    if (!path.endsWith("/")) path += "/";

    return (
      <div id="fileSelection">
        <input id="dirPath" type="text" value={path} />
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
  render({ code }, state) {
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
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}
