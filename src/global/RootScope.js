import type {User} from "../domain/User";
import AxiosConfig from "./AxiosConfig";
import PropTypes from "prop-types";

const APP_BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL;
const APP_API_URL: string = process.env.REACT_APP_API_URL;
const APP_STATIC_URL: string = process.env.REACT_APP_STATIC_URL;
const CONTEXT_TYPES_DEFAULT: Object = {
	router: PropTypes.object.isRequired
};

export default class RootScope {
	static currentUser: User;
	static token: string;
	static userId: number;
	static axiosDefaultConfig: AxiosConfig = AxiosConfig.getDefaultConfig();

	static
	get appBackendUrl(): string {
		return APP_BACKEND_URL;
	}

	static
	get appApiUrl(): string {
		return APP_API_URL;
	}

	static
	get appStaticUrl(): string {
		return APP_STATIC_URL;
	}

	static
	get contextTypesDefault(): Object {
		return CONTEXT_TYPES_DEFAULT;
	}
}