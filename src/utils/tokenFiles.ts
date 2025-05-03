import type { ReadTokenFunc, SaveTokenFunc } from '@/types/index.js';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const saveTokenInFile: SaveTokenFunc = async (id, token) => {
	const date = new Date();
	const path = join(
		tmpdir(),
		`brn${date.getFullYear()}${date.getUTCMonth()}${date.getUTCDate()}${date.getUTCHours()}_${id}.json`,
	);

	const fileStat = await stat(path).catch(() => undefined);
	if (!fileStat?.isFile()) {
		return;
	}

	await writeFile(path, JSON.stringify(token));
};

export const readTokenFromFile: ReadTokenFunc = async (id: string) => {
	const date = new Date();
	const path = join(
		tmpdir(),
		`brn${date.getFullYear()}${date.getUTCMonth()}${date.getUTCDate()}${date.getUTCHours()}_${id}.txt`,
	);

	const fileStat = await stat(path).catch(() => undefined);
	if (!fileStat?.isFile()) {
		return;
	}

	return readFile(path, {
		encoding: 'utf8',
	}).then((res) => JSON.parse(res));
};
