'use client';

import { useEffect, useMemo, useState } from 'react';
import { sparklineUp, sparklineDown, sparklineMuted } from '@/shared/config/colors';

type Candle = { time: number; price: number };

interface SparklineProps {
  symbol?: string;
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
  highlight?: 'up' | 'down';
  createdAt?: string;
  pairType?: string;
}

function klinesBaseUrl(pairType: string): string {
  return pairType === 'futures'
    ? 'https://fapi.binance.com/fapi/v1/klines'
    : 'https://api.binance.com/api/v3/klines';
}

const inflight = new Map<string, Promise<Candle[]>>();

async function fetchSparklineData(symbol: string, pairType: string, createdAt?: string): Promise<Candle[]> {
  const key = createdAt ? `${symbol}_${pairType}_${createdAt}` : `${symbol}_${pairType}`;
  if (inflight.has(key)) return inflight.get(key)!;

  let url = `${klinesBaseUrl(pairType)}?symbol=${symbol.toUpperCase()}&interval=1m&limit=60`;
  if (createdAt) {
    url += `&endTime=${new Date(createdAt).getTime()}`;
  }
  const promise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      return (data as any[]).map((k: any) => ({ time: k[0], price: parseFloat(k[4]) }));
    } catch {
      return [];
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
}

function buildPath(
  prices: number[],
  width: number,
  height: number,
  adjMin: number,
  adjRange: number,
  startIdx: number,
  endIdx: number,
): string {
  const stepX = width / (prices.length - 1);
  const parts: string[] = [];
  for (let i = startIdx; i <= endIdx; i++) {
    const x = i * stepX;
    const y = height - ((prices[i] - adjMin) / adjRange) * height;
    parts.push(`${i === startIdx ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return parts.join(' ');
}

export function Sparkline({ symbol, pairType = 'spot', data: staticData, width = 80, height = 28, color, highlight, createdAt }: SparklineProps) {
  const [candles, setCandles] = useState<Candle[] | null>(null);

  useEffect(() => {
    if (staticData) {
      setCandles(staticData.map((price) => ({ time: 0, price })));
      return;
    }
    if (!symbol) return;

    let cancelled = false;

    fetchSparklineData(symbol, pairType, createdAt).then((result) => {
      if (!cancelled) setCandles(result);
    });

    return () => { cancelled = true; };
  }, [symbol, pairType, staticData, createdAt]);

  const { beforePath, midPath, afterPath, hasHighlight } = useMemo(() => {
    if (!candles || candles.length < 2)
      return { beforePath: '', midPath: '', afterPath: '', hasHighlight: false };

    const prices = candles.map((c) => c.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;

    const pad = range * 0.1;
    const adjMin = min - pad;
    const adjMax = max + pad;
    const adjRange = adjMax - adjMin;

    const stepX = width / (prices.length - 1);

    const full = prices
      .map((p, i) => {
        const x = i * stepX;
        const y = height - ((p - adjMin) / adjRange) * height;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    let hl = false;
    let before = full;
    let mid = '';
    let after = '';

    if (highlight && createdAt && candles.length >= 2) {
      const targetTime = new Date(createdAt).getTime() - 60000;
      const firstTime = candles[0].time;
      const lastTime = candles[candles.length - 1].time;

      if (firstTime !== lastTime && targetTime >= firstTime) {
        const ratio = (targetTime - firstTime) / (lastTime - firstTime);
        const idx = Math.max(0, Math.min(Math.floor(ratio * (prices.length - 1)), prices.length - 2));

        hl = true;
        before = buildPath(prices, width, height, adjMin, adjRange, 0, idx);
        mid = buildPath(prices, width, height, adjMin, adjRange, idx, idx + 1);
        after = buildPath(prices, width, height, adjMin, adjRange, idx + 1, prices.length - 1);
      }
    }

    return { beforePath: before, midPath: mid, afterPath: after, hasHighlight: hl };
  }, [candles, width, height, highlight, createdAt]);

  if (!candles || candles.length < 2) return null;

  const prices = candles.map((c) => c.price);
  const hlColor = highlight === 'up' ? sparklineUp : sparklineDown;
  const resolvedColor = color ?? (prices[prices.length - 1] >= prices[0] ? sparklineUp : sparklineDown);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0"
    >
      <path
        d={beforePath}
        stroke={highlight ? sparklineMuted : resolvedColor}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {hasHighlight && (
        <path
          d={midPath}
          stroke={hlColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {hasHighlight && (
        <path
          d={afterPath}
          stroke={sparklineMuted}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
