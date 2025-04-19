import { supabase } from "../../supabaseClient";
import { toast } from "react-toastify";
import { tickers } from "../format";
import { Instrument } from "../Types";

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function fetchUserInstruments(): Promise<Instrument[]> {
  const user = await getUser();

  let { data, error } = await supabase
    .from("Instruments")
    .select("*")
    .eq("UID", user?.id)
    .order("created_at", { ascending: true });
  if (error) {
    return [];
  }
  return data as Instrument[];
}

export async function addInstrument(e: React.FormEvent<HTMLFormElement>) {
  const user = await getUser();

  const formData = new FormData(e.target as HTMLFormElement);

  // Sjednot prazdne hodnoty na null
  const getFormValue = (key: string): string | null => {
    const value = formData.get(key) as string;
    return value === "" ? null : value;
  };

  // Získání hodnot z formuláře
  const instrument = getFormValue("instrument")?.toUpperCase();
  const typeOrder = getFormValue("typeOrder");
  let units = getFormValue("units");
  const price = getFormValue("price");
  const fee = getFormValue("fee");
  const dtime = getFormValue("dtime");

  // Kontrola chybějících hodnot
  const missingFields = [];
  if (!instrument) missingFields.push("Ticker");
  if (!price) missingFields.push("Price");
  if (!units) missingFields.push("Units");
  if (!dtime) missingFields.push("Date");
  // Pokud nějaká hodnota chybí, zobrazí chybu
  if (missingFields.length > 0) {
    // .join(", ") metoda vezme všechny položky v poli a spojí je do jednoho řetězce oddělený čárkami
    toast.warning(
      `Please add the following information: ${missingFields.join(", ")}`
    );
    return;
  }

  // Kontrola přitomnosti ticketu v seznam možných
  if (instrument && !tickers.includes(instrument)) {
    toast.warning("Wrong name of instrument, try it again");
    return;
  }

  //Kontrola formatu
  const wrongFormats = [];
  if (Number(price) <= 0) wrongFormats.push("Price");
  if (Number(units) <= 0) wrongFormats.push("Units");
  if (wrongFormats.length > 0) {
    toast.warning(
      `numbers in fields: ${wrongFormats.join(", ")} must be grater than 0`
    );
    return;
  }

  // Sell Lze zadat jen pokud existuje predchozi buy order
  if (typeOrder === "Sell" && instrument) {
    const fetchedData = await fetchUserInstruments();
    console.log(fetchedData);
    const total = fetchedData.reduce((acc, item) => {
      if (acc[item.instrument]) {
        acc[item.instrument] += item.units;
      } else {
        acc[item.instrument] = item.units;
      }
      return acc;
    }, {} as { [key: string]: number });
    if (!total[instrument] || total[instrument] - Number(units) < 0) {
      toast.warning(`You don't have enough shares of ${instrument} to sell`);
      return;
    }
    // V DB chci mit sell ordery se zapornymi hodnoty units
    units = (-1 * Number(units)).toString();
  }

  const { error } = await supabase
    .from("Instruments")
    .insert([
      {
        instrument: instrument,
        typeOrder: typeOrder,
        units: units,
        pricePerUnit: price,
        fee: fee,
        created_at: dtime,
        UID: user?.id,
      },
    ])
    .select();

  if (error) {
    toast.error("Connection failed, please try it later");
    return;
  } else {
    toast.success("Successfully added");
    return;
  }
}

export async function deleteInstrument({ id }: { id: number }) {
  const { error } = await supabase.from("Instruments").delete().eq("id", id);
  if (error) {
    console.log("sth went wrong");
    return;
  } else return await fetchUserInstruments();
}

export async function getInvestedPerInstrument() {
  const user = await getUser();
  const { data, error } = await supabase.rpc("get_invested_per_instrument", {
    uid: user?.id,
  });

  if (error) {
    console.error("Chyba z RPC volání get_units_by_stock:", error);
    return [];
  }
  return data;
}

export async function getPortfolioValue() {
  type StockData = {
    instrument: string;
    totalshares: number;
  };

  const user = await getUser();

  const { data, error } = await supabase.rpc("get_units_by_stock", {
    uid: user?.id,
  });

  if (error) {
    console.error("Chyba z RPC volání get_units_by_stock:", error);
    return [];
  }
  // api key
  const key = import.meta.env.VITE_TWELVE_DATA_CLIENT_KEY;

  const instruments = data as StockData[]; // Pokud není data.array

  const instrumentsWithPrices = await Promise.all(
    instruments.map(async (element) => {
      const { instrument, totalshares } = element;

      try {
        const response = await fetch(
          `https://api.twelvedata.com/price?symbol=${instrument}&apikey=${key}`
        );
        const json = await response.json();

        return {
          instrument,
          totalshares,
          price: json.price ? parseFloat(json.price) : null,
        };
      } catch (err) {
        console.error(`Chyba při získávání ceny pro ${instrument}:`, err);
        return {
          instrument,
          totalshares,
          price: null,
        };
      }
    })
  );
  return instrumentsWithPrices;
}
