import { Badge, BadgeProps, Box, Button, Card, Group, Image, Text } from "@mantine/core"
import { NextLink } from "@mantine/next";
import { PropsWithChildren, ReactElement } from "react";

interface IRouteCardProps {
	image: {
		src: string;
		alt: string;
	}
	Title: ReactElement;
	badges?: Array<{ text: string; color: BadgeProps["color"] | { from: BadgeProps["color"], to: BadgeProps["color"] } }>
	route: string;
}

export const RouteCard = ({
	image,
	route,
	Title,
	badges = [],
	children
}: PropsWithChildren<IRouteCardProps>) => {
	const parseColor = (color: IRouteCardProps["badges"][number]["color"]) => {
		if (typeof color === "string") {
			return { from: color, to: color }
		}

		return color
	}
	return <Card radius="md" p="lg" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
		<Card.Section>
			<Image
				{...image}
				title={image.alt}
				height={200}
			/>
		</Card.Section>
		<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", flex: "1 1" }}>
			<Box mt="xs" mb="xs">
				{Title}
			</Box>
			<Group position="apart" mb="xs" spacing="xs" >
				{badges.map((badge, index) => <Badge
					key={index}
					gradient={parseColor(badge.color)}
					variant="gradient"
				>
					{badge.text}
				</Badge>)}
			</Group>
			{children}
		</Box>
		<Button component={NextLink} href={route} variant="light" color="blue" fullWidth mt="md" radius="md">
			See more details
		</Button>
	</Card>
}