import template from './index.handlebars';
import { htmlToElement } from '@modules/utils';
import Component from '@frame/Component';
import { enableValidationAndSubmit } from '@modules/form/formValidationAndSubmit';
import bus from '@frame/bus';
import TextField from '@components/inputs/TextField/TextField';
import FieldGroup from '@components/inputs/FieldGroup/FieldGroup';
import RadioGroup from '@components/inputs/RadioGroup/RadioGroup';
import Button from '@components/inputs/Button/Button';

const roles = [
	{
		value: '1',
		label: 'Найти исполнителя',
	},
	{
		value: '2',
		label: 'Работать фрилансером',
	},
];

class SignUpComponent extends Component {
	constructor({ ...props }) {
		super(props);

		this.helper = null;
		this.onSignupResponse = this.onSignupResponse.bind(this);
	}

	render() {
		const firstNameField = new TextField({
			required: true,
			type: 'text',
			label: 'Имя',
			placeholder: 'Введите Ваше имя',
			name: 'firstName',
			pattern: '^[А-Яа-яA-Za-z]{2,}$',
			title: 'Обычно имя так не выглядет. Это Ваше действительное имя?',
		});
		const secondNameField = new TextField({
			required: true,
			type: 'text',
			label: 'Фамилия',
			placeholder: 'Введите Вашу фамилию',
			name: 'secondName',
			pattern: '^[А-Яа-яA-Za-z]{2,}$',
			title:
				'Обычно фамилия так не выглядет. Это Ваша действительная фамилия?',
		});
		const emailField = new TextField({
			required: true,
			type: 'email',
			label: 'Электронная почта',
			placeholder: 'Электронная почта',
			name: 'email',
		});
		const passwordField = new TextField({
			required: true,
			type: 'password',
			label: 'Пароль',
			placeholder: 'Придумайте пароль',
			name: 'password',
		});
		const rolesRadio = new RadioGroup({
			items: roles,
			required: true,
			name: 'type',
		});
		const submitBtn = new Button({
			type: 'submit',
			text: 'Создать аккаунт',
		});

		this.data = {
			firstNameField: new FieldGroup({
				children: [firstNameField.render()],
				label: firstNameField.data.label,
			}).render(),
			secondNameField: new FieldGroup({
				children: [secondNameField.render()],
				label: secondNameField.data.label,
			}).render(),
			emailField: new FieldGroup({
				children: [emailField.render()],
				label: emailField.data.label,
			}).render(),
			passwordField: new FieldGroup({
				children: [passwordField.render()],
				label: passwordField.data.label,
			}).render(),
			rolesRadio: new FieldGroup({
				children: [rolesRadio.render()],
				label: 'Я хочу:',
				// two: true
			}).render(),
			submitBtn: new FieldGroup({
				children: [submitBtn.render()],
			}).render(),
		};

		this.html = template(this.data);
		// this._el = htmlToElement(html);
		// this._parent.appendChild(this._el);
		this.attachToParent();

		return this.html;
	}

	postRender() {
		// const form = this._el.getElementsByTagName('form')[0];
		const form = this.el.getElementsByTagName('form')[0];

		enableValidationAndSubmit(form, (helper) => {
			helper.event.preventDefault();
			this.helper = helper;
			bus.on('signup-response', this.onSignupResponse);
			bus.emit('signup', helper.formToJSON());
		});
	}

	onSignupResponse(data) {
		bus.off('signup-response', this.onSignupResponse);
		const { response, error } = data;
		if (error) {
			let text = error.message;
			if (error.data && error.data.error) {
				text = error.data.error;
			}
			this.helper.setResponseText(text);
			return;
		}

		this.props.router.push('/settings');
	}
}
export default SignUpComponent;
