import { PermissionString, Message } from 'discord.js';
import { CustomClient } from '@lib/client';

export abstract class Command {

	public client: CustomClient;
	public name: string;
	public userPerms: Array<PermissionString>;
	public botPerms: Array<PermissionString>;

	public constructor(client: CustomClient, name: string, opts: CommandOptions) {
		this.client = client;
		this.name = name;
		this.userPerms = opts.userPerms || [];
		this.botPerms = opts.botPerms || [];
	}

	public abstract run(message: Message, args: Array<string>, ...params: any[]): void;

}

export interface CommandOptions {
	userPerms?: Array<PermissionString>;
	botPerms?: Array<PermissionString>;
}
