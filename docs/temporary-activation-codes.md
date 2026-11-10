# Temporary activation controls

## Desktop downloads

The activation screen offers Windows and macOS installers side by side, using the
website Downloads page's blue buttons and Windows/Apple SVG icons. The detected
desktop OS appears first, with identical styling for both options and no detected-OS
or external-download message. Detection uses browser platform information and
the user agent, excluding mobile devices (including iPads presenting as Macs).
An unrecognized OS leaves both choices available without a recommendation.
The existing Teams host gate still hides external links on mobile and unknown hosts.

- Windows: `https://www.signaltuner.com/downloads/windows/SignalTuner.appinstaller`
- macOS: `https://signaltuner.com/update/macos/SignalTuner.dmg`

Download and desktop-launch clicks use
[TeamsJS app.openLink](https://learn.microsoft.com/en-us/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-openlink).
If Teams rejects navigation, the screen offers a second click using the normal
browser link or copying its address. Modified clicks retain normal link behavior.
The app cannot select a browser or override host/organization policy. On Windows,
users can select **Default browser** in **Teams > Settings > Files and links >
Link open preferences**; see [Microsoft's browser preference guidance](https://support.microsoft.com/en-us/outlook/web-links-from-outlook-emails-and-teams-chats-open-in-microsoft-edge).
Teams on the web controls new tabs through the current browser.

This download correction needs only the Teams static frontend deployed to
DreamHost. No backend, database, Azure setting, manifest/package, website, SEO,
or desktop release is required. Existing installer endpoints and activation
contracts are unchanged. Rollback is a frontend restore (which restores the old
Windows link). Verify both downloads in Windows/macOS Teams after deployment,
including browser preferences and the existing mobile restrictions.

## Activation codes

Client setup and account settings use `TemporaryActivationCode.tsx` with the
current SignalTuner bearer session from `ActivationContext`. They explicitly POST
to generate a code and GET status every three seconds. The code is single-use,
valid for five minutes, displayed with a countdown, and cleared after expiry,
redemption, or a failed status check. Merely loading account/dashboard data no
longer controls code generation or display.

See [the authoritative backend contract](../../signaltuner-back/docs/temporary-activation-codes.md)
for the migration, endpoint shapes, compatibility and verification checklist.
Deploy the database migration and backend, release the compatible desktop, then
deploy this frontend and the website. Existing manifests and Teams/Entra
configuration do not change. Manual Teams tenant validation remains required.

Run `npm run build:frontend` and `node_modules/.bin/tsc -p tsconfig.app.json`.
The production frontend build passes. Strict TypeScript validation currently
reports the pre-existing unused `getSignalTone` function in `App.tsx`; no activation
type errors remain.
