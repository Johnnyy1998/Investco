import { useEffect, useState } from "react";
import {
  addInstrument,
  fetchUserInstruments,
} from "../utils/Actions/InstrumentActions";
import InstrumentTable from "../Components/Portfolio/InstrumentTable";
import { Instrument } from "../utils/Types";
import ChartLine from "../Components/Portfolio/ChartLine";
import { ChartBar } from "../Components/Portfolio/ChartBar";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { tickers } from "../utils/format";

function Portfolio() {
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<Instrument[]>([]); // State for storing data

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

  // Ticker input handling
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(tickers);
  const [isValid, setIsValid] = useState(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    const Filtred = tickers.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    if (Filtred.length < 1) setIsValid(false);
    else setIsValid(true);
    setFilteredOptions(Filtred.slice(0, 10));
  }

  function handleSelect(option: string) {
    setInputValue(option);
    setFilteredOptions([]);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <div className="grid grid-cols-7 gap-1 md:gap-4"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
          <div className="flex flex-col gap-1 ">
            <label className="label">Ticker</label>
            <>
              <input
                type="text"
                placeholder="Choose ticker"
                className="input"
                name="instrument"
                value={inputValue}
                onChange={handleChange}
                autoComplete="off"
              />
              {inputValue && (
                <ul className="autocomplete-list">
                  {filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(option)}
                      className="autocomplete-item autocomplete-item:hover"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </>
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
          <div className="flex flex-col col-span-1 sm:col-span-2 md:col-span-1">
            {/* < Button text="Add" />  */}
            <button
              type="submit"
              disabled={!isValid}
              className="flex-grow rounded-xl shadow-md bg-sky-100 "
            >
              Add
            </button>
            <ToastContainer position="top-right" autoClose={1800} />
          </div>
        </div>
        {!isValid && (
          <p className="text-red-600 font-semibold ">Ticker does not exists</p>
        )}
      </form>
      {error ? (
        <p>Something went wrong, try it later</p>
      ) : (
        <>
          <InstrumentTable data={data} setData={setData} />
          <ChartBar data={data} />
          <ChartLine data={data} />
          <p className="text-center mt-10 text-sm underline">
            <Link to="/portfolioValue" className="text-black">
              For more info, look at current value of your portfolio
            </Link>
          </p>
        </>
      )}
    </>
  );
}

export default Portfolio;
