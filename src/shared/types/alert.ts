export interface Alert {
  id: string;
  userId: string;
  pairId: string;
  exchange: string;
  base: string;
  target: string;
  pairType: string;
  changePct: number;
  multiplier: number;
  avgVolatility: number;
  priceAtAlert: number;
  direction: string;
  createdAt: string;
}
