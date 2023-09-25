import CustomPagination from "@/components/custom-pagination";
import DataGridCustomColumnMenu from "@/components/datagrid-custom-column-menu";
import Header from "@/components/header";
import { useGetUserPerformanceQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";

const Performance = () => {
	const theme = useTheme();
	const userId = useSelector((state) => state.global.userId);
	const { data, isLoading } = useGetUserPerformanceQuery(userId);
	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "userId",
			headerName: "User ID",
			flex: 1,
		},
		{
			field: "createdAt",
			headerName: "Created At",
			flex: 1,
		},
		{
			field: "products",
			headerName: "No. of Products",
			flex: 0.5,
			sortable: false,
			renderCell: (params) => params.value.length,
		},
		{
			field: "cost",
			headerName: "Cost",
			flex: 0.5,
			renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
		},
	];

	return (
		<Box m="1.5rem 2.5rem">
			<Header title="Performance" subtitle="Track your affiliate sales performance here" />
			<Box
				mt="40px"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": { border: "none" },
					"& .MuiDataGrid-cell": { borderBottom: "none" },
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: theme.palette.primary.light,
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: "none",
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !data}
					getRowId={(row) => row._id}
					rows={(data && data.sales) || []}
					columns={columns}
					pagination
					slots={{ columnMenu: DataGridCustomColumnMenu, pagination: CustomPagination }}
				/>
			</Box>
		</Box>
	);
};

export default Performance;
