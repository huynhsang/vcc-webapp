class SweetType {
	static SUCCESS: string = "success";
	static WARNING: string = "warning";
	static ERROR: string = "error";
	static INFO: string = "info";
	static INPUT: string = "input";
	static PROMPT: string = "prompt";
}

export default class SweetAlert {
	static show: () => {};
	static hide: () => {};
	show: boolean = false;
	title: string;
	type: string;
	text: string;
	showCancelButton: boolean;
	confirmButtonText: string;
	cancelButtonText: string;
	onConfirm: () => {};
	onCancel: () => {};

	constructor(show: boolean, title: string, type: string, text: string, showCancelButton: boolean,
				confirmButtonText: string, cancelButtonText: string, onConfirm: void, onCancel: void) {
		this.show = show;
		this.title = title;
		this.type = type;
		this.text = text;
		this.showCancelButton = showCancelButton;
		this.confirmButtonText = confirmButtonText;
		this.cancelButtonText = cancelButtonText;
		this.onConfirm = onConfirm;
		this.onCancel = onCancel;
	}

	static confirmAlertBuilder(title: string, type: string, text: string, confirmButtonText: string,
							   cancelButtonText: string, onConfirm: void, onCancel: void): SweetAlert {
		return new SweetAlert(true, title, type, text, true, confirmButtonText, cancelButtonText,
			onConfirm, onCancel);
	}

	static alertBuilder(title: string, type: string, text: string, confirmButtonText: string, onConfirm: void): SweetAlert {
		return new SweetAlert(true, title, type, text, false, confirmButtonText, null, onConfirm, null);
	}

	static hideBuilder(): SweetAlert {
		let alert = new SweetAlert();
		alert.title = "";
		return alert;
	}

	static successAlertBuilder(title: string, text: string): SweetAlert {
		return this.alertBuilder(title, SweetType.SUCCESS, text, "OK", this.hide);
	}

	static warningAlertBuilder(title: string, text: string): SweetAlert {
		return this.alertBuilder(title, SweetType.WARNING, text, "OK", this.hide);
	}

	static errorAlertBuilder(title: string, text: string): SweetAlert {
		return this.alertBuilder(title, SweetType.ERROR, text, "OK", this.hide);
	}

	static infoAlertBuilder(title: string, text: string): SweetAlert {
		return this.alertBuilder(title, SweetType.INFO, text, "OK", this.hide);
	}

	static warningConfirmAlertBuilder(title: string, text: string, confirmButtonText: string, onConfirm: void): SweetAlert {
		return this.confirmAlertBuilder(title, SweetType.WARNING, text, confirmButtonText, "Cancel", onConfirm, this.hide);
	}
}