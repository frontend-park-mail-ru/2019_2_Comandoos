import Component from '@frame/Component';
import template from './Account.handlebars';
import { enableValidationAndSubmit } from '@modules/form/formValidationAndSubmit';
import { Avatar } from '@components/Avatar/Avatar';
import bus from '@frame/bus';
import FieldGroup from '@components/inputs/FieldGroup/FieldGroup';
import TextField from '@components/inputs/TextField/TextField';
import Button from '@components/inputs/Button/Button';
import './account.scss';

export class Account extends Component {
	constructor(props) {
		super(props);

		this.data = {
			// ...this._data,
			loaded: false,
		};

		this.onAccountReceived = this.onAccountReceived.bind(this);

		bus.on('account-get-response', this.onAccountReceived);
		bus.emit('account-get');

		this.helper = null;
	}

	render() {
		this._avatar = new Avatar({
			changing: true,
		});

		this._secondNameField = new TextField({
			required: true,
			name: 'secondName',
			type: 'text',
			label: 'Фамилия',
			placeholder: 'Ваша фамилия',
			maxlength: '20',
			pattern: '^[А-Яа-яA-Za-z]{2,}$',
			title:
				'Обычно фамилия так не выглядит. Это Ваша настоящая фамилия?',
			value: this.data.user ? this.data.user.secondName : '',
		});
		this._firstNameField = new TextField({
			required: true,
			name: 'firstName',
			type: 'text',
			label: 'Имя',
			placeholder: 'Ваше имя',
			maxlength: '20',
			pattern: '^[А-Яа-яA-Za-z]{2,}$',
			title: 'Обычно имя так не выглядит. Это Ваше настоящая имя?',
			value: this.data.user ? this.data.user.firstName : '',
		});
		this._emailField = new TextField({
			required: true,
			name: 'email',
			type: 'email',
			label: 'E-mail',
			placeholder: 'Ваш e-mail',
			value: this.data.user ? this.data.user.email : '',
		});
		this._submitBtn = new Button({
			type: 'submit',
			text: 'Сохранить изменения',
		});

		this.data = {
			secondNameField: new FieldGroup({
				children: [this._secondNameField.render()],
				label: 'Фамилия',
			}).render(),
			firstNameField: new FieldGroup({
				children: [this._firstNameField.render()],
				label: 'Имя',
			}).render(),
			emailField: new FieldGroup({
				children: [this._emailField.render()],
				label: 'E-mail',
			}).render(),
			submitBtn: new FieldGroup({
				children: [this._submitBtn.render()],
			}).render(),
			profileAvatar: this._avatar.render(),
		};

		this.html = template({
			...this.data,
			...this.props,
		});

		return this.html;
	}

	postRender() {
		super.postRender();

		this._avatar.postRender();

		const form = this._el.querySelector('#mainSettingsForm');
		enableValidationAndSubmit(form, (helper) => {
			helper.event.preventDefault();

			this.helper = helper;

			bus.on('account-put-response', this.onAccountPutResponse);
			bus.emit('account-put', helper.formToJSON());
		});
	}

	onAccountReceived(response) {
		response
			.then((res) => {
				this.data = {
					user: { ...res },
				};
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				this.data = {
					...this.data,
					loaded: true,
				};
				this.stateChanged();
			});
	}

	onAccountPutResponse = (response) => {
		bus.off('account-put-response', this.onAccountPutResponse);
		response
			.then((res) => {
				this.helper.setResponseText('Изменения сохранены.', true);
			})
			.catch((error) => {
				let text = error.message;
				if (error.data && error.data.error) {
					text = error.data.error;
				}
				this.helper.setResponseText(text);
			});
	};
}
