import { SimpleGrid } from "@mantine/core";
import { LatestLaunchCard } from "../components/LatestLaunchCard";
import { NextLaunchCard } from "../components/NextLaunchCard";
import { PageShell } from "../components/PageShell";
import { PastLaunchCard } from "../components/PastLaunchCard";
import { UpcomingLaunchesCard } from "../components/UpcomingLaunchesCard";
import { handler } from "../services/home/getStaticProps";
import { ApiTypes } from "../types/api";

export type TStaticPropsHomeResponse = {
	latest: ApiTypes.TLatestLaunchSummary;
	next: ApiTypes.TNextLaunchSummary;
	past: ApiTypes.TPastLaunchSummary;
	upcoming: ApiTypes.TUpcomingLaunchSummary;
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