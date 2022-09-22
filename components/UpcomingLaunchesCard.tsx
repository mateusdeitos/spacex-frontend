import { Text, ThemeIcon, Group } from "@mantine/core";
import { RouteCard } from "./RouteCard";
import { IconCalendarEvent } from "@tabler/icons";

export const UpcomingLaunchesCard = () => {
	return <RouteCard
		image={{
			src: "/upcoming_launches.jpg",
			alt: "Upcoming Launches",
		}}
		badges={[
			{
				color: { from: "dark", to: "gray" },
				text: "8 flights"
			}
		]}
		Title={<Text weight={500}>Upcoming</Text>}
		route="/launches/upcoming"
	>
		<Group position="left" mt="xs" spacing="xs">
			<ThisMonthLaunches />
		</Group>
		<Group position="left" mt="xs" spacing="xs">
			<NextMonthLaunches />
		</Group>
	</RouteCard>;
};


const ThisMonthLaunches = () => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "dark", to: "blue" }}>
			<IconCalendarEvent size={20} />
		</ThemeIcon>

		<Text size="xs" color="cyan">
			2 this month
		</Text>
	</>;
};
const NextMonthLaunches = () => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "violet", to: "pink" }}>
			<IconCalendarEvent size={20} />
		</ThemeIcon>

		<Text size="xs" color="dimmed">
			4 next month
		</Text>
	</>;
};