import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';

export function CTA() {
  return (
    <section className="py-24 border-t border-title/5">
      <Container className="text-center">
        <div className="max-w-2xl mx-auto rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/5 to-transparent p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-title">
            Ready to catch every move?
          </h2>
          <p className="mt-4 text-label max-w-md mx-auto">
            Join traders who never miss a volatility spike. Start monitoring in under a minute.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="text-base px-8 py-4">Get Started Free</Button>
            <Button variant="secondary" className="text-base px-8 py-4">
              Contact Sales
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
