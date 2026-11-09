import { useEffect, useRef, useState } from 'react';
import { ProfileMenu, type AppPage } from './ProfileMenu';

export interface AppHeaderProps {
  username: string;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onSignOut: () => void;
}

export function AppHeader({ username, activePage, onNavigate, onSignOut }: AppHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isProfileOpen]);

  const closeProfile = () => {
    setIsProfileOpen(false);
    profileButtonRef.current?.focus();
  };

  return (
    <header className="border-b border-border bg-surface text-fg" role="banner">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
        <p className="mr-auto whitespace-nowrap text-sm font-bold tracking-wide text-primary">
          FLEET INTELLIGENCE CENTER
        </p>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-2">
          {(['Home', 'Drivers Score'] as const).map((page) => (
            <button
              key={page}
              className="rounded-md px-3 py-2 text-sm font-semibold text-fg hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
              type="button"
              aria-current={activePage === page ? 'page' : undefined}
              onClick={() => onNavigate(page)}
            >
              {page}
            </button>
          ))}
        </nav>
        <div ref={profileRef} className="relative">
          <span className="mr-2 text-xs font-semibold text-muted">Signed in as</span>
          <button
            ref={profileButtonRef}
            className="rounded-md px-3 py-2 text-sm font-semibold text-fg hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
            type="button"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            onClick={() => setIsProfileOpen((open) => !open)}
          >
            {username}
          </button>
          {isProfileOpen && (
            <ProfileMenu username={username} onNavigate={onNavigate} onSignOut={onSignOut} onClose={closeProfile} />
          )}
        </div>
      </div>
    </header>
  );
}
