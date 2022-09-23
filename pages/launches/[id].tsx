import { Card, Group, Text } from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { PropsWithChildren } from "react";
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
			<CardComponent {...props} />
		</PageShell>
	)
}

const CardComponent = ({ ...props }: ApiTypes.TLaunchDetails) => {
	return <Card mt="md" shadow="lg">
		<CardSection>
			<CardSectionHeader title="Mission" />
			<Group spacing="xl">
				<CardSectionInfo title="Name" value={props.missionName} />
				<CardSectionInfo title="Date" value={props.missionDate} />
				{props.details && <CardSectionInfo title="Details" value={props.details} />}
			</Group>
		</CardSection>
		<CardSection isLast>
			<CardSectionHeader title="Crew" />
			{!props.crew.length ? <Text>No crew members</Text> : (
				<Group spacing="xl">
					{props.crew.map((crewMember, index) => (
						<CardSectionInfo key={index} title="Role" value={crewMember.role} />
					))}
				</Group>
			)}
		</CardSection>
	</Card>
}

const CardSection = ({ children, isLast }: PropsWithChildren<{ isLast?: true }>) => {
	return <Card.Section pb="sm" mx="md" mb="md" sx={{ borderBottom: isLast ? "" : "1px solid gray" }}>
		{children}
	</Card.Section>
}

const CardSectionHeader = ({ title }: { title: string }) => {
	return <Text weight={500} size="xl" mb="xs">{title}</Text>
}

const CardSectionInfo = ({ title, value }: { title: string, value: string }) => {
	return <Text>
		<Text weight={500}>{title}</Text>
		{value}
	</Text>
}

export const getStaticPaths: GetStaticPaths = async () => {
	const launches = await Promise.all([
		fetchLatestLaunch(),
		fetchNextLaunch(),
	]);

	return {
		paths: launches.map(({ id }) => ({ params: { id } })),
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps<ApiTypes.TLaunchDetails> = async ({ params }) => {
	const { id } = params;

	if (!id || typeof id !== 'string') {
		return {
			notFound: true,
			redirect: {
				destination: '/',
				statusCode: 301
			}
		}
	}

	const props = await fetchLaunchDetails(id);

	return {
		props,
		revalidate: 120,
	}
}