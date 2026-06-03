import { NextRequest } from 'next/server';

const SPOT_URL = 'https://api.binance.com/api/v3/klines';
const FUTURES_URL = 'https://fapi.binance.com/fapi/v1/klines';

type KlinePoint = { time: number; price: number };

async function fetchKlines(baseUrl: string, symbol: string): Promise<KlinePoint[] | null> {
  try {
    const res = await fetch(`${baseUrl}?symbol=${symbol}&interval=1h&limit=24`);
    if (!res.ok) return null;
    const klines = await res.json();
    return (klines as unknown[][]).map((k) => ({
      time: k[0] as number,
      price: parseFloat(k[4] as string),
    }));
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;

  const data =
    (await fetchKlines(SPOT_URL, symbol)) ??
    (await fetchKlines(FUTURES_URL, symbol)) ??
    [];

  return Response.json({ data });
}
