import { Box, Typography } from "@mui/material";
import React from "react";
import { useCustomTheme } from "../theme";

const Header = ({ title, subtitle }) => {
	const theme = useCustomTheme();

	return (
		<Box>
			<Typography
				variant="h1"
				color={theme.palette.secondary[100]}
				fontWeight="bold"
				sx={{ mb: "5px" }}
			>
				{title}
			</Typography>

			<Typography variant="h5" color={theme.palette.secondary[300]}>
				{subtitle}
			</Typography>
		</Box>
	);
};

export default Header;
