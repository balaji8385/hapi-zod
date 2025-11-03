# Contributing to hapi-zod

Thank you for your interest in contributing to **hapi-zod**.  
Your time and expertise help improve the quality, security, and usability of this project.  
This document outlines the standards, workflows, and expectations for all contributors.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)  
2. [Ways to Contribute](#ways-to-contribute)  
3. [Development Setup](#development-setup)  
4. [Coding Guidelines](#coding-guidelines)  
5. [Commit Message Convention](#commit-message-convention)  
6. [Testing Guidelines](#testing-guidelines)  
7. [Submitting a Pull Request](#submitting-a-pull-request)  
8. [Release Process](#release-process)  
9. [Support and Communication](#support-and-communication)

---

## 1. Code of Conduct

All contributors are expected to adhere to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).  
Be respectful and professional when interacting with others. Discrimination, harassment, or personal attacks will not be tolerated.

---

## 2. Ways to Contribute

There are several ways you can contribute to the project:

- Report bugs or unexpected behavior through [GitHub Issues](../../issues).  
- Propose new features or enhancements.  
- Write or improve automated tests.  
- Refactor or optimize existing code.  
- Improve documentation and examples.  

All contributions are valuable—code, testing, design, documentation, or review.

---

## 3. Development Setup

Follow these steps to set up a local development environment:

1. **Fork** the repository on GitHub.  
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/hapi-zod.git
   cd hapi-zod
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run the tests** to ensure your environment works correctly:
   ```bash
   npm test
   ```

---

## 4. Coding Guidelines

Please follow these conventions to maintain consistency:

- Use **TypeScript** for all new features and files.  
- Maintain code style with **ESLint** and **Prettier** (configured in the repository).  
- Follow **Hapi.js** plugin structure and best practices.  
- Ensure all exported methods are type-safe and documented using **JSDoc**.  
- Keep pull requests focused on a single purpose (one bug fix or one feature).  

**Recommended folder structure:**

```
src/
  ├── plugin.ts        # Hapi plugin registration
  ├── validators/
  │     └── schema.ts  # Zod schema definitions
  └── utils/
        └── helpers.ts # Utility functions
tests/
  ├── plugin.test.ts
  └── validation.test.ts
```

---

## 5. Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for all commit messages.

| Type       | Description                                                 |
|-------------|-------------------------------------------------------------|
| `feat:`     | A new feature                                               |
| `fix:`      | A bug fix                                                   |
| `docs:`     | Documentation updates only                                  |
| `style:`    | Formatting or whitespace changes                            |
| `refactor:` | Code change that does not fix a bug or add a feature        |
| `test:`     | Adding or updating tests                                    |
| `chore:`    | Build process or auxiliary tool updates                     |

**Example:**
```
feat(validation): add schema-based request payload validation
```

---

## 6. Testing Guidelines

All contributions must include or update appropriate tests.

- Use **Jest** for testing.  
- Maintain a minimum of **90% coverage** across lines and functions.  
- Run tests locally before submitting a pull request:
  ```bash
  npm run test:coverage
  ```

---

## 7. Submitting a Pull Request

1. Ensure your fork is up to date with the latest `main` branch.  
2. Create a descriptive branch:
   ```bash
   git checkout -b feat/add-schema-validation
   ```
3. Commit your changes using the proper convention.  
4. Push your branch:
   ```bash
   git push origin feat/add-schema-validation
   ```
5. Open a **Pull Request** on GitHub and include:
   - A clear summary of your changes.  
   - The reasoning or issue reference (`Fixes #123`).  
   - Any testing steps or screenshots (if applicable).  

A maintainer will review your submission within **3–5 business days**.

---

## 8. Release Process

Releases follow **Semantic Versioning (SemVer)**:

```
MAJOR.MINOR.PATCH
```

- **MAJOR:** Breaking changes  
- **MINOR:** New backward-compatible features  
- **PATCH:** Backward-compatible bug fixes  

Example commands for maintainers:
```bash
npm version patch
npm publish
git push --tags
```

---

## 9. Support and Communication

- For bugs or issues, open a [GitHub Issue](../../issues).  
- For security-related concerns, follow the steps in [SECURITY.md](./SECURITY.md).  
- Discussions, feature ideas, and roadmap feedback can be shared via GitHub Discussions.

---

## Final Notes

Your contribution—no matter how small—helps strengthen the **hapi-zod** ecosystem.  
We appreciate your time, attention to detail, and commitment to open-source collaboration.
