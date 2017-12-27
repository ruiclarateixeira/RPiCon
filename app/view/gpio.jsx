import { h, div, Component } from "preact";
const { remote } = require("electron");
const mainProcess = remote.require("./app.js");

class GPIOPin extends Component {
  directionFromEnum(e) {
    switch (e) {
      case 1:
        return "I";
      case 2:
        return "I";
      default:
        throw "Unexpected direction";
    }
  }

  render({ index, pin }, state) {
    var pinClass = index % 2 == 0 ? "pin-left" : "pin-right";
    var pinHead =
      pin.direction == null ? "" : this.directionFromEnum(pin.direction);
    return (
      <div class={"pin " + pinClass}>
        <div class="pin-name">{pin.name}</div>
        <div class="pin-dig">{pinHead}</div>
      </div>
    );
  }
}

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
      contents.push(<GPIOPin index={contents.length} pin={element} />);
    });
    return <div class="pins">{contents}</div>;
  }
}
