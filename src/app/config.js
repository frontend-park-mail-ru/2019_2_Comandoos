export default {
	baseAPIUrl: 'http://localhost:8080',
	// cookieAccountModeName: 'account_mode',
	cookieAccountModeName: 'user_type',
	urls: {
		account: '/private/account',
		notificationSettings: '/private/account/settings/notifications',
		login: '/login',
		signUp: '/signup',
		logout: '/private/logout',
		settings: '/settings',
		jobs: '/private/jobs',
		roles: '/private/roles',
		private: '/private',
		changePassword: '/private/account/settings/password',
		authHistory: '/private/account/settings/auth-history',
		company: '/company',
		freelancers: '/freelancers',
	},
	accountTypes: {
		client: 'client',
		freelancer: 'freelancer',
	},
};
