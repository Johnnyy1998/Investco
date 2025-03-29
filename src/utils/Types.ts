export type Instrument = {
  id: number;
  created_at: Date;
  instrument: string;
  units: number;
  pricePerUnit: number;
  fee: number;
  typeOrder: string;
};
