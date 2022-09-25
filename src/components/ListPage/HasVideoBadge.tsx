import { IconBrandYoutube } from "@tabler/icons";
import { CardBadge } from "./CardBadge";

export const HasVideoBadge = () => {
	return <CardBadge
		color="red"
		icon={<IconBrandYoutube size={15} />}
		title="this launch has video footage"
	/>;
};
