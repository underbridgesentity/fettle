import { Mascot } from './Mascot'
import { T } from '../lib/theme'
import { useStore } from '../lib/store'
import { levelFromXp, stageForLevel } from '../lib/gamification'
import type { Tab } from './TabBar'

// Desktop-only sidebar (hidden under 960px, see .side-nav in styles.css).
// Mirrors the mobile TabBar: same four tabs plus the snap CTA.
const ITEMS: { tab: Tab; label: string; icon: React.ReactNode }[] = [
  {
    tab: 'home',
    label: 'Home',
    icon: (
      <>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9h4v-5h4v5h4v-9" />
      </>
    ),
  },
  {
    tab: 'challenges',
    label: 'Challenges',
    icon: (
      <>
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
        <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 20h6M12 13v4" />
      </>
    ),
  },
  {
    tab: 'squad',
    label: 'Squad',
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" />
        <circle cx="17" cy="9" r="2.6" />
        <path d="M15.8 14.6c2.4.2 4.2 1.6 4.7 4.4" />
      </>
    ),
  },
  {
    tab: 'profile',
    label: 'You',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
      </>
    ),
  },
]

export function SideNav({ tab, onTab, onCapture }: { tab: Tab; onTab: (t: Tab) => void; onCapture: () => void }) {
  const { data } = useStore()
  const stage = data ? stageForLevel(levelFromXp(data.xp)).current.name : 'Sprout'

  return (
    <nav className="side-nav" aria-label="Main">
      {/* wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 16px 22px' }}>
        <Mascot stage={stage} size={38} />
        <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 26, color: T.text, letterSpacing: '-0.02em' }}>Pippin</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {ITEMS.map((it) => (
          <button key={it.tab} className={`snav-item${tab === it.tab ? ' active' : ''}`} onClick={() => onTab(it.tab)}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              {it.icon}
            </svg>
            {it.label}
          </button>
        ))}
      </div>

      <button
        onClick={onCapture}
        className="pressable"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          margin: '18px 10px 0',
          padding: '14px 16px',
          background: 'linear-gradient(160deg,#4cd884,#23b35f)',
          color: T.ink,
          border: 'none',
          borderRadius: T.r.pill,
          fontFamily: T.display,
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 12px 28px rgba(35,179,95,0.34)',
          ['--press-y' as string]: '2px',
        }}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8c0-1.1.9-2 2-2h1.5l1.2-1.6c.4-.5 1-.9 1.6-.9h3.4c.6 0 1.2.4 1.6.9L16.5 6H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
          <circle cx="12" cy="12.5" r="3.4" />
        </svg>
        Snap a meal
      </button>

      <div style={{ flex: 1 }} />

      {/* little grounding note at the bottom */}
      <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Mascot stage={stage} size={30} mood="happy" />
        <span style={{ fontFamily: T.body, fontWeight: 700, fontSize: 12.5, color: T.faint, lineHeight: 1.35 }}>
          Keep growing,
          <br />
          one snap at a time
        </span>
      </div>
    </nav>
  )
}
