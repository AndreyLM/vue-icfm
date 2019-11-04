import Vue from 'vue'
import VueI18n from 'vue-i18n'
import FlagIcon from 'vue-flag-icon'

Vue.use(VueI18n)
Vue.use(FlagIcon)

/**
 * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} an overall amount of available choices
 * @returns a final choice index to select plural word by
 **/
VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
	// this === VueI18n instance, so the locale property also exists here
	if (this.locale !== 'uk') {
		// proceed to the default implementation
	}

	if (choice === 0) {
		return 0;
	}

	const teen = choice > 10 && choice < 20;
	const endsWithOne = choice % 10 === 1;

	if (!teen && endsWithOne) {
		return 1;
	}

	if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
		return 2;
	}

	return (choicesLength < 4) ? 2 : 3;
}

const messages = {
    'en': {
		//for testing {{ $t('test') }}
		test: "¯\\_(ツ)_/¯",
		system: {
			columns: 'Columns',
			settings: 'Settings',
			actions: 'Actions',
			edit: "Edit",
			save: "Save",
		},
		administration: "Administration",
		alert: {
			title: "Wrong data",
			text: "Please enter valid data",
			undefined: {
				error: "Undefined error",
				status: "Undefined status",
			},
		},
		article: {
			articles: "Articles",
			import: "Import",
			languages: "Languages",
			settings: "settings",
		},
		register: {
			list: "Register list",
			id: "ID",
			name: "Code",
			title: "Name",
			description: "Description",
			is_enabled: "Enabled", 
			is_active: "Active"
		},
        buttons: {
            add: "Add",
			cancel: "Cancel",
			clear: "Clear",
			login: "Login",
			registration: "Registration",
			reset: "Reset",
			save: "Save",
        },
		errors: {
			equal: "Fields not equal",
			maxLength: {
				email: "Too many emails",
				phones: "Too many phone numbers",
			},
			minLength: "Min length must be one symbol | Min length must be {n} symbols",
			required: "The field is required",
		},
		form: {
			title: {
				edit: "Edit",
				emails: "Emails",
				list: "List",
				login:"Login Form",
				phones: "Phones",
				rbac: "RBAC Manager",
				registration: "Registration",
				roleNew: "New role",
				user: {
					info: "User Info",
					manager: "User Manager",
					profile: "User Profile",
				},
			},
			label: {
				actions: "Actions",
				active: "Active",
				code: "Code",
				confirmPassword: "Confirm Password",
				description: "Description",
				email: "Email",
				firstName: "First Name",
				fullName: "Full name",
				isActive: "Is Active",
				lastName: "Last Name",
				language: "Language",
				login: "Login",
				loginOrEmail: "Login or email",
				middleName: "Middle Name",
				password: "Password",
				phone: "Phone",
				permission: "Permission | Permissions",
				role: "Role | Roles",
				roleName: "Role name",
				search: "Search",
				title: "Title",
				user: "User",
			},
		},
		profile: "Profile",
		logout: "Logout",
		rbac: "RBAC",
		siteName: "Library",
        users: "Users",
    },


    'uk': {
		//for testing {{ $t('test') }}
		test: "¯\\_(ツ)_/¯",
		system: {
			columns: 'Колонки',
			settings: 'Налаштування',
			actions: 'Дії',
			edit: "Редагувати",
			save: "Зберегти",
		},
		administration: "Управління",
		alert: {
			title: "Невірні дані",
			text: "Будь ласка, перевірте дані",
			undefined: {
				error: "Невідома помилка",
				status: "Невідомий статус",
			},
		},
		article: {
			articles: "Статті",
			import: "Імпорт",
			languages: "Мови статтей",
			settings: "Налаштування",
		},
		register: {
			list: "Список реєстрів",
			id: "Ід",
			name: "Код",
			title: "Назва",
			description: "Опис",
			is_enabled: "Призупинений", 
			is_active: "Активний"
		},
		buttons: {
            add: "Додати",
			cancel: "Скасувати",
			clear: "Очистити",
			login: "Ввійти",
			registration: "Реєстрація",
			reset: "Скинути",
			save: "Зберегти",
		},
		errors: {
			equal: "Данні не співпадають",
			maxLength: {
				email: "Забагато електронних адрес",
				phone: "Забагато номерыв телофонів",
			},
			minLength: "Мінімальна довжина не становить жодного символа | Мінімальна довжина становить один символ | Мінімальна довжина становить {n} символи | Мінімальна довжина становить {n} символів",
			required: "Поле обов'язкове",
		},
		form: {
			title: {
				edit: "Редагувати",
				emails: "Пошта",
				list: "Список",
				login:"Форма входу",
				phones: "Телефони",
				rbac: "Менеджер RBAC",
				registration: "Реєстрація",
				roleNew: "Нова роль",
				user: {
					info: "Інформація про користувача",
					manager: "Менеджер користувачів",
					profile: "Профіль користувача",
				},
			},
			label: {
				actions: "Дії",
				active: "Статус",
				code: "Код",
				confirmPassword: "Підтвердьте пароль",
				description: "Опис",
				email: "Пошта",
				firstName: "Ім'я",
				fullName: "Повне ім'я",
				isActive: "Активовано",
				lastName: "Прізвище",
				language: "Мова",
				login: "Логін",
				loginOrEmail: "Логін або пошта",
				middleName: "По батькові",
				password: "Пароль",
				phone: "Телефон",
				permission: "Доступ | Доступи",
				role: "Роль | Ролі",
				roleName: "Назва ролі",
				search: "Пошук",
				title: "Назва",
				user: "Користувач",
			},
		},
		profile: "Профіль",
		logout: "Вихід",
		rbac: "RBAC",
		siteName: "Бібліотека",
        users: "Користувачі",
    },
}

const i18n = new VueI18n({
    locale: 'uk',
    fallbackLocale: 'en',
    messages
})

export default i18n
