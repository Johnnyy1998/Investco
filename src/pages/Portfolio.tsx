import { useEffect, useState } from "react";
import {
  addInstrument,
  fetchUserInstruments,
} from "../utils/Actions/InstrumentActions";
import InstrumentTable from "../Components/Portfolio/InstrumentTable";
import { Instrument } from "../utils/Types";
import ChartLine from "../Components/Portfolio/ChartLine";
import { TotalInvested } from "../Components/Portfolio/TotalInvested";

function Portfolio() {
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState</* any[] */ Instrument[]>([]); // State for storing data

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await fetchUserInstruments();
        if (fetchedData) {
          setData(fetchedData);
        }
      } catch (err) {
        setError("Error fetching data");
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addInstrument(e);
      const updatedData = await fetchUserInstruments();
      if (updatedData) {
        setData(updatedData);
      } else {
        setData([]);
      }
    } catch (err) {
      setError("Error adding instrument");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-7 gap-4">
          <div className="flex flex-col gap-1 ">
            <label className="label">Instrument</label>
            <input name="instrument" type="text" className="input" />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="label">TypeOrder</label>
            <select name="typeOrder" className="select">
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="label">Date</label>
            <input name="dtime" type="date" className="input" />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="label">Units</label>
            <input
              name="units"
              type="number"
              className="input  w-full"
              step="any"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="label">Price per unit</label>
            <input
              name="price"
              type="number"
              className="input  w-full"
              step="any"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="label">Fee</label>
            <input
              name="fee"
              type="number"
              className="input  w-full"
              step="any"
            />
          </div>
          <button
            type="submit"
            className="flex-grow rounded-xl shadow-md bg-sky-100 "
          >
            Add
          </button>
        </div>
      </form>
      <InstrumentTable data={data} setData={setData} />
      <TotalInvested data={data} />
      <ChartLine data={data} />
    </>
  );
}

export default Portfolio;
