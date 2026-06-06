'use client';

import { useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';


export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <Container className="flex items-center justify-between h-16">
        <a href="/" className="text-xl font-bold text-white tracking-tight">
          Pulse<span className="text-yellow-400">Scan</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <Button>Download Android app</Button>
        </nav>

        <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
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
        <div className="md:hidden border-t border-white/5 bg-gray-950 px-4 py-4 space-y-3">
          <Button className="w-full">Get Started</Button>
        </div>
      )}
    </header>
  );
}
