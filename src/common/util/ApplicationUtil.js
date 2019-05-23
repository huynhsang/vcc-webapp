import RootScope from "../../global/RootScope";

export default class ApplicationUtil {
	static
	getFullImageURL(suffixImageUrl: string = "") {
		if (suffixImageUrl.length === 0) return "";
		return RootScope.appStaticUrl + suffixImageUrl;
	}

	static
	isEmpty(obj: Object) {
		return Object.keys(obj).length === 0;
	}

	static
	getErrorMsg(error: any): string {
		if (error.data && error.data.length > 0) {
			return error.data;
		}
		return "Something went wrong!";
	}
}