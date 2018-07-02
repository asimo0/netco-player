/**
 * Created by aleksandrustinovic on 30.06.2018.
 */
import React, { PureComponent } from 'react';

class Progressbar extends PureComponent {

	container = null

	state = {
		loadedPct: 0,
		playedPct: 0,
		currentTime: 0
	}
	
	constructor(props) {
		super(props);

		this.clickHandler = this.clickHandler.bind(this);
	}

	timeFormat(sec) {
		const sec_num = parseInt(sec, 10); // don't forget the second param
		let hours   = Math.floor(sec_num / 3600),
			minutes = Math.floor((sec_num - (hours * 3600)) / 60),
			seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours+':'+minutes+':'+seconds;
	}

	clickHandler(e) {
		const time = this.props.duration * ((e.pageX - this.container.offsetLeft) / this.container.offsetWidth);
		this.props.jumpHandler(time);
	}
	
	render() {
		return <div ref={node => this.container = node} className="progressbar" onClick={this.clickHandler}>
			<div className="loaded" style={{width: this.state.loadedPct + '%'}}></div>
			<div className="played" style={{width: this.state.playedPct + '%'}}></div>
			<div className="time-container">
				<span className="current">{this.timeFormat(this.state.currentTime)}</span> / <span className="duration">{this.timeFormat(this.props.duration)}</span>
			</div>
		</div>
	}
}

Progressbar.defaultProps = {
	duration: 0,
	jumpHandler: () => {}
}

export default Progressbar;