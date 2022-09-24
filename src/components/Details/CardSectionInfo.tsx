import { Text } from "@mantine/core"
import { ReactNode } from "react"

export const CardSectionInfo = ({ title, value = "" }: { title: ReactNode, value?: ReactNode }) => {
	return <Text>
		<Text weight={500}>{title}</Text>
		{value}
	</Text>
}