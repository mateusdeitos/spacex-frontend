import { Anchor, Card, List, SimpleGrid, Text } from "@mantine/core";
import { IconExternalLink, IconRocket } from "@tabler/icons";
import { ApiTypes } from "../../types/api";

const hasRedditContent = (media: ApiTypes.TLaunchDetails["media"]) => {
	if (media.reddit?.campaign) return true;
	if (media.reddit?.launch) return true;
	if (media.reddit?.media) return true;
	if (media.reddit?.recovery) return true;
	return false;
}

const hasYoutubeContent = (media: ApiTypes.TLaunchDetails["media"]) => {
	if (media.youTube.videoId) return true;
	return false;
}

const hasDataToRender = (media: ApiTypes.TLaunchDetails["media"]) => {
	if (hasRedditContent(media)) return true;
	if (hasYoutubeContent(media)) return true;
	return false;
}


export const MediaSection = ({ media }: Pick<ApiTypes.TLaunchDetails, "media">) => {
	if (!hasDataToRender(media)) return <Text>No media data for this launch</Text>;

	return <SimpleGrid cols={1} spacing="xs" breakpoints={[{ cols: 1, maxWidth: 900 }]}>
		<RedditMediaContent media={media} />
		<YoutubeMediaContent media={media} />
	</SimpleGrid>
}

export const YoutubeMediaContent = ({ media }: Pick<ApiTypes.TLaunchDetails, "media">) => {
	if (!hasYoutubeContent(media)) return null;

	const { videoId } = media.youTube;

	return <Card p={0}>
		<iframe
			style={{ marginTop: 16 }}
			width="100%"
			height="600"
			src={`https://www.youtube.com/embed/${videoId}`}
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
	</Card>
}

export const RedditMediaContent = ({ media }: { media: ApiTypes.TLaunchDetails["media"] }) => {
	if (!hasRedditContent(media)) return null;

	const { reddit } = media;

	const renderMap: Record<keyof typeof reddit, { label: string, value: string }> = {
		campaign: { label: "Campaign", value: reddit.campaign },
		launch: { label: "Launch", value: reddit.launch },
		media: { label: "Media", value: reddit.media },
		recovery: { label: "Recovery", value: reddit.recovery },
	};

	return <Card p={0}>
		<List>
			{Object.values(renderMap).map(({ label, value }) => {
				if (!value) return null;
				return <List.Item icon={<IconRocket size={15} />} key={label}>
					<Anchor target="_blank" href={value}>{label} <IconExternalLink size={15} /></Anchor>
				</List.Item>
			})}
		</List>
	</Card>
}