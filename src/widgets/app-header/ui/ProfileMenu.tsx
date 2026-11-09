import { useEffect, useRef } from 'react';

export type AppPage = 'Home' | 'Drivers Score';

export interface ProfileMenuProps {
  username: string;
  onNavigate: (page: AppPage) => void;
  onSignOut: () => void;
  onClose: () => void;
}

export function ProfileMenu({ username, onNavigate, onSignOut, onClose }: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menuRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const navigate = (page: AppPage) => {
    onNavigate(page);
    onClose();
  };

  const signOut = () => {
    onSignOut();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full z-20 mt-2 min-w-56 rounded-lg border border-border bg-surface p-2 text-fg shadow-lg"
      role="menu"
      tabIndex={-1}
      aria-label="Profile menu"
    >
      <div className="border-b border-border px-3 py-2">
        <p className="text-xs font-semibold text-muted">Signed in as</p>
        <p className="text-sm font-semibold text-fg">{username}</p>
      </div>
      <div className="mt-1 flex flex-col" role="none">
        <button
          className="rounded-md px-3 py-2 text-left text-sm text-fg hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
          type="button"
          role="menuitem"
          onClick={() => navigate('Home')}
        >
          Home
        </button>
        <button
          className="rounded-md px-3 py-2 text-left text-sm text-fg hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
          type="button"
          role="menuitem"
          onClick={() => navigate('Drivers Score')}
        >
          Drivers Score
        </button>
        <button
          className="rounded-md px-3 py-2 text-left text-sm text-danger hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
          type="button"
          role="menuitem"
          onClick={signOut}
        >
          ↪ Sign Out
        </button>
      </div>
    </div>
  );
}
