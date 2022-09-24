import { GetStaticProps } from "next";
import { TStaticPropsHomeResponse } from "../../pages";
import { fetchLatestLaunch, fetchNextLaunch, fetchPastLaunch, fetchUpcomingLaunch } from "../requests";

export const handler: GetStaticProps<TStaticPropsHomeResponse> = async () => {
	try {
		const [
			latest,
			next,
			past,
			upcoming,
		] = await Promise.all([
			fetchLatestLaunch(),
			fetchNextLaunch(),
			fetchPastLaunch(),
			fetchUpcomingLaunch(),
		])

		return {
			props: {
				latest,
				next,
				past,
				upcoming,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
			props: {},
		}
	}


}
