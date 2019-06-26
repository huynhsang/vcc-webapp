const HEADER_ACCEPT: string = "application/json";
const HEADER_CONTENT_TYPE: string = "application/json";

class Headers {
	Accept: string;
	'Content-Type': string;

	static build(accept: string, contentType: string): Headers {
        let headers = new Headers();
        headers.Accept = accept;
        headers["Content-Type"] = contentType;
		return headers;
	}
}

export default class AxiosConfig {
    headers: Headers;

    static getDefaultConfig(): AxiosConfig {
        let config = new AxiosConfig();
        config.headers = Headers.build(HEADER_ACCEPT, HEADER_CONTENT_TYPE);
        return config;
    }
}