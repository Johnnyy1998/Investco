import { useState } from "react";
import {
  addInstrument,
  fetchUserInstruments,
} from "../utils/Actions/InstrumentActions";
import InstrumentTable from "../Components/Portfolio/InstrumentTable";

import ChartLine from "../Components/Portfolio/ChartLine";
import { ChartBar } from "../Components/Portfolio/ChartBar";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { tickers } from "../utils/format";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Portfolio() {
  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ["Orders"],
    queryFn: fetchUserInstruments,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return addInstrument(e);
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["PortfolioValue"] });
      queryClient.invalidateQueries({ queryKey: ["TotalInvested"] });
    },
  });

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

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      <form onSubmit={(e) => mutation.mutate(e)}>
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
          <InstrumentTable data={data} refetch={refetch} />
          <ChartBar />
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
