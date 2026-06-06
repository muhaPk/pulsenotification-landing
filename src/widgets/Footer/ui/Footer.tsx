import { Container } from '@/shared/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" className="text-lg font-bold text-white tracking-tight">
          Pulse<span className="text-yellow-400">Notification</span>
        </a>
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} PulseNotification. All rights reserved.</p>
      </Container>
    </footer>
  );
}
