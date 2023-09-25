import mongoose from "mongoose";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export const getAdmins = async (request, result) => {
	try {
		const admins = await User.find({ role: "admin" }).select("-password");
		result.status(200).json(admins);
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};

export const getUserPerformance = async (request, result) => {
	try {
		const { id } = request.params;
		const userWithStatistics = await User.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			{
				$lookup: {
					from: "affiliatestatistics",
					localField: "_id",
					foreignField: "userId",
					as: "affiliateStatistics",
				},
			},
			{
				$unwind: "$affiliateStatistics",
			},
		]);
		const salesTransactions = await Promise.all(
			userWithStatistics[0].affiliateStatistics.affiliateSales.map((id) => {
				return Transaction.findById(id);
			})
		);
		const filteredSalesTransactions = salesTransactions.filter(
			(transaction) => transaction !== null
		);

		result
			.status(200)
			.json({ user: userWithStatistics[0], sales: filteredSalesTransactions });
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};
