import Transaction from "../models/transaction.js";
import OverallStatistics from "../models/overall-statistics.js";
import User from "../models/user.js";

export const getUser = async (request, result) => {
	try {
		const { id } = request.params;
		const user = await User.findById(id);
		result.status(200).json(user);
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};

export const getDashboardStatistics = async (request, result) => {
	try {
		const currentMonth = "November";
		const currentYear = "2021";
		const currentDay = "2021-11-15";
		const transactions = await Transaction.find()
			.limit(50)
			.sort({ createdOn: -1 });
		const overallStatistics = await OverallStatistics.find({
			year: currentYear,
		});
		const {
			totalCustomers,
			yearlyTotalSoldUnits,
			yearlySalesTotal,
			monthlyData,
			salesByCategory,
		} = overallStatistics[0];
		const thisMonthStatistics = overallStatistics[0].monthlyData.find(
			({ month }) => {
				return month === currentMonth;
			}
		);
		const todayStatistics = overallStatistics[0].dailyData.find(({ date }) => {
			return date === currentDay;
		});

		result
			.status(200)
			.json({
				transactions,
				totalCustomers,
				yearlyTotalSoldUnits,
				yearlySalesTotal,
				monthlyData,
				salesByCategory,
				thisMonthStatistics,
				todayStatistics,
			});
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};
