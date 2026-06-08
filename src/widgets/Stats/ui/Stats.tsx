import { Container } from '@/shared/ui/Container';

const stats = [
  { value: '5+', label: 'Exchanges supported' },
  { value: '100+', label: 'Trading pairs' },
  { value: '<2s', label: 'Alert latency' },
  { value: '99.9%', label: 'Uptime' },
];

export function Stats() {
  return (
    <section id="stats" className="py-20 border-t border-title/5">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-title to-paragraph">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-paragraph">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
