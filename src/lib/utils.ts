import { Permissions } from 'discord.js';

export const PermFlags = Permissions.FLAGS;

export const microsecTime = () => {
	const t = process.hrtime();

	return (t[0] * 1e6) + (t[1] / 1e3);
};

export const formatTime = (t: number) => {
	if (t > 1e6) return `${(t / 1e6).toFixed(1)} s`;
	else if (t > 1e3) return `${(t / 1e3).toFixed(1)} ms`;
	return `${t.toFixed(1)} μs`;
};
