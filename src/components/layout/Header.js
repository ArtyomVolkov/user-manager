import React, {Component} from 'react';
// components
import {AppBar} from 'material-ui';

class Header extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<AppBar title="User Manager" />
		)
	}
}

export default Header;
