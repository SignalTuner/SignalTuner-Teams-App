# Service incident disclosures (2026-11-13)

The Teams and Zoom service-status components now match the website `/services`
incident-card behavior. Opening the outer service section shows incident
summaries; every incident initially has its own closed disclosure. The title,
last-update time, status color and disclosure arrow remain visible. Clicking the
header, or using Enter/Space while focused, toggles only that incident's plain-text
description and permitted provider link. Multiple incidents can stay open.

Each card uses a button with `aria-expanded`, a unique `aria-controls` target and
hidden details. Stable incident keys retain open cards during status refreshes.
Status meanings, sorting, five-resolved-report preview limit, history routes,
refresh intervals and platform-specific external-link policy remain unchanged.

## Work completed

- Current project changes: Teams MeetingServiceStatus.tsx/CSS and its existing
  service-status assertions now cover initially collapsed incident details.
- Other SignalTuner projects changed: the equivalent Zoom component and CSS;
  Zoom README points here. Website code remains the reference and is unchanged.
- Shared contracts affected: none; no API, identity, catalog or telemetry change.
- Database migration/schema status: no database changes for this feature.
- Validation performed: six Teams service-status tests, 32 Zoom tests, Teams
  frontend build and Zoom TypeScript/frontend build passed. Both actual view
  components passed isolated headless Edge checks with synthetic data: independent
  toggles, initial collapse, mouse/Enter/Space, unique control targets, safe text
  and widths 320/375/600/1100. Narrow previews were visually reviewed. These checks
  do not establish native Teams/Zoom or hosted verification.
- Security/privacy considerations: descriptions retain plain-text conversion,
  script/style removal and HTTP(S)-only provider links; host navigation policies
  remain enforced. Browser checks used synthetic records and blocked networking.
- Deployment/release actions: none performed; frontend releases remain separate.
- Outstanding cross-project work: no source changes outstanding; native/hosted
  verification and releases remain user actions.

## Deployment impact

- Changed projects: Microsoft Teams app and Zoom app frontends.
- Dependent projects: website is the UI reference; no backend, website, WPF or
  service-status SEO release is required for this feature.
- Database/configuration prerequisites: none; no SQL, Azure, OAuth, permissions,
  Teams manifest, package or Zoom Marketplace changes.
- Backward compatibility: presentation only; existing backend remains compatible.
- Required deployment order: either frontend may release independently. Use the
  existing Teams DreamHost build/upload flow and Zoom's established frontend
  development/hosting flow; no build artifacts were uploaded here.
- Post-deployment verification: open each service section and confirm all cards
  initially closed, independent keyboard/mouse expansion, readable narrow layout,
  safe provider navigation and retained status/history behavior in each host.
- Rollback considerations: restore that frontend's previous assets; no backend or
  database rollback is needed. The former always-expanded incident bodies return.
- Projects still requiring deployment: Zoom hosted frontend. Teams was deployed
  at the user's request on 2026-11-20 in release `20261120T055552Z`, including
  these disclosures; hosted/native verification remains separate. Presentation
  may differ between apps until both releases are applied. An already-running Zoom
  development server may load the source change without a hosted release.
