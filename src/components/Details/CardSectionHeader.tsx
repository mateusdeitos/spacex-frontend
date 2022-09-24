import { Text } from "@mantine/core"

export const CardSectionHeader = ({ title }: { title: string }) => {
	return <Text weight={500} size="xl" mb="xs">{title}</Text>
}