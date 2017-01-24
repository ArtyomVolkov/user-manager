import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Style
import * as style from './Page.styl';

class Page extends Component {
	constructor(props) {
		super(props);
		injectTapEventPlugin();
	}

	render() {
		const {props} = this;
		
		return (
			<div class={style['app-content']}>
				<header>{props.header}</header>
				<main>{props.content}</main>
				<footer>{props.footer}</footer>
			</div>
		)
	}
}

export default Page;