import { Card, Group } from "@mantine/core"
import { ApiTypes } from "../../types/api"
import { CardSection } from "./CardSection"
import { CardSectionHeader } from "./CardSectionHeader"
import { CardSectionInfo } from "./CardSectionInfo"
import { CrewSection } from "./CrewSection"
import { RedditMediaContent, YoutubeMediaContent } from "./MediaSection"

export const MainSection = ({ ...props }: ApiTypes.TLaunchDetails) => {
	return <Card mt="md" shadow="lg">
		<CardSection>
			<CardSectionHeader title="Mission" />
			<Group spacing="xl">
				<CardSectionInfo title="Name" value={props.missionName} />
				<CardSectionInfo title="Date" value={props.missionDate} />
				{props.details && <CardSectionInfo title="Details" value={props.details} />}
			</Group>
		</CardSection>
		<CardSection>
			<CardSectionHeader title="Youtube" />
			<YoutubeMediaContent media={props.media} />
		</CardSection>
		<CardSection>
			<CardSectionHeader title="Crew" />
			<CrewSection crew={props.crew} />
		</CardSection>
		<CardSection isLast>
			<CardSectionHeader title="Reddit" />
			<RedditMediaContent media={props.media} />
		</CardSection>
	</Card>
}