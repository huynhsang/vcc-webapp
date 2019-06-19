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

    /**
     * The method is responsible for formatting string with arguments
     * @param text: a String need to format
     * @param args: an array of values will put to the text
     * @return {string} a formatted string
     */
    static
    formatString = function(text: string, args = []) {
        if (Array.isArray(args)) {
            for (let k in args) {
                text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), args[k]);
            }
        }
        return text;
    };
}