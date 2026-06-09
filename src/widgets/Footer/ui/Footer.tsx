import { Container } from '@/shared/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-title/5 py-12">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/">
          <img src="/images/logo.png" alt="PulseNotification" className="h-8 w-auto" />
        </a>
        <div className="flex items-center gap-4">
          <a
            href="https://t.me/PulseNotificationGroup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-label hover:text-accent transition-colors no-underline"
          >
            Group
          </a>
          <a
            href="https://t.me/PulseNotification"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-label hover:text-accent transition-colors no-underline"
          >
            Channel
          </a>
          <span className="text-xs text-paragraph">&copy; {new Date().getFullYear()} PulseNotification.</span>
        </div>
      </Container>
    </footer>
  );
}
