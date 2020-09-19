import { ClientOptions } from 'discord.js';

import Server from '@lib/server';

export const keyring = {
	TOKEN: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
};

export const clientOptions: ClientOptions = {
	presence: {
		activity: {
			type: 'WATCHING',
			name: 'vos serveurs'
		},
		status: 'online'
	},
	fetchAllMembers: false,
	disableMentions: 'everyone'
};

export const prefix = '!';

/*
>>> Listes des pings des serveurs
>>> Customisation du message

>>> VALEURS DISPONIBLES:
- ((DATE))        Date du dernier rafraichissement
- ((INTERVALLE))  Intervalle de rafraichissement
- ((CATEGORIE))   Nom de la catégorie
- ((NOM))         Nom de la machine
- ((IP))          IP/Domaine de la machine
- ((PORT))        Port de la machine
- ((PING))        Ping de la machine (UNIQUEMENT SI SERVEUR EN LIGNE)
*/
export const header = '**Statuts de nos services (nodes, sites, infrastructures, etc)**\nDernière mise à jour: ((DATE))';
export const categoryText = '**» ((CATEGORIE))**';
export const serverTextOnline = '`✅` - **((NOM))**: ((PING))';
export const serverTextOffline = '`❌` - **((NOM))**';
export const footer = 'Liste actualisée toutes les **((INTERVALE))**';

// IDs
export const channelID = 'xxxxxxxxxxxxxxxxxx';
export const messageID = 'xxxxxxxxxxxxxxxxxx';

// Liste des ips/domaines à check
export const servers = new Map();

servers.set('Sites WEB', [
	new Server('Discord FR', 'discord.fr'),
	new Server('Kizuru.fr', 'kizuru.fr'),
	new Server('Google', 'google.com')
]);

servers.set('Machines VPS', [
	new Server('VPS 2', 'xxx.xxx.xxx.xxx', 22),
	new Server('VPS 1', 'xxx.xxx.xxx.xxx', 22)
]);
