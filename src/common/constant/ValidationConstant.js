const NAME_MIN_LENGTH: number = 5;
const DESCRIPTION_MIN_LENGTH: number = 10;

export default class ValidationConstant {
	static
	get defaultMinLength(): number {
		return NAME_MIN_LENGTH;
	}

	static
	get defaultDescriptionMinLength(): number {
		return DESCRIPTION_MIN_LENGTH;
	}
}