import AxiosConfig from "../../../global/AxiosConfig";
import axios from "axios";
import Result from "./../../../global/Result";

export default class BasicService {

	static
	get(url: string, config: AxiosConfig): Result {
		return axios.get(url, config)
			.then((result) => {
				return Result.builder(result.data, true);
			}).catch((err) => {
				return Result.builder(err.response, false);
			})
	}

	static
	post(url: string, data: any, config: AxiosConfig): Result {
		return axios.post(url, data, config)
			.then((result) => {
				return Result.builder(result.data, true);
			}).catch((err) => {
				return Result.builder(err.response, false);
			})
	}

	static
	put(url: string, data: any, config: AxiosConfig): Result {
		return axios.put(url, data, config)
			.then((result) => {
				return Result.builder(result.data, true);
			}).catch((err) => {
				return Result.builder(err.response, false);
			})
	}

	static
	delete(url: string, config: AxiosConfig): Result {
		return axios.delete(url, config)
			.then((result) => {
				return Result.builder(result.data, true);
			}).catch((err) => {
				return Result.builder(err.response, false);
			})
	}

	static
	buildURLWithToken(url: string, token): string {
		return `${url}?access_token=${token}`
	}
}
