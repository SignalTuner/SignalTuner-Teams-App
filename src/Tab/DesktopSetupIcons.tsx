// Keep the platform artwork aligned with the website's Downloads page.
export function PlatformIcon({ platform }: { platform: string }) {
  return platform === "Windows"
    ? <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M4 10 29 6v25H4zm30-5 26-4v30H34zM4 35h25v25L4 56zm30 0h26v28l-26-4z" fill="currentColor" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.05 12.54c-.02-2.1 1.72-3.12 1.8-3.17-.98-1.42-2.5-1.62-3.04-1.64-1.29-.14-2.53.77-3.18.77-.65 0-1.65-.75-2.72-.72-1.4.02-2.7.82-3.42 2.07-1.46 2.53-.38 6.27 1.04 8.32.7 1 1.53 2.12 2.6 2.08 1.04-.04 1.43-.67 2.68-.67 1.25 0 1.6.67 2.72.65 1.13-.02 1.84-1.02 2.53-2.02.8-1.15 1.13-2.26 1.15-2.31-.03-.01-2.14-.82-2.16-3.36ZM14.97 6.38c.58-.7.98-1.67.87-2.65-.85.04-1.88.57-2.48 1.27-.55.63-1.03 1.62-.9 2.58.95.08 1.93-.48 2.51-1.2Z" /></svg>;
}

// Rounded external-launch artwork based on the supplied reference.
export function LaunchIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M15 4h5v5M9 15 20 4" />
  </svg>;
}

export function AnalysisOverviewIcons() {
  return <div className="analysisOverviewIcons" aria-hidden="true">
    <span className="analysisOverviewChart" />
    <svg className="analysisOverviewArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
    <svg className="analysisOverviewReport" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5ZM14 3v5h5M9 12h6m-6 4h6" />
    </svg>
  </div>;
}
