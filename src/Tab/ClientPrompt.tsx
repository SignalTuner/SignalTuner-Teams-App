import React from "react";
import { app } from "@microsoft/teams-js";
import TemporaryActivationCode from "./TemporaryActivationCode";
import { SignalTunerLogo } from "./DashboardHeader";
import { useExternalCommerce } from "./TeamsHostProvider";
import downloadStepIcon from "./assets/download.svg";
import personCheckIcon from "./assets/person-check.svg";
import refreshStepIcon from "./assets/refresh.svg";
import clientPreview from "./assets/client.png";
const CLIENT_PROMPT_REFRESH_INTERVAL_MS = 20000;
const CLIENT_PROMPT_COPIED_REFRESH_INTERVAL_MS = 2000;
const CLIENT_PROMPT_COPIED_REFRESH_DURATION_MS = 60000;
const desktopDownloads = [
  { platform: "Windows", url: "https://www.signaltuner.com/downloads/windows/SignalTuner.appinstaller" },
  { platform: "macOS", url: "https://signaltuner.com/update/macos/SignalTuner.dmg" },
];

// Keep the platform artwork aligned with the website's Downloads page.
function PlatformIcon({ platform }: { platform: string }) {
  return platform === "Windows"
    ? <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M4 10 29 6v25H4zm30-5 26-4v30H34zM4 35h25v25L4 56zm30 0h26v28l-26-4z" fill="currentColor" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.05 12.54c-.02-2.1 1.72-3.12 1.8-3.17-.98-1.42-2.5-1.62-3.04-1.64-1.29-.14-2.53.77-3.18.77-.65 0-1.65-.75-2.72-.72-1.4.02-2.7.82-3.42 2.07-1.46 2.53-.38 6.27 1.04 8.32.7 1 1.53 2.12 2.6 2.08 1.04-.04 1.43-.67 2.68-.67 1.25 0 1.6.67 2.72.65 1.13-.02 1.84-1.02 2.53-2.02.8-1.15 1.13-2.26 1.15-2.31-.03-.01-2.14-.82-2.16-3.36ZM14.97 6.38c.58-.7.98-1.67.87-2.65-.85.04-1.88.57-2.48 1.27-.55.63-1.03 1.62-.9 2.58.95.08 1.93-.48 2.51-1.2Z" /></svg>;
}

function getDesktopPlatform(): string | null {
  const navigator = window.navigator;
  const userAgent = navigator.userAgent;
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform
    || navigator.platform;

  // iPad desktop browsing can report a Mac platform and user agent.
  if (/Android|iPhone|iPad|iPod/i.test(userAgent) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1)) {
    return null;
  }

  if (/Win/i.test(platform) || /Windows NT/i.test(userAgent)) {
    return "Windows";
  }

  if (/Mac/i.test(platform) || /Mac OS|Macintosh|MacIntel/i.test(userAgent)) {
    return "macOS";
  }

  return null;
}

export default function ClientPrompt({
  activationCodeError,
  isLoading,
  onContinue,
  onRefresh,
  onSignOut,
}: {
  activationCodeError: string | null;
  isLoading: boolean;
  onContinue: () => void;
  onRefresh: () => Promise<void>;
  onSignOut: () => void;
}) {
  const allowCommerce = useExternalCommerce();
  // Host context controls visibility; user agent only selects a desktop installer.
  const detectedPlatform = allowCommerce ? getDesktopPlatform() : null;
  const preferredDownload = desktopDownloads.find(download => download.platform === detectedPlatform);
  const downloads = preferredDownload
    ? [preferredDownload, ...desktopDownloads.filter(download => download !== preferredDownload)]
    : desktopDownloads;
  const browserLaunchUrl = "https://www.signaltuner.com/Launch.html";
  const [externalLinkFailed, setExternalLinkFailed] = React.useState(false);

  const handleExternalLink = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Keep native modified clicks and a user-initiated fallback if Teams rejects navigation.
    if (externalLinkFailed || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const url = event.currentTarget.href;
    try {
      // Teams chooses the browser using its host/user policy; no browser-specific protocol.
      await app.openLink(url);
    } catch {
      setExternalLinkFailed(true);
    }
  };

  const [rapidPollingEndsAt, setRapidPollingEndsAt] = React.useState<number | null>(null);
  const onRefreshRef = React.useRef(onRefresh);
  const refreshInFlightRef = React.useRef(false);

  React.useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  const runRefresh = React.useCallback(async () => {
    if (refreshInFlightRef.current) {
      return;
    }

    refreshInFlightRef.current = true;

    try {
      await onRefreshRef.current();
    } finally {
      refreshInFlightRef.current = false;
    }
  }, []);

  const handleActivationCodeCopied = React.useCallback(() => {
    setRapidPollingEndsAt(Date.now() + CLIENT_PROMPT_COPIED_REFRESH_DURATION_MS);
    void runRefresh();
  }, [runRefresh]);

  const refreshIntervalMs =
    rapidPollingEndsAt === null ? CLIENT_PROMPT_REFRESH_INTERVAL_MS : CLIENT_PROMPT_COPIED_REFRESH_INTERVAL_MS;

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      void runRefresh();
    }, refreshIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [refreshIntervalMs, runRefresh]);

  React.useEffect(() => {
    if (rapidPollingEndsAt === null) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => setRapidPollingEndsAt(null),
      Math.max(rapidPollingEndsAt - Date.now(), 0)
    );

    return () => window.clearTimeout(timeoutId);
  }, [rapidPollingEndsAt]);

  const setupSteps = [
    { icon: downloadStepIcon, isImage: true, title: "Set up the SignalTuner desktop app on your computer", description: "Install the desktop app for Windows or macOS." },
    {
      icon: personCheckIcon,
      isImage: true,
      title: "Open the app and enter your activation code, or sign in with email and password",
      description: allowCommerce ? "The launch link opens outside Microsoft Teams. ↗ This links the app to your account." : "This links the app to your account.",
    },
    { icon: refreshStepIcon, isImage: true, isFlipped: true, title: "Return here and refresh your status", description: "We'll confirm when your device is connected." },
  ];

  const benefits = [
    "Live network telemetry during meetings",
    "Device insights for better visibility",
    "Better troubleshooting and faster resolutions",
  ];

  return (
    <section className="clientPrompt">
      <div className="clientPromptIntro">
        <SignalTunerLogo className="clientPromptLogo" />
        <h1>Connect the desktop client</h1>
        <p className="clientPromptLead">
          Connect the SignalTuner desktop app on your computer to share your live Wi-Fi, network, and device telemetry
          during meetings.
        </p>

        <div className="setupSteps">
          {setupSteps.map((step, index) => (
            <div className="setupStep" key={step.title}>
              <div className="setupStepRail" aria-hidden="true">
                <span className="setupStepNumber">{index + 1}</span>
                {index < setupSteps.length - 1 && <span className="setupStepConnector" />}
              </div>
              <div className="setupStepIcon">
                {index === 0 && preferredDownload ? (
                  <a className="setupStepIconButton" href={preferredDownload.url} onClick={handleExternalLink} target="_blank" rel="noopener noreferrer" aria-label={`Download SignalTuner for ${preferredDownload.platform} outside Microsoft Teams`}>
                    <img src={step.icon} alt="" />
                  </a>
                ) : index === 1 && allowCommerce ? (
                  <a
                    className="setupStepIconButton"
                    href={browserLaunchUrl}
                    onClick={handleExternalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open SignalTuner desktop client outside Microsoft Teams"
                  >
                    <img src={step.icon} alt="" />
                  </a>
                ) : index === 2 ? (
                  <button
                    className="setupStepIconButton"
                    disabled={isLoading}
                    onClick={() => void runRefresh()}
                    type="button"
                    aria-label="Refresh status"
                  >
                    {isLoading ? <Spinner /> : <img className="setupStepIconFlipped" src={step.icon} alt="" />}
                  </button>
                ) : step.isImage ? (
                  <img src={step.icon} alt="" />
                ) : step.icon}
              </div>
              <div className="setupStepCopy">
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="clientBenefits">
          <h2>Why connect it?</h2>
          {benefits.map((benefit) => (
            <div className="benefitItem" key={benefit}>
              <span className="benefitCheck" aria-hidden="true">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="clientInfoNote">
          <span className="infoGlyph" aria-hidden="true">i</span>
          <span>You can continue without device data, but meeting insights will be limited until your desktop client is connected.</span>
        </div>
      </div>

      <div className="activationPanel">
        <div className="activationPanelHeader">
          <span className="eyebrow">GET STARTED</span>
          <h2>Your activation code</h2>
          <p>Use this code in the desktop client.</p>
        </div>
        <TemporaryActivationCode onCopied={handleActivationCodeCopied} />
        {activationCodeError && <p className="activationError">{activationCodeError}</p>}

        <div className="desktopPreview" aria-label="Illustration of where to enter the activation code">
          <img className="desktopPreviewImage" src={clientPreview} alt="SignalTuner desktop client sign-in screen" />
        </div>

        <div className="clientActions">
          {allowCommerce ? (
            <div className="clientDownloads">
              {downloads.map(download => (
                <a key={download.platform}
                  className="clientDownloadButton"
                  href={download.url} onClick={handleExternalLink} target="_blank" rel="noopener noreferrer">
                  <span className={`clientPlatformIcon${download.platform === "macOS" ? " clientPlatformIconMac" : ""}`}><PlatformIcon platform={download.platform} /></span>
                  <span>Download for {download.platform}</span>
                </a>
              ))}
            </div>
          ) : (
            <span className="inlineNote">Connect the desktop app on your computer, then refresh status here.</span>
          )}
          {externalLinkFailed && <p className="activationError" role="alert">
            Teams couldn't open the link. Select it again to try a browser tab, or copy its address into your preferred browser.
          </p>}
          <button className="secondaryButton clientActionButton" disabled={isLoading} onClick={() => void runRefresh()} type="button">
            {isLoading ? <Spinner /> : <span className="actionIcon" aria-hidden="true">↻</span>} Refresh status
          </button>
          <button className="secondaryButton clientActionButton clientTertiaryButton" disabled={isLoading} onClick={onContinue} type="button">
            Continue without syncing
          </button>
        </div>
        <button className="clientSignOut" disabled={isLoading} onClick={onSignOut} type="button">Sign out</button>
      </div>
    </section>
  );
}


function Spinner() { return <span className="spinner" aria-hidden="true" />; }
