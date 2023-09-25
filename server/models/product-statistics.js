import mongoose from "mongoose";

const ProductStatisticsSchema = new mongoose.Schema(
	{
		productId: String,
		yearlySalesTotal: Number,
		yearlyTotalSoldUnits: Number,
		year: Number,
		monthlyData: [
			{
				month: String,
				totalSales: Number,
				totalUnits: Number,
			},
		],
		dailyData: [
			{
				date: String,
				totalSales: Number,
				totalUnits: Number,
			},
		],
	},
	{
		timestamps: true,
	}
);
const ProductStatistics = mongoose.model(
	"ProductStatistics",
	ProductStatisticsSchema
);

export default ProductStatistics;
