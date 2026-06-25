// Pip with a speech bubble. The reusable way to let the mascot talk to the
// user: a guide in onboarding, a reaction at a meaningful moment. Keep the
// copy short and warm. Pip's mood should match what just happened.
import { Mascot, type Mood } from './Mascot'
import { T } from '../lib/theme'

export function PipBubble({
  text,
  mood = 'happy',
  size = 56,
  align = 'center',
}: {
  text: string
  mood?: Mood
  size?: number
  align?: 'center' | 'start'
}) {
  return (
    <div style={{ display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start', alignItems: 'flex-end', gap: 10, marginBottom: 18 }}>
      <div style={{ flex: 'none' }}>
        <Mascot stage="Sprout" size={size} mood={mood} />
      </div>
      <div
        style={{
          position: 'relative',
          maxWidth: 246,
          background: T.solid,
          border: `1px solid ${T.line}`,
          borderRadius: '18px 18px 18px 6px',
          boxShadow: '0 6px 18px rgba(48,38,22,0.08)',
          padding: '11px 14px',
          textAlign: 'left',
          marginBottom: 6,
        }}
      >
        <span style={{ fontFamily: T.body, fontWeight: 700, fontSize: 14, color: T.text, lineHeight: 1.35 }}>{text}</span>
        {/* tail pointing left toward Pip */}
        <div style={{ position: 'absolute', left: -6, bottom: 12, width: 12, height: 12, background: T.solid, borderLeft: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, transform: 'rotate(45deg)' }} />
      </div>
    </div>
  )
}
