import {Component} from 'react';

export default class BasicComponent extends Component {
	changeStateValue(stateName: string, value: any): void {
		this.setState({
			[stateName]: value
		})
	}

	changeStateValues(changingList: Map): void {
		let changes = {};
		changingList.forEach((value, key) => {
			changes[key] = value;
		});
		this.setState(changes);
	}

	setRefsValue(keyName: string, value): any {
		return this.refs[keyName].value = value;
	}

	getDataFromState(keyName: string): any {
		return this.state[keyName];
	}

	getDataFromProps(keyName: string): any {
		return this.props[keyName];
	}

	handleBeforeTheFirstRender(): void {
	}

	handleAfterTheFirstRender(): void {
	}

	handleBeforeRendering(): void {
	}

	handleAfterRendering(): void {
	}

	handleAfterComponentIsUnmounted(): void {
	}

	componentWillMount() {
		this.handleBeforeTheFirstRender();
	}

	componentDidMount() {
		this.handleAfterTheFirstRender();
	}

	componentWillUpdate() {
		this.handleBeforeRendering();
	}

	componentDidUpdate() {
		this.handleAfterRendering();
	}

	componentWillUnmount() {
		this.handleAfterComponentIsUnmounted();
	}

	redirectTo(path: string): void {
		this.props.history.push(path);
	}

	forceUpdate(): void {
		this.forceUpdate();
	}
}