import { useLocalStorage } from '@mantine/hooks';
import { createContext, useCallback, useContext } from 'react';

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
	const [theme, persistTheme] = useLocalStorage<TAppState["theme"]>({
		key: "theme",
		defaultValue: initialState.theme,
		deserialize(value) {
			try {
				return JSON.parse(value);
			} catch (error) {
				return initialState.theme;
			}
		},
	});

	const toggleTheme = useCallback(() => {
		persistTheme(theme === 'light' ? 'dark' : 'light');
	}, [theme])

	return (
		<AppContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
}