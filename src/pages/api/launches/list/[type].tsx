import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../../services/api";
import { ApiTypes } from "../../../../types/api";
import { dateUTCToLocalString } from "../../../../utils/date.formatter";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { limit, offset, type } = req.query;

		const { data } = await api.get<ApiTypes.TPaginatedResult<ApiTypes.TRawLaunch>>(`/v1/launches/${type}`, {
			params: {
				limit,
				offset,
			},
		});

		const { data: launches, ...rest } = data;

		const parsedLaunches: ApiTypes.TListLaunchSummary[] = launches.map((launch) => {
			return {
				id: launch?.id ?? "",
				missionName: launch?.name ?? "",
				missionDate: launch?.date_utc ? dateUTCToLocalString(launch.date_utc) : "",
				flightNumber: launch.flight_number ?? 0,
				success: !!launch?.success,
				hasVideo: !!launch?.links?.youtube_id,
				hasCrew: !!launch?.crew?.length,
			}
		});

		return res.status(200).json({
			...rest,
			data: parsedLaunches,
		});

	} catch (error) {
		if (error.isAxiosError) {
			return res.status(error.code ?? 500).json({
				error: error.response.data,
			})
		}

		return res.status(500).json({
			error: error?.message ?? "Internal server error",
		})
	}
}