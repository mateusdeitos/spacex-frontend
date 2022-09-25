import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { RESULTS_PER_PAGE } from "../components/ListPage/constants";
import { TListType } from "../pages/launches/list/[type]";
import { ApiTypes } from "../types/api";

/**
 * Obtém a lista paginada de lançamentos da api
 */
export const useQueryListLaunches = (page: number, type: TListType) => {
	const limit = RESULTS_PER_PAGE;
	const offset = (page - 1) * RESULTS_PER_PAGE;

	return useQuery<AxiosResponse<ApiTypes.TPaginatedResult<ApiTypes.TListLaunchSummary>>>({
		queryKey: ["list-launches", type, limit, offset],
		queryFn: () => axios.get(`/api/launches/list/${type}`, { params: { limit, offset } }),
	});
}