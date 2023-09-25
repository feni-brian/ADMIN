import mongoose from "mongoose";

const AffiliateStatisticsSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		affiliateSales: {
			type: [mongoose.Types.ObjectId],
			ref: "Transaction",
		},
	},
	{
		timestamps: true,
	}
);
const AffiliateStatistics = mongoose.model(
	"AffiliateStatistics",
	AffiliateStatisticsSchema
);

export default AffiliateStatistics;
