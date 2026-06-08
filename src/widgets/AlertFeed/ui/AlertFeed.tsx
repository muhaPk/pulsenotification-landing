'use client';

import { useEffect, useCallback } from 'react';
import { useGenericGetWeb } from '@/shared/hooks/useGenericGetWeb';
import { API_ALERTS } from '@/shared/config/endpoints';
import { Container } from '@/shared/ui/Container';
import { Sparkline } from '@/shared/ui/Sparkline';
import { Alert } from '@/shared/types/alert';
import { formatTime, timeAgo } from '@/shared/lib/date';

const POLL_INTERVAL = 60000;

export function AlertFeed() {
  const { data: alerts, loading, loadData } = useGenericGetWeb();

  const refreshAlerts = useCallback(() => {
    loadData({ api: API_ALERTS, isRefreshing: true });
  }, [loadData]);

  useEffect(() => {
    loadData({ api: API_ALERTS });
    const interval = setInterval(refreshAlerts, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [loadData, refreshAlerts]);

  const list: Alert[] = Array.isArray(alerts)
    ? alerts.filter((a) => Date.now() - new Date(a.createdAt).getTime() < 86400000)
    : [];

  return (
    <section className="py-24 border-t border-title/5">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-title">Recent Alerts</h2>
          <p className="mt-3 text-label max-w-xl mx-auto">
            Latest alerts on user-tracked pairs
          </p>
        </div>

        {loading && list.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full" />
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-paragraph">No alerts yet. Alerts will appear here when price movements are detected.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
              {list.map((alert) => {
                const isPump = alert.direction === 'PUMP';
                return (
                  <div
                    key={alert.id}
                    className="flex items-center gap-4 border-b border-title/10 transition-colors pb-6 mb-6"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-title font-oswald-700 text-base">
                          {alert.base}/{alert.target}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                            alert.pairType === 'futures' ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500'
                          }`}
                        >
                          {alert.pairType === 'futures' ? 'FUT' : 'SPOT'}
                        </span>
                        <span className="text-xs text-paragraph capitalize hidden sm:inline">{alert.exchange}</span>
                      </div>
                    </div>

                    <div className="hidden sm:block shrink-0">
                      <Sparkline
                        symbol={`${alert.base}${alert.target}`}
                        pairType={alert.pairType}
                        width={64}
                        height={36}
                        color={isPump ? '#22c55e' : '#ef4444'}
                        highlight={isPump ? 'up' : 'down'}
                        createdAt={alert.createdAt}
                      />
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`text-sm font-bold ${isPump ? 'text-green-500' : 'text-red-500'}`}>
                        {isPump ? '+' : ''}{alert.changePct.toFixed(2)}%
                      </div>
                      <div className="text-paragraph text-xs hidden sm:block" title={formatTime(alert.createdAt)}>
                        {timeAgo(alert.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Container>
    </section>
  );
}
