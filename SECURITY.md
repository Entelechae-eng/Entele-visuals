# Security Policy

Entelechae Visuals takes the security and integrity of our codebase, dependencies, and hosted infrastructure seriously. We welcome security researchers and community developers to responsibly report potential vulnerabilities.

---

## Supported Versions

Only the current major release running in production is actively maintained with security updates.

| Version | Supported | Notes |
|:---|:---:|:---|
| 2.4.x | Yes | Current production release |
| 2.3.x | No | Deprecated |
| < 2.3 | No | Unsupported |

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

If you discover a vulnerability or security flaw, please report it via one of the following methods:

1. **Private GitHub Security Advisory**: [Open a Private Advisory](https://github.com/Entelechae-eng/Entele-visuals/security/advisories/new)
2. **Direct Security Email**: Send details directly to `security@entelechae.com` or `engineering@entelechae.com`.

### What to Include in Your Report
To help us triage and resolve the issue quickly, please provide:
- A clear description of the potential vulnerability.
- Steps to reproduce the issue (including proof of concept scripts or request payloads if applicable).
- Potential impact and threat model (e.g., Cross-Site Scripting, SSRF, Denial of Service).
- Any proposed mitigations or code patches.

---

## Coordinated Disclosure Process

1. **Acknowledgment**: We will acknowledge receipt of your report within 48 hours.
2. **Investigation & Triage**: Our engineering team will verify the vulnerability and determine its severity (CVSS score).
3. **Patch Development**: We will draft and test a patch within a private branch.
4. **Release & Credit**: Once verified, we will deploy the fix to production, release a new version, and credit the reporter in release notes (unless anonymity is requested).

---

## Safe Harbor

We consider security research conducted in accordance with this policy to be authorized. We will not pursue legal action against researchers who:
- Make a good faith effort to avoid privacy violations, data destruction, and interruption of production services.
- Give us reasonable time to remedy the vulnerability before disclosing it publicly.
- Do not exploit the vulnerability beyond what is strictly necessary to demonstrate its presence.

