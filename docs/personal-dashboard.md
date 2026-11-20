# Teams personal dashboard

## Meeting setup spacing and welcome card (2026-11-20)

The `/tabs/config` confirmation content uses the available iframe height, with
space between the three feature rows and the requirements/privacy footer near
the bottom. Short windows and enlarged text can scroll without clipping content.
The native Teams dialog header, Save button and posting checkbox are host-owned.

The associated chat welcome card is built in the backend, not this frontend.
It now has three separated sections: welcome/description, Get started, and
Before you begin with five stacked icon-led link buttons. See
`signaltuner-back/docs/teams-bot-welcome.md` for card styling and release details.

Deployment impact
- Changed projects: Microsoft Teams frontend and SignalTuner backend.
- Dependent projects: Teams renders the backend's card; no other client release.
- Database/configuration prerequisites: none; no schema, Azure setting, manifest,
  permission, API, URL or dependency change.
- Backward compatibility: presentation only; existing clients and cards remain
  compatible. Previously posted welcome messages are not rewritten.
- Required deployment order: either order; both must be deployed to show both
  improvements. Frontend goes to DreamHost; backend to the existing
  `signaltuner-back` App Service. No Teams package update is needed.
- Post-deployment verification: open Add to a meeting and check the setup iframe
  at normal/narrow sizes and both themes. In a fresh authorized bot installation,
  check the three welcome sections and all five actions in desktop/mobile Teams.
- Rollback considerations: restore the previous frontend/backend independently;
  retain existing welcome delivery receipts and destinations for posted cards.
- Projects still requiring deployment: none for this update. At the user's
  explicit request, the frontend was deployed as DreamHost release
  `20261120T183420Z` and the backend as App Service deployment
  `6677a06e65ce4e32b0a06c980ed882d1`. No real chat message was sent during
  validation. Native Teams card rendering still needs a fresh-install check.

Validation: production DreamHost build, TypeScript, six hosting checks and three
compiled-site browser tests passed. Local browser layout checks passed at
495x372, 520x500, 360x600 and 320x280 in light, dark and contrast themes; the
smallest window scrolls vertically. Live Teams host rendering remains to verify.

## Native meeting installation (2026-11-20)

The standalone personal dashboard now has **Add to a meeting** beside **Your
Meetings**, including when history is collapsed or empty. It opens Teams' native
SignalTuner installation/setup dialog so the user can choose the meeting scope,
select a meeting and confirm setup. The existing meeting configuration page and
manifest `groupChat` meeting contexts are retained.

After the shared Teams initialization, the action uses the installed
`context.app.appId.toString()` with
`appInstallDialog.openAppInstallDialog({ appId })`. It does not substitute the
bot/Entra application ID or a production ID in local builds. If the capability
is unavailable (including explicit unsupported-platform/context errors), it
uses `app.openLink` with `https://teams.microsoft.com/l/app/<installed app ID>`
and the current tenant when valid. Non-Teams hosts, failed context and missing
or invalid IDs retain a disabled action with instructions. Mobile Teams uses
the same native capability check; this action is independent of commerce links.

The SDK resolves on dispatch on some hosts; resolving is not proof of installation.
The UI therefore gives setup guidance without claiming success, adding a local
meeting, joining through the backend, reading calendars or sending invitations.
Duplicate in-flight opens are suppressed, reported cancellation is quiet, and
other errors receive safe retry/manual-setup guidance. If the picker omits an
upcoming meeting, the guidance directs users to the meeting's details in Teams
Calendar and its Apps control. Teams continues to enforce meeting roles, app
availability, organizational policies and consent.

References: [Teams native installation API](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-link-application#deep-link-to-open-an-app-install-dialog),
[installation scopes and upcoming-meeting limitation](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/add-default-install-scope).

Only the Teams frontend changes. No new API, backend implementation, database,
calendar/Graph permission, SSO setting, app ID, Azure setting, dependency or Teams
manifest/package change is required. The existing meeting history remains
previously joined SignalTuner meetings, not the user's calendar.

Validation: TypeScript and the production DreamHost build passed. Eight synthetic
browser scenarios passed for native dispatch, installed app/tenant targeting,
capability fallback, duplicate suppression, cancellation, safe errors, unavailable
context, mobile capability use and narrow/wide layout. Light/dark previews at
390px and 1100px were visually reviewed. Six hosting checks and three compiled-site
browser scenarios also passed. No real meeting app installation or invitation
was performed.

At the user's explicit request, this feature was deployed through the existing
DreamHost workflow as release `20261120T064444Z` to `https://teams.signaltuner.com`.
All 11 remote files and ten public build files matched; nine routes, framing/cache
headers, asset content types, missing/private-file rejection and previous-asset
availability passed. Verified rollback files are retained outside the web root
under `.signaltuner-releases/teams/20261120T064444Z/previous`. See
`dreamhost-hosting.md` for the release record.

Verify the native picker and actual meeting tab configuration in the intended
Teams tenant. Returning from the picker alone is insufficient evidence. Rollback
restores the previous frontend; meetings already configured by users remain
installed. No cross-project deployment order or follow-up is required.

## Self-analysis modal presentation (2026-11-20)

The self-analysis dialog has three separated sections: the analysis description,
desktop launch/download instructions, and activation. The description shows the
existing analysis artwork, a right arrow, and a report page; the analysis/report
icons are blue, and the arrow is black in light mode and white in dark mode.
Launch uses the supplied rounded external-launch design. Download buttons reuse
the website's Windows/Apple artwork, with one external-browser disclosure above
the buttons. Activation reuses the website Downloads page's blue key icon and
shows a bordered `******` placeholder until the generated code replaces it.
The copy action and expiry feedback remain available. The boxed presentation is
opt-in, preserving the existing onboarding activation layout.

The three-second desktop/telemetry checks and automatic return to Request
analysis are unchanged. No new dependency, backend, database, configuration,
authentication or credit contract is involved. Font Awesome key attribution is
retained in the SVG source. Verification for this presentation update passed:
TypeScript, production DreamHost build, 26 related unit checks, six hosting
checks, seven targeted synthetic browser scenarios and three compiled-site
browser scenarios. Light/dark previews at 390px and 1100px were reviewed for
placeholder/generated states, icon colors, scrolling and horizontal overflow.

Deployed at the user's request as release `20261120T062209Z` to
`https://teams.signaltuner.com`. All 11 remote files and ten public files matched
the build; nine routes and their framing/cache headers passed. Previous assets
remain available, with verified rollback files outside the web root under
`.signaltuner-releases/teams/20261120T062209Z/previous`. See
`dreamhost-hosting.md` for verification and rollback details. Native Teams and
real desktop end-to-end checks remain manual; no production activation or
credit-consuming analysis was performed.

## Desktop setup in self-analysis dialogs (2026-11-20)

The personal Analysis + Report dialog and individual self-analysis dialogs in
current/historical meetings show desktop setup while the desktop is unavailable
or its telemetry is missing, offline or older than two minutes. Setup reuses the
existing launch page, Windows/macOS installer destinations and short-lived
activation-code component. Code generation remains an explicit user action;
expiration, copying and single-use behavior are unchanged. Other participants'
dialogs never expose the signed-in account's activation code.

While the self-analysis dialog is open, existing authenticated `current-device`
and `User/signal/current` reads run every three seconds, pause when hidden and
refresh on return. An available desktop plus a fresh, timestamped signal replaces
setup with Request analysis in the same modal. Disconnection restores setup.
Closing the modal aborts reads and stops its timers. Uncertain submissions remain
recoverable with the original request ID even if the desktop disconnects.
Connecting does not automatically request an analysis or spend credits.

Launch/download navigation shares `ClientPrompt`'s Teams host policy and TeamsJS
openLink behavior, including its explicit browser fallback. Restricted or unknown
hosts retain activation and connection checks without external launch/download
links. No API, consent, billing, device-identity or authentication contract changes.

Validation: TypeScript, frontend and DreamHost builds, 52 related unit/hosting
checks and all 54 synthetic browser scenarios passed. Light/dark setup previews
at 390px and 1100px were visually reviewed. Coverage includes stale/missing
telemetry, reconnection, request recovery, self-only activation and restricted hosts.

Release only the Teams static frontend using the existing DreamHost build/upload
workflow. No backend, WPF, website, SEO or Zoom release, SQL migration, Azure
setting, Teams manifest or package change is needed. Rollback is a frontend
revert. Validate hosted Teams launch/download, activation and automatic return to
Request analysis after upload; local mocked browser checks do not establish
production verification.

At the user's explicit request, the Teams static frontend was rebuilt and
deployed to `https://teams.signaltuner.com` on 2026-11-20, release
`20261120T055552Z`. All 11 uploaded file checksums and 10 public file checksums
matched. Nine public routes, framing/revalidation headers, JS/CSS content types
and immutable caching, missing/private-file rejection, HTTP-to-HTTPS redirects
and the backend Teams-origin CORS preflight passed. Three compiled-site browser
scenarios and the six hosting/six service-status checks passed before upload.
The prior HTML, Apache configuration and all 34 existing assets were backed up
outside the public web directory under the website user's
`.signaltuner-releases/teams/20261120T055552Z/previous`; prior hashed assets remain
served for existing tabs. No backend, database, Azure, manifest or Teams-package
change was made. Authenticated Teams activation/telemetry verification remains a
manual follow-up; no real account activation, analysis or credit use was performed.

## Mobile connectivity summary (2026-11-06)

At viewport widths up to 600px, the shared connectivity summary keeps Signal
Score in the left column spanning three rows, with Workspace, Network and Device
stacked in the right column. This applies to personal health, meeting-history
participants and the full meeting participant cards. Wider layouts are unchanged.
Status values, offline handling, APIs and analysis actions are unchanged.

On mobile, Test Analysis and Analysis + Report share two equal-width columns;
credit/availability messages span the row below. Meeting participant Analyze
buttons are centered beneath the score/status divider. Built-CSS browser checks
at 320, 390 and 600px verify button alignment and equal personal button heights;
1280px retains the desktop action layout. Both 320px previews were visually reviewed.

Validation: 13 personal-dashboard checks, TypeScript and the DreamHost static
build passed. Local browser previews of the actual shared component with synthetic
active/offline data passed at 320, 390, 600 and 1280px for personal and meeting-modal
containers, with no metrics overflow; the 320px modal was visually reviewed.
Publish the contents of `dist/dreamhost` to `teams.signaltuner.com` to release this
CSS-only change. No Teams manifest ZIP, backend, website, database or Azure change
is required. No upload was performed.

The existing personal tab validates a saved SignalTuner session with `/api/auth/me`
independently of meeting context. As of 2026-10-27, Teams SSO is temporarily paused
by `TEAMS_SSO_ENABLED = false` in `src/Tab/App.tsx`: sign-in/account-creation buttons,
SSO notices and separators are hidden, and automatic and manual token acquisition
are blocked. With no valid session, use email/password sign-in or email account
creation. Password reset, legal consent and profile completion remain available.
Separate storage partitions sign in independently; no tokens pass between frames.
Existing sessions, including those originally issued through SSO, still restore.
The backend and manifest SSO contracts remain intact for a later coordinated rollout.

Explicit sign-out suppresses automatic SSO. Transient restoration failures retain
the token for retry; HTTP 401 clears it. Shared-storage account changes clear
private state before validating the replacement token. Personal requests abort on
unmount and account-keyed components isolate data and pending analyses.

## Shared components

- `DashboardHeader`: existing logo, account dropdown and navigation.
- `ConnectivityPresentation`: existing gauge, trend chart, telemetry groups,
  colors, thresholds, icons and recommendations, extracted from `App.tsx`.
- `ConnectivitySummary`: category/score display; the meeting view retains its
  existing category fallback behavior.
- `ClientPrompt`: existing download, temporary activation code and polling flow.
  Codes are never generated automatically. As in meeting sign-in, setup appears
  as a separate screen only when the authenticated account's `clientIsActive`
  reporting-data flag is false. Reporting clients open the dashboard directly.
  Connecting or choosing Continue without syncing opens the dashboard; disconnected
  users can reopen setup later. A telemetry-read failure does not trigger setup.
- `AnalysisSection`: shared disclosure layout for personal and meeting charts.
- `AnalysisConfirmationDialog`: shared individual-analysis confirmation shell,
  wording, credit balance, error styling and close controls. Personal Analysis +
  Report opens this dialog without submitting; Request analysis confirms it.
- Existing Settings, Support, AppearanceSelector, MeetingServiceStatus,
  LiveAnalysisCharts, AnalysisCountdown and RemoteAnalysisButton are reused.

`PersonalDashboard`, `PersonalAnalysis` and `personalDashboardData` contain personal
view orchestration. Each section loads and fails independently. Visible tabs poll
signals every ten seconds, account/credits/device capability every thirty seconds,
and history every minute. Returning to the tab refreshes immediately. Signals older
than two minutes are stale; missing values never fall back to zero or Healthy.

Personal connectivity uses the same participant identity, score/category row and
disclosure styling as the meeting dashboard. Test Analysis and Analysis + Report
sit at the right, with Available credits underneath. The analysis disclosure sits
directly below that row; there is no separate Analysis card, last-update label or
telemetry-details toggle. Active requests and recovery errors open the disclosure
automatically. This layout change requires only Teams frontend deployment.

The personal analysis disclosure uses `Analysis for <display name>` and the same
compact running status/countdown and Canceled indicator as the meeting view.
Telemetry follows immediately; cancellation and report-delivery controls remain
below the charts. Refresh status, Refresh analysis status and the Credit status
label/value are removed. The redundant Test/Report heading is removed;
Test completion still explicitly says no report was generated or credit used.
Both analysis buttons remain enabled when idle, including with zero/unknown
credits, a disconnected/older desktop, or a previous error. Pending/Approved/
Running analysis and an in-flight action disable them to prevent overlap. Clicking
an action checks the latest analysis and desktop capability and shows actionable
feedback; enabling a button does not bypass backend entitlement enforcement.
Idle analysis status refreshes every thirty seconds and on focus/visibility;
active analysis retains its two-second polling. There is no automatic submission.
Test starts directly. Report requires the same explicit confirmation as in-meeting
individual analysis and closes on acceptance. Opening/closing the dialog alone
never creates a request or spends credits.

The [Teams mobile commerce policy](teams-mobile-commerce.md) hides direct and
indirect purchase routes on iOS/Android/iPadOS using TeamsJS host context. Existing
allowance and entitled reports remain usable; zero allowance does not disable
supported Test Analysis. Desktop/web external links and consent disclose leaving
Teams for website/Stripe payment flows. This follow-up changes only the Teams UI.

## Contracts and recovery

The only new route is **`GET /api/User/signal/current`**. It resolves the authenticated
active account and reuses the website's signal reader. This is necessary because
`/api/auth/me` does not return the legacy code required by `/api/User/GetSignal/{code}`.
It neither generates nor exposes activation codes. Both signal routes select the
latest row and populate the existing `LastUpdated`/`Timestamp` properties as UTC.
Hardware identifiers remain excluded by SignalModel serialization. No schema change.

Other contracts are unchanged: `/api/credits/account`; remote-analysis current-device,
latest with `mode=Any`, creation, live status, cancel and retry-delivery; and
`/api/meetings?includeTeams=true` with `/api/meetings/teams-{id}` details.

Self-analysis submits the authenticated target with `meetingSessionId: null`, mode
Test or Report and a request ID. The exact operation is saved in account-scoped
sessionStorage **before sending**. Storage failure prevents sending; uncertain
responses/reloads recover through the normal action buttons using the same ID/body
if read-only checks cannot find the request. A confirmed existing active request
is restored without another POST; a pending operation cannot switch modes.
Sign-out retains uncertain operation IDs
for safe recovery by the same account, never another account. New analyses require
a successful prior-status check. Backend ownership, conflict, approval, capability
and billing checks remain authoritative. Test is free and capability-checked on
click; Report credit eligibility remains enforced by the backend. Active status polls every two seconds and
pending delivery every ten seconds while visible. Provider acceptance is not
described as confirmed inbox delivery.

Historical meetings show previously signed-in membership and latest available
participant signals, **not** meeting-time telemetry or live attendance. Opening
history opens a closable modal above the personal dashboard and never calls join.
Close or Escape dismisses it and restores focus to the triggering button; personal
analysis stays mounted behind it. Your Meetings starts collapsed on page load.
Participant analysis uses the numeric meeting session ID
and existing approval/credit rules. No calendar, Graph, bot or invitation changes.

## Validation commands

```powershell
./node_modules/.bin/tsc.cmd -p tsconfig.app.json
npm run build
npm run test:personal
node --test tests/meetingAnalysis.test.cjs tests/analysisLive.test.cjs tests/serviceStatus.test.cjs tests/meetingInvitations.test.cjs tests/settingsAccount.test.cjs
```

Browser tests use an existing Playwright installation, without a project dependency.
Set `PLAYWRIGHT_MODULE` to its module directory if needed and `BROWSER_EXECUTABLE`
to an installed Chromium browser executable. In a separate shell:

```powershell
$env:VITE_SIGNALTUNER_API_URL='http://127.0.0.1:4317/backend'
./node_modules/.bin/vite.cmd --host 127.0.0.1 --port 4317 --strictPort
```

Run `npm run test:personal-browser`. Only the test browser intercepts SDK/API
responses with synthetic accounts. Optional `PERSONAL_TEST_SCREENSHOTS` sets an
output directory. Coverage includes restoration, email sign-in/profile completion,
hidden SSO controls and absence of automatic token/API calls,
activation/reconnection, free tests, report retry/recovery, account isolation,
Settings/Support, historical authorization, the original meeting view and
390/760/1440px light/dark layouts. This does not verify a live Teams tenant.

Backend: `dotnet test signaltuner-back.Tests/signaltuner-back.Tests.csproj`.
`PersonalSignalTests` additionally uses the existing guarded disposable MySQL
fixture in backend `docs/web-meetings.md`; with that fixture running, set
`SIGNALTUNER_LOCAL_MEETING_DB=1` and filter `FullyQualifiedName~PersonalSignalTests`.
Never run against production. No migration is required.

Local validation on 2026-10-27: TypeScript and the frontend build passed; all 48
frontend tests and 13 browser scenarios passed. Backend build passed; the default
suite passed 325 tests and skipped 13 opt-in cases. Both PersonalSignalTests passed
with the isolated database enabled. Synthetic light/dark screenshots were reviewed
at desktop and narrow widths. Existing Vite deprecation and backend compiler/package
advisory warnings remain; this work does not upgrade dependencies.

The sign-in setup follow-up passed TypeScript, the frontend build, 12 personal-data
tests and 14 browser scenarios. Setup now follows the same separate-screen gate as
the meeting app. This follow-up changes only Teams frontend behavior; it needs no
additional backend, schema, Azure configuration or manifest change.

## Deployment impact

Personal analysis controls follow-up (2026-10-28): removed the personal-view
refresh controls and Credit status display, and reused the in-meeting individual
confirmation dialog for Analysis + Report. Idle actions remain enabled; active
analysis or an in-flight action prevents duplicate submissions. Validation passed
TypeScript, 24 personal-data/live-analysis unit tests, all 48 browser scenarios,
and the DreamHost production build. The confirmation screenshot was reviewed.
This follow-up requires only a Teams static frontend upload; it adds no backend,
database, Azure configuration, manifest, or package change. No upload was performed;
hosted Teams verification remains separate. The original feature's broader
deployment prerequisites are recorded below.

- Changed projects: Teams app and backend.
- Dependent projects: website retains its signal route; WPF supplies existing Test
  capability/telemetry. Website, WPF and SEO need no code change or release.
- Database/configuration prerequisites: existing remote-analysis/self-Test features
  must be deployed and enabled. No new SQL, setting, permission, manifest or package.
- Backward compatibility: additive route and populated optional timestamps. Older
  desktops can report but cannot run Test. Existing clients remain compatible.
- Required deployment order: every backend instance, then Teams hosted code.
  Personal connectivity will be unavailable against an older backend.
- Azure: publish through the existing pipeline to **App Service `signaltuner-back`,
  resource group `SignalTuner`**. Verify the intended production slot via **Azure
  portal > App Services > signaltuner-back > Deployment Center > Logs**. No
  Environment variables or Entra settings change. The Teams frontend now targets
  DreamHost Apache at `teams.signaltuner.com`; follow [the static hosting guide](dreamhost-hosting.md).
  No Azure frontend App Service is needed. Do not invoke package/publish lifecycle
  operations as part of a frontend upload. This hosting conversion requires no
  additional backend deployment beyond the feature prerequisites above.
- Post-deployment verification: email/password sign-in with SSO hidden in separate personal/meeting storage
  partitions, activation, full five-minute zero-credit Test, Report reservation/
  consumption/refund and email, history authorization, account changes and Teams
  high-contrast theme. Local checks do not establish hosted readiness.
- Rollback: revert Teams hosted code first; the additive backend route may remain.
  Keep existing Test-capable backend/desktop support while requests are running.
- Projects still requiring deployment: backend and Teams hosted app. No production
  deployment, Azure change, package or live analysis was performed.
