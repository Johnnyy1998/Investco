import { deleteInstrument } from "../../utils/Actions/InstrumentActions";
import { Instrument } from "../../utils/Types";

// Definice typu pro props
interface InstrumentTableProps {
  data: Instrument[];
  setData: React.Dispatch<React.SetStateAction<Instrument[]>>; // Funkce pro aktualizaci stavu
}

function InstrumentTable({ data, setData }: InstrumentTableProps) {
  const handleDelete = async (id: number) => {
    const data = await deleteInstrument({ id });
    if (data) {
      setData(data);
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Instrument</th>
              <th className="text-center">TypeOrder</th>
              <th className="text-center">Date Order</th>
              <th className="text-center">Units</th>
              <th className="text-center">Price Per Unit</th>
              <th className="text-center">Fee</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((instruments) => {
              const {
                id,
                instrument,
                units,
                pricePerUnit,
                fee,
                typeOrder,
                created_at,
              } = instruments;
              return (
                <tr key={id}>
                  <th>{instrument}</th>
                  <td className="text-center">{typeOrder}</td>
                  <td className="text-center">
                    {new Date(created_at).toLocaleDateString()}
                  </td>
                  <td className="text-center">{units}</td>
                  <td className="text-center">{pricePerUnit}</td>
                  <td className="text-center">{fee}</td>
                  <td className="flex justify-end">
                    <button onClick={() => handleDelete(id)}>
                      <span className="text-red-600 font-bold">X</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default InstrumentTable;
