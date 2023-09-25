import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
} from "@mui/x-data-grid";
import React from "react";
import FlexBetween from "./flex-between";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
	return (
		<GridToolbarContainer>
			<FlexBetween width="100%">
				<FlexBetween>
					<GridToolbarColumnsButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
				</FlexBetween>

				<TextField
					label="Search..."
					sx={{ mb: "0.5rem", width: "15rem" }}
					onChange={(event) => setSearchInput(event.target.value)}
					value={searchInput}
					variant="standard"
					InputProps={{
						endAdornmen: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => {
										setSearch(searchInput);
										setSearchInput("");
									}}
								>
									<Search />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</FlexBetween>
		</GridToolbarContainer>
	);
};

export default DataGridCustomToolbar;