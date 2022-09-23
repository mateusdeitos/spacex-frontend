import { Text, ThemeIcon, Group } from "@mantine/core";
import { RouteCard } from "./RouteCard";
import { IconCalendarEvent } from "@tabler/icons";
import { TStaticPropsHomeResponse } from "../pages";

export const UpcomingLaunchesCard = ({ flightsPerMonth: { currentMonth, nextMonth }, totalFlights }: TStaticPropsHomeResponse["upcoming"]) => {
	return <RouteCard
		image={{
			src: "/upcoming_launches.jpg",
			alt: "Upcoming Launches",
		}}
		badges={[
			{
				color: { from: "dark", to: "gray" },
				text: `${totalFlights} flights`
			}
		]}
		Title={<Text weight={500}>Upcoming</Text>}
		route="/launches/list/upcoming"
	>
		<Group position="left" mt="xs" spacing="xs">
			<ThisMonthLaunches total={currentMonth} />
		</Group>
		<Group position="left" mt="xs" spacing="xs">
			<NextMonthLaunches total={nextMonth} />
		</Group>
	</RouteCard>;
};


const ThisMonthLaunches = ({ total }: { total: number }) => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "dark", to: "blue" }}>
			<IconCalendarEvent size={20} />
		</ThemeIcon>

		<Text size="xs" color="cyan">
			{total} this month
		</Text>
	</>;
};
const NextMonthLaunches = ({ total }: { total: number }) => {
	return <>
		<ThemeIcon size="lg" variant="gradient" gradient={{ from: "violet", to: "pink" }}>
			<IconCalendarEvent size={20} />
		</ThemeIcon>

		<Text size="xs" color="dimmed">
			{total} next month
		</Text>
	</>;
};