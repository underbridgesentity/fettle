// Pip, the Pippin mascot. A friendly green fruit sprout. The body stays
// green at every stage so Pip is always recognisable (like Duo is always
// green); the stage only adds a small flourish (a bloom, a crown) as you
// evolve: Seed -> Sprout -> Bloomer -> Legend.
//
// `mood` swaps Pip's expression so it can REACT to the user (cheer on a win,
// concerned on a nudge, sleepy at night, etc.). Default 'happy' keeps every
// existing call site looking exactly as before.

const BODY = '#37C76F'
const BODY_DARK = '#1FA557'
const LEAF = '#5FD98C'
const LEAF_DARK = '#3CBE73'
const INK = '#24372F'
const BLUSH = '#FF8FA3'
const TONGUE = '#FF6F8B'

export type Mood = 'happy' | 'cheer' | 'proud' | 'sleepy' | 'concerned' | 'thinking'

export function Mascot({
  stage = 'Sprout',
  size = 92,
  float = false,
  mood = 'happy',
}: {
  stage?: string
  size?: number
  float?: boolean
  mood?: Mood
}) {
  return (
    <div style={{ width: size, height: size, animation: float ? 'pep-float 3.4s ease-in-out infinite' : undefined }}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        {/* feet */}
        <ellipse cx="47" cy="105" rx="11" ry="6.5" fill={BODY_DARK} />
        <ellipse cx="73" cy="105" rx="11" ry="6.5" fill={BODY_DARK} />

        {/* arms */}
        <path d="M24 72c-9 1-14 7-12 15 8 0 14-5 17-10z" fill={BODY_DARK} />
        <path d="M96 72c9 1 14 7 12 15-8 0-14-5-17-10z" fill={BODY_DARK} />

        {/* body */}
        <path d="M60 24C83 24 100 42 100 66c0 23-18 40-40 40S20 89 20 66C20 42 37 24 60 24Z" fill={BODY} />
        {/* belly shading */}
        <path d="M60 106c-20 0-35-13-39-31 9 13 23 18 39 18s30-5 39-18c-4 18-19 31-39 31z" fill={BODY_DARK} opacity=".25" />
        {/* sheen */}
        <ellipse cx="44" cy="48" rx="16" ry="12" fill="#fff" opacity=".22" />
        <circle cx="33" cy="42" r="4" fill="#fff" opacity=".3" />

        {/* stem + signature sprout leaf */}
        <path d="M60 26C60 18 60 12 62 8" stroke="#9A6A44" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M63 13c8-9 22-9 29-5-4 12-18 16-30 9z" fill={LEAF} />
        <path d="M67 14c7-2 14-3 20-3" stroke={LEAF_DARK} strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* bloom flourish (Bloomer) */}
        {stage === 'Bloomer' && (
          <g>
            {[0, 72, 144, 216, 288].map((a) => (
              <circle key={a} cx={34 + 8 * Math.cos((a * Math.PI) / 180)} cy={20 + 8 * Math.sin((a * Math.PI) / 180)} r="5" fill="#FF9FD0" />
            ))}
            <circle cx="34" cy="20" r="4.5" fill="#FFC93C" />
          </g>
        )}

        {/* crown flourish (Legend) */}
        {stage === 'Legend' && (
          <path d="M40 24l3-12 8 7 9-11 9 11 8-7 3 12z" fill="#FFC93C" stroke="#E8A91F" strokeWidth="2" strokeLinejoin="round" />
        )}

        {/* expression */}
        <Face mood={mood} />

        {/* cheeks */}
        <circle cx="34" cy="74" r="7.5" fill={BLUSH} opacity=".5" />
        <circle cx="86" cy="74" r="7.5" fill={BLUSH} opacity=".5" />
      </svg>
    </div>
  )
}

// The mood-dependent eyes, brows, mouth, and little accents. Cheeks are drawn
// by the parent and stay constant across moods.
function Face({ mood }: { mood: Mood }) {
  const openEyes = (lx: number, rx: number, y: number) => (
    <>
      <circle cx="48" cy="60" r="13" fill="#fff" />
      <circle cx="72" cy="60" r="13" fill="#fff" />
      <circle cx={lx} cy={y} r="6.4" fill={INK} />
      <circle cx={rx} cy={y} r="6.4" fill={INK} />
      <circle cx={lx - 2} cy={y - 2.5} r="2.4" fill="#fff" />
      <circle cx={rx - 2} cy={y - 2.5} r="2.4" fill="#fff" />
    </>
  )

  switch (mood) {
    case 'cheer':
      return (
        <>
          <path d="M41 62 Q48 52 55 62" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M65 62 Q72 52 79 62" stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M46 78c4 12 24 12 28 0-6 8-22 8-28 0z" fill="#2B3A33" />
          <path d="M54 84c1.5-3.5 10.5-3.5 12 0 0 3.5-2.5 6-6 6s-6-2.5-6-6z" fill={TONGUE} />
          <path d="M28 40l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#FFC93C" />
          <path d="M93 47l1.3 3.3 3.3 1.3-3.3 1.3-1.3 3.3-1.3-3.3-3.3-1.3 3.3-1.3z" fill="#FFC93C" />
        </>
      )
    case 'proud':
      return (
        <>
          {openEyes(50, 74, 61)}
          <path d="M49 81 Q60 90 71 81" stroke="#2B3A33" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </>
      )
    case 'sleepy':
      return (
        <>
          <path d="M41 60 Q48 65 55 60" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M65 60 Q72 65 79 60" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="60" cy="85" rx="4" ry="5" fill="#2B3A33" />
          <path d="M84 32h7l-7 8h7" stroke={T_FAINT} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M95 22h5l-5 6h5" stroke={T_FAINT} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )
    case 'concerned':
      return (
        <>
          {openEyes(50, 74, 58)}
          <path d="M42 51 L54 47" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M66 47 L78 51" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M51 86 Q60 81 69 86" stroke="#2B3A33" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      )
    case 'thinking':
      return (
        <>
          {openEyes(52, 76, 58)}
          <path d="M66 48 L78 50" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M54 85 Q60 84 66 86" stroke="#2B3A33" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="86" cy="40" r="1.8" fill={T_FAINT} />
          <circle cx="92" cy="34" r="2.3" fill={T_FAINT} />
          <circle cx="99" cy="27" r="2.8" fill={T_FAINT} />
        </>
      )
    case 'happy':
    default:
      return (
        <>
          {openEyes(50, 74, 62)}
          <path d="M49 79c3 10 19 10 22 0-4 7-18 7-22 0z" fill="#2B3A33" />
          <path d="M55 85c1-3 9-3 10 0 0 3-2 5-5 5s-5-2-5-5z" fill={TONGUE} />
        </>
      )
  }
}

const T_FAINT = '#ABA493'
