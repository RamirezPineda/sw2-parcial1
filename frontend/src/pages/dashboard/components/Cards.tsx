import BanknotesIcon from "@heroicons/react/24/outline/BanknotesIcon";
import ClockIcon from "@heroicons/react/24/outline/ClockIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";


import {
  useGetAverageProfitability,
  useGetAverageSalesPerDay,
  useGetRubroMasVendido,
  useGetTotalSales,
} from "../../../hooks/sales.hook";

import DashboardStats from "./DashboardStats";

interface Props {
  tiendaId: number;
}

function Cards({ tiendaId }: Props) {
  const { total, isLoading, error } = useGetTotalSales(tiendaId);
  const { profitability } = useGetAverageProfitability(tiendaId);
  const { average } = useGetAverageSalesPerDay(tiendaId);
  const { rubroMasVendido } = useGetRubroMasVendido(tiendaId);

  if (isLoading) {
    return <>Loading....</>;
  } else if (error) {
    return <>Error al recuperar los datos</>;
  }

  return (
    <>
      <DashboardStats
        key={total}
        title="Total Ventas"
        value={`${total} Bs`}
        description="↗︎ Total ventas"
        icon={<BanknotesIcon className="w-8 h-8" />}
        colorIndex={0}
      />
      <DashboardStats
        key={total}
        title="Rentabilidad"
        value={`${profitability ? profitability * 100 : 10} %`}
        description="Promedio de rentabilidad"
        icon={<CreditCardIcon className="w-8 h-8" />}
        colorIndex={1}
      />
      <DashboardStats
        key={average}
        title="Ventas Por Día"
        value={`${average}`}
        description="Promedio de ventas por día"
        icon={<ClockIcon className="w-8 h-8" />}
        colorIndex={2}
      />
      <DashboardStats
        key={average}
        title="Rubro Mas Vendido"
        value={`${rubroMasVendido}`}
        description="↗︎ Rubro mas vendido"
        icon={<CircleStackIcon className="w-8 h-8" />}
        colorIndex={2}
      />
    </>
  );
}
export default Cards;
