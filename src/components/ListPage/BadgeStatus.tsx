import { IconRocket } from "@tabler/icons";
import { CardBadge } from "./CardBadge";

export const Successful = () => {
	return <CardBadge
		color="lime"
		icon={<IconRocket size={15} />}
		title="this launch was successful"
	/>
}

export const Failed = () => {
	return <CardBadge
		color="orange"
		icon={<IconRocket style={{ transform: "rotate(90deg)" }} size={15} />}
		title="this launch failed"
	/>
}
export const BadgeStatus = ({ status }: { status: "success" | "failed"; }) => {
	if (status === 'success') {
		return <Successful />
	}

	return <Failed />
};
