import { Container } from '@/shared/ui/Container';

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Stats', href: '#stats' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" className="text-lg font-bold text-white tracking-tight">
          Pulse<span className="text-yellow-400">Notification</span>
        </a>
        <nav className="flex items-center gap-6">
          {footerLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} PulseNotification. All rights reserved.</p>
      </Container>
    </footer>
  );
}
