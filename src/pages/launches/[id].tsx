import { GetStaticPaths, GetStaticProps } from "next";
import { MainSection } from "../../components/Details/MainSection";
import { PageShell } from "../../components/PageShell";
import { fetchLatestLaunch, fetchLaunchDetails, fetchNextLaunch } from "../../services/requests";
import { ApiTypes } from "../../types/api";

export default function Details({ ...props }: ApiTypes.TLaunchDetails) {
	return (
		<PageShell
			pageTitle="Launch Details"
			breadcrumbs={[
				{
					title: "Home",
					href: "/"
				},
				{
					title: "Details",
					active: true
				},
			]}
		>
			<MainSection {...props} />
		</PageShell>
	)
}


export const getStaticPaths: GetStaticPaths = async () => {
	const launches = await Promise.all([
		fetchLatestLaunch(),
		fetchNextLaunch(),
	]);

	const paths: Array<{ params: { id: string } }> = [];
	launches.forEach(launch => {
		if (launch.status === 'success') {
			paths.push({ params: { id: launch.id } });
		}
	})

	return {
		paths,
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps<ApiTypes.TLaunchDetails> = async ({ params }) => {
	const { id } = params;

	if (!id || typeof id !== 'string') {
		return {
			notFound: true,
		}
	}

	const props = await fetchLaunchDetails(id);
	if (props.status === 'success') {
		return {
			props,
			revalidate: 120,
		}
	}

	return {
		notFound: true,
	}

}