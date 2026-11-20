import { useState, type MouseEvent } from "react";
import { app } from "@microsoft/teams-js";
import { useExternalCommerce } from "./TeamsHostProvider";

const desktopDownloads = [
  { platform: "Windows", url: "https://www.signaltuner.com/downloads/windows/SignalTuner.appinstaller" },
  { platform: "macOS", url: "https://signaltuner.com/update/macos/SignalTuner.dmg" },
];

function getDesktopPlatform(): string | null {
  const navigator = window.navigator;
  const userAgent = navigator.userAgent;
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform
    || navigator.platform;
  // iPad desktop browsing can report a Mac platform and user agent.
  if (/Android|iPhone|iPad|iPod/i.test(userAgent) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1)) return null;
  if (/Win/i.test(platform) || /Windows NT/i.test(userAgent)) return "Windows";
  if (/Mac/i.test(platform) || /Mac OS|Macintosh|MacIntel/i.test(userAgent)) return "macOS";
  return null;
}

export function useDesktopClientLinks() {
  const allowCommerce = useExternalCommerce();
  // Host context controls visibility; user agent only selects a desktop installer.
  const detectedPlatform = allowCommerce ? getDesktopPlatform() : null;
  const preferredDownload = desktopDownloads.find(download => download.platform === detectedPlatform);
  const downloads = preferredDownload
    ? [preferredDownload, ...desktopDownloads.filter(download => download !== preferredDownload)] : desktopDownloads;
  const [externalLinkFailed, setExternalLinkFailed] = useState(false);
  const handleExternalLink = async (event: MouseEvent<HTMLAnchorElement>) => {
    // Preserve modified clicks and a user-initiated fallback if Teams rejects navigation.
    if (externalLinkFailed || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const url = event.currentTarget.href;
    try { await app.openLink(url); }
    catch { setExternalLinkFailed(true); }
  };
  return { allowCommerce, preferredDownload, downloads, externalLinkFailed, handleExternalLink,
    browserLaunchUrl: "https://www.signaltuner.com/Launch.html" };
}
