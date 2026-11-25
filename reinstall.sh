#!/bin/bash
# For working on the mod from a clone: installs this checkout as the copy Claude Code runs, on this machine only.
# Registers the clone as a local marketplace (once), bumps the patch version, reinstalls, and checks the installed
# cache holds the source. Plain users install from GitHub instead (see README).
#   --minor   bump 0.x.0 instead, for a round of bigger changes
#   --pulled  after pulling someone else's edits: keep their version, and do nothing when the installed copy
#             already matches the source
# CLAWD_DEV_LINK=/some/path registers the marketplace through a symlink at that path instead of this folder, so
# settings.json shared between machines whose home folders differ names the same path on each.
set -e
cd "$(dirname "$0")"
NAME=clawd-buddy-gauges
PJ=plugins/$NAME/.claude-plugin/plugin.json
CACHE="$HOME/.claude/plugins/cache/$NAME/$NAME"
OLD=$(python3 -c "import json;print(json.load(open('$PJ'))['version'])")
if [ "$1" = "--pulled" ]; then
  if claude plugin list 2>/dev/null | grep -q "$NAME@$NAME" && diff -rq "plugins/$NAME/hooks" "$CACHE/$OLD/hooks" >/dev/null 2>&1; then echo "$NAME $OLD already installed"; exit 0; fi
  NEW=$OLD
elif [ "$1" = "--minor" ]; then
  NEW=$(python3 -c "v='$OLD'.split('.');print(f'{v[0]}.{int(v[1])+1}.0')")
else
  NEW=$(python3 -c "v='$OLD'.split('.');v[2]=str(int(v[2])+1);print('.'.join(v))")
fi
[ "$NEW" = "$OLD" ] || sed -i '' "s/\"version\": \"$OLD\"/\"version\": \"$NEW\"/" .claude-plugin/marketplace.json "$PJ"
# this mod used to be called clawd-combo: drop that install so the two bands never show at once
claude plugin uninstall clawd-combo@clawd-combo-local >/dev/null 2>&1 || true
claude plugin marketplace remove clawd-combo-local >/dev/null 2>&1 || true
DIR=$PWD
if [ -n "$CLAWD_DEV_LINK" ]; then ln -sfn "$PWD" "$CLAWD_DEV_LINK"; DIR=$CLAWD_DEV_LINK; fi
claude plugin marketplace update "$NAME" >/dev/null 2>&1 || claude plugin marketplace add "$DIR" >/dev/null
claude plugin uninstall "$NAME@$NAME" >/dev/null 2>&1 || true
claude plugin install "$NAME@$NAME" >/dev/null
if diff -rq "plugins/$NAME/hooks" "$CACHE/$NEW/hooks" >/dev/null; then echo "$NAME $OLD -> $NEW installed, cache matches"; else echo "cache differs from source!"; exit 1; fi
