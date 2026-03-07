/**
 * Post-build cleanup for LLM documentation files.
 * Removes artifacts not useful for LLM consumption
 * and injects overview content.
 *
 * Usage: node scripts/clean-llm-files.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BUILD_DIR = join(import.meta.dirname, '..', 'build');
const SITE_URL = 'https://react-native-google-signin.github.io';

const OVERVIEW = `## Overview

\`@react-native-google-signin/google-signin\` provides Google authentication for React Native and Expo apps.

There are two modules:
- **Universal Sign In** (recommended, [paid](https://universal-sign-in.com/#pricing)): Cross-platform API using Android Credential Manager and iOS Google Sign-In SDK. Module name: \`GoogleOneTapSignIn\`.
- **Original Google Sign In** (free): Legacy API for Android and iOS only. Module name: \`GoogleSignin\`.

## Quick start

1. Install the package (see Installation)
2. Collect configuration (see Configuration guide)
3. Follow the setup guide for your platform (Expo, Android, iOS, or Web)
4. Use the Universal Sign In API (see Universal sign in)
`;

const OVERVIEW_FULL = `## Overview

\`@react-native-google-signin/google-signin\` provides Google authentication for React Native and Expo apps on Android, iOS, macOS, and web.

There are two modules:
- **Universal Sign In** (recommended, [paid](https://universal-sign-in.com/#pricing)): Cross-platform API using Android Credential Manager and iOS Google Sign-In SDK. Module name: \`GoogleOneTapSignIn\`.
- **Original Google Sign In** (free): Legacy API for Android and iOS only. Module name: \`GoogleSignin\`.

Key concepts:
- Call \`configure()\` once before any sign-in calls
- \`webClientId\` is required for configuration (obtain from Google Cloud Console)
- Use \`signIn()\` for returning users, \`createAccount()\` for new users
- Use \`requestAuthorization()\` to request additional OAuth scopes
- Handle errors with \`isErrorWithCode()\` helper
`;

function clean(content) {
  return (
    content
      // Remove HTML comments
      .replace(/<!--.*?-->\n?/gs, '')
      // TODO Make relative links absolute
      // .replace(/]\(\//g, `](${SITE_URL}/`)
      // Collapse 2+ consecutive blank lines to 1
      .replace(/\n{3,}/g, '\n\n')
  );
}

function injectOverview(content, overview) {
  // Insert overview after the description blockquote (> ...)
  return content.replace(/(^# .+\n+> .+\n)/, `$1\n${overview}\n`);
}

const FILES = [
  { name: 'llms.txt', overview: OVERVIEW },
  { name: 'llms-full.txt', overview: OVERVIEW_FULL },
];

for (const { name, overview } of FILES) {
  const filePath = join(BUILD_DIR, name);
  try {
    const content = readFileSync(filePath, 'utf-8');
    const cleaned = clean(injectOverview(content, overview));
    writeFileSync(filePath, cleaned);
    const diff = cleaned.length - content.length;
    console.log(
      `Processed ${name}: ${content.length} -> ${cleaned.length} bytes (${diff > 0 ? '+' : ''}${diff})`,
    );
  } catch (err) {
    console.error(`Error processing ${name}:`, err.message);
  }
}
