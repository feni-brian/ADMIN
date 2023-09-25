// Packages import
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { Writable } from "stream";

// Routes import
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// Data import
import {
	dataAffiliateStat,
	dataOverallStat,
	dataProductStat,
	dataProduct,
	dataTransaction,
	dataUser,
} from "./data/index.js";
import AffiliateStatistics from "./models/affiliate-statistics.js";
import ProductStatistics from "./models/product-statistics.js";
import Product from "./models/product.js";
import Transaction from "./models/transaction.js";
import OverallStatistics from "./models/overall-statistics.js";
import User from "./models/user.js";

/* CUSTOM CONSOLE LOGGING */
const getStdOutStream = new Writable({
	write: (chunk, encoding, callback) => {
		// Implement your custom handling for stdout here
		const message = chunk.toString(); // Convert the chunk to a string
		// Your custom logic to handle stdout, e.g., log to a file or send to a logging service
		console.log(`OUTPUT: ${message}`);
		callback();
	},
});

const getStdErrStream = new Writable({
	write: (chunk, encoding, callback) => {
		// Implement your custom handling for stderr here
		const errorMessage = chunk.toString(); // Convert the chunk to a string
		// Your custom logic to handle stderr, e.g., log to a separate error file or alert
		console.error(`ERROR: ${errorMessage}`);
		callback();
	},
});

const myConsole = new console.Console(getStdOutStream, getStdErrStream);

// DOTENV CONFIGURATION
dotenv.config();

/* APP CONFIGURATION */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* APP ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);

/* MONGOOSE SETUP */
const port = process.env.PORT || 9000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/test";
mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(async () => {
		app.listen(port, () => myConsole.log(`Server is running on port ${port}`));
		/* ONLY ADD DATA ONE AT A TIME */
        // await mongoose.connection.db.dropDatabase();
		// User.insertMany(dataUser);
		// Product.insertMany(dataProduct);
		// Transaction.insertMany(dataTransaction);
		// OverallStatistics.insertMany(dataOverallStat);
		// ProductStatistics.insertMany(dataProductStat);
		// AffiliateStatistics.insertMany(dataAffiliateStat);
	});
