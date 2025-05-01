/**
 * Filter "keys" in an object
 * @param object An object want to filter
 * @param keys What kind of keys wanted only to return
 * @return {T}
 */
export const onlyKeys = <T extends object>(object: T, ...keys: (keyof T)[]): T => {
	const emptyObject: T = {} as T;

	for (const key of keys) {
		if (Object.hasOwn(object, key)) {
			emptyObject[key] = object[key];
		}
	}

	return emptyObject;
};
