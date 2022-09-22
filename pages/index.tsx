import { SimpleGrid } from "@mantine/core";
import axios from "axios";
import { GetStaticProps } from "next";
import { LatestLaunchCard } from "../components/LatestLaunchCard";
import { NextLaunchCard } from "../components/NextLaunchCard";
import { PageShell } from "../components/PageShell";
import { PastLaunchCard } from "../components/PastLaunchCard";
import { UpcomingLaunchesCard } from "../components/UpcomingLaunchesCard";
import { api } from "../services/api";
import { ApiTypes } from "../types/api";
import { dateUTCToLocalString } from "../utils/date.formatter";

export type TStaticPropsHomeResponse = {
	latest: ApiTypes.TLatestLaunchSummary;
	next: ApiTypes.TNextLaunchSummary;
}

export default function Home({ latest, next }: TStaticPropsHomeResponse) {
	return (
		<PageShell>
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
				<LatestLaunchCard latest={latest} />
				<NextLaunchCard next={next} />
				<PastLaunchCard />
				<UpcomingLaunchesCard />
			</SimpleGrid>
		</PageShell>
	)
}
export const getStaticProps: GetStaticProps<TStaticPropsHomeResponse> = async () => {
	const latest = await fetchLatestLaunch();
	const next = await fetchNextLaunch();

	return {
		props: {
			latest,
			next,
		},
		revalidate: 60,
	}

}

async function fetchLatestLaunch(): Promise<ApiTypes.TLatestLaunchSummary> {
	try {
		const { data } = await api.get("/launches/latest");

		return {
			flightNumber: data?.flight_number,
			missionName: data?.name,
			missionDate: data?.date_utc ? dateUTCToLocalString(data?.date_utc) : undefined,
		};
	} catch (error) {
		return {
			flightNumber: 0,
			missionDate: "",
			missionName: "",
		};
	}
}


async function fetchNextLaunch(): Promise<ApiTypes.TNextLaunchSummary> {
	try {
		const { data } = await api.get("/launches/next");

		return {
			flightNumber: data?.flight_number,
			missionName: data?.name,
			missionDate: data?.date_utc ? dateUTCToLocalString(data?.date_utc) : undefined,
		};
	} catch (error) {
		return {
			flightNumber: 0,
			missionDate: "",
			missionName: "",
		};
	}
}

