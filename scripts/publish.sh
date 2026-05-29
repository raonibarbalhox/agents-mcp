#!/usr/bin/env bash
# Publish @hyperboosters/hyperagents to npm.
# Usage: bash scripts/publish.sh [6-digit-OTP-from-authenticator-app]
#
# OTP is OPTIONAL: only needed if the npm account has 2FA at the
# "auth-and-writes" level. With 2FA disabled or "auth-only", omit it.
# Requires `npm login` first (npm whoami must resolve).

set -euo pipefail

OTP="${1:-}"

cd "$(dirname "$0")/.."

echo "Checking npm auth..."
npm whoami >/dev/null 2>&1 || { echo "Not logged in. Run: npm login"; exit 2; }

echo "Building + testing..."
npm test

echo "Publishing..."
if [ -n "$OTP" ]; then
  npm publish --access public --otp="$OTP"
else
  npm publish --access public
fi

# Org default visibility may force private regardless of --access flag.
# Explicitly flip to public after publish (idempotent — safe to re-run).
echo "Forcing public access..."
npm access set status=public @hyperboosters/hyperagents || true

echo ""
echo "Verifying registry..."
sleep 5
npm view @hyperboosters/hyperagents version
npm view @hyperboosters/hyperagents dist.tarball

echo ""
echo "Smoke test (npx install)..."
TMP=$(mktemp -d)
cd "$TMP"
npm init -y >/dev/null 2>&1
npm install --silent @hyperboosters/hyperagents 2>&1 | tail -3
echo ""
echo "Installed at: $TMP/node_modules/@hyperboosters/hyperagents"
echo ""
echo "DONE. Package live at:"
echo "  https://www.npmjs.com/package/@hyperboosters/hyperagents"
