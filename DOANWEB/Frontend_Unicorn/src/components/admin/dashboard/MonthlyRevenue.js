"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import useGetMonthlyRevenue from "@/customHooks/admin/useGetMonthlyRevenue";
import { ConvertMoney } from "@/utils/convertMoney";
import DownloadIcon from "@mui/icons-material/Download";
import { Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useRef, useState } from "react";
export default function MonthlyRevenue() {
  const { data, isLoading } = useGetMonthlyRevenue();
  const chartRef = useRef();
  const [chartKeys, setChartKeys] = useState([]);
  const [chartValues, setChartValues] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (data) {
      const listValue = data.map((item) => item.revenue);
      setChartValues(listValue);
      const listKey = data.map((item) => item.currentMonth);
      setChartKeys(listKey);

      const initialWeeklyRevenue = 0;
      const sumWeeklyRevenue = data.reduce(
        (initValue, order) => order.revenue + initValue,
        initialWeeklyRevenue
      );
      setTotalRevenue(sumWeeklyRevenue);
    }
  }, [data]);

  const handleClickDownloadChart = async () => {
    if (chartRef.current) {
      // Get SVG content as a string
      const svgContent = new XMLSerializer().serializeToString(
        chartRef.current
      );
      // Create a Blob from the SVG content
      const blob = new Blob([svgContent], { type: "image/svg+xml" });

      // Create a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      // Set the download attribute and file name
      const currentTimeStamp = Date.now();
      link.download = `monthly_revenue_chart_${currentTimeStamp}.svg`;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    }
  };

  return (
    <>
      {isLoading && (
        <>
          <span className="income-text">Doanh thu tháng</span>
          <LoadingContent />
        </>
      )}
      {!isLoading && data && (
        <Stack spacing={1} className="icome-container">
          <div className="income-chart">
            <div className="income-line-chart">
              <div className="income-line-chart-header">
                <Stack className="income-line-chart-header-left">
                  <span className="income-text">Doanh thu tháng</span>
                  <span className="income-total-text">
                    <ConvertMoney money={totalRevenue} />
                  </span>
                </Stack>
                <Stack spacing={1} className="income-line-chart-header-right">
                  <div className="text-right">
                    <button
                      className="icome-export-button"
                      onClick={handleClickDownloadChart}
                    >
                      <DownloadIcon />
                    </button>
                  </div>
                </Stack>
              </div>
              <div className="income-chart-container">
                <LineChart
                  ref={chartRef}
                  className="line-chart"
                  xAxis={[{ scaleType: "point", data: chartKeys }]}
                  series={[
                    {
                      curve: "monotoneX",
                      data: chartValues,
                      area: true,
                      color: "#C4F4E8",
                    },
                  ]}
                  sx={{
                    ".MuiLineElement-root": {
                      stroke: "#38ac8f",
                      strokeWidth: 2,
                    },
                    ".MuiMarkElement-root": {
                      stroke: "#38ac8f",
                      scale: "0.6",
                      fill: "#38ac8f",
                      strokeWidth: 2,
                    },
                  }}
                  height={500}
                  margin={{ left: 70, right: 70 }}
                />
              </div>
            </div>
          </div>
        </Stack>
      )}
    </>
  );
}
