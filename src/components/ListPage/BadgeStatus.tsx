import { Badge, ThemeIcon } from "@mantine/core";
import { IconRocket } from "@tabler/icons";

export const Successful = () => {
	return <BadgeStatus status="success" />
}

export const Failed = () => {
	return <BadgeStatus status="failed" />
}

export const BadgeStatus = ({ status }: { status: "success" | "failed"; }) => {
	return <Badge
		pl={0}
		gradient={status === 'success' ? { from: "teal", to: "lime" } : { from: "yellow", to: "orange" }}
		variant="gradient"
		leftSection={<ThemeIcon size="md" radius="xl" variant="filled" color={status === 'success' ? "teal" : "orange"}>
			{status === "success" && <IconRocket size={15} />}
			{status === "failed" && <IconRocket style={{ transform: "rotate(90deg)" }} size={15} />}
		</ThemeIcon>}>
		{status === 'success' ? 'Successful' : 'Failed'}
	</Badge>;
};
