# Bot welcome and setup guide

Implemented 2026-11-06. The backend now prepares a proactive Adaptive Card for a
fresh group-chat installation; it remains a notification-only bot with no chat
commands. See `signaltuner-back/docs/teams-bot-welcome.md` for routing, duplicate
delivery protection, configuration, tests and delivery limits.

The card's Setup guide button, both support screens, the source manifest's long
description, and the prepared Partner Center HTML now link to
`https://www.signaltuner.com/setup-guide`. The website guide uses the existing
five-step onboarding copy and product preview images, with activation, team,
service, meeting and analysis instructions plus Teams-specific help. It is public
and does not require an account to read. See `signaltuner-front/docs/setup-guide.md`.

This task preserves existing working-tree changes, manifest version, app/bot/SSO
IDs, scope declarations and valid domains. The website is an external help link,
not an embedded origin, so it is not added to `validDomains`. Package generation
and submission remain separate authorized actions. The welcome handler can serve
fresh installations of the currently installed package once the backend is updated.

Release website first, backend second, hosted Teams frontend third. Include the
manifest/listing help-link correction with the next approved Teams release. The
backend's existing `TeamsInvitations__TeamsAppId` also controls the welcome's Open
SignalTuner deep link; the optional `TeamsWelcome__TabBaseUrl` controls signup/help
tab links. Production defaults need no new Azure setting. Exact Azure navigation
and values are in the backend document. No migration, Entra scope or consent change.

Validation: Teams `npm run build` and `npm run validate:store` passed. The latter is
source preflight, not Microsoft certification or live installation validation.
Visual browser QA was blocked when Computer Use could not reliably identify the
browser URL. Before resubmission, verify signed-out help access, mobile layout,
fresh group-chat installation, one welcome card and all five buttons. Existing
identity/invitation certification blockers documented elsewhere remain separate;
this change does not claim to resolve them. Nothing was deployed or submitted.
