export type ExpenseType = {
  id: number;
  exchangeRates: ExchangeRatesType;
  value: string;
  currency: string;
  description: string;
  tag: string;
  method: string;
};

export type ExchangeRatesType = {
  [key: string]: {
    code: string;
    name: string;
    ask: string;
  };
};

export type WalletState = {
  currencies: string[];
  expenses: ExpenseType[];
  editingId: number | null;
};

export type RootState = {
  wallet: WalletState;
  user: {
    email: string;
  }
};
