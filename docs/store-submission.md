# Public Microsoft Teams Store preparation

## Production package 1.0.22 (2026-11-06)

Generated at the user's request: `appPackage/build/SignalTuner-production-1.0.22.zip`
(10,713 bytes). SHA-256:
`50A21CA10B28015E5426B9BFCBB65E0EF27EFD9A11246301F161BA9A90F47EB2`.

The ZIP contains exactly `manifest.json`, `color.png` and `outline.png` at its
root. Each archived entry was hashed and matched against the validated files in
`appPackage/build/production-1.0.22`. Production-input/icon preflight, the full
Teams app build and validation against Microsoft's cached 1.27 JSON schema passed.
Build emitted the existing Vite CommonJS deprecation warning; Ajv emitted schema
compatibility warnings. Compared with 1.0.21, only version and descriptions
changed; app/bot/SSO identities, permissions, domains, tab URLs and icons are retained.
Earlier packages are preserved. The long description includes the public Setup guide.

This is a local package, not a frontend/backend deployment or Store submission.
Upload it under **Partner Center > Marketplace offers > Microsoft 365 and Copilot
> SignalTuner > Packages** when ready, synchronize the listing from the prepared
HTML, and run Developer Portal package validation and live installation checks.

The welcome/guide release remains separate: deploy the website guide and downloads
rewrite first, the backend welcome handler second, and the hosted Teams frontend
support links third. Verify **Azure portal > App Services > signaltuner-back >
Settings > Environment variables > App settings** in production:
`TeamsInvitations__TeamsAppId` must match the installed app's navigation ID for
its distribution channel. The manifest remains
`12a01999-ead3-4e8a-9fca-0263cc470316`, while the production catalog installation
observed on 2026-11-20 uses `b429569b-1074-48dc-b25c-a556e9f63631`. If stale, update
the setting, Apply/Save and let the App Service restart before testing the welcome
links. See the backend's `docs/teams-bot-welcome.md` for that configuration release.
See [welcome rollout and checks](bot-welcome-and-setup-guide.md). No database
migration, new permission or identity change is required. Existing clients remain
compatible; functionality may be incomplete until the separate deployments finish.
Retain the public guide for previously delivered cards on rollback, and use a
higher manifest version for any later package correction. Deployment status and
live welcome delivery have not been verified by this packaging task.

## Marketplace description alignment (2026-11-05)

Source manifest **1.0.22** and [paste-ready Partner Center HTML](partner-center-description.html)
now share the same visible long-description text and link destinations. The
manifest uses Markdown; the listing file uses only paragraphs, bold labels,
a three-item HTML list and anchors. It has no scripts, styles, manual space-based
indentation or Markdown. Open the HTML file in a browser to preview its structure;
the Marketplace renderer may apply different fonts and spacing.

Both descriptions state prominently: **A SignalTuner account is required to access
and use the app's functionality.** They direct users to sign in or sign up and
retain desktop installation, report-credit, permission/consent and meeting-bot
limitations. Sign up, Get started, Help and Contact support have explicit links.
Signup/help use existing public app routes; the download page is clearly identified
as the external SignalTuner website. The link now uses
`https://www.signaltuner.com/downloads/`. Deploy the website root `.htaccess`
correction before publishing this listing: the physical downloads directory
previously bypassed the React page. Both slash variants now target the page,
while directory indexing is disabled site-wide. See the website's
`docs/windows-installer-hosting.md` for upload and verification steps.
No new website page or installer URL is required.

Use this exact short description in both locations (74 characters):

> Understand connectivity health before and during Microsoft Teams meetings.

The short description in 1.0.21 contains no reference to Teams, so the review
finding may concern an earlier submission. Version 1.0.22 explicitly uses
Microsoft Teams as the first reference in each description; later references
may use Teams. Both app names remain SignalTuner.

Validation passed: production manifest/icon preflight, Microsoft 1.27 schema,
exact HTML/Markdown visible-text and destination equivalence, the four links,
three list items, account disclosure and first Microsoft Teams references.
The short/long manifest descriptions are 74/1,341 characters. HTML uses only
`p`, `strong`, `ul`, `li` and `a` elements, with only `href` attributes on links.
Comparison with 1.0.21 confirms only version and descriptions changed. These
are local structural checks, not a preview of Partner Center's final rendering.

### Partner Center changes to apply

1. Open **Partner Center > Marketplace offers > Microsoft 365 and Copilot >
   SignalTuner > Marketplace listings / Store listings > the affected language**.
2. Replace the short description with the sentence above.
3. Replace the entire long description with `docs/partner-center-description.html`.
   Use the editor's HTML/source mode if available. If it presents only a visual
   rich-text field, open the file in a browser and copy the rendered content into
   that field, preserving its formatting and links. Do not paste raw HTML into a
   plain-text view or include Markdown fences. Check that tags are not visible.
4. Save each affected language. Confirm the account disclosure is near the top,
   feature bullets are indented consistently, and all four links remain clickable.
   Signup/help must work for a signed-out visitor; the contact link opens an email
   draft. No account creation or email sending is needed for this check.
5. For a Developer Portal draft, synchronize **Configure > Basic information**:
   short description, production-resolved Markdown long description and version
   1.0.22. Do not paste the Partner Center HTML into the manifest description.
6. Use the generated 1.0.22 production ZIP, replace the previous package
   under **Packages**, and run Developer Portal package validation before
   resubmission. Changing the ZIP alone does not update Marketplace listing text.

The 1.0.21 ZIP remains unchanged and does not include this latest description.
The 1.0.22 ZIP was subsequently generated on 2026-11-06 as recorded above.
No portal update, upload or submission was performed.
The subsequent downloads-link correction also changes website Apache configuration
and requires deployment to the website's DreamHost document root before listing
publication. No Azure setting, API/authentication change or database migration is
needed. Older clients remain compatible; keep the existing icon and identity fixes
if revising the listing again.

References: [Microsoft description guidelines](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines#app-descriptions)
and [submission checklist](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/submission-checklist#write-descriptions).

## Production package 1.0.21 (2026-11-05)

Generated at the user's request: `appPackage/build/SignalTuner-production-1.0.21.zip`
(10,555 bytes). SHA-256:
`3B451509BD1F00C0929577717A2B3E8287F9AD6586762C71DCB75AB7B19B9612`.

The ZIP contains exactly `manifest.json`, `color.png` and `outline.png` at its
root. Each archived entry was hashed and matched against the validated staging
files under `appPackage/build/production-1.0.21`. Production-input/icon preflight
and Microsoft's 1.27 JSON schema validation passed. The four Markdown links resolve
to the intended production destinations. Compared with 1.0.20, only the manifest
version/full description and the two icon files changed. App/bot/SSO identities,
permissions, domains and content URLs are unchanged. Previous ZIPs are preserved.

Upload this ZIP under **Partner Center > Marketplace offers > Microsoft 365 and
Copilot > SignalTuner > Packages**. Synchronize Developer Portal branding and the
Partner Center description separately as described below, then run Microsoft's
package validation and review the installed icon/description before submission.
Local checks do not establish Store approval. No upload, submission, Azure change,
database change, frontend deployment or other project release was performed.

## Package icon alignment (2026-11-05)

The package icons now derive from the user's Partner Center artwork, retained
unchanged at `assets/branding/dark-icon_300x300.png`. `appPackage/color.png` is
192 x 192 with the white bars and colored arcs centered within a 96 x 96 area on
solid black. `appPackage/outline.png` is the same silhouette, white on transparent,
at 32 x 32 with a centered 28 x 28 area. The generator keys the master's black
matte for the outline before downsampling. The master is not included in the ZIP.

Rebuild with `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-brand-icons.ps1`.
The store preflight checks dimensions, opacity/white transparency and the color
icon's black padding. Both existing manifest filenames remain unchanged.

Synchronize **Developer Portal > Apps > SignalTuner > Configure > Branding** with
these two package icons. Retain the supplied 300 x 300 artwork for the Partner
Center listing. Refresh screenshots that show the previous package icon after
installing the updated package. The in-app header wordmarks are separate assets
and were not changed by this package-icon correction.

These icons are included in the generated 1.0.21 package together with the
description links below. Older ZIPs still contain the old icons; upload 1.0.21
under Partner Center > SignalTuner > Packages.
No upload, portal edit, DreamHost deployment or other project change was
performed. No API, identity, permission or database change
is involved; previous packages remain intact for reference.

## Description hyperlinks (2026-11-05)

**Production ZIP 1.0.21 has been generated and locally validated, but not submitted.
The 1.0.20 ZIP contains the earlier plain-text description.**

`description.full` now uses Markdown links for account creation, desktop setup,
help and contact email, with paragraph breaks for readability. The short description
and all feature/credit/consent limitations remain unchanged. Account and help URLs
use `${{TAB_ENDPOINT}}` so local and production manifests stay separate. Production
targets are `/tabs/create-account` and `/tabs/support` on `teams.signaltuner.com`;
the desktop link uses the existing public website `/downloads` page. Contact is a
`mailto:support@signaltuner.com` link. These are existing routes; no new endpoint,
API, app permission, `validDomains` entry or Azure configuration is required.

Only the Teams manifest/docs changed for this correction. The website is an
existing link destination and requires no release. Upload the generated 1.0.21
package under **Partner Center > Marketplace offers > Microsoft
365 and Copilot > SignalTuner > Packages**. Preserve the previous ZIPs. Verify
the rendered description and all links in the installed app/store view; clicking
the email link should only open a mail draft, not send a message. No account was
created and no contact message was sent during validation.

Validation passed: source and production-input preflight, Microsoft 1.27 schema,
four resolved Markdown destinations, and exact visible-text/HTML equivalence.
The full description is 1,008 characters (within 4,000). All three HTTPS targets
returned HTTP 200; these SPA shell checks do not prove interactive signup/support
flows or final store rendering. Comparison with 1.0.20 confirms only version and
`description.full` changed. The later 1.0.21 package also includes the updated
icons and is recorded above.

### Partner Center description format

The 1.0.21 description above is a historical release record. For the current
listing, use [partner-center-description.html](partner-center-description.html)
and the **Marketplace description alignment** instructions at the top of this
file. That HTML matches the 1.0.22 manifest and supersedes the earlier four-paragraph
snippet. Keep both app names SignalTuner and the sole valid domain
teams.signaltuner.com.

## Valid-domain correction (2026-11-05)

**Production ZIP 1.0.20 was generated and locally validated on 2026-11-05 at the
user's request. It has not been uploaded or submitted.
The existing 1.0.19 ZIP fixes naming only and still contains the flagged domains.**

### Production package 1.0.20

- ZIP: `appPackage/build/SignalTuner-production-1.0.20.zip` (9,081 bytes).
- Resolved files: `appPackage/build/production-1.0.20/`.
- ZIP SHA-256: `23224BE734905DFA5D5B1E87F9F752C0DE2104AA9B66A2BF97950EE7AEACDD9A`.
- Both names are SignalTuner; the existing production app ID is preserved.
  Semantic comparison with 1.0.19 confirmed only version and `validDomains` changed.
- Production preflight and icon checks passed. The resolved manifest passed the
  freshly downloaded Microsoft 1.27 schema with the existing Ajv 6 / Draft-04
  validator. Schema SHA-256:
  `ADC66F66F44B0FCD42EF36DB4319EDBB5225BFFEA95FB64A83EA2F2706B7F9A5`.
  Ajv emitted the same informational `$ref` sibling-keyword warnings.
- Exactly `manifest.json`, `color.png` and `outline.png` are at the archive root;
  each archived file's SHA-256 matches its validated source. No development URLs,
  unresolved placeholders, credentials, frontend bundles or source code are included.
- Earlier archives were preserved. No remote certification, installation,
  upload, submission, deployment, Azure change or database operation was performed.

The source now contains only `${{TAB_DOMAIN}}`. Production resolves to:

```json
"validDomains": ["teams.signaltuner.com"]
```

The former explicit `teams.signaltuner.com` entry duplicated the production
placeholder. `www.signaltuner.com` is used for external website/download links,
not embedded app pages. `signaltuner-back.azurewebsites.net` is used for fetch/API
calls and server-side bot messaging. The invitation picker is an Adaptive Card,
not a web dialog hosted on the backend. No current authentication popup loads
the backend as a Teams page. The app's content and configuration URLs use the
tab origin, which is retained. These findings support removing both unnecessary
hosts instead of broadening trust or moving an API endpoint.

The source and production preflight now enforce this minimal list. Local Toolkit
substitution remains environment-specific. No public website/download URL,
backend URL, CORS rule, CSP, app ID, bot permission, SSO resource or redirect is
changed. Full URLs such as `developer.websiteUrl` must remain full HTTPS URLs;
the hostname-only restriction applies to `validDomains`.

### Update the registered app

1. Use the validated production package `appPackage/build/SignalTuner-production-1.0.20.zip`,
   which retains app ID `12a01999-ead3-4e8a-9fca-0263cc470316`.
   Previous archives are preserved; do not use 1.0.19 for this resubmission.
2. If you also maintain this app in [Teams Developer Portal](https://dev.teams.microsoft.com/),
   open **Apps > SignalTuner** and verify that production app ID. Open **Configure
   > Domains** (the documentation calls this section **Domain**), remove
   `www.signaltuner.com` and `signaltuner-back.azurewebsites.net`, and retain one
   `teams.signaltuner.com` entry. Save. Do not add `https://`, a path, `www.`, a
   wildcard, or the parent `azurewebsites.net`. Keep version 1.0.20 and both names
   SignalTuner synchronized with source; alternatively import the corrected
   package into the existing app. To export from Developer Portal, open **Publish
   > Publish to store > Download app package**. Confirm the exported manifest
   has version 1.0.20 and exactly the production domain list above before use.
3. In **Partner Center > Marketplace offers > Microsoft 365 and Copilot >
   SignalTuner > Packages**, replace the submitted package with the corrected ZIP.
   The store's valid-domain list is in that package; changing a Developer Portal
   draft alone does not replace the package under review. Save and use **Review
   and publish** to resubmit when ready.
4. Verify personal and meeting tabs, configuration, sign-in, API-backed telemetry,
   the invitation picker and external download links in the updated Teams app.

No Azure configuration change is required. In particular, do not change backend
CORS, Entra redirect URIs or the Azure Bot messaging endpoint to edit this list.
Only the Teams package needs updating for this domain correction; no backend,
website, WPF, SEO or DreamHost release is required. Earlier frontend/terms release
work remains separate. Older packages remain functional but retain the review
defect. For rollback, retain the narrowed domain list in a higher package version.

### Reply to the reviewer and ownership evidence

After the corrected package is uploaded, a suitable validation-thread reply is:

> We removed www.signaltuner.com and signaltuner-back.azurewebsites.net from
> validDomains because neither hosts embedded app pages. The updated production
> manifest contains only teams.signaltuner.com. The API endpoint remains unchanged.

Confirm your organization's control of `teams.signaltuner.com` before adding an
ownership statement. Local repository configuration is not live ownership proof.
If Microsoft still asks about the Azure hostname, verify **Azure portal > App
Services > signaltuner-back > Overview** in the production subscription/resource
group (**SignalTuner**, not the staging app). Confirm the default domain and your
organization's resource access; supply a suitably redacted screenshot or written
confirmation in the existing validation thread. Do not claim ownership of all
`azurewebsites.net`, and do not share credentials, tokens or connection strings.
For the remaining tab host, verify **DreamHost > Websites > Manage Websites >
teams.signaltuner.com** and provide redacted hosting/DNS control evidence if asked.
No ownership email was sent or account configuration inspected by this task.

Validation: source and production-input preflight passed, including icon checks.
The in-memory production manifest passed Microsoft's 1.27 schema and a semantic
comparison with 1.0.19 confirming only version and `validDomains` changed. Local
substitution resolves only to localhost. All three existing invitation tests
passed. These checks do not establish installed Teams behavior or domain ownership.

References: [external-domain review policy](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines#external-domains),
[manifest validDomains](https://learn.microsoft.com/en-us/microsoft-365/extensibility/schema/root?view=m365-app-1.27#validdomains),
and [Developer Portal configuration](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/manage-your-apps-in-developer-portal).

## Naming correction for resubmission (2026-11-05)

**Historical naming-only package: production version 1.0.19 was generated and locally validated on 2026-11-05 at
the user's request; it has not been uploaded or submitted. The existing 1.0.18 ZIP retains the rejected full name and must not
be reused for resubmission.** The package history below records earlier checks,
not approval of the current submission.

### Production package 1.0.19

- ZIP: `appPackage/build/SignalTuner-production-1.0.19.zip` (9,108 bytes).
- Resolved manifest and icons: `appPackage/build/production-1.0.19/`.
- ZIP SHA-256: `FDB347099187D286C7B531F24E457A746FB67B494CA2C97F745D0006525B4975`.
- Production app identity remains `12a01999-ead3-4e8a-9fca-0263cc470316`.
  A semantic comparison with 1.0.18 confirmed only version, full name and short
  description changed. Existing bot/SSO identities, permissions and URLs are intact.
- Production-input, naming and icon pixel/dimension checks passed. The resolved
  manifest passed Microsoft's freshly downloaded 1.27 JSON schema using the
  existing Ajv 6 / Draft-04 validator. Schema SHA-256:
  `ADC66F66F44B0FCD42EF36DB4319EDBB5225BFFEA95FB64A83EA2F2706B7F9A5`.
  Ajv reported the same informational warnings about sibling keywords beside `$ref`.
- The ZIP has exactly `manifest.json`, `color.png` and `outline.png` at its root;
  each archived file's SHA-256 matches its validated source. No development hosts,
  unresolved placeholders, credentials, frontend bundles or source files are included.
- Earlier archives were preserved. No remote validation, upload, installation,
  submission, deployment, Azure change or database operation was performed.

Canonical public metadata:

| Field | Value |
| --- | --- |
| Manifest `name.short` and `name.full` | `SignalTuner` |
| Partner Center product/listing name in every language | `SignalTuner` |
| Developer/publisher display name | `SignalTuner Inc.` (confirm the existing verified publisher) |
| Short description / listing summary | `Understand connectivity health before and during meetings.` |

The source manifest now uses both canonical names; the read-only store preflight
checks both. The tab title, configured tab name, HTML title and local Toolkit
creation name already use SignalTuner. Existing package icons are SignalTuner's
own artwork; the listing uses the matching 300 x 300 master under
`assets/branding/dark-icon_300x300.png` (see package icon alignment above). References
to Microsoft Teams in functional descriptions describe integration, not the
product's name. The shared terms copy now says "When using SignalTuner in Microsoft
Teams" in this app and the website. This is a branding-only edit, with no change
to legal terms, consent versions or account behavior.

Internal repository paths and the npm package name remain development metadata.
No app IDs, domains, bot/Entra identities, permissions or scopes change.

### Partner Center changes to make manually

1. Sign in to [Partner Center](https://partner.microsoft.com/dashboard), select
   **Marketplace offers**, then **Microsoft 365 and Copilot** if tabs appear.
   Open the existing **SignalTuner Teams App** offer and its rejected/draft
   submission. Keep the existing offer and production Teams app identity.
2. Open **Product management > Manage product names**. Under **Reserve more
   names**, enter **SignalTuner**, select **Check availability**, then **Reserve
   product name**. If already reserved on this offer, use that name. If unavailable,
   resolve the reservation with Partner Center support rather than creating a
   different app identity or adding "Teams" back to the name.
3. Select **Make alias** beside **SignalTuner** to also change the name displayed
   inside Partner Center. This alone does not rename the public listing.
4. Open **Marketplace listings** (called **Store listings** in the name-management
   documentation), select each language, and choose **SignalTuner** in the
   **Product name** dropdown. Save each listing. Match the summary above and the
   source manifest's full description; verify the publisher is **SignalTuner Inc.**
   Review existing screenshot captions, videos, icons and website branding for
   the two rejected names or suggestions that Microsoft publishes SignalTuner.
   These account-hosted assets were not inspected by this local audit.
5. Under **Packages**, replace the old ZIP with a newly generated and validated
   production **1.0.21** package using the existing production app ID. If 1.0.21
   has since been submitted, choose the next unused higher version. Extract the
   exact ZIP and check both names, version and production URLs before upload.
   Editing source or uploading `dist/dreamhost` does not update the packaged name.
   Keep any Developer Portal copy's short/full names synchronized with this package.
6. After the listing and package match, use **Review and publish** to resubmit.
   In certification notes, state that both manifest names and every listing name
   are now SignalTuner, and the product has no claimed Microsoft partnership.
   Verify the public listing and installed app name after acceptance.

References: [Microsoft's name-management instructions](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/manage-solution-names),
[submission navigation](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/add-in-submission-guide),
and [Teams naming requirements](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines#app-name).
This task does not require an Azure portal or Microsoft Entra app-registration change.

Validation for this correction: source and production-input `validate:store`
checks passed, including both names and icon checks; `build:dreamhost` and its
static output validation passed. Teams and website terms copies match. No new
Microsoft certification or live Partner Center inspection was performed. Subsequent
1.0.19 package generation and schema/content checks are recorded above.

### Deployment impact

- Changed projects: Teams app (manifest, validation, terms, documentation); website
  (matching terms wording).
- Dependent projects: existing backend, WPF and SEO clients remain compatible.
- Database/configuration prerequisites: none; no migration or identity change.
- Backward compatibility: nonbreaking branding-only correction.
- Required deployment order: publish the Teams and website terms before reviewer
  verification; upload the new package and save the matching listing in the same
  resubmission. No backend deployment ordering requirement.
- Post-deployment verification: both terms pages, listing names in all languages,
  developer name, icons, and installed app details. Local checks cannot certify
  the live Partner Center record or reviewer assets.
- Rollback considerations: retain identity and corrected name. Reusing 1.0.18
  would restore the naming defect; use a higher version for any later package fix.
- Projects still requiring deployment: Teams static frontend and website terms;
  the new Teams package upload and Partner Center resubmission remain outstanding.

## Earlier package history

Production package updated 2026-10-28. **ZIP prepared and schema-validated;
Store certification readiness remains unverified.** Customer-tenant functionality,
live mobile verification and certification evidence remain open. A new production
ZIP was generated at the user's request; no upload, publication, installation,
Azure change or migration was performed. Existing generated local files are stale
and must not be submitted.

## Production package 1.0.18 (2026-10-28)

- User-confirmed production `TEAMS_APP_ID` in `env/.env.prod`:
  `12a01999-ead3-4e8a-9fca-0263cc470316`. Local environment IDs are unchanged.
- Source manifest version advanced from 1.0.17 to 1.0.18. Bot and
  `webApplicationInfo.id` remain `e32ebb3f-81e9-4ca2-85f1-a0a2d7b74999`;
  groupChat-only notification bot, meeting contexts, personal dashboard, RSC
  permissions, hosted SSO resource and domains are preserved. SSO stays disabled.
- Fresh ZIP: `appPackage/build/SignalTuner-production-1.0.18.zip`.
  Resolved manifest and icons: `appPackage/build/production-1.0.18/`.
  Exactly `manifest.json`, `color.png`, and `outline.png` are at the ZIP root.
  No development URLs, unresolved variables, source files or credentials are included.
  The prior local and production-test archives were not reused or overwritten.
- ZIP SHA-256: `2B8B782BD85E3DA56EEF494478E4B8252498E146EC6975894F84355CB38EF11B`.
- Production preflight and icon pixel/dimension checks passed. The resolved
  manifest passed Microsoft's published 1.27 schema using Ajv 6 / Draft-04;
  schema SHA-256: `ADC66F66F44B0FCD42EF36DB4319EDBB5225BFFEA95FB64A83EA2F2706B7F9A5`.
  The packed manifest matches the validated file. Ajv reported informational
  warnings for sibling keywords beside `$ref` in Microsoft's schema.
- Live read-only HTTPS checks returned 200 for `/tabs/home`, `/tabs/config`,
  `/tabs/privacy`, and `/tabs/terms` on `teams.signaltuner.com`, with a CSP allowing
  Teams framing and no X-Frame-Options blocker. These checks do not establish
  in-client rendering, installed app identity, or backend workflow success.

This is a distinct Teams app identity from the earlier local/test app, not an
in-place upgrade of that app. Validate/install the new identity in the intended
test tenant and meeting; existing tabs under the old identity do not automatically
become this app. Do not change the bot/Entra registration ID to the Teams app ID.

### Required backend configuration alignment

After the new app is available in the intended tenant, verify its navigation ID
from Teams' **Copy link to tab** or the installed catalog entry. Use the manifest
ID for directly uploaded custom apps, org catalog ID for org-catalog apps, and
Store ID for Store apps. The production catalog installation observed on
2026-11-20 uses **`b429569b-1074-48dc-b25c-a556e9f63631`**. Set the existing
non-secret **`TeamsInvitations__TeamsAppId`** to that value at **Azure portal > App Services >
signaltuner-back (resource group SignalTuner, production, not signaltuner-back-stage)
> Settings > Environment variables > App settings**. Apply the change and allow
the App Service restart. Verify Load Participants, selection, Send Invitation,
meeting-chat delivery, and the message's Open SignalTuner button in a real meeting.
This is an existing configuration change, not a backend code release or SQL migration.
Existing messages retain the navigation identity used when they were sent.
Reverting this setting restores the prior target for future messages;
retain the existing bot identity and authorization checks during rollback.

The 2026-11-20 configuration release applied the catalog ID and verified the
backend restart and health checks; see the backend welcome and invitation
documents. Future Store releases must verify the navigation identity again.

Before submitting, run Developer Portal validation against this exact ZIP and
complete the open cross-tenant, mobile, bot-dialog/delivery and reviewer-evidence
checks below. Local schema validation is not Microsoft Store approval. See
[Microsoft's package requirements](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/apps-package)
and [Store validation guidelines](https://learn.microsoft.com/en-us/microsoftteams/platform/publishing/office-store-approval).
Only Teams package/configuration and backend documentation changed for this
release; no frontend hosting, backend, WPF, website, or SEO deployment was performed.

## Prepared changes

- Source manifest 1.0.18: SignalTuner name without a local/dev suffix, SignalTuner
  Inc. publisher (from the existing legal pages), actual website, and descriptions
  covering account, desktop, credit, consent and meeting-invitation requirements.
- Color icon: 192 x 192 PNG, opaque black background, symbol within the centered
  96 x 96 safe area. Outline: 32 x 32 PNG, white symbol on transparency. Both use
  the Partner Center artwork in `assets/branding/dark-icon_300x300.png`.
  Rebuild with
  `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-brand-icons.ps1`.
  These are production assets, not a new generated brand or third-party artwork.
- Development project is SignalTuner Teams App; npm name is `signaltuner-teams-app`.
  Physical directory rename is pending an open-folder Windows lock; the prepared
  helper updates all five AGENTS maps and workspace together after the move.
  See [rename instructions](dreamhost-hosting.md#rename-and-workspace).
  Local configuration files, ports and app IDs remain distinct. A Teams-generated
  "custom app" label belongs to the distribution channel and cannot be removed
  through the app's display name.
- Read-only preflight and `env/.env.prod.example` with the confirmed DreamHost
  origin/resource URI and a deliberately unfilled production app ID.
- [DreamHost static build](dreamhost-hosting.md) at `dist/dreamhost`, with Apache
  routes, framing/security/cache headers and isolated public Azure API config.
  No Node runtime or Azure frontend is needed. Toolkit remote provision/publish
  is disabled; deploy only builds files. Local debugging remains intact.
  Static build/TypeScript, six static checks, two compiled-browser checks, 50
  frontend tests, 25 existing browser scenarios and the rename-helper test passed.
  Live Apache/TLS/iframe/CORS verification remains a release gate.

## Submission blockers and verification gaps

Update 2026-10-27: the user deferred multi-tenant SSO. `TEAMS_SSO_ENABLED = false`
now hides SSO sign-in/account-creation controls and blocks automatic/manual Teams
token requests. Email/password sign-in, registration and existing sessions remain.
Only the Teams frontend needs deployment for this pause; no Azure, backend,
permission, manifest or database change is required. Hosted SSO configuration below
is deferred until re-enabling SSO. Cross-tenant bot access, invitations and the other
Store gates still require resolution; hiding SSO does not establish Store readiness.
Validation for the pause initially passed frontend build, TypeScript and 12
personal-dashboard unit tests. The mobile-commerce follow-up now runs the browser
coverage using isolated temporary Playwright tooling and Edge, with synthetic SDK
and API responses; application dependencies are unchanged. No live sign-in,
package or deployment was performed.

The [mobile commerce policy](teams-mobile-commerce.md) now gates purchase, plan,
trial, billing and indirect website routes through TeamsJS host context. Mobile
retains server allowance and entitled functionality with neutral zero-allowance
feedback. Desktop/web links identify leaving Teams; registration, profile consent,
Settings and the Teams terms disclose external payment handling. Actual Teams
mobile and external checkout verification remain necessary before certification.
The completed follow-up passed 50 frontend tests, 25 synthetic browser scenarios,
full build, TypeScript, manifest readiness and Microsoft's 1.27 schema for local
and synthetic hosted input. Manifest description wording now directs signup
inside the app instead of linking to the website; source version remains the
undistributed 1.0.17. No generated package was changed.

| Priority | Finding | Required action / owner |
| --- | --- | --- |
| Must fix | Production 1.0.20 ZIP has corrected names/domains but retains the plain-text description. Source 1.0.21 adds the required hyperlinks and passed local schema/link checks. | Generate a production 1.0.21 ZIP, replace the Partner Center package, and synchronize its listing description using equivalent HTML/rich text. Verify the installed app/store links. Teams app owner. |
| Deferred SSO / bot blocker | SSO entry points are disabled pending multi-tenant work. Backend `TeamsSsoTokenValidator` still trusts one tenant; Azure Bot is documented as SingleTenant. | Keep SSO disabled. Verify email/password and bot/meeting workflows with a second independent tenant before submission. Design and approve multi-tenant SSO before re-enabling it. Never disable issuer/audience checks or substitute a wildcard tenant. Backend and Entra/Bot owners. |
| Blocker | Bot invitation access remains unresolved in the latest SSO record. | Demonstrate Load participants, selected mentions, meeting deep link and authorization failures in a real supported meeting before advertising the flow as working. Backend plus Teams app. |
| Verify | TeamsJS host gating now hides commerce and indirect purchase routes on iOS/Android/iPadOS, with desktop/web external-navigation and payment disclosures. | Verify actual mobile Settings, signup, legal/support, zero-allowance Test Analysis, entitled reports, setup and incident routes. Unknown/failed context must remain restricted. See the [host policy and test coverage](teams-mobile-commerce.md). Teams frontend owner. |
| Verify | Manifest 1.0.18 retains the background notification-only bot in `groupChat`; no personal bot or channel scope. | No conversational commands/welcome/Help are planned. Validate the existing tab-launched Adaptive Card `task/submit` flow, participant selection and chat delivery in Teams. See the [compatibility assessment](meeting-participant-roster.md#background-bot-and-meeting-scopes-2026-10-27); schema validation is not runtime certification. |
| Certification follow-up | Backend invitation text mentions recipients but does not identify the initiating user. | Review user attribution required for user-triggered bot messages; do not conflate notification-only classification with exemption from notification-content rules. Backend implementation remains unchanged by request. |
| Verify | Configurable tabs now use `groupChat` only; `supportsChannelFeatures` removed; personal static tab and meeting contexts retained. | Test standard meeting installation and upgrades from older manifests, personal dashboard access and absence of channel installation. Explain the narrowed supported surfaces to reviewers and existing users. |
| Verify | User confirms DreamHost subdomain exists; static build/routes are locally validated. No upload or live hosting verification performed. Backend source CORS includes the origin. | Verify DreamHost web directory, DNS, certificate, Apache `.htaccess`, real asset 404s, route refreshes, framing headers and live backend CORS. Check config/privacy/terms/support and root auth routes. |
| Verify | Desktop setup offers a macOS DMG although the supplied project map documents the Windows client. | Verify the downloadable Mac client and supported features; otherwise correct the download flow/support wording before release. Test mobile/no-client users can continue without syncing. If a maintained Mac project exists, add it to the shared project map separately. |
| Verify | External navigation/download actions exist throughout Settings and client setup. | Clearly mark leaving Teams; warn before executable downloads; test keyboard, focus, high contrast, dark mode and narrow meeting/mobile layouts. |
| Verify | Publisher identity, support SLA/contact, policy publication and current deployment evidence are not independently verified. | Confirm the exact Partner Center verified publisher, reachable public support/privacy/terms pages, current data handling disclosures, reviewer accounts and feature deployments. |

This review preserves backend authentication, permissions, API routes and
billing rules. Changes to those need a coordinated implementation/release after the specific
public-tenant design is approved. Cosmetic readiness cannot resolve these blockers.

## Production configuration, DreamHost and Azure locations

All values in `.env.prod` are non-secret, Teams-project configuration. This is a
separate environment, not a replacement for `.env.local`.

| Key | Source and purpose | Default |
| --- | --- | --- |
| `TEAMSFX_ENV` | `prod`; toolkit environment and preflight | No production fallback |
| `TEAMS_APP_ID` | Confirmed production app ID from Teams Developer Portal; consumed by the manifest/toolkit | Blank; do not substitute bot ID or assume local ID |
| `TAB_DOMAIN` | Production tab DNS hostname; manifest valid domains | `teams.signaltuner.com` |
| `TAB_ENDPOINT` | HTTPS origin, no trailing slash; manifest routes | `https://teams.signaltuner.com` |
| `TEAMS_SSO_RESOURCE` | Entra exposed API URI matching that origin and bot identity | `api://teams.signaltuner.com/botid-e32ebb3f-81e9-4ca2-85f1-a0a2d7b74999`; not yet live-verified |

The static build uses the separate public
`config/dreamhost/.env.dreamhost` API URL. No Azure frontend resource ID is needed.

1. **Teams tab hosting:** DreamHost > Websites > Manage Websites >
   `teams.signaltuner.com` > Manage. Confirm the assigned website user/web directory
   and HTTPS certificate, then upload only `dist/dreamhost` contents by SFTP when
   authorized. See [the full hosting and rollback guide](dreamhost-hosting.md).
   Test real Apache headers, route/asset behavior and Teams iframe loading before
   packaging. Legacy Bicep is not part of the production workflow.
2. **Entra SSO:** Azure portal > Microsoft Entra ID > App registrations > All
   applications > `signaltuner-teams-bot`
   (`e32ebb3f-81e9-4ca2-85f1-a0a2d7b74999`) > Expose an API. Once the host and
   identity design are approved, add the hosted URI
   `api://teams.signaltuner.com/botid-e32ebb3f-81e9-4ca2-85f1-a0a2d7b74999`
   and set the identical `TEAMS_SSO_RESOURCE`. Do not overwrite local configuration
   or assume multi-domain Teams SSO support; resolve the separate environment and
   tenant rollout before re-enabling SSO. Verify `access_as_user` and Teams client
   preauthorizations. Save and allow propagation, obtain new tokens through normal
   sign-in and verify audience/issuer; never collect or commit tokens. Supported
   account types and bot tenant architecture require a separately approved design;
   changing Entra alone will not change the backend's single-tenant validator.
3. **Backend:** Azure portal > App Services > `signaltuner-back` (resource group
   `SignalTuner`, production, not `signaltuner-back-stage`) > Settings > Environment
   variables > App settings. Preserve `TeamsSso__TenantId` and `MicrosoftApp*`
   settings until the coordinated identity design is approved. For invitation
   links, set/update `TeamsInvitations__TeamsAppId` to the installed production
   **navigation app ID** (manifest ID for direct custom uploads, catalog ID for
   org-catalog apps, Store ID for Store apps), not the bot ID. Apply and
   restart as prompted, after compatible backend code is on every instance.
   Verify the Open SignalTuner link in the intended meeting. Backend CORS already
   includes `https://teams.signaltuner.com`; a different host requires a reviewed
   backend CORS change and deployment.
4. **Bot:** Azure portal > Azure Bot > `signaltuner-teams-bot` (documented resource
   group `DefaultResourceGroup-EUS`) > Configuration and Channels > Microsoft Teams.
   Verify identity/tenant, channel and the existing backend `/api/messages`
   endpoint. Review the bot profile/display name/icon in the available bot profile
   settings so it matches the manifest branding. Do not rotate credentials or
   change bot type/endpoints as a cosmetic step. Save any approved profile changes
   and verify actual Teams rendering. Public-tenant compatibility remains open.

## Validation before creating a ZIP

Run from this repository:

```powershell
npm run validate:store
powershell -NoProfile -ExecutionPolicy Bypass -File .vscode/scripts/generate-local-manifest.ps1 -ValidateOnly
npm run build
npx --no-install tsc -p tsconfig.app.json --noEmit
npm run build:dreamhost
npm run test:dreamhost
# Once .env.prod contains confirmed values:
npm run validate:store -- -RequireProduction -EnvironmentFile env/.env.prod
```

The preflight validates branding, icon dimensions/pixels and, when supplied,
production inputs, origin/resource alignment, unresolved placeholders and
development hosts. It renders only in memory. It does not validate Microsoft's
full JSON schema, ownership, live endpoints, existing app/version uniqueness,
tenant consent or certification policy. Source-only success is not release approval.
The production example deliberately fails validation until the existing approved
production Teams app ID is supplied.

Validation completed during this review: source preflight, local manifest
`-ValidateOnly`, full `npm run build`, frontend TypeScript check and Git whitespace
check passed. Preflight exercised six cases: source-only success; missing, blank
and local production-input rejection; synthetic valid inputs; and mismatched SSO
resource rejection. Both icons were visually inspected, including the white icon
against a dark background. Build emitted the existing Vite CommonJS API deprecation
warning. The later 1.0.17 scope change additionally passed Microsoft's published
1.27 JSON schema using Ajv/Draft-04 for local and synthetic hosted inputs in memory,
three invitation tests, six meeting-analysis tests, TypeScript and frontend build.
See the roster document for the schema hash and compatibility limits. Developer
Portal package/Store validation and live Teams tests were not run; production
configuration remains incomplete. Existing local ZIP/manifest files were not regenerated.

After explicit authorization to package, generate the production manifest and
ZIP containing `manifest.json`, `color.png` and `outline.png` at its root. Do not
zip the repository or the entire `appPackage` directory. Retain the correct app
identity and use the next unused manifest version (source is now 1.0.21).
Run Microsoft schema/package validation and Developer Portal Store validation
against that exact ZIP. Resolve all errors and assess every warning.

`m365agents.yml` now disables remote provision/publish and only prepares static
files in its deploy lifecycle. Packaging, Developer Portal updates and public
Store submission must be separately authorized. The local Toolkit workflow is
retained for debugging and still has package/install actions; it is not a
production packaging or read-only validation command.

## Store listing and reviewer material

- Use the prepared manifest name/descriptions consistently; verify all claims
  against the final released behavior, including account/desktop/credit limitations.
- Establish Partner Center access and publisher verification. Prepare publisher
  attestation; Microsoft documents different timing for new and existing listings.
- Capture actual Teams screens with synthetic accounts: personal dashboard,
  meeting health, analysis consent/progress and service incidents. Provide up to
  five screenshots at 1366 x 768, each no larger than 1,024 KB. Do not reuse generic
  template screenshots, live meeting data or unverified promotional mockups.
- Supply a walkthrough recording and detailed test notes privately. Include new
  account and returning-account flows, two-person meeting setup, desktop activation,
  credits/consent, invite/roster, cancellation, PDF completion, unsupported contexts,
  sign-out and support. Arrange reviewer access and enough credits/devices to test
  every advertised role. Never commit passwords or reviewer credentials.
- Test desktop/web and iOS/Android, multiple themes, keyboard/screen reader,
  slow/offline responses and a second tenant. Confirm privacy/terms are publicly
  readable and the support path works. Send test mail/invitations only with explicit
  authorization. Public Store submission happens through the documented Developer
  Portal/Partner Center process after these gates, with separate user authorization.

## Cross-project follow-up required

- Project: `signaltuner-back`, with the Teams app and external Entra/Bot resources.
- Contract or behavior affected: deferred public-tenant SSO, bot installation/invitations and
  production app deep links.
- Required code/configuration changes: approve and implement customer-tenant
  bot identity/consent handling and invitation access; multi-tenant SSO is deferred.
  No conversational bot functionality is required by the chosen design.
  Review initiating-user attribution in `TeamsMeetingInvitations.Invitation` before
  certification; the user requested preserving this implementation in this task.
- Suggested search terms or likely files: `Services/TeamsSsoTokenValidator.cs`,
  `Controllers/BotMessagesController.cs`, `Services/TeamsMeetingInvitations.cs`,
  `docs/teams-sso.md`, `TeamsSso__TenantId`, `MicrosoftAppType`,
  `TeamsInvitations__TeamsAppId` (code beneath `signaltuner-back/`).
- Compatibility risk: existing local and installed clients use the current bot
  and SSO identity. Preserve signed-token validation and explicit tenant isolation.
- Required deployment action/order: approved identity configuration and all backend
  instances first, hosted Teams frontend next, production package/install tests,
  then public submission. Do not publish an incompatible manifest ahead of backend.

## Deployment impact

- Changed projects: Teams app. Five AGENTS path maps/workspace remain on the
  current directory until the prepared rename helper can run after the folder
  lock is cleared. Existing application work preserved; sibling code unchanged.
- Dependent projects: backend and installed desktop client for advertised workflows;
  website for external account flows. No sibling code changed in this preparation.
- Database/configuration prerequisites: no migration or schema change; confirmed
  production environment and resolved public-tenant design still required.
- Backward compatibility: app/bot IDs, routes and backend authentication unchanged.
  The approved 1.0.17 manifest narrows bot/configurable-tab scopes to `groupChat`
  and sets notification-only mode. Personal dashboard remains; old channel/personal
  bot installations need upgrade review. The frontend SSO pause is separate.
- Required deployment order: resolve blockers, backend/configuration if changed,
  hosted frontend, production package and installation checks, Store submission.
- Post-deployment verification: cross-tenant sign-in, all install scopes, bot
  invitations, consent/credits, telemetry, reports, mobile commerce and legal/support.
- Rollback considerations: retain existing identities and security checks. Restore
  earlier branding through a new higher manifest version if an update is required;
  frontend and backend compatibility must be assessed separately.
- Projects still requiring deployment: DreamHost static frontend and later Teams package; backend
  will require deployment for the unresolved bot/public-tenant work. This task did
  not deploy any component. Functionality may be inconsistent until required
  components and configuration are released together in the stated order.

## Official references

- [Teams icon requirements](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/design/design-teams-app-icon-store-appbar)
- [Submission checklist](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/submission-checklist)
- [Store validation guidelines](https://learn.microsoft.com/en-us/microsoftteams/platform/publishing/office-store-approval)
- [Package contents](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/apps-package)
- [Publishing overview](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/apps-publish-overview)
