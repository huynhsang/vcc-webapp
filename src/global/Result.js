export default class Result {
	data: any;
	success: boolean;

	static builder(data: any, success: boolean): Result {
		let result = new Result();
		result.success = success;
		result.data = data;
		return result;
	}

	isSuccess(): boolean {
		return this.success;
	}
}