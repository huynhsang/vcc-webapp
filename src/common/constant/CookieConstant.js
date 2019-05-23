const
	JWT_TOKEN_NAME: string = "xs";
const
	MIN_EXDAY: number = 1;
const
	MAX_EXDAY: number = 7;

export default class CookieConstant {
	static
	get jwtTokenName(): string {
		return JWT_TOKEN_NAME;
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