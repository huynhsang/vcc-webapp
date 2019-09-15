const LANG_KEY_DEFAULT: string = "en";
const MALE_AVATAR_DEFAULT: string = "png/default/male.png";
const FEMALE_AVATAR_DEFAULT: string = "png/default/female.png";

const ROLE: Object = {
	ADMIN: "ROLE_ADMIN",
	MANAGER: "ROLE_MANAGER",
	MEMBER: "ROLE_MEMBER",
	GUEST: "ROLE_GUEST",
};

const REALM: Object = {
    admin: "admin_realm",
    user: "user_realm",
};

const CATEGORY: Object = {
    studying: "studying",
    working: "working",
    immigration: "immigration",
};

const COOKIE_KEYS: Object = {
    token: "xs",
    userId: "c_user",
};

export default class ApplicationConstant {
	static
	get langKeyDefault(): string {
		return LANG_KEY_DEFAULT;
	}

	static
	get maleAvatarDefault(): string {
		return MALE_AVATAR_DEFAULT;
	}

	static
	get femaleAvatarDefault(): string {
		return FEMALE_AVATAR_DEFAULT;
	}

	static
	get role(): Object {
		return ROLE;
	}

    static
    get realm(): Object {
        return REALM;
    }

    static
    get category(): Object {
        return CATEGORY;
    }

    static
    get cookieKeys(): Object {
        return COOKIE_KEYS;
    }
}
