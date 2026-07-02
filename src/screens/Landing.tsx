import { useState } from 'react'
import { Auth } from './Auth'
import { CenterFrame } from '../components/CenterFrame'
import { IOSDevice } from '../components/IOSDevice'
import { Mascot } from '../components/Mascot'
import { T, card, eyebrow, hexA } from '../lib/theme'

/**
 * Marketing landing for logged-out visitors, responsive from phone to
 * widescreen (layout classes live in styles.css under "Landing").
 * "Get started" / "Log in" swap to the auth flow in a centered frame.
 */
export function Landing() {
  const [auth, setAuth] = useState<null | 'signup' | 'login'>(null)

  if (auth) {
    return (
      <CenterFrame>
        <Auth initialView={auth} onExit={() => setAuth(null)} />
      </CenterFrame>
    )
  }

  const start = () => setAuth('signup')
  const login = () => setAuth('login')

  return (
    <div className="ld-root pippin-scroll">
      <Nav onStart={start} onLogin={login} />
      <Hero onStart={start} />
      <Marquee />
      <Features />
      <MeetPip />
      <HowItWorks />
      <CtaBanner onStart={start} />
      <Footer onStart={start} onLogin={login} />
    </div>
  )
}

// ── nav ──────────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Nav({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  return (
    <div className="ld-nav">
      <div className="ld-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Mascot stage="Sprout" size={34} />
          <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 24, color: T.text, letterSpacing: '-0.02em' }}>Pippin</span>
        </div>

        <div className="ld-nav-links">
          <button className="ld-nav-link" onClick={() => scrollTo('features')}>Features</button>
          <button className="ld-nav-link" onClick={() => scrollTo('pip')}>Meet Pip</button>
          <button className="ld-nav-link" onClick={() => scrollTo('how')}>How it works</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onLogin}
            className="pressable"
            style={{ background: 'transparent', border: 'none', borderRadius: T.r.pill, padding: '10px 16px', fontFamily: T.body, fontWeight: 700, fontSize: 14.5, color: T.text, cursor: 'pointer' }}
          >
            Log in
          </button>
          <button
            onClick={onStart}
            className="pressable"
            style={{ background: T.accent, color: T.ink, border: 'none', borderRadius: T.r.pill, padding: '11px 20px', fontFamily: T.display, fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 10px 24px rgba(35,179,95,0.3)', ['--press-y' as string]: '2px' }}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  )
}

// ── hero ─────────────────────────────────────────────────────────────────────

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="ld-wrap">
      <div className="ld-hero">
        <div className="ld-hero-copy">
          <div className="ld-up" style={{ ...eyebrow, fontSize: 12.5, color: T.accent, animationDelay: '0s' }}>
            Social health, actually fun
          </div>
          <h1 className="ld-h1 ld-up" style={{ animationDelay: '.06s' }}>
            Reach your goals.
            <br />
            <span style={{ color: T.accent }}>Together.</span>
          </h1>
          <p className="ld-sub ld-up" style={{ animationDelay: '.12s', margin: '0 auto 26px' }}>
            Pippin turns healthy habits into a game you play with friends. Snap your meals, crush
            challenges, keep your streak, and grow Pip from a tiny seed into a legend.
          </p>
          <div className="ld-hero-ctas ld-up" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animationDelay: '.18s' }}>
            <button
              onClick={onStart}
              className="pressable"
              style={{ background: T.accent, color: T.ink, border: 'none', borderRadius: T.r.pill, padding: '17px 32px', fontFamily: T.display, fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 14px 34px rgba(35,179,95,0.36)', ['--press-y' as string]: '3px' }}
            >
              Get started, it's free
            </button>
            <button
              onClick={() => scrollTo('how')}
              className="pressable"
              style={{ background: T.solid, color: T.text, border: `1px solid ${T.line}`, borderRadius: T.r.pill, padding: '17px 28px', fontFamily: T.display, fontWeight: 600, fontSize: 18, cursor: 'pointer' }}
            >
              How it works
            </button>
          </div>
          <div className="ld-up" style={{ marginTop: 18, fontFamily: T.body, fontWeight: 700, fontSize: 13.5, color: T.faint, animationDelay: '.24s' }}>
            Free to play · Works right in your browser
          </div>
        </div>

        <HeroPhone />
      </div>
    </div>
  )
}

/** Static, hand-posed mock of the Home screen inside the device frame. */
function HeroPhone() {
  return (
    <div className="ld-phone ld-up" style={{ animationDelay: '.15s' }}>
      <div className="ld-phone-box">
        <div className="ld-phone-scale" style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <IOSDevice>
            <MockHome />
          </IOSDevice>
        </div>
      </div>

      <div className="ld-chip" style={{ top: '21%', left: '2%', animationDelay: '.4s' }}>
        <span style={{ fontSize: 19 }}>🔥</span> 12 day streak
      </div>
      <div className="ld-chip" style={{ top: '38%', right: '0%', animationDelay: '1.3s' }}>
        <span style={{ fontSize: 19 }}>⚡</span> +20 XP · Meal snapped
      </div>
      <div className="ld-chip" style={{ bottom: '14%', left: '4%', animationDelay: '2.2s' }}>
        <span style={{ fontSize: 19 }}>👏</span> Maya cheered you on
      </div>
    </div>
  )
}

function MockHome() {
  return (
    <div style={{ height: '100%', background: `radial-gradient(circle at 50% -8%, ${T.bgElev}, ${T.bg} 58%)`, padding: '76px 18px 0', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
      {/* greeting */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ ...eyebrow, fontSize: 10.5 }}>Wednesday, 2 July</div>
          <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: 26, color: T.text }}>Good morning, Maya ☀️</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 16, background: `linear-gradient(140deg, ${T.rose}, ${T.amber})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink, fontFamily: T.display, fontWeight: 700, fontSize: 18 }}>M</div>
      </div>

      {/* calories ring card */}
      <div style={{ ...card, padding: 18, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ position: 'relative', width: 108, height: 108, flex: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(${T.accent} 0 65%, ${hexA(T.accent, 0.14)} 65% 100%)` }} />
          <div style={{ position: 'absolute', inset: 11, borderRadius: '50%', background: T.solid, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: 22, color: T.text, lineHeight: 1 }}>1,240</span>
            <span style={{ fontFamily: T.body, fontWeight: 700, fontSize: 10.5, color: T.faint }}>of 1,900 kcal</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <MockStat emoji="🥗" label="3 meals snapped" tint={T.accent} />
          <MockStat emoji="👟" label="6,204 steps" tint={T.blue} />
          <MockStat emoji="⚡" label="+40 XP today" tint={T.amber} />
        </div>
      </div>

      {/* quest */}
      <div style={{ ...card, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: hexA(T.violet, 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, flex: 'none' }}>🏆</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.display, fontWeight: 600, fontSize: 14.5, color: T.text }}>Veggie week challenge</div>
          <div style={{ height: 7, borderRadius: 6, background: hexA(T.violet, 0.15), marginTop: 7 }}>
            <div style={{ width: '70%', height: '100%', borderRadius: 6, background: T.violet }} />
          </div>
        </div>
        <span style={{ fontFamily: T.body, fontWeight: 800, fontSize: 12.5, color: T.violet }}>5/7</span>
      </div>

      {/* feed card */}
      <div style={{ ...card, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 13, background: `linear-gradient(140deg, ${T.blue}, ${T.violet})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.ink, fontFamily: T.display, fontWeight: 700, fontSize: 15 }}>T</div>
          <div>
            <div style={{ fontFamily: T.display, fontWeight: 600, fontSize: 14, color: T.text }}>Theo K.</div>
            <div style={{ fontFamily: T.body, fontWeight: 700, fontSize: 11, color: T.faint }}>crushed a morning 5K</div>
          </div>
        </div>
        <div style={{ display: 'inline-flex', gap: 8 }}>
          <span style={{ background: T.glass, border: `1px solid ${T.line}`, borderRadius: 12, padding: '6px 11px', fontFamily: T.body, fontWeight: 800, fontSize: 12, color: T.text }}>👏 12</span>
          <span style={{ background: T.glass, border: `1px solid ${T.line}`, borderRadius: 12, padding: '6px 11px', fontFamily: T.body, fontWeight: 800, fontSize: 12, color: T.text }}>🔥 4</span>
        </div>
      </div>

      {/* mock tab bar */}
      <div style={{ marginTop: 'auto', marginBottom: 16, background: T.solid, border: `1px solid ${T.line}`, borderRadius: 26, padding: '10px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 12px 34px rgba(48,38,22,0.14)' }}>
        {['🏠', '🏆'].map((e) => (
          <span key={e} style={{ fontSize: 20, opacity: 0.55 }}>{e}</span>
        ))}
        <span style={{ width: 52, height: 52, borderRadius: 19, background: 'linear-gradient(160deg,#4cd884,#23b35f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 10px 22px rgba(35,179,95,0.4)' }}>📸</span>
        {['👯', '🙂'].map((e) => (
          <span key={e} style={{ fontSize: 20, opacity: 0.55 }}>{e}</span>
        ))}
      </div>
    </div>
  )
}

function MockStat({ emoji, label, tint }: { emoji: string; label: string; tint: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ width: 30, height: 30, borderRadius: 10, background: hexA(tint, 0.14), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{emoji}</span>
      <span style={{ fontFamily: T.body, fontWeight: 800, fontSize: 13, color: T.dim }}>{label}</span>
    </div>
  )
}

// ── marquee ──────────────────────────────────────────────────────────────────

const MARQUEE = ['🥗 Snap meals', '🔥 Keep streaks', '🏆 Win challenges', '👏 Cheer friends', '🍏 Grow Pip', '📸 20 seconds a day', '⚡ Earn XP', '🎖️ Collect badges']

function Marquee() {
  const pills = [...MARQUEE, ...MARQUEE]
  return (
    <div className="ld-marquee">
      <div className="ld-marquee-track">
        {pills.map((p, i) => (
          <span key={i} style={{ flex: 'none', background: T.solid, border: `1px solid ${T.line}`, borderRadius: T.r.pill, padding: '9px 18px', fontFamily: T.display, fontWeight: 600, fontSize: 15, color: T.dim, whiteSpace: 'nowrap' }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { emoji: '📸', tint: T.blue, kicker: 'Meals', title: 'Snap it, Pip counts it', copy: 'Point your camera at any plate. Calories and a friendly nudge, logged in seconds. No barcode scanning, no spreadsheet energy.' },
  { emoji: '🏆', tint: T.amber, kicker: 'Challenges', title: 'Quests that stick', copy: 'Weekly challenges, XP and badges keep you moving on the days motivation does not show up.' },
  { emoji: '👏', tint: T.rose, kicker: 'Squad', title: 'A squad that cheers', copy: 'Share wins and photos, react to friends, comment on their milestones. Healthy is easier with company.' },
  { emoji: '🌱', tint: T.green, kicker: 'Pip', title: 'Grow Pip with you', copy: 'Every healthy day feeds Pip. Watch your buddy grow from Seed to Sprout to Bloomer to Legend.' },
]

function Features() {
  return (
    <div id="features" className="ld-wrap" style={{ padding: '76px 22px 10px' }}>
      <SectionHead kicker="What you get" title="Everything a habit needs to survive" sub="Tracking alone does not change behaviour. Play, friends and a growing mascot do." />
      <div className="ld-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="ld-card" style={{ ...card, padding: '28px 26px' }}>
            <div style={{ width: 58, height: 58, borderRadius: 20, background: hexA(f.tint, 0.14), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 29, marginBottom: 16 }}>{f.emoji}</div>
            <div style={{ ...eyebrow, color: f.tint, marginBottom: 6 }}>{f.kicker}</div>
            <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: 24, color: T.text, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontFamily: T.body, fontWeight: 600, fontSize: 15, lineHeight: 1.55, color: T.dim }}>{f.copy}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── meet pip ─────────────────────────────────────────────────────────────────

const PIPS = [
  { mood: 'happy', label: 'Happy to see you' },
  { mood: 'cheer', label: 'Cheers every win' },
  { mood: 'proud', label: 'Proud of your streak' },
  { mood: 'thinking', label: 'Counting your kcal' },
  { mood: 'sleepy', label: 'Says rest counts too' },
] as const

function MeetPip() {
  return (
    <div id="pip" className="ld-wrap" style={{ padding: '76px 22px 10px' }}>
      <SectionHead kicker="Your buddy" title="Meet Pip, your pocket cheerleader" sub="Pip reacts to your day, celebrates your milestones, and grows as you do. Ignore your goals and Pip gets a little sleepy. No guilt, just vibes." />
      <div className="ld-pips">
        {PIPS.map((p, i) => (
          <div key={p.mood} className="ld-card" style={{ ...card, padding: '22px 12px 18px', textAlign: 'center' }}>
            <div style={{ animation: `ld-float ${4.5 + i * 0.4}s ease-in-out infinite` }}>
              <Mascot stage={i === 2 ? 'Bloomer' : 'Sprout'} size={72} mood={p.mood} />
            </div>
            <div style={{ fontFamily: T.body, fontWeight: 700, fontSize: 13, color: T.dim, marginTop: 10 }}>{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── how it works ─────────────────────────────────────────────────────────────

const STEPS = [
  { n: '1', tint: T.blue, title: 'Pick your goal', copy: 'Eat better, move more, or feel great. Pip shapes the journey around it.' },
  { n: '2', tint: T.amber, title: 'Snap and log', copy: 'Meals, walks, workouts, moods. About twenty seconds a day, honestly.' },
  { n: '3', tint: T.green, title: 'Grow together', copy: 'Add your squad, trade cheers, climb the leaderboard, level up Pip.' },
]

function HowItWorks() {
  return (
    <div id="how" className="ld-wrap" style={{ padding: '76px 22px 10px' }}>
      <SectionHead kicker="How it works" title="Three steps, zero willpower required" />
      <div className="ld-steps">
        {STEPS.map((s) => (
          <div key={s.n} className="ld-card" style={{ ...card, padding: '26px 24px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: hexA(s.tint, 0.15), color: s.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.display, fontWeight: 700, fontSize: 20, marginBottom: 14 }}>{s.n}</div>
            <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: 21, color: T.text, marginBottom: 7 }}>{s.title}</div>
            <div style={{ fontFamily: T.body, fontWeight: 600, fontSize: 14.5, lineHeight: 1.55, color: T.dim }}>{s.copy}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── CTA banner + footer ──────────────────────────────────────────────────────

function CtaBanner({ onStart }: { onStart: () => void }) {
  return (
    <div className="ld-wrap" style={{ padding: '76px 22px 20px' }}>
      <div style={{ position: 'relative', background: 'linear-gradient(150deg, #37cd75, #1ea45a)', borderRadius: 44, padding: '54px 28px', textAlign: 'center', overflow: 'hidden', boxShadow: '0 30px 70px rgba(35,179,95,0.35)' }}>
        {/* soft decorative blobs */}
        <div style={{ position: 'absolute', top: -70, left: -50, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -90, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-block', animation: 'ld-float 4.5s ease-in-out infinite' }}>
            <Mascot stage="Bloomer" size={104} mood="cheer" />
          </div>
          <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: 'clamp(32px, 5vw, 48px)', color: T.ink, margin: '10px 0 8px', letterSpacing: '-0.02em' }}>Ready to grow?</div>
          <div style={{ fontFamily: T.body, fontWeight: 600, fontSize: 17, color: 'rgba(255,255,255,0.85)', maxWidth: 420, margin: '0 auto 26px' }}>
            Plant your seed today. Your squad, your streaks and one very excitable green fruit are waiting.
          </div>
          <button
            onClick={onStart}
            className="pressable"
            style={{ background: '#FFFFFF', color: '#1ea45a', border: 'none', borderRadius: T.r.pill, padding: '17px 34px', fontFamily: T.display, fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 14px 30px rgba(0,60,25,0.25)', ['--press-y' as string]: '3px' }}
          >
            Get started, it's free
          </button>
        </div>
      </div>
    </div>
  )
}

function Footer({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  return (
    <div className="ld-wrap" style={{ padding: '40px 22px 46px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18, borderTop: `1px solid ${T.line}`, paddingTop: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Mascot stage="Sprout" size={28} />
          <div>
            <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: 19, color: T.text }}>Pippin</div>
            <div style={{ fontFamily: T.body, fontWeight: 700, fontSize: 12, color: T.faint }}>Reach your goals. Together.</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="ld-nav-link" style={{ display: 'inline-block' }} onClick={onLogin}>Log in</button>
          <button className="ld-nav-link" style={{ display: 'inline-block' }} onClick={onStart}>Get started</button>
        </div>
      </div>
      <div style={{ fontFamily: T.body, fontWeight: 600, fontSize: 12.5, color: T.faint, marginTop: 18 }}>
        © 2026 Pippin · pippin.co.za · Grown with 🍏
      </div>
    </div>
  )
}

// ── shared ───────────────────────────────────────────────────────────────────

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
      <div style={{ ...eyebrow, fontSize: 12.5, color: T.accent, marginBottom: 10 }}>{kicker}</div>
      <h2 style={{ fontFamily: T.display, fontWeight: 700, fontSize: 'clamp(30px, 4.4vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.02em', color: T.text, margin: '0 0 12px' }}>{title}</h2>
      {sub && <p style={{ fontFamily: T.body, fontWeight: 600, fontSize: 16, lineHeight: 1.55, color: T.dim, margin: 0 }}>{sub}</p>}
    </div>
  )
}
