import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import globalReducer from "./state";
import { api } from "./state/api";
import App from "./App.jsx";
import "./index.css";

const store = configureStore({
	reducer: {
		global: globalReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

/*
If you want to start measuring all the Web Vitals metrics on real users in your app, 
in a way that accurately matches how they're measured by Chrome and reported to other Google tools,
use the web-vitals package:

import {onLCP, onFID, onCLS} from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
*/
