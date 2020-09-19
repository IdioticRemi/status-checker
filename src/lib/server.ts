import { probe } from 'tcp-ping';
import { microsecTime, formatTime } from './utils';

export default class Server {

	public name: string;
	public ip: string;
	public port: number;

	public constructor(name: string, ip: string, port = 80) {
		this.name = name;
		this.ip = ip;
		this.port = port;
	}

	public async probe(): Promise<ServerResponse> {
		return new Promise(resolve => {
			const t = microsecTime();
			probe(this.ip, this.port, (err, available) => {
				if (err || !available) return resolve({ ...this.toJSON(), online: false, ping: null });
				return resolve({ ...this.toJSON(), online: true, ping: formatTime(microsecTime() - t) });
			});
		});
	}

	public toJSON(): ServerJSON {
		return {
			name: this.name,
			ip: this.ip,
			port: this.port
		};
	}

}

export interface ServerJSON {
	name: string;
	ip: string;
	port: number;
}

export interface ServerResponse {
	name: string;
	ip: string;
	port: number;
	online: boolean;
	ping: string | null;
}
