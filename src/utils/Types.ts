export type Instrument = {
  id: number;
  created_at: Date;
  instrument: string;
  units: number;
  pricePerUnit: number;
  fee: number;
  typeOrder: string;
};

export type StockData = {
  instrument: string;
  totalshares: number;
  price: number | null;
};
