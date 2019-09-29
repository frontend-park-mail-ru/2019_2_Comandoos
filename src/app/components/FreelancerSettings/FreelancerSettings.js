import Component from '../../../spa/Component';
import template from './FreelancerSettings.handlebars';
import { htmlToElement } from '../../services/utils';

export class FreelancerSettings extends Component {
	constructor({ parent = document.body, ...props }) {
		super(props);
		this._parent = parent;
	}

	render() {
		return template({
			data: this.data,
			props: this.props,
		});
	}
}