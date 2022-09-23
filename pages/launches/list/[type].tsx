import { Box, LoadingOverlay, Pagination, SimpleGrid } from "@mantine/core";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { LaunchCard } from "../../../components/ListPage/LaunchCard";
import { PageShell } from "../../../components/PageShell";
import { ApiTypes } from "../../../types/api";

type TListType = "upcoming" | "past";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 5,
			staleTime: 1000 * 60 * 5,
		}
	}
});

export default function LaunchesList() {
	const router = useRouter();
	const { type } = router.query;

	return <QueryClientProvider client={queryClient}>
		{type === 'past' && <PastLaunches />}
		{type === 'upcoming' && <UpcomingLaunches />}
		<ReactQueryDevtools />
	</QueryClientProvider>

}

const PastLaunches = () => {
	return <PageShell pageTitle="Past Launches" breadcrumbs={[{ title: "Home", href: "/" }, { title: "Past Launches", active: true }]}>
		<List type="past" />
	</PageShell>
}

const UpcomingLaunches = () => {
	return <PageShell pageTitle="Upcoming Launches" breadcrumbs={[{ title: "Home", href: "/" }, { title: "Upcoming Launches", active: true }]}>
		<List type="upcoming" />
	</PageShell>
}

const resultsPerPage = 20;

const useQueryListLaunches = (page: number, type: TListType) => {
	const limit = resultsPerPage;
	const offset = (page - 1) * resultsPerPage;

	return useQuery<AxiosResponse<ApiTypes.TPaginatedResult<ApiTypes.TListLaunchSummary>>>({
		queryKey: ["list-launches", type, limit, offset],
		queryFn: () => axios.get(`/api/launches/list/${type}`, { params: { limit, offset } }),
	});
}

const List = ({ type }: { type: TListType }) => {
	const [page, setPage] = useState(1);
	const { data: response, isLoading, isSuccess } = useQueryListLaunches(page, type);

	return <>
		<SimpleGrid
			mt="md"
			cols={4}
			breakpoints={[
				{
					cols: 3,
					maxWidth: 980
				},
				{
					cols: 2,
					maxWidth: 755
				},
				{
					cols: 1,
					maxWidth: 500
				}
			]}
		>
			<LoadingOverlay visible={isLoading} />
			{isSuccess && (
				<>
					{response.data.data.map((r, index) => {
						return <LaunchCard key={index} {...r} />
					})}
				</>
			)}
		</SimpleGrid>

		<ListPagination type={type} page={page} setPage={setPage} />
	</>
}

const ListPagination = ({ page, setPage, type }) => {
	const { data: response, isSuccess } = useQueryListLaunches(page, type);
	const total = isSuccess ? Math.ceil(response.data.total / resultsPerPage) : 0;

	if (!isSuccess) {
		return null;
	}

	if (total <= 1) {
		return null;
	}

	return <Box mt="md" sx={{ display: "flex", justifyContent: "center" }}>
		<Pagination total={total} page={page} onChange={setPage} />
	</Box>
}
