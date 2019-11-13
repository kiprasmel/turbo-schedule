export interface IEmail {
	created?: string;
	ip?: string;
	email?: string;
}

export class Email implements IEmail {
	created: string = "";
	ip: string = "";
	email: string = "";

	constructor(data?: IEmail) {
		Object.assign(this, data);
	}
}
