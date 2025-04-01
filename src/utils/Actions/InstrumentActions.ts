import { supabase } from "../../supabaseClient";

export async function fetchUserInstruments() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data, error } = await supabase
    .from("Instruments")
    .select("*")
    .eq("UID", user?.id)
    .order("created_at", { ascending: true });
  if (error) {
    return [];
  }
  return data;
}

export async function addInstrument(e: React.FormEvent<HTMLFormElement>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const formData = new FormData(e.target as HTMLFormElement);
  let instrument = formData.get("instrument") as string | null;
  let typeOrder = formData.get("typeOrder") as string | null;
  let units = formData.get("units") as string | null;
  let price = formData.get("price") as string | null;
  let fee = formData.get("fee") as string | null;
  let dtime = formData.get("dtime") as string | null;

  fee = fee === "" ? null : fee;
  price = price === "" ? null : price;
  units = units === "" ? null : units;

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
    console.log("connection failed");
  } else {
    console.log("added");
  }
}

export async function deleteInstrument({ id }: { id: number }) {
  const { error } = await supabase.from("Instruments").delete().eq("id", id);
  if (error) {
    console.log("sth went wrong");
    return;
  } else return await fetchUserInstruments();
}

export async function getPortfolioValue() {
  type StockData = {
    instrument: string;
    totalshares: number;
  };

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Chyba při získávání uživatele:", userError);
    return [];
  }

  const { data, error } = await supabase.rpc("get_units_by_stock", {
    uid: user.id,
  });

  if (error) {
    console.error("Chyba z RPC volání get_units_by_stock:", error);
    return [];
  }

  console.log("Výstup z get_units_by_stock:", data);

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
