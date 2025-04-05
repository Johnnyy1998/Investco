import { useEffect, useState } from "react";
import { getPortfolioValue } from "../utils/Actions/InstrumentActions";
import { formatCurrency } from "../utils/format";
import { StockData } from "../utils/Types";
import ChartPie from "../Components/Portfolio/ChartPie";
import { Link } from "react-router-dom";

function ValueOfInvestments() {
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<StockData[]>([]); // State for storing data

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getPortfolioValue();
        if (fetchedData) {
          setData(fetchedData);
          console.log(fetchedData);
        }
      } catch (err) {
        setError("Error fetching data");
      }
    }

    fetchData();
  }, []);

  const totalPrice = data?.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.totalshares ?? 0),
    0
  );

  return (
    <>
      {data.length > 0 ? (
        <>
          <h1 className="text-3xl text-center font-semibold md:-mb-5 mb-10">
            Current value of Portfolio based on your instruments
          </h1>

          <ChartPie data={data} />
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left border-b">Instrument</th>
                  <th className="px-4 py-2 text-center border-b">Units</th>
                  <th className="px-4 py-2 text-right border-b">
                    Current Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ instrument, totalshares, price }) => (
                  <tr key={instrument} className="even:bg-gray-50">
                    <td className="px-4 py-2 border-b">{instrument}</td>
                    <td className="px-4 py-2 text-center border-b">
                      {totalshares}
                    </td>
                    <td className="px-4 py-2 text-right border-b">
                      {formatCurrency(price)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-200 font-semibold">
                  <td className="px-4 py-2 border-t text-left">
                    Portfolio value
                  </td>
                  <td className="px-4 py-2 border-t"></td>
                  <td className="px-4 py-2 border-t text-right">
                    {formatCurrency(totalPrice)}
                  </td>
                </tr>
              </tbody>
            </table>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p className="text-center mt-8">
              <Link
                to="/portfolio"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Add new instrument
              </Link>
            </p>
          </div>
        </>
      ) : (
        <div className="p-4">
          <p className="text-xl text-gray-800 text-center">
            We could not find any records related to your investments in our
            system.{" "}
            <Link
              to="/portfolio"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Click to add your first instrument
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
}

export default ValueOfInvestments;
