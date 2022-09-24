import { api } from "../src/services/api";
import { ApiTypes } from "../src/types/api";

export const iterateRequestWithPagination = async <T>(route: string, onIterate: (record: T, index: number) => void) => {
	const limit = 100;
	let offset = 0;

	while (true) {
		const { data } = await api.get<ApiTypes.TPaginatedResult<T>>(route, {
			params: {
				limit,
				offset,
			}
		});

		if (!data?.data?.length) {
			break;
		}

		data.data.forEach(onIterate);

		offset += limit;
	}

}