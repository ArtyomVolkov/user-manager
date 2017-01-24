import React, {Component} from 'react';

import * as style from './Footer.styl';

class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class={style.title}>
				<span>Footer</span>
			</div>
		)
	}
}

export default Footer;
