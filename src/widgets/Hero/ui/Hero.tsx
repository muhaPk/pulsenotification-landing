import { Container } from '@/shared/ui/Container';

export function Hero() {
  return (
    <section className="relative pt-32 pb-4 overflow-hidden">

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="relative mx-auto max-w-xs lg:max-w-none">
            <img
              src="/images/phone.png"
              alt="PulseNotification app preview"
              className="w-sm h-auto"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight max-w-4xl">
              Never miss a volatility spike again
            </h1>

            <p className="mt-6 text-lg text-label max-w-2xl leading-relaxed">
              Get instant push notifications when abnormal price movements are detected.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a href="https://api.pulsenotification.com/downloads/pulsenotification.apk" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-semibold rounded-xl transition-all duration-200 px-8 py-4 bg-accent text-black hover:brightness-110 shadow-lg shadow-accent/25 no-underline"
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                <span className="flex flex-col items-start">
                  <span className="text-base leading-tight">Download apk 1.0.0</span>
                  <span className="text-xs leading-tight opacity-70 font-normal">pulse notification</span>
                </span>
              </a>
            </div>
          </div>

          
        </div>
      </Container>
    </section>
  );
}
