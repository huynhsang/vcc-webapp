const HEADER_ACCEPT: string = "application/json";
const HEADER_CONTENT_TYPE: string = "application/json";

class Headers {
	Authorization: string;
	Accept: string;
	'Content-Type': string;

	static withOutAuthorizationbuilder(accept: string, contentType: string): Headers {
		let headers = new Headers();
		headers.Accept = accept;
		headers["Content-Type"] = contentType;
		return headers;
	}

	static builder(accept: string, contentType: string, id_token: string): Headers {
		let headers = Headers.withOutAuthorizationbuilder(accept, contentType);
		headers.Authorization = "Bearer " + id_token;
		return headers;
	}
}

export default class AxiosConfig {
    headers: Headers;

    static getDefaultConfigWithAuth(id_token: string): AxiosConfig {
        let config = new AxiosConfig();
        config.headers = Headers.builder(HEADER_ACCEPT, HEADER_CONTENT_TYPE, id_token);
        return config;
    }

    static getDefaultConfig(): AxiosConfig {
        let config = new AxiosConfig();
        config.headers = Headers.withOutAuthorizationbuilder(HEADER_ACCEPT, HEADER_CONTENT_TYPE);
        return config;
    }
}