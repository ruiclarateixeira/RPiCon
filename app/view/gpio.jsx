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
        console.log(data);
      });
    }

    this.setState({ currentlyRunning: run });
  }

  render(props, { rows }) {
    return <div class="table">{rows}</div>;
  }
}
