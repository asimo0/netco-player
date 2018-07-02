/**
 * Created by aleksandrustinovic on 30.06.2018.
 */
import React, { PureComponent } from 'react';
import Toolbar from './Toolbar';
import Progressbar from './Progressbar';
import './Player.css';

class Player extends PureComponent {

	video = null
	progressbar = null

	state = {
		canPlay: false
	}
	
	constructor(props) {
		super(props);

		this.playAction = this.playAction.bind(this);
		this.pauseAction = this.pauseAction.bind(this);
		this.progressHandler = this.progressHandler.bind(this);
		this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
		this.canPlayHandler = this.canPlayHandler.bind(this);
		this.jumpHandler = this.jumpHandler.bind(this);
	}

	playAction() {
		this.video.play();
	}

	pauseAction() {
		this.video.pause();
	}

	progressHandler() {
		const duration =  this.video.duration;
		if (duration > 0) {
			for (var i = 0; i < this.video.buffered.length; i++) {
				if (this.video.buffered.start(this.video.buffered.length - 1 - i) < this.video.currentTime) {
					let loadedPct = (this.video.buffered.end(this.video.buffered.length - 1 - i) / duration) * 100;
					this.progressbar.setState({ loadedPct });
					break;
				}
			}
		}
	}

	timeUpdateHandler() {
		let duration = this.video.duration, currentTime = this.video.currentTime;
		let playedPct = (currentTime / duration) * 100;
		this.progressbar.setState({ playedPct, currentTime });
	}
	
	canPlayHandler() {
		const canPlay = true;
		this.setState({ canPlay });
	}
	
	jumpHandler(time) {
		this.video.currentTime = time;
	}

	render() {
		return <div className="player-container">
			<video
				onProgress={this.progressHandler}
				onTimeUpdate={this.timeUpdateHandler}
				onCanPlay={this.canPlayHandler}
				ref={node => this.video = node}
				src="https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4">
			</video>
			{this.state.canPlay &&
				<div>
					<Progressbar duration={this.video.duration} jumpHandler={this.jumpHandler} ref={node => this.progressbar = node} />
					<Toolbar playHandler={this.playAction} pauseHandler={this.pauseAction} />
				</div>
			}
		</div>
	}
}

export default Player;