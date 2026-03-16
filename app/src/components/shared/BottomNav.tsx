import type { View } from '../../types'

type Props = {
  current: View
  onChange: (v: View) => void
}

export function BottomNav({ current, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex safe-bottom"
         style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <button
        onClick={() => onChange('dashboard')}
        className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${current === 'dashboard' ? 'text-accent' : 'text-subtle'}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        Today
      </button>
      <button
        onClick={() => onChange('calendar')}
        className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${current === 'calendar' ? 'text-accent' : 'text-subtle'}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Progress
      </button>
    </nav>
  )
}
