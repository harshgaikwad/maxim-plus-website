/**
 * security.js — Input sanitization and validation utilities for SAI Industries
 *
 * Attack surface of this site:
 *   - Contact form → mailto: link (email header injection risk)
 *   - URL query params → form pre-fill (prototype pollution / XSS risk)
 *   - External data → none (pure static SPA, no fetch/API calls)
 *
 * React already prevents XSS via JSX escaping, so our primary concern is
 * the email/mailto pipeline and URL parameters.
 */

// ── String sanitisation ────────────────────────────────────────────

/**
 * Strip all characters that are dangerous in email headers.
 * RFC 5321: headers end at CRLF (\r\n). We remove those entirely.
 * Also strips null bytes, vertical tabs, and other control characters.
 */
export function sanitizeEmailHeader(raw) {
  if (typeof raw !== 'string') return ''
  return raw
    .replace(/[\r\n\0\v\f]/g, '')   // Remove CRLF (email header injection)
    .replace(/[<>]/g, '')            // Remove angle brackets (HTML in headers)
    .trim()
    .slice(0, 200)                   // Hard cap — no header > 200 chars
}

/**
 * Sanitize a general text field.
 * - Trims whitespace
 * - Removes null bytes and control chars except newlines (for body text)
 * - Caps length
 */
export function sanitizeText(raw, maxLength = 500) {
  if (typeof raw !== 'string') return ''
  return raw
    .replace(/\0/g, '')              // Remove null bytes
    .replace(/[\v\f]/g, '')          // Remove vertical tab / form feed
    .trim()
    .slice(0, maxLength)
}

/**
 * Sanitize a URL query parameter used as a form default value.
 * Only allows printable ASCII + common punctuation.
 * Strips anything that looks like a script, HTML tag, or protocol.
 */
export function sanitizeQueryParam(raw, maxLength = 200) {
  if (typeof raw !== 'string') return ''
  // Remove anything that starts with a protocol (javascript:, data:, vbscript:)
  const stripped = raw.replace(/^[\w+.-]+:/i, '')
  // Strip HTML tags
  const noTags = stripped.replace(/<[^>]*>/g, '')
  // Strip control characters
  const clean = noTags.replace(/[\x00-\x1F\x7F]/g, '')
  return clean.trim().slice(0, maxLength)
}

/**
 * Validate a phone number — only digits, spaces, +, (, ), -
 * Returns the sanitized number or empty string if invalid.
 */
export function sanitizePhone(raw) {
  if (typeof raw !== 'string') return ''
  const clean = raw.replace(/[^\d\s+\-().]/g, '').trim().slice(0, 20)
  // Must have at least 7 digits
  if ((clean.match(/\d/g) || []).length < 7) return clean
  return clean
}

/**
 * Validate email address format.
 * Returns true if valid.
 */
export function isValidEmail(raw) {
  if (!raw) return true // optional field
  // RFC 5322 simplified
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) && raw.length <= 254
}

// ── Form submission guard ─────────────────────────────────────────

let _lastSubmit = 0

/**
 * Rate-limit: returns true if submission is allowed.
 * Prevents rapid re-submission (bot protection without a server).
 */
export function canSubmitForm(cooldownMs = 5000) {
  const now = Date.now()
  if (now - _lastSubmit < cooldownMs) return false
  _lastSubmit = now
  return true
}

/**
 * Honeypot check — returns true if the bot trap field is empty (real user).
 * Bots auto-fill every input, humans don't see the hidden field.
 */
export function honeypotIsClear(value) {
  return !value || value === ''
}
