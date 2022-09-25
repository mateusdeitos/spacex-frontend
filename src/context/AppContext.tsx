import { createContext, useCallback, useContext, useState } from 'react';
import { useCookie } from '../hooks/useCookie';

type TAppState = {
	theme: 'light' | 'dark';
};

type TAppContext = {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
};

const initialState: TAppState = {
	theme: 'light',
};

const AppContext = createContext<TAppContext>({} as TAppContext);
export const AppContextConsumer = AppContext.Consumer;

export const AppContextProvider = ({ children }) => {
	/**
	 * Armazeno nos cookies pois caso contrário dá um flash na tela as vezes
	 * https://github.com/mantinedev/mantine/discussions/1094
	 */
	const [theme, persistTheme] = useCookie<TAppState["theme"]>("theme", initialState.theme);

	const toggleTheme = useCallback(() => {
		persistTheme(theme === 'light' ? 'dark' : 'light');
	}, [theme, persistTheme])

	return (
		<AppContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
}