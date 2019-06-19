const
	JWT_TOKEN_NAME: string = "xs";
const
    USER_ID_KEY: string = "c_user";
const
	MIN_EXDAY: number = 1;
const
	MAX_EXDAY: number = 14;

export default class CookieConstant {
	static
	get jwtTokenName(): string {
		return JWT_TOKEN_NAME;
	}

    static
    get userIdKey(): string {
        return USER_ID_KEY;
    }

	static
	get minExDay(): number {
		return MIN_EXDAY;
	}

	static
	get maxExDay(): number {
		return MAX_EXDAY;
	}
}