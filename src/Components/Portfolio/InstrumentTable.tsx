import { useState } from "react";
import { deleteInstrument } from "../../utils/Actions/InstrumentActions";
import { Instrument } from "../../utils/Types";
import { useQueryClient } from "@tanstack/react-query";

// Definice typu pro props
interface InstrumentTableProps {
  data: Instrument[];
  refetch: any;
}

function InstrumentTable({ data, refetch }: InstrumentTableProps) {
  const queryClient = useQueryClient();
  const handleDelete = async (id: number) => {
    const data = await deleteInstrument({ id });
    if (data) {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["PortfolioValue"] });
      queryClient.invalidateQueries({ queryKey: ["TotalInvested"] });
    }
  };

  const [page, setPage] = useState(1);
  const maxItemsOnPage = 8;
  const maxPage = Math.ceil(data.length / maxItemsOnPage);

  const NextPage = () => {
    if (page === maxPage) return;
    setPage(page + 1);
  };
  const PreviousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  const startItem = page * maxItemsOnPage - 8;
  const endItem = page * maxItemsOnPage;
  const currentData = data.slice(startItem, endItem);

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
            {currentData.map((instruments) => {
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
                  <td className="text-center">
                    {typeOrder === "Sell" ? -1 * units : units}
                  </td>
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
        {data.length > 0 && (
          <div className="grid grid-cols-3 mt-3 mb-3">
            {page === 1 ? (
              <div></div>
            ) : (
              <button
                className="btn btn-primary justify-self-start ml-2"
                onClick={PreviousPage}
              >
                Previous
              </button>
            )}
            <p className="font-semibold text-center">Page: {page}</p>
            {page === maxPage || maxPage === 1 ? (
              <div></div>
            ) : (
              <button
                className="btn btn-primary justify-self-end mr-2"
                onClick={NextPage}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default InstrumentTable;
