import { h, div, Component } from "preact";
const { remote } = require("electron");
const mainProcess = remote.require("./app.js");

/**
 * Interactive GPIO Debug
 */
export class GPIODebug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyRunning: false,
      rows: []
    };
  }

  /**
   * Try to connect when a script is running
   */
  componentWillReceiveProps({ run }, { currentlyRunning }) {
    if (run && !currentlyRunning) {
      mainProcess.connectToDebugSocket(data => {
        var splits = data.split("\n").filter(item => item.length > 0);
        for (var splitIx in splits) {
          var split = JSON.parse(splits[splitIx]);
          var rows = [];
          for (var index in split) rows.push(split[index]);
          this.setState({ rows });
        }
      });
    }

    this.setState({ currentlyRunning: run });
  }

  render(props, { rows }) {
    var contents = [];
    rows.forEach(element => {
      contents.push(<div class="pin">{element.name}</div>);
    });
    return <div class="table">{contents}</div>;
  }
}
