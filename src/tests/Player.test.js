/**
 * Created by aleksandrustinovic on 01.07.2018.
 */
import React from 'react';
import Player from '../components/Player';
import Toolbar from '../components/Toolbar';
import Progressbar from '../components/Progressbar';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Test Player component with sub components', () => {

	test('Test Toolbar component', () => {
		const wrapper = mount(
			<Toolbar />
		);
		expect(wrapper.find('button.play').text()).toEqual('Play');
		expect(wrapper.find('button.pause').text()).toEqual('Pause');
	});

	test('Test Progressbar component', () => {
		const wrapper = mount(<Progressbar />)

		expect(wrapper.find('.loaded')).toHaveLength(1);
		expect(wrapper.find('.played')).toHaveLength(1);
		expect(wrapper.find('.time-container')).toHaveLength(1);
		expect(wrapper.find('.current').text()).toMatch(/\d\d:\d\d:\d\d/);
		expect(wrapper.find('.duration').text()).toMatch(/\d\d:\d\d:\d\d/);
	});

	test('Test Player component', () => {
		const wrapper = mount(<Player />);

		wrapper.setState({canPlay: true});

		const toolbarWrapper = wrapper.find(Toolbar), progressbarWrapper = wrapper.find(Progressbar), videoWrapper = wrapper.find('video');

		expect(toolbarWrapper).toHaveLength(1);
		expect(progressbarWrapper).toHaveLength(1);

		toolbarWrapper.find('button.play').simulate('click');
		expect(progressbarWrapper.find('.loaded').offsetWidth).not.toBe(0);
		expect(progressbarWrapper.find('.played').offsetWidth).not.toBe(0);
		expect(videoWrapper.currentTime).not.toBe(0);

		let pausedWidth, pausedTime;
		new Promise((res, rej) => {
			toolbarWrapper.find('button.pause').simulate('click');
			pausedWidth = progressbarWrapper.find('.loaded').offsetWidth;
			pausedTime = videoWrapper.currentTime;
			setTimeout(() => {
				res(progressbarWrapper.find('.loaded').offsetWidth, videoWrapper.currentTime);
			}, 1000);
		})
		.then((width, time) => {
			expect(width).toEqual(pausedWidth);
			expect(time).toEqual(pausedWidth);
		})
	});

});