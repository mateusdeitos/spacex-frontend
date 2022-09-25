import { Badge, MantineColor, ThemeIcon } from "@mantine/core"
import { ReactElement } from "react"

interface CardBadgeProps {
	icon: ReactElement
	color: MantineColor
	title: string;
}


export const CardBadge = ({ icon, color, title }: CardBadgeProps) => {
	return <Badge
		px={0}
		variant="filled"
		color={color}
		title={title}
		sx={{
			".mantine-Badge-leftSection": {
				margin: "0",
			}
		}}
		leftSection={<ThemeIcon size="sm" variant="filled" radius="xl" color={color}>
			{icon}
		</ThemeIcon>}
	></Badge>
}