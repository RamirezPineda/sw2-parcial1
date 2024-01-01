import { ChangeEvent, useEffect, useState } from "react";

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getDataPieChart, options } from "../../../utils";
import { IDataChart } from "../../../interfaces/data.chart.interface";
import { useGetSalesByStoreName } from "../../../hooks/sales.hook";


ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  tienda: string;
}

function SimilaryPieCharts({tienda}: Props) {
  const { sales, isLoading, error } = useGetSalesByStoreName(tienda);

  const [data, setData] = useState<IDataChart>({ labels: [], datasets: [] });

  const [selectCategoria, setSelectCategoria] = useState(0);
  const [selectRubro, setSelectRubro] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    if (!sales) return;

    const dataChart: IDataChart = getDataPieChart(sales);

    setData(dataChart);
  }, [sales]);

  useEffect(() => {
    return () => {
      setData({ labels: [], datasets: [] });
    };
  }, []);

  if (isLoading) {
    return <>Loading....</>;
  } else if (error) {
    return <>Error al recuperar los datos</>;
  }
  console.log(sales)

  const categorias = () => {
    const categorias = sales!.filter((dato, index, arr) => {
      return (
        arr.findIndex(
          (element) => element.categoria_id === dato.categoria_id
        ) === index
      );
    });
    return categorias;
  };

  const rubros = () => {
    const rubros = sales!.filter((dato, index, arr) => {
      return (
        arr.findIndex((element) => element.rubro_id === dato.rubro_id) === index
      );
    });
    return rubros;
  };

  const dataFilter = () => {
    if (selectCategoria == 0 && selectRubro == 0 && (!startDate || !endDate)) {
      const dataChart = getDataPieChart(sales!);
      return dataChart;
    }

    const dataFilter = sales!.filter((dato) => {
      if (selectRubro != 0 && dato.rubro_id != selectRubro) {
        return null;
      }

      if (selectCategoria != 0 && dato.categoria_id != selectCategoria) {
        return null;
      }

      if (startDate && endDate) {
        const fechaVenta = new Date(dato.fecha_venta);
        if (fechaVenta < startDate || fechaVenta > endDate) return null;
      }

      return dato;
    });

    const dataChart = getDataPieChart(dataFilter);
    return dataChart;
  };

  const totalVentas = () => {
    let total = 0;
    if (selectCategoria == 0 && selectRubro == 0 && (!startDate || !endDate)) {
      sales!.forEach((element) => {
        total += element.total_venta;
      });
      return Math.round(total);
    }

    sales!.filter((dato) => {
      if (selectRubro != 0 && dato.rubro_id != selectRubro) {
        return null;
      }

      if (selectCategoria != 0 && dato.categoria_id != selectCategoria) {
        return null;
      }

      if (startDate && endDate) {
        const fechaVenta = new Date(dato.fecha_venta);
        if (fechaVenta < startDate || fechaVenta > endDate) return null;
      }

      total += dato.total_venta;
    });

    return Math.round(total);
  };

  const cleanFilter = () => {
    setSelectCategoria(0);
    setSelectRubro(0);
    setStartDate(undefined);
    setEndDate(undefined);
  };
  return (
    <>
    {/* <h3 className="text-xl font-medium">Productos</h3> */}
    <div className="">
      <ul className="menu menu-vertical lg:menu-horizontal rounded-box gap-2">
        <li>
          <button onClick={cleanFilter} className="bg-base-200">
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </li>
        <li>
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setSelectCategoria(parseInt(event.target.value))
            }
            // className="select select-bordered w-full max-w-xs"
            defaultValue={0}
          >
            <option value="0">Seleccionar Categoria</option>
            <option value="0">Todas</option>
            {categorias().map((dato, index) => (
              <option key={index} value={dato.categoria_id}>
                {dato.categoria}
              </option>
            ))}
          </select>
        </li>
        <li>
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setSelectRubro(parseInt(event.target.value))
            }
            defaultValue={0}
          >
            <option value="0">Seleccionar Rubro</option>
            <option value="0">Todas</option>
            {rubros().map((dato, index) => (
              <option key={index} value={dato.rubro_id}>
                {dato.rubro}
              </option>
            ))}
          </select>
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
    </div>
    <div className="h-[30rem] w-full">
      {data.labels.length != 0 ? (
        <Pie data={dataFilter()} options={options} />
      ) : (
        <div>Hola mundo</div>
      )}{" "}
    </div>
    <div className="flex justify-center mt-6">
      <h2 className="font-medium">Total Venta: {totalVentas()} Bs</h2>
    </div>
  </>
  )
}
export default SimilaryPieCharts