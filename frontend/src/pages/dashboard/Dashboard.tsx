import { useState, ChangeEvent } from "react";

import PiesChart from "./components/PiesCharts";
import BarsChart from "./components/BarsCharts";

import LinesChart from "./components/LinesChart";
import { useGetAllStores } from "../../hooks/sales.hook";
import DashboardStats from "./components/DashboardStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import TitleCard from "../../components/cards/TitleCard";

const statsData = [
  {
    title: "New Users",
    value: "34.7k",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Total Sales",
    value: "$34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Pending Leads",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads",
  },
  {
    title: "Active Users",
    value: "5.6k",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

function Dashboard() {
  const { stores, isLoading, error } = useGetAllStores();

  const [tiendaSelect, setTiendaSelect] = useState<number>(10000);

  if (isLoading) {
    return <>Loading....</>;
  } else if (error) {
    return <>Error al recuperar los datos</>;
  }

  // const dataTienda = (tiendaId: number) => {
  //   const dataFilter = datos.filter((dato) => dato.tienda_id == tiendaId);
  //   setTiendaSelect(dataFilter);
  // };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="">
          <h2 className="mr-4 text-3xl font-semibold mb-2">Tiendas </h2>
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setTiendaSelect(parseInt(event.target.value))
            }
            defaultValue={stores ? stores[0].tienda_id : 10000}
            className="select select-bordered w-full max-w-xs"
          >
            {stores?.map((store) => (
              <option key={store.tienda_id} value={store.tienda_id}>
                {store.tienda}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        {/* <LineChart /> */}
        <TitleCard title="Ventas A Lo Largo Del Tiempo">
          <LinesChart tiendaId={tiendaSelect} />
        </TitleCard>
        <TitleCard title="Ventas Por Hora">
          <BarsChart tiendaId={tiendaSelect} />
        </TitleCard>
      </div>

      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <TitleCard title="Productos Mas Vendidos">
          <PiesChart tiendaId={tiendaSelect} />
        </TitleCard>
      </div>

    </>
  );
}
export default Dashboard;
