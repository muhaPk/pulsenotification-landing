import { Container } from '@/shared/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-title/5 py-12">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/">
          <img src="/images/logo.png" alt="PulseNotification" className="h-8 w-auto" />
        </a>
        <p className="text-xs text-paragraph">&copy; {new Date().getFullYear()} PulseNotification. All rights reserved.</p>
      </Container>
    </footer>
  );
}
