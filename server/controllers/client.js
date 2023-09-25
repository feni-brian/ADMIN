import getCountryIso3 from "country-iso-2-to-3";
import ProductStatistics from "../models/product-statistics.js";
import Product from "../models/product.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export const getProducts = async (request, result) => {
	try {
		const products = await Product.find();
		const productsWithStatistics = await Promise.all(
			products.map(async (product) => {
				const statistics = await ProductStatistics.find({
					productId: product._id,
				});
				return { ...product._doc, statistics };
			})
		);
		result.status(200).json(productsWithStatistics);
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};

export const getCustomers = async (request, result) => {
	try {
		const customers = await User.find({ role: "user" }).select("-password");
		result.status(200).json(customers);
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};

export const getTransactions = async (request, result) => {
	try {
		const {
			page = 1,
			pageSize = 20,
			sort = null,
			search = "",
		} = request.query;
		const generateSort = () => {
			const sortParsed = JSON.parse(sort);
			return {
				[sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
			};
		};
		const sortFormatted = Boolean(sort) ? generateSort() : {};
		const transactions = await Transaction.find({
			$or: [
				{ cost: { $regex: new RegExp(search, "i") } },
				{ userId: { $regex: new RegExp(search, "i") } },
			],
		})
			.sort(sortFormatted)
			.skip(page * pageSize)
			.limit(pageSize);
		const total = await Transaction.countDocuments({
			name: { $regex: search, $options: "i" },
		});

		result.status(200).json({ transactions, total });
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};

export const getGeography = async (request, result) => {
	try {
		const users = await User.find();
		const mappedLocations = users.reduce((accumulator, { country }) => {
			const countryIso3 = getCountryIso3(country);
			if (!accumulator[countryIso3]) {
				accumulator[countryIso3] = 0;
			}
			accumulator[countryIso3]++;
			return accumulator;
		}, {});
		const formattedLocations = Object.entries(mappedLocations).map(
			([country, count]) => {
				return { id: country, value: count };
			}
		);

		result.status(200).json(formattedLocations);
	} catch (error) {
		result.status(404).json({ message: error.message });
	}
};
