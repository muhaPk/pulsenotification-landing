import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';

export function Hero() {
  return (
    <section className="relative pt-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f3b20610,_transparent_50%)]" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/5 text-yellow-400 text-xs font-medium mb-8">
              Real-time crypto market monitoring
            </div> */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
              Never miss a volatility spike again
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">
              PulseNotification monitors thousands of crypto pairs across Binance, Bybit, OKX, Kraken, and Coinbase.
              Get instant push notifications when abnormal price movements are detected.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Button className="text-base px-8 py-4">Download Android app</Button>
            </div>

            <p className="mt-4 text-xs text-gray-500">No credit card required · 30-day free trial</p>
          </div>

          <div className="relative mx-auto max-w-xs lg:max-w-none">
            <img
              src="/images/phone.png"
              alt="PulseNotification app preview"
              className="w-sm h-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
