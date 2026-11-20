import type { ReactNode } from "react";
import TemporaryActivationCode from "./TemporaryActivationCode";
import { signalPresentation, usePersonalResource, type PersonalApi } from "./personalDashboardData";
import type { TelemetryRecord } from "./dashboardTypes";
import { useDesktopClientLinks } from "./desktopClientLinks";
import { LaunchIcon, PlatformIcon } from "./DesktopSetupIcons";
import "./SelfAnalysisDesktopSetup.css";

// Mounted only inside an open self-analysis dialog. Desktop heartbeats alone do
// not confirm telemetry: wait for a fresh signal as well as an available desktop.
export default function SelfAnalysisDesktopSetup({ api, userId, recovering = false, children }: {
  api: PersonalApi; userId: number; recovering?: boolean; children: ReactNode;
}) {
  const desktop = usePersonalResource<{ connected: boolean }>(api, `remote-analysis/current-device?targetUserId=${userId}`, 3000);
  const telemetry = usePersonalResource<TelemetryRecord>(api, "User/signal/current", 3000);
  const signal = signalPresentation(telemetry.data);
  const links = useDesktopClientLinks();
  const refresh = () => { void desktop.refresh(); void telemetry.refresh(); };
  // An uncertain submission must still be recoverable with its original request
  // ID if the desktop disconnects after accepting it.
  if (recovering || (desktop.data?.connected && signal.hasData && signal.updated)) return <>{children}</>;
  return <div className="selfAnalysisDesktopSetup">
    <section className="selfAnalysisSetupSection" aria-label="Connect your desktop app">
      <h3>Connect your desktop app</h3>
      <p>Run SignalTuner on your computer and sign in to your account to start an analysis.</p>
      {links.allowCommerce ? <>
      <p className="selfAnalysisExternalNote">Launch and Download will open an external browser.</p>
      <div className="selfAnalysisDesktopLinks">
        <a className="secondaryButton" href={links.browserLaunchUrl} onClick={links.handleExternalLink}
          target="_blank" rel="noopener noreferrer"><LaunchIcon /><span>Launch desktop app</span></a>
        {links.downloads.map(download => <a key={download.platform} className="secondaryButton" href={download.url}
          onClick={links.handleExternalLink} target="_blank" rel="noopener noreferrer">
          <span className={`selfAnalysisPlatformIcon${download.platform === "macOS" ? " selfAnalysisPlatformIconMac" : ""}`}><PlatformIcon platform={download.platform} /></span><span>Download desktop app for {download.platform}</span>
        </a>)}
      </div></> : <p>Open or install SignalTuner on your computer, then connect it using the activation code below.</p>}
      {links.externalLinkFailed && <p role="alert">Teams couldn't open the link. Select it again to try a browser tab, or copy its address into your preferred browser.</p>}
    </section>
    <section className="selfAnalysisSetupSection" aria-label="Activate your desktop app">
      <h3 className="selfAnalysisActivationHeading"><span className="selfAnalysisKeyIcon" aria-hidden="true" />Activate your desktop app</h3>
      <TemporaryActivationCode onCopied={refresh} boxed />
      <p role="status">{desktop.loading || telemetry.loading ? "Checking your desktop connection…"
        : "Waiting for live desktop telemetry. Analysis will be available here automatically when your desktop connects."}</p>
      {desktop.error && <p role="alert">Desktop availability could not be checked. Please retry.</p>}
      {telemetry.error && !desktop.error && <p>Live telemetry is not available yet.</p>}
      <button type="button" className="secondaryButton" onClick={refresh}>Check connection</button>
    </section>
  </div>;
}
