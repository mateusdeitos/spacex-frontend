import { Badge, ThemeIcon } from "@mantine/core";
import { IconBrandYoutube } from "@tabler/icons";

export const HasVideoBadge = () => {
	return <Badge
		pl={0}
		variant="filled"
		color="red"
		title="this launch has video footage"
		leftSection={<ThemeIcon size="sm" variant="filled" radius="xl" color="red">
			<IconBrandYoutube size={15} />
		</ThemeIcon>}
	>
		1 video
	</Badge>;
};
