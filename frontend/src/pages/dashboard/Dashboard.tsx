import { useState, ChangeEvent } from "react";

import PiesChart from "./components/PiesCharts";
import BarsChart from "./components/BarsCharts";

import LinesChart from "./components/LinesChart";
import { useGetAllStores } from "../../hooks/sales.hook";

import TitleCard from "../../components/cards/TitleCard";

import SimilarStore from "./components/SimilarStore";
import Cards from "./components/Cards";
// import ProductPieCharts from "./components/ProductPieCharts";

function Dashboard() {
  const { stores, isLoading, error } = useGetAllStores();

  const [tiendaSelect, setTiendaSelect] = useState<number>(10000);
  const [calculateSimilar, setCalculateSimilar] = useState<boolean>(false);

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
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setCalculateSimilar(false);
              setTiendaSelect(parseInt(event.target.value));
            }}
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

      <div className="grid lg:grid-cols-4 mt-6 md:grid-cols-2 grid-cols-1 gap-6">
        <Cards tiendaId={tiendaSelect} />
      </div>

      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
      </div> */}

      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <TitleCard title="Ventas A Lo Largo Del Tiempo">
          <LinesChart tiendaId={tiendaSelect} />
        </TitleCard>
      </div>

      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <TitleCard title="Ventas Por Hora">
          <BarsChart tiendaId={tiendaSelect} />
        </TitleCard>
      </div>

      {/* <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <TitleCard title="Rentabilidad De Productos">
          <ProductPieCharts tiendaId={tiendaSelect} />
        </TitleCard>
      </div> */}

      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <TitleCard title="Productos Mas Vendidos">
          <PiesChart tiendaId={tiendaSelect} />
        </TitleCard>
      </div>

      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        {calculateSimilar ? (
          <SimilarStore tiendaId={tiendaSelect} />
        ) : (
          <button
            onClick={() => setCalculateSimilar(true)}
            className="bg-primary w-60 mt-4 px-4 py-2 rounded-md font-medium text-white hover:bg-primary-dark"
          >
            Calcular Tiendas Similares
          </button>
        )}
      </div>
    </>
  );
}
export default Dashboard;
