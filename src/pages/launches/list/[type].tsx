import { LoadingOverlay, SimpleGrid } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from "next/router";
import { useState } from "react";
import { LaunchCard } from "../../../components/ListPage/LaunchCard";
import { ListPagination } from "../../../components/ListPage/Pagination";
import { PageShell } from "../../../components/PageShell";
import { useQueryListLaunches } from "../../../hooks/useQueryListLaunches";

export type TListType = "upcoming" | "past";

export default function LaunchesList() {
	const router = useRouter();
	const { type } = router.query;

	return <QueryClientProvider client={queryClient}>
		{type === 'past' && <PastLaunches />}
		{type === 'upcoming' && <UpcomingLaunches />}
		<ReactQueryDevtools />
	</QueryClientProvider>
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 5,
			staleTime: 1000 * 60 * 5,
		}
	}
});

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
						return <LaunchCard key={index} {...r} type={type} />
					})}
				</>
			)}
		</SimpleGrid>

		<ListPagination type={type} page={page} setPage={setPage} />
	</>
}
