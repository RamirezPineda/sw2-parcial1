import { ChangeEvent, useState } from "react";
import { useGetSimilary } from "../../../hooks/sales.hook";
import TitleCard from "../../../components/cards/TitleCard";
import SimilaryPieCharts from "./SimilaryPieCharts";

interface Props {
  tiendaId: number;
}

function SimilarStore({ tiendaId }: Props) {
  const { data, isLoading, error } = useGetSimilary(tiendaId);

  const [tiendaSelect, setTiendaSelect] = useState<string>("");

  if (isLoading) {
    return <h4 className="font-medium text-xl">Calculando tiendas similares....</h4>;
  } else if (error) {
    return <>Error al recuperar los datos</>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="">
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setTiendaSelect(event.target.value)
            }
            defaultValue={""}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">Seleccionar tienda</option>
            {Object.entries(data!).map(([tienda, valor]) => (
              <option value={tienda} key={tienda}>
                {tienda}: {Math.round(valor * 100)}%
              </option>
            ))}
          </select>
        </div>
        <div>
          {tiendaSelect != "" ? (
            <>
              <TitleCard title="Productos Mas Vendidos">
                <SimilaryPieCharts tienda={tiendaSelect} />
              </TitleCard>
            </>
          ) : (
            "No selecciono ninguna tienda"
          )}
        </div>
      </div>
    </>
  );
}
export default SimilarStore;
