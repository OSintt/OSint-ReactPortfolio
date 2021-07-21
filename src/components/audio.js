import React from 'react';
import audio from '../assets/cro-rockiando.mp3';
import ReactHowler from 'react-howler'
import Slide from 'react-reveal/Slide';

export default class Audio extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      playing: false
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  handlePlay () {
    this.setState({
      playing: true
    });
  }

  handlePause () {
    this.setState({
      playing: false
    });
  }

  render () {
    const { location } = this.props;
    return (
      <div>
        <ReactHowler
          src={[audio]}
          playing={this.state.playing}
          volume={0.05}
        />
        <Slide left>
          <button className={location.pathname === "/" ? "audio": "display-none"} onClick={this.state.playing ? this.handlePause : this.handlePlay}><code>🍭 <span>Play/Stop</span></code></button>
        </Slide>
      </div>
    )
  }
}