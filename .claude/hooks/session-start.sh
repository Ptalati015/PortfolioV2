#!/bin/bash
# Installs the portfolio's check tools (tools/) so screenshots and Lighthouse work right away
# in Claude Code on the web. The site itself has no dependencies.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR/tools"

# Use the Chromium that ships with the container instead of downloading browsers.
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
npm install --no-audit --no-fund --loglevel=error

# Pillow is used to regenerate resized hero images (see CLAUDE.md).
python3 -m pip install --quiet --disable-pip-version-check pillow 2>/dev/null \
  || python3 -m pip install --quiet --disable-pip-version-check --break-system-packages pillow

if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export CHROME_PATH=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
  echo 'export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1' >> "$CLAUDE_ENV_FILE"
fi
