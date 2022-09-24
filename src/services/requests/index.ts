import { ApiTypes } from "../../types/api";
import { dateUTCToLocalString } from "../../utils/date.formatter";
import { api } from "../api";


export async function fetchLaunchDetails(id: string): Promise<ApiTypes.TStatusResponseType<ApiTypes.TLaunchDetails>> {
	try {
		const { data } = await api.get<ApiTypes.TLaunchDetails>(`/launches/one/${id}`);

		return {
			...data,
			missionDate: dateUTCToLocalString(data.missionDate),
			status: "success",
		};
	} catch (error) {
		return { status: "error" };
	}
}

export async function fetchLatestLaunch(): Promise<ApiTypes.TStatusResponseType<ApiTypes.TLatestLaunchSummary>> {
	try {
		const { data } = await api.get<ApiTypes.TLatestLaunchSummary>("/launches/latest");

		return {
			...data,
			missionDate: dateUTCToLocalString(data.missionDate),
			status: "success"
		};
	} catch (error) {
		return {
			status: "error"
		};
	}
}

export async function fetchNextLaunch(): Promise<ApiTypes.TStatusResponseType<ApiTypes.TNextLaunchSummary>> {
	try {
		const { data } = await api.get<ApiTypes.TNextLaunchSummary>("/launches/next");

		return {
			...data,
			missionDate: dateUTCToLocalString(data.missionDate),
			status: "success"
		};
	} catch (error) {
		return {
			status: "error"
		};
	}
}

export async function fetchPastLaunch(): Promise<ApiTypes.TStatusResponseType<ApiTypes.TPastLaunchSummary>> {
	try {
		const { data } = await api.get<ApiTypes.TPastLaunchSummary>("/launches/summary/past");

		return {
			...data,
			status: "success"
		};
	} catch (error) {
		return {
			status: "error"
		};
	}
}

export async function fetchUpcomingLaunch(): Promise<ApiTypes.TStatusResponseType<ApiTypes.TUpcomingLaunchSummary>> {
	try {
		const { data } = await api.get<ApiTypes.TUpcomingLaunchSummary>("/launches/summary/upcoming");

		return {
			...data,
			status: "success"
		};
	} catch (error) {
		return {
			status: "error"
		};
	}
}