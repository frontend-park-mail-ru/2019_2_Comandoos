import Component from '../../../spa/Component';
import template from './index.handlebars';
import { htmlToElement } from '../../services/utils';

export class Profile extends Component {
	constructor({ parent = document.body, ...props }) {
		super(props);
		this._parent = parent;
	}

	render() {
		const html = template(this.data);
		this._el = htmlToElement(html);
		this._parent.appendChild(this._el);
	}
}