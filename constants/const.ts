import shops_json from "../data/shop.json";

export type StateFormat = {
  cookies: number;
  cps: number;
  amountOwned: number[];
  shops: any;
};

export type ItemFormat = {
  cost: number;
  clicks_per_second: number;
  id: number;
};

export const stateInit = {
  cookies: 0,
  cps: 0,
  amountOwned: [0, 0, 0],
  shops: shops_json,
};

export const arrayObj = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const rand = () => {
  return Math.floor(Math.random() * (2 - 0 + 1)) + 0;
};
