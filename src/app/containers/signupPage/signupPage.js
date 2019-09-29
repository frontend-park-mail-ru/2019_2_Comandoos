import template from './index.handlebars';
import { htmlToElement } from '../../services/utils';
import AjaxModule from '../../services/ajax';
import Component from '../../../Spa/Component';
import config from '../../config';

class SignUpComponent extends Component {
	constructor({ parent = document.body, ...props }) {
		super(props);
		this.props = props;
		this._parent = parent;
		this._data = {};
		this._el = null;
	}

	render() {
		const html = template(this.data);
		this._el = htmlToElement(html);
		this._parent.appendChild(this._el);
	}

	postRender() {
		const form = this._el.getElementsByTagName('form')[0];

		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			// const email = form.elements['email'].value;
			// const firstName = form.elements['firstName'].value;
			// const lastName = form.elements['lastName'].value;
			// const password = form.elements['password'].value;
			const object = {};
			formData.forEach((value, key) => {
				if (!object.hasOwnProperty(key)) {
					object[key] = value;
					return;
				}
				if (!Array.isArray(object[key])) {
					object[key] = [object[key]];
				}
				object[key].push(value);
			});

			AjaxModule.post(config.urls.signUp, object)
				.then((response) => {
					this.props.router.push('/settings/');
				})
				.catch((error) => {
					alert(error);
				});
		});
	}
}
export default SignUpComponent;
