import { useState } from "react";

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { getDataLineChart, misOptionsLineChart } from "../../../utils/";
import { useGetSales } from "../../../hooks/sales.hook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


interface Props {
  tiendaId: number;
}

export default function LinesChart({ tiendaId }: Props) {
  const { sales, isLoading, error } = useGetSales(tiendaId);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();


  if (isLoading) {
    return <>Loading....</>;
  } else if (error) {
    return <>Error al recuperar los datos</>;
  }

  const dataFilter = () => {
    if (!startDate || !endDate) {
      const dataChart = getDataLineChart(sales!, startDate, endDate);
      return dataChart;
    }

    const dataFilter = sales!.filter((dato) => {
      if (startDate && endDate) {
        const fechaVenta = new Date(dato.fecha_venta);
        if (fechaVenta < startDate || fechaVenta > endDate) return null;
      }

      return dato;
    });

    const dataChart = getDataLineChart(dataFilter, startDate, endDate);
    return dataChart;
  };

  const cleanFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <>
      {/* <h3 className="text-xl font-medium">Ventas</h3> */}
      <ul className="menu menu-vertical lg:menu-horizontal rounded-box gap-2 mb-4">
        <li>
          <button onClick={cleanFilter} className="bg-base-200">
          <ArrowPathIcon className="w-5 h-5"/>
          </button>
        </li>
        <li>
          <input
            onChange={(e) => {
              setStartDate(new Date(`${e.target.value}T00:00`));
            }}
            type="date"
            title="Fecha de inicio"
            className="bg-base-200"
          />
        </li>
        <li>
          <input
            onChange={(e) => {
              setEndDate(new Date(`${e.target.value}T23:59`));
            }}
            type="date"
            title="Fecha de fin"
            className="bg-base-200"
          />
        </li>
      </ul>
      <Line data={dataFilter()} options={misOptionsLineChart} />
    </>
  );
}
