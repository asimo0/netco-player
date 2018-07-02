/**
 * Created by aleksandrustinovic on 30.06.2018.
 */
import React from 'react';

const Toolbar = ({ playHandler, pauseHandler }) => {
	return <div className="toolbar">
		<button className="play" onClick={playHandler}>Play</button>
		<button className="pause" onClick={pauseHandler}>Pause</button>
	</div>
}

Toolbar.defaultProps = {
	playHandler: () => {},
	pauseHandler: () => {}
}

export default Toolbar;