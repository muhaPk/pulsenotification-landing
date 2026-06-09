'use client';

import { useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';


export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-xl">
      <Container className="flex items-center justify-between h-16">
        <a href="/" className="flex flex-col justify-center items-start no-underline">
          <img src="/images/logo.png" alt="PulseNotification" className="h-10 w-auto" />
          <span className="text-primary font-oswald-100 text-sm">Pulse Notification</span>
        </a>


        <nav className="hidden md:flex items-center gap-6">
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
        </nav>

        <button className="md:hidden text-title p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-title/5 bg-background px-4 py-4 space-y-3">
          <a
            href="https://t.me/PulseNotificationGroup"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-label hover:text-accent transition-colors no-underline py-2"
          >
            Group
          </a>
          <a
            href="https://t.me/PulseNotification"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-label hover:text-accent transition-colors no-underline py-2"
          >
            Channel
          </a>
        </div>
      )}
    </header>
  );
}
