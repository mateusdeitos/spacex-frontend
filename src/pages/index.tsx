import { SimpleGrid } from "@mantine/core";
import { LatestLaunchCard } from "../components/Home/LatestLaunchCard";
import { NextLaunchCard } from "../components/Home/NextLaunchCard";
import { PastLaunchCard } from "../components/Home/PastLaunchCard";
import { UpcomingLaunchesCard } from "../components/Home/UpcomingLaunchesCard";
import { PageShell } from "../components/PageShell";
import { handler } from "../services/home/getStaticProps";
import { ApiTypes } from "../types/api";

export type TStaticPropsHomeResponse = {
	latest: ApiTypes.TStatusResponseType<ApiTypes.TLatestLaunchSummary>;
	next: ApiTypes.TStatusResponseType<ApiTypes.TNextLaunchSummary>;
	past: ApiTypes.TStatusResponseType<ApiTypes.TPastLaunchSummary>;
	upcoming: ApiTypes.TStatusResponseType<ApiTypes.TUpcomingLaunchSummary>;
}

export default function Home({ latest, next, past, upcoming }: TStaticPropsHomeResponse) {
	return (
		<PageShell pageTitle="Launches">
			<SimpleGrid
				cols={4}
				spacing="md"
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
				{latest.status === 'success' && <LatestLaunchCard {...latest} />}
				{next.status === 'success' && <NextLaunchCard {...next} />}
				{past.status === 'success' && <PastLaunchCard {...past} />}
				{upcoming.status === 'success' && <UpcomingLaunchesCard {...upcoming} />}
			</SimpleGrid>
		</PageShell>
	)
}
export const getStaticProps = handler;