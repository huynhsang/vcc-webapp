import type {Event} from "../../domain/Event";

function dayDiff(first: Date, second: Date): number {
	return Math.round((second-first)/(1000*60*60*24));
}

export default class EventUtil {
	static getPercentCountdown(event: Event): number {
		const createdDate: Date = new Date(event.createdDate);
		const endDate: Date = new Date(event.endDatetime);
		const currentDate: Date = new Date();
		return Math.round((dayDiff(createdDate, currentDate)/dayDiff(createdDate, endDate))*100);
	}
}