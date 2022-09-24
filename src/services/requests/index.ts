import { ApiTypes } from "../../types/api";
import { dateUTCToLocalString } from "../../utils/date.formatter";
import { iterateRequestWithPagination } from "../../utils/request.parsing";
import { api } from "../api";

export async function fetchLatestLaunch(): Promise<ApiTypes.TLatestLaunchSummary> {
	try {
		const { data } = await api.get<ApiTypes.TRawLaunch>("/launches/latest");

		return {
			id: data?.id,
			flightNumber: data?.flight_number,
			missionName: data?.name,
			missionDate: data?.date_utc ? dateUTCToLocalString(data?.date_utc) : undefined,
			status: "success",
		};
	} catch (error) {
		return {
			id: "",
			flightNumber: 0,
			missionDate: "",
			missionName: "",
			status: "error",
		};
	}
}

export async function fetchLaunchDetails(id: string): Promise<ApiTypes.TLaunchDetails> {
	const { data } = await api.get<ApiTypes.TLaunchDetails>(`/launches/one/${id}`);

	return data;
}

export async function fetchNextLaunch(): Promise<ApiTypes.TNextLaunchSummary> {
	try {
		const { data } = await api.get<ApiTypes.TRawLaunch>("/launches/next");

		return {
			id: data?.id,
			flightNumber: data?.flight_number,
			missionName: data?.name,
			missionDate: data?.date_utc ? dateUTCToLocalString(data?.date_utc) : undefined,
			status: "success",
		};
	} catch (error) {
		return {
			id: "",
			flightNumber: 0,
			missionDate: "",
			missionName: "",
			status: "error",
		};
	}
}

export async function fetchPastLaunch(): Promise<ApiTypes.TPastLaunchSummary> {
	try {

		const pastLaunches: ApiTypes.TPastLaunchSummary = {
			failedFlights: 0,
			sucessfulFlights: 0,
			totalFlights: 0,
			status: "success",
		};

		await iterateRequestWithPagination<ApiTypes.TRawLaunch>("/launches/past", (launch) => {
			if (launch.success) {
				pastLaunches.sucessfulFlights++;
			} else {
				pastLaunches.failedFlights++;
			}

			pastLaunches.totalFlights++;
		});

		return pastLaunches;
	} catch (error) {
		return {
			failedFlights: 0,
			sucessfulFlights: 0,
			totalFlights: 0,
			status: "error",
		};
	}
}

export async function fetchUpcomingLaunch(): Promise<ApiTypes.TUpcomingLaunchSummary> {
	try {

		const upcommingLaunches: ApiTypes.TUpcomingLaunchSummary = {
			totalFlights: 0,
			flightsPerMonth: {
				currentMonth: 0,
				nextMonth: 0,
			},
			status: "success",
		};

		const currentMonth = new Date().getMonth();
		const nextMonth = currentMonth + 1;

		const isCurrentMonth = (date: Date) => date.getMonth() === currentMonth;
		const isNextMonth = (date: Date) => date.getMonth() === nextMonth;

		await iterateRequestWithPagination<ApiTypes.TRawLaunch>("/launches/upcoming", (launch) => {
			if (!!launch?.date_utc) {
				const date = new Date(launch.date_utc);
				if (isCurrentMonth(date)) {
					upcommingLaunches.flightsPerMonth.currentMonth++;
				} else if (isNextMonth(date)) {
					upcommingLaunches.flightsPerMonth.nextMonth++;
				}
			}

			upcommingLaunches.totalFlights++;
		});

		return upcommingLaunches;
	} catch (error) {
		return {
			totalFlights: 0,
			flightsPerMonth: {
				currentMonth: 0,
				nextMonth: 0,
			},
			status: "error",
		};
	}
}