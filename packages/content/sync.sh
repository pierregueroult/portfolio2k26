#!/bin/sh
set -eu

log() {
  level="$1"; shift
  printf '[%s] [%s] %s\n' "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" "$level" "$*"
}

HOSTNAME="$(hostname 2>/dev/null || echo unknown)"
PID="$$"

log INFO "🚀 Crontab trigger: calling webhook ..."

COOLIFY_TOKEN="${COOLIFY_TOKEN:-}"
COOLIFY_WEBHOOK="${COOLIFY_WEBHOOK:-}"

if [ -z "$COOLIFY_TOKEN" ]; then
  log ERROR "COOLIFY_TOKEN is missing (environment variable not defined)"
  exit 1
fi

if [ -z "$COOLIFY_WEBHOOK" ]; then
  log ERROR "COOLIFY_WEBHOOK is missing (environment variable not defined)"
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  log ERROR "curl not found in PATH"
  exit 1
fi

log INFO "Pre-flight check: verifying webhook availability (HEAD, timeout 5s)"
if ! curl -sS -I --max-time 5 "$COOLIFY_WEBHOOK" >/dev/null 2>&1; then
  log WARN "The HEAD request to the webhook failed or timed out, attempting GET anyway"
fi

curl -sS --fail -X GET \
  -H "Authorization: Bearer ${COOLIFY_TOKEN}" \
  -w '%{http_code}' \
  -o /tmp/sync_response.out \
  "${COOLIFY_WEBHOOK}"
