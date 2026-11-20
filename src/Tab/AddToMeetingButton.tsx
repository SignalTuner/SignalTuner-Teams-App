import { useEffect, useId, useRef, useState } from "react";
import { app, appInstallDialog, ErrorCode } from "@microsoft/teams-js";
import { initializeTeams } from "./teamsHost";

type InstallTarget = { appId: string; tenantId?: string };
const guid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const setupGuidance = "Choose a meeting in Teams and complete setup. If your meeting isn't listed, open its details in Teams Calendar, select Apps, and add SignalTuner.";

export default function AddToMeetingButton() {
  const [target, setTarget] = useState<InstallTarget | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const mounted = useRef(false);
  const helpId = useId();

  useEffect(() => {
    mounted.current = true;
    let active = true;
    void initializeTeams().then(context => {
      if (!active) return;
      const appId = context.app.appId?.toString();
      // Navigation hints only. Teams owns meeting selection, permissions and consent.
      // Use the installed app's ID, never the bot/Entra ID or another environment.
      if (!["Teams", "TeamsModern"].includes(context.app.host.name)) {
        setMessage("Open SignalTuner in Microsoft Teams to add it to a meeting.");
      } else if (!appId || !guid.test(appId) || /^0{8}-0{4}-0{4}-0{4}-0{12}$/.test(appId)) {
        setMessage("Reopen SignalTuner in Teams to add it to a meeting. You can also add it from Apps in the meeting details.");
      } else {
        const tenantId = context.user?.tenant?.id;
        setTarget({ appId, tenantId: tenantId && guid.test(tenantId) ? tenantId : undefined });
      }
    }).catch(() => {
      if (active) setMessage("Open SignalTuner in Microsoft Teams to add it to a meeting.");
    });
    return () => { active = false; mounted.current = false; };
  }, []);

  const open = async () => {
    if (!target || inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setError("");
    setMessage(setupGuidance);
    const openInstallLink = async () => {
      const link = new URL(`https://teams.microsoft.com/l/app/${encodeURIComponent(target.appId)}`);
      if (target.tenantId) link.searchParams.set("tenantId", target.tenantId);
      await app.openLink(link.toString());
    };
    try {
      if (appInstallDialog.isSupported()) {
        try {
          await appInstallDialog.openAppInstallDialog({ appId: target.appId });
        } catch (caught) {
          const code = (caught as { errorCode?: number } | null)?.errorCode;
          if (code !== ErrorCode.NOT_SUPPORTED_ON_PLATFORM && code !== ErrorCode.NOT_SUPPORTED_IN_CURRENT_CONTEXT) throw caught;
          await openInstallLink();
        }
      } else {
        await openInstallLink();
      }
      // The SDK can resolve as soon as it dispatches the request. It does not
      // confirm installation, select a meeting or enroll a SignalTuner account.
    } catch (caught) {
      if (!mounted.current) return;
      if ((caught as { errorCode?: number } | null)?.errorCode === ErrorCode.USER_ABORT) {
        setMessage("");
      } else {
        setError("Teams couldn't open the app setup. Try again, or open the meeting details in Teams Calendar and add SignalTuner from Apps.");
        setMessage("");
      }
    } finally {
      inFlight.current = false;
      if (mounted.current) setBusy(false);
    }
  };

  return <>
    <button type="button" className="secondaryButton personalAddToMeeting" disabled={!target || busy}
      aria-describedby={message || error ? helpId : undefined} onClick={() => void open()}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M8 3v4m8-4v4M4 10h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm6 8v5m-2.5-2.5h5" />
      </svg>
      {busy ? "Opening Teams…" : "Add to a meeting"}
    </button>
    {(message || error) && <p id={helpId} className="personalMeetingInstallFeedback" role={error ? "alert" : "status"}>{error || message}</p>}
  </>;
}
