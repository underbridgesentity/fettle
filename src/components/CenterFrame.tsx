/**
 * Phone-shaped centered card on desktop, full-bleed on mobile.
 * Hosts the auth flow, onboarding welcome, and splash (see styles.css).
 */
export function CenterFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="center-stage">
      <div className="center-frame">{children}</div>
    </div>
  )
}
