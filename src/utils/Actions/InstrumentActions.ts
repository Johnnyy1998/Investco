import { supabase } from "../../supabaseClient";

/* export async function fetchInstruments() {
  let { data, error } = await supabase
    .from("Instruments")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    //setError("Connectio to DB failed");
    return [];
  }
  return data;
} */

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

  const { data, error } = await supabase
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
