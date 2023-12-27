import { useState } from "react";

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";


import { getDataBarChart, misOptionsBarChart } from "../../../utils";
import { IDataChart } from "../../../interfaces/data.chart.interface";
import { useGetSales } from "../../../hooks/sales.hook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  tiendaId: number; 
}

function BarsChart({ tiendaId }: Props) {

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
      const dataChart = getDataBarChart(sales!);
      return dataChart;
    }

    const dataFilter = sales!.filter((dato) => {
      if (startDate && endDate) {
        const fechaVenta = new Date(dato.fecha_venta);
        if (fechaVenta < startDate || fechaVenta > endDate) return null;
      }

      return dato;
    });

    const dataChart: IDataChart = getDataBarChart(dataFilter);
    return dataChart;
  };

  const cleanFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <>
      <ul className="menu menu-vertical lg:menu-horizontal rounded-box gap-2 mb-4">
        <li>
          <button onClick={cleanFilter} className="">
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
            className=""
          />
        </li>
        <li>
          <input
            onChange={(e) => {
              setEndDate(new Date(`${e.target.value}T23:59`));
            }}
            type="date"
            title="Fecha de fin"
            className=""
          />
        </li>
      </ul>
      <Bar data={dataFilter()} options={misOptionsBarChart} />
    </>
  );
}
export default BarsChart;
