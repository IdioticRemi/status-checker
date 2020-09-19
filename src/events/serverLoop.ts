import { TextChannel } from 'discord.js';
import * as moment from 'moment';

import { Event } from '@lib/event';
import { CustomClient } from '@lib/client';
import { servers, header, channelID, messageID, footer, serverTextOnline, serverTextOffline, categoryText } from '@root/config';
import Server, { ServerResponse } from '@lib/server';

moment.locale('fr');

export default class extends Event {

	public constructor(client: CustomClient, name: string) {
		super(client, name, {});
	}

	public async run() {
		const entries = servers.entries();

		let message = `${this.fill(header)}\n\n`;
		for (let i = 0; i < servers.size; i++) {
			const category: Array<any> = entries.next().value;
			const name: string = category[0];
			const srvs: Array<Server> = category[1];

			message += `${this.fill(categoryText, null, name)}\n`;

			const res = await Promise.all(srvs.map(s => s.probe()));

			for (const srv of res) {
				message += `${this.fill(srv.online ? serverTextOnline : serverTextOffline, srv)}\n`;
			}

			message += '\n';
		}

		process.nextTick(async () => {
			message += `${this.fill(footer)}`;

			const channel = await this.client.channels.fetch(channelID).catch(() => console.warn('SALON INEXISTANT')) as TextChannel;
			let msg;
			if (messageID) msg = await channel.messages.fetch(messageID).catch(() => console.warn('MESSAGE INEXISTANT'));

			if (msg) return msg.edit(message);
			msg = await channel.send(message);

			console.log(''.padEnd(60, '-=-'));
			console.log();
			console.log('CREATED SERVER PING MESSAGE!');
			console.log('PLEASE PUT THE FOLLOWING ID');
			console.log('IN THE \'messageID\' VARIABLE');
			console.log(msg.id);
			console.log();
			console.log(''.padEnd(60, '-=-'));

			process.exit();
		});
	}

	private fill(txt: string, data: ServerResponse | null = null, category: string | null = null) {
		txt = txt
			.replace(/\(\(DATE\)\)/g, moment().format('llll'))
			.replace(/\(\(INTERVALE\)\)/g, '1 minutes');

		if (category) txt = txt.replace(/\(\(CATEGORIE\)\)/g, category);

		if (!data) return txt;

		return txt
			.replace(/\(\(NOM\)\)/g, data.name)
			.replace(/\(\(PING\)\)/g, data.online ? data.ping! : '')
			.replace(/\(\(IP\)\)/g, data.ip)
			.replace(/\(\(PORT\)\)/g, String(data.port));
	}

}
