import { Card } from "@mantine/core"
import { PropsWithChildren } from "react"

export const CardSection = ({ children, isLast }: PropsWithChildren<{ isLast?: true }>) => {
	return <Card.Section pb="sm" mx="md" mb="md" sx={{ borderBottom: isLast ? "" : "1px solid gray" }}>
		{children}
	</Card.Section>
}