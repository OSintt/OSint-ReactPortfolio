import React from 'react';
import audio from '../assets/cro-rockiando.mp3';
import ReactHowler from 'react-howler'

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
    return (
      <div>
        <ReactHowler
          src={[audio]}
          playing={this.state.playing}
          volume={0.05}
        />
        <button className="audio" onClick={this.state.playing ? this.handlePause : this.handlePlay}><code>🍭 <span>Play/Stop</span></code></button>
      </div>
    )
  }
}