import { Box, Pagination } from "@mantine/core";
import { useQueryListLaunches } from "../../hooks/useQueryListLaunches";
import { RESULTS_PER_PAGE } from "./constants";

export const ListPagination = ({ page, setPage, type }) => {
	const { data: response, isSuccess } = useQueryListLaunches(page, type);
	const total = isSuccess ? Math.ceil(response.data.total / RESULTS_PER_PAGE) : 0;

	if (!isSuccess) {
		return null;
	}

	if (total <= 1) {
		return null;
	}

	return <Box mt="md" sx={{ display: "flex", justifyContent: "center" }}>
		<Pagination total={total} page={page} onChange={setPage} />
	</Box>
}
