import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";

const Invoices = () => {
  const theme = useTheme();
  const [lineData, setLineData] = useState([]);
  const [total, setTotal] = useState(1);
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const storedRes = localStorage.getItem("resData");
    const parsedRes = JSON.parse(storedRes);

    console.log("pares", parsedRes);
    if (parsedRes.counter) {
      console.log("pares1", parsedRes.counter);
      if (parsedRes.threshold) {
        console.log("parsedRes.threshold", parsedRes.threshold);
        if (parsedRes.threshold < 0.2) {
          console.log("parsedRes.thresholds", parsedRes.threshold);
          setTotal((parsedRes.counter * 100) / 25);
          let data = [
            {
              id: `Working Slow Counts are ${parsedRes.counter}`,
              label: `Working Slow `,
              value: 0.25,
              color: "hsl(162, 70%, 50%)",
            },
            {
              id: `Expected Counts Should Be ${(parsedRes.counter * 100) / 25}`,
              label: `Expected Counts`,
              value: 0.75,
              color: "hsl(162, 70%, 50%)",
            },
          ];
          setLineData(data);
        } else if (parsedRes.threshold >= 0.2 && parsedRes.threshold < 0.8) {
          setTotal((parsedRes.counter * 100) / 75);
          console.log("parsedRes.threshold m", parsedRes.threshold);
          let data = [
            {
              id: `Working Good Counts are ${parsedRes.counter}`,
              label: `Working Good `,
              value: 0.75,
              color: "hsl(162, 70%, 50%)",
            },
            {
              id: `Expected Counts Should Be ${(parsedRes.counter * 100) / 75}`,
              label: "More Effort",
              value: 0.25,
              color: "hsl(162, 70%, 50%)",
            },
          ];
          setLineData(data);
        } else if (parsedRes.threshold > 0.8) {
          setTotal(parsedRes.counter);
          let data = [
            {
              id: `Working Effectively Counts are ${parsedRes.counter}`,
              label: `Working Effectively `,
              value: parsedRes.counter,
              color: "hsl(162, 70%, 50%)",
            },
            {
              id: `Expected Counts Should Be ${parsedRes.counter} `,
              label: `Expected Counts `,
              value: parsedRes.counter,
              color: "hsl(162, 70%, 50%)",
            },
          ];
          setLineData(data);
        }
      }
    }
  }, []);
  useEffect(() => {
    console.log("line", lineData);
  }, [lineData]);
  return (
    <Box m="20px">
      <Header title="Counts" subtitle="counts detected from video" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <PieChart data={lineData} />
      </Box>
    </Box>
  );
};

export default Invoices;
