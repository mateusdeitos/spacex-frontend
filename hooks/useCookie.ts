import CookieManager from 'js-cookie'
import { useState, useCallback } from 'react';

export const useCookie = <T extends string>(key: string, defaultValue: T) => {
	const [value, setValue] = useState<T>(() => {
		return CookieManager.get(key) as T ?? defaultValue;
	});

	const setCookie = useCallback((value: T) => {
		CookieManager.set(key, value);
		setValue(value);
	}, [key]);


	return [value, setCookie] as const;
}