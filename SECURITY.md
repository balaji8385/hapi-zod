# Security Policy

## Supported Versions

The following table outlines which versions of **hapi-zod** are currently supported with security updates.  
Only the latest major version receives active support and security patches.

| Version | Supported          |
| -------- | ------------------ |
| >= 2.x.x    | :white_check_mark:  |
| < 2.x.x    | :x:  |

If you are using an unsupported version, please upgrade to the latest release to ensure continued security and compatibility.

---

## Reporting a Vulnerability

If you discover a potential security issue in **hapi-zod**, we encourage you to report it responsibly to help keep the ecosystem secure.

### How to Report
- **Email:** [security@hapi.dev](mailto:security@hapi.dev) *(preferred)*  
  *(If unavailable, contact the package administrator [lbalaji@live.com](mailto:lbalaji@live.com))*
- **Private GitHub Issue:** You may also open a private security advisory on the repository.

### What to Include
Please provide as much detail as possible, including:
- The version(s) of **hapi-zod** affected.
- A description of the issue and potential impact.
- Steps to reproduce or proof-of-concept (if possible).
- Any suggested mitigation or workaround.

### Response Process
1. You’ll receive an acknowledgment within **7 business days**.
2. The report will be reviewed and validated.
3. A fix or mitigation plan will be developed and tested.
4. Once ready, a patched release will be published, followed by a public advisory (if appropriate).
5. With your consent, you’ll be credited in the release notes or advisory.

Please **do not publicly disclose** the vulnerability until the patch has been released, unless coordinated otherwise.

---

## Disclosure Policy

- Non-critical vulnerabilities may be bundled into scheduled releases.  
- Critical or actively exploited issues will trigger immediate patch releases.  
- Older unsupported versions will not receive fixes but will be documented in advisories.

---

## Security Best Practices

To minimize risks when using **hapi-zod**:
- Always use the **latest version** from npm.
- Keep your Node.js runtime and Hapi.js framework up to date.
- Audit your dependencies regularly using `npm audit` or `pnpm audit`.
- Use runtime schema validation to prevent unsafe payloads.

---

© 2025 hapi-zod contributors. All rights reserved.
