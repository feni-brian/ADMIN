import OverallStatistics from "../models/overall-statistics.js";

export const getSales = async (request, result) => {
	try {
		const overallStatistics = await OverallStatistics.find();
		result.status(200).json(overallStatistics);
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};
