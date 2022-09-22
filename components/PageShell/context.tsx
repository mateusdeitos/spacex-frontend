import { createContext, PropsWithChildren, useContext, useReducer } from "react";

interface IPageShellState {
	navbar: {
		opened: boolean;
	};
}
type TPageShellAction = {
	type: 'toggle-navbar';
};
const initialState: IPageShellState = {
	navbar: {
		opened: false,
	},
};
type TPageShellContext = [IPageShellState, React.Dispatch<TPageShellAction>];
const PageShellContext = createContext<TPageShellContext>([initialState, state => state]);

const reducer = (state: IPageShellState, action: TPageShellAction): IPageShellState => {
	switch (action.type) {
		case "toggle-navbar":
			return { ...state, navbar: { opened: !state.navbar.opened } };
		default:
			return state;
	}
}

export const usePageShellContext = () => useContext(PageShellContext);
export const PageShellProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <PageShellContext.Provider value={[state, dispatch]}>
		{children}
	</PageShellContext.Provider>;
};
