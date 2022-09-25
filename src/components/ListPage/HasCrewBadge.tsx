import { IconUsers } from "@tabler/icons";
import { CardBadge } from "./CardBadge";

export const HasCrewBadge = () => {
	return <CardBadge
		color="indigo"
		icon={<IconUsers size={15} />}
		title="this launch has crew"
	/>;
};
