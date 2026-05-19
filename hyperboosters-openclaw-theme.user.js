// ==UserScript==
// @name         HyperBoosters — OpenClaw Dashboard Theme
// @namespace    https://hyperboosters.com
// @version      1.1
// @description  Tema HyperBoosters no painel OpenClaw (localhost:18789)
// @author       Raoni Barbalho
// @match        http://localhost:18789/*
// @match        http://127.0.0.1:18789/*
// @match        https://predator.tail17f430.ts.net:18789/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  // ── Title ──────────────────────────────────────────────────────────────
  const setTitle = () => {
    if (!document.title.startsWith('HyperBoosters')) {
      document.title = 'HyperBoosters Control · OpenClaw';
    }
  };
  setTitle();
  new MutationObserver(setTitle).observe(document.head, { subtree: true, childList: true, characterData: true });

  // ── CSS ────────────────────────────────────────────────────────────────
  const css = `
    /* ── HyperBoosters accent badge ── */
    body::after {
      content: '⚡ HyperBoosters';
      position: fixed;
      top: 10px;
      right: 14px;
      z-index: 99999;
      background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: .06em;
      padding: 3px 10px;
      border-radius: 20px;
      pointer-events: none;
      text-transform: uppercase;
      box-shadow: 0 2px 8px rgba(124,58,237,.35);
    }

    /* ── Primary accent: swap OpenClaw blue/teal for HB violet ── */
    :root {
      --hb-p: #7c3aed;
      --hb-a: #06b6d4;
    }

    /* Links / focus rings */
    a:not([class]):hover        { color: #7c3aed !important; }
    :focus-visible              { outline-color: #7c3aed !important; }

    /* Active sidebar item tint */
    [class*="active"][class*="nav"],
    [class*="selected"][class*="item"],
    [aria-selected="true"]      { border-left-color: #7c3aed !important; }

    /* Primary buttons */
    button[class*="primary"],
    [class*="btn"][class*="primary"] {
      background: #7c3aed !important;
      border-color: #7c3aed !important;
    }
    button[class*="primary"]:hover,
    [class*="btn"][class*="primary"]:hover {
      background: #6d28d9 !important;
    }

    /* Status badges — keep green/red semantic, only tint info/unknown */
    [class*="badge"][class*="info"],
    [class*="tag"][class*="default"] {
      background: rgba(124,58,237,.12) !important;
      color: #a78bfa !important;
    }
  `;

  const style = document.createElement('style');
  style.id = 'hb-theme';
  style.textContent = css;
  document.head.appendChild(style);

})();
