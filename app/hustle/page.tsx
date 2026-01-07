// pages/hustle.js (Pages Router)
// or app/hustle/page.js (App Router)

export default function HustleProxy() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://hustle.pointblank.club"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Hustle Website"
      />
    </div>
  );
}
