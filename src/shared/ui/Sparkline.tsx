'use client';

import { useEffect, useState } from 'react';

type Candle = { time: number; price: number };

interface SparklineProps {
  symbol?: string;
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
  highlight?: 'up' | 'down';
  createdAt?: string;
}

async function fetchSparklineData(symbol: string): Promise<Candle[]> {
  const res = await fetch(`/api/sparkline/${symbol}`);
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data || []) as Candle[];
}

export function Sparkline({ symbol, data: staticData, width = 80, height = 28, color, highlight, createdAt }: SparklineProps) {
  const [candles, setCandles] = useState<Candle[] | null>(null);

  useEffect(() => {
    if (staticData) {
      setCandles(staticData.map((price) => ({ time: 0, price })));
      return;
    }
    if (!symbol) return;

    let cancelled = false;
    setCandles(null);

    fetchSparklineData(symbol).then((result) => {
      if (!cancelled) setCandles(result);
    });

    return () => { cancelled = true; };
  }, [symbol, staticData]);

  const prices = candles?.map((c) => c.price);
  if (!prices || prices.length < 2) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const toPoint = (v: number, i: number) => {
    const x = (i / (prices.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  };

  const fullPath = prices.map((v, i) => `${i === 0 ? 'M' : 'L'}${toPoint(v, i)}`).join(' ');

  let highlightIndex: number | null = null;
  if (highlight && createdAt && candles) {
    const alertMs = new Date(createdAt).getTime();
    const hourMs = 3600000;
    for (let i = 0; i < candles.length; i++) {
      if (alertMs >= candles[i].time && alertMs < candles[i].time + hourMs) {
        highlightIndex = i;
        break;
      }
    }
  }

  const highlightColor = highlight === 'up' ? '#22c55e' : highlight === 'down' ? '#ef4444' : null;
  const resolvedColor = color ?? (prices[prices.length - 1] >= prices[0] ? '#22c55e' : '#ef4444');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0"
    >
      {highlightColor && highlightIndex !== null ? (
        <>
          <path d={fullPath} fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={prices
              .slice(highlightIndex, highlightIndex + 2)
              .map((v, i) => `${i === 0 ? 'M' : 'L'}${toPoint(v, highlightIndex + i)}`)
              .join(' ')}
            fill="none"
            stroke={highlightColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path d={fullPath} fill="none" stroke={resolvedColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
