import { Card, Group } from "@mantine/core"
import React from "react"
import { ApiTypes } from "../../types/api"
import { CardSection } from "./CardSection"
import { CardSectionHeader } from "./CardSectionHeader"
import { CardSectionInfo } from "./CardSectionInfo"
import { CrewSection } from "./CrewSection"
import { RedditMediaContent, YoutubeMediaContent } from "./MediaSection"

export const MainSection = ({ ...props }: ApiTypes.TLaunchDetails) => {
	return <Container>
		<CardSection>
			<CardSectionHeader title="Mission" />
			<Group spacing="xl">
				<CardSectionInfo title="Name" value={props.missionName} />
				<CardSectionInfo title="Date" value={props.missionDate} />
				{props.details && <CardSectionInfo title="Details" value={props.details} />}
			</Group>
		</CardSection>
		{YoutubeMediaContent.hasData(props.media) && <CardSection>
			<CardSectionHeader title="Youtube" />
			<YoutubeMediaContent media={props.media} />
		</CardSection>}
		<CardSection>
			<CardSectionHeader title="Crew" />
			<CrewSection crew={props.crew} />
		</CardSection>
		{RedditMediaContent.hasData(props.media) && <CardSection>
			<CardSectionHeader title="Reddit" />
			<RedditMediaContent media={props.media} />
		</CardSection>}
	</Container>
}

const Container = ({ children }) => {
	let lastElementIndex = -1;
	// get last not null element index
	React.Children.forEach(children, (child, index) => {
		if (!child || !React.isValidElement(child)) {
			return;
		}

		lastElementIndex = index;
	});

	return <Card mt="md" shadow="lg">
		{React.Children.map(children, (child, index) => {
			if (!React.isValidElement(child)) return child

			// set isLast prop to hide border on the last section
			if (index === lastElementIndex) {
				return React.cloneElement<{ isLast: true }>(child as any, { isLast: true })
			}

			return child;
		})}
	</Card>
}