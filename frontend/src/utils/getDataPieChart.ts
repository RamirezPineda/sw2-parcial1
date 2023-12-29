import { IData } from "../interfaces";

import type { ChartOptions } from "chart.js";

export const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      // position: "chartArea",
      position: "left",
      title: {
        display: true,
        text: "Productos mas vendidos",
        font: {
          size: 20,
        },
      },
    },
  },
};

const backgroundColor: string[] = [
  "rgba(53, 162, 235, 0.9)",
  "rgba(255, 99, 132, 0.9)",
  "rgba(255, 206, 86, 0.9)",
  "rgba(75, 192, 192, 0.9)",
  "rgba(255, 159, 64, 0.9)",
  "rgba(0, 128, 0, 0.9)",
  "rgba(70, 130, 180, 0.9)",
  "rgba(128, 0, 128, 0.9)",
  "rgba(255, 69, 0, 0.9)",
  "rgba(0, 0, 128, 0.9)",
  "rgba(255, 140, 0, 0.9)",
  "rgba(34, 139, 34, 0.9)",
  "rgba(255, 0, 255, 0.9)",
  "rgba(0, 0, 205, 0.9)",
  "rgba(255, 215, 0, 0.9)",
  "rgba(139, 69, 19, 0.9)",
  "rgba(120, 120, 120, 0.9)",
  "rgba(180, 105, 255, 0.9)",
  "rgba(0, 255, 196, 0.9)",
  "rgba(205, 92, 92, 0.9)",
  "rgba(0, 128, 128, 0.9)",
  "rgba(173, 216, 230, 0.9)",
  "rgba(255, 182, 193, 0.9)",
  "rgba(144, 238, 144, 0.9)",
  "rgba(255, 228, 181, 0.9)",
  "rgba(173, 216, 230, 0.9)",
  "rgba(240, 128, 128, 0.9)",
  "rgba(152, 251, 152, 0.9)",
  "rgba(255, 228, 196, 0.9)",
  "rgba(173, 216, 230, 0.9)",
  "rgba(255, 160, 122, 0.9)",
  "rgba(0, 206, 209, 0.9)",
  "rgba(255, 250, 205, 0.9)",
  "rgba(250, 128, 114, 0.9)",
  "rgba(135, 206, 250, 0.9)",
  "rgba(255, 222, 173, 0.9)",
];

const borderColor: string[] = [
  "rgba(53, 162, 235, 0.9)",
  "rgba(255, 99, 132, 0.9)",
  "rgba(255, 206, 86, 0.9)",
  "rgba(75, 192, 192, 0.9)",
  "rgba(255, 159, 64, 0.9)",
  "rgba(0, 128, 0, 0.9)",
  "rgba(70, 130, 180, 0.9)",
  "rgba(128, 0, 128, 0.9)",
  "rgba(255, 69, 0, 0.9)",
  "rgba(0, 0, 128, 0.9)",
  "rgba(255, 140, 0, 0.9)",
  "rgba(34, 139, 34, 0.9)",
  "rgba(255, 0, 255, 0.9)",
  "rgba(0, 0, 205, 0.9)",
  "rgba(255, 215, 0, 0.9)",
  "rgba(139, 69, 19, 0.9)",
  "rgba(120, 120, 120, 0.9)",
  "rgba(180, 105, 255, 0.9)",
  "rgba(0, 255, 196, 0.9)",
  "rgba(205, 92, 92, 0.9)",
  "rgba(0, 128, 128, 0.9)",
  "rgba(173, 216, 230, 0.9)",
  "rgba(255, 182, 193, 0.9)",
  "rgba(144, 238, 144, 0.9)",
  "rgba(255, 228, 181, 0.9)",
  "rgba(173, 216, 230, 0.9)",
  "rgba(240, 128, 128, 0.9)",
  "rgba(152, 251, 152, 0.9)",
  "rgba(255, 228, 196, 0.9)",
  "rgba(173, 216, 230, 0.9)",
  "rgba(255, 160, 122, 0.9)",
  "rgba(0, 206, 209, 0.9)",
  "rgba(255, 250, 205, 0.9)",
  "rgba(250, 128, 114, 0.9)",
  "rgba(135, 206, 250, 0.9)",
  "rgba(255, 222, 173, 0.9)",
];

export function getDataPieChart(datos: IData[]) {
  const labels = new Set(datos.map((dato) => dato.producto));

  const labelsArray = [...labels];

  const body: number[] = [];

  labels.forEach((label) => {
    let total = 0;
    datos.map((dato) => {
      if (dato.producto == label) {
        // total += dato.cantidad_venta;
        total += dato.total_venta;
      }
    });
    body.push(total);
  });

  const sortedData = labelsArray
    .map((label, index) => ({ label, total: body[index] }))
    .sort((a, b) => b.total - a.total);

  const sortedLabels = sortedData.map((data) => data.label);
  const sortedBody = sortedData.map((data) => data.total);

  // const body = datos.map((dato) => dato.cantidad_venta);
  const datasets = [
    {
      label: "Ganancia ($)",
      data: sortedBody,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      fill: true,
    },
  ];

  return { labels: sortedLabels, datasets };
}
