
export namespace ApiTypes {

	type TStatusResponseType<T> = T & {
		status: "error" | "success";
	}

	export type TLaunchDetails = TStatusResponseType<{
		id: string;
		missionName: string;
		missionDate: string;
		flightNumber: number;
		details: string;
		crew: TRawLaunch["crew"];
		failure: TRawLaunch["failures"]
		media: {
			reddit: {
				campaign: string;
				launch: string;
				media: string;
				recovery: string;
			},
			youTube: {
				videoId: string;
			}
		},
		rocketId: string;
		sucessfull: boolean;
	}>

	export type TListLaunchSummary = {
		id: string;
		missionName: string;
		missionDate: string;
		flightNumber: number;
		success: boolean;
		hasVideo: boolean;
	}

	export type TLatestLaunchSummary = TStatusResponseType<{
		id: string;
		missionName: string;
		missionDate: string;
		flightNumber: number;
	}>

	export type TNextLaunchSummary = TStatusResponseType<{
		id: string;
		missionName: string;
		missionDate: string;
		flightNumber: number;
	}>

	export type TPastLaunchSummary = TStatusResponseType<{
		totalFlights: number;
		sucessfulFlights: number;
		failedFlights: number;
	}>

	export type TUpcomingLaunchSummary = TStatusResponseType<{
		totalFlights: number;
		flightsPerMonth: {
			currentMonth: number;
			nextMonth: number;
		}
	}>

	// Achar uma forma de reaproveitar o type do backend
	export type TRawLaunch = {
		"id": string;
		"flight_number": number,
		"name": string,
		"date_utc": string,
		"date_unix": number,
		"date_local": string,
		"date_precision": "half" | "quarter" | "year" | "month" | "day" | "hour",
		"static_fire_date_utc"?: string,
		"static_fire_date_unix"?: number,
		"tdb"?: boolean,
		"net"?: boolean,
		"window"?: number,
		"rocket"?: string,
		"success"?: boolean,
		"failures": Array<{
			"time": number,
			"altitude": number,
			"reason": string,
		}>,
		"upcoming": boolean,
		"details"?: string,
		"fairings": {
			"reused"?: boolean,
			"recovery_attempt"?: boolean,
			"recovered"?: boolean,
			"ships": string[]
		},
		"crew": Array<
			{
				"crew"?: string
				"role"?: string
			}
		>,
		"ships": string[],
		"capsules": string[],
		"payloads": string[],
		"launchpad"?: string,
		"cores": [
			{
				"core"?: string,
				"flight"?: number,
				"gridfins"?: boolean,
				"legs"?: boolean,
				"reused"?: boolean,
				"landing_attempt"?: boolean,
				"landing_success"?: boolean,
				"landing_type"?: string,
				"landpad"?: string
			}
		],
		"links": {
			"patch": {
				"small"?: string,
				"large"?: string
			},
			"reddit": {
				"campaign"?: string,
				"launch"?: string,
				"media"?: string,
				"recovery"?: string
			},
			"flickr": {
				"small": string[],
				"original": string[]
			},
			"presskit"?: string,
			"webcast"?: string,
			"youtube_id"?: string,
			"article"?: string,
			"wikipedia"?: string
		},
		"auto_update"?: boolean

	}

	export type TPagination = {
		limit: number;
		offset: number;
	}

	export type TPaginatedResult<T> = {
		total: number;
		limit: number;
		offset: number;
		data: T[];
	}
}
