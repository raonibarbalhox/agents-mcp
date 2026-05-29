#!/usr/bin/env bash
# Publish @hyperboosters/hyperagents to npm.
# Usage: bash scripts/publish.sh <6-digit-OTP-from-authenticator-app>
#
# 2FA is required on @hyperboosters scope. Granular token in .env lacks
# "bypass 2FA" flag, so OTP must be supplied per publish.

set -euo pipefail

OTP="${1:-}"
if [ -z "$OTP" ]; then
  echo "Usage: bash scripts/publish.sh <OTP>"
  echo ""
  echo "Get OTP from your authenticator app (npm 2FA — usually Google Authenticator"
  echo "or Authy). Look for the 'npm' entry. 6-digit number."
  exit 2
fi

cd "$(dirname "$0")/.."

echo "Building..."
npm run build

echo "Publishing with OTP..."
npm publish --access public --otp="$OTP"

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
