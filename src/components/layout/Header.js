import React, {Component} from 'react';
import {hashHistory} from 'react-router';
// components
import {AppBar, Drawer, MenuItem, Divider} from 'material-ui';
import ActionToc from 'material-ui/svg-icons/action/toc';
import ActionHttp from 'material-ui/svg-icons/action/http';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drawerOpen: false
		};
	}

	drawerHandleToggle = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		});
	};

	navigateTo(page) {
		this.handleClose();
		if (hashHistory.getCurrentLocation().pathname !== page) {
			hashHistory.push(page);
		}
	}

	handleClose = () => {
		this.setState({drawerOpen: false});
	};
	
	render() {
		const style = {
			icon: {
				textAlign: 'center',
				verticalAlign: 'middle',
				marginRight: 10
			},
			label: {
				verticalAlign: 'middle'
			}
		};

		return (
			<AppBar title="User Manager" onLeftIconButtonTouchTap={this.drawerHandleToggle}>
				<Drawer
					docked={false}
					width={200}
					open={this.state.drawerOpen}
					onRequestChange={(open) => this.setState({open})}>
					<MenuItem onTouchTap={this.navigateTo.bind(this, '/api')}>
						<ActionHttp style={style.icon} />
						<span style={style.label}>GraphQL API</span>
					</MenuItem>
					<MenuItem onTouchTap={this.navigateTo.bind(this, '/dashboard')}>
						<ActionToc style={style.icon} />
						<span style={style.label}>Dashboard</span>
					</MenuItem>
					<Divider />
					<MenuItem disabled={true}>
						<ActionSettings style={style.icon} />
						<span style={style.label}>Settings</span>
					</MenuItem>
				</Drawer>
			</AppBar>
		)
	}
}

export default Header;
