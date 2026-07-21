from pathlib import Path

path = Path(r"C:\Users\muham\Downloads\securiti\templates\index.html")
t = path.read_text(encoding="utf-8")

new_graph = r'''          <!-- Right Side: Platform graph (DataAI-style) -->
          <div class="relative flex justify-center lg:justify-end">
            <div class="relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[620px]"
              id="featureGraphWrap" aria-hidden="true">
              <div class="platform-viz">
                <div class="platform-viz__glow"></div>
                <svg id="featureGraph" class="platform-viz__svg" viewBox="0 0 640 560" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="pv-bg" x1="80" y1="40" x2="560" y2="520" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#E8F7FC"/>
                      <stop offset="1" stop-color="#F8FAFC"/>
                    </linearGradient>
                    <linearGradient id="pv-line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#1CA9DE" stop-opacity="0"/>
                      <stop offset="35%" stop-color="#1CA9DE" stop-opacity="0.85"/>
                      <stop offset="65%" stop-color="#38BDF8" stop-opacity="0.9"/>
                      <stop offset="100%" stop-color="#1CA9DE" stop-opacity="0"/>
                    </linearGradient>
                    <linearGradient id="pv-hub" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#3BC4E8"/>
                      <stop offset="100%" stop-color="#0E7A9E"/>
                    </linearGradient>
                    <linearGradient id="pv-card" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#FFFFFF"/>
                      <stop offset="100%" stop-color="#F1F8FC"/>
                    </linearGradient>
                    <filter id="pv-soft" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="10" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="pv-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3.5" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="pv-card-shadow" x="-20%" y="-20%" width="140%" height="160%">
                      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.12"/>
                    </filter>
                    <radialGradient id="pv-orb" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#1CA9DE" stop-opacity="0.18"/>
                      <stop offset="70%" stop-color="#1CA9DE" stop-opacity="0.04"/>
                      <stop offset="100%" stop-color="#1CA9DE" stop-opacity="0"/>
                    </radialGradient>
                  </defs>

                  <rect x="24" y="24" width="592" height="512" rx="28" fill="url(#pv-bg)" stroke="#E2E8F0" stroke-width="1"/>
                  <circle cx="320" cy="280" r="210" fill="url(#pv-orb)"/>
                  <circle class="pv-orbit" cx="320" cy="280" r="168" stroke="#1CA9DE" stroke-opacity="0.1" stroke-width="1" stroke-dasharray="2 10"/>
                  <circle class="pv-orbit pv-orbit--rev" cx="320" cy="280" r="118" stroke="#94A3B8" stroke-opacity="0.18" stroke-width="1" stroke-dasharray="1 8"/>

                  <g class="pv-dust" fill="#1CA9DE" opacity="0.35">
                    <circle cx="96" cy="120" r="1.6"/><circle cx="140" cy="86" r="1.2"/>
                    <circle cx="520" cy="100" r="1.4"/><circle cx="560" cy="180" r="1.2"/>
                    <circle cx="80" cy="360" r="1.3"/><circle cx="540" cy="400" r="1.5"/>
                    <circle cx="200" cy="480" r="1.2"/><circle cx="420" cy="470" r="1.4"/>
                    <circle cx="300" cy="70" r="1.1"/><circle cx="360" cy="500" r="1.2"/>
                  </g>

                  <g class="pv-links" stroke="url(#pv-line)" stroke-width="1.8" fill="none" stroke-linecap="round">
                    <path class="pv-link is-active" data-link="0" d="M320 280 C 320 210, 300 150, 250 118"/>
                    <path class="pv-link" data-link="1" d="M320 280 C 370 230, 430 190, 470 150"/>
                    <path class="pv-link" data-link="2" d="M320 280 C 390 300, 450 310, 500 300"/>
                    <path class="pv-link" data-link="3" d="M320 280 C 350 340, 380 400, 400 450"/>
                    <path class="pv-link" data-link="4" d="M320 280 C 270 340, 200 380, 150 420"/>
                    <path class="pv-link" data-link="5" d="M320 280 C 250 300, 180 290, 130 250"/>
                    <path class="pv-link is-active" data-link="6" d="M320 280 C 280 240, 220 200, 170 160"/>
                  </g>

                  <g stroke="#94A3B8" stroke-opacity="0.22" stroke-width="1" fill="none" stroke-dasharray="3 7">
                    <path d="M250 118 C 320 90, 400 100, 470 150"/>
                    <path d="M470 150 C 520 200, 530 260, 500 300"/>
                    <path d="M500 300 C 480 370, 450 420, 400 450"/>
                    <path d="M400 450 C 300 480, 200 470, 150 420"/>
                    <path d="M150 420 C 120 350, 110 290, 130 250"/>
                    <path d="M130 250 C 150 190, 190 140, 250 118"/>
                  </g>

                  <g filter="url(#pv-glow)">
                    <circle r="3.2" fill="#1CA9DE"><animateMotion dur="2.6s" repeatCount="indefinite" path="M320 280 C 320 210, 300 150, 250 118"/></circle>
                    <circle r="2.6" fill="#38BDF8" opacity="0.9"><animateMotion dur="3.2s" begin="0.3s" repeatCount="indefinite" path="M320 280 C 370 230, 430 190, 470 150"/></circle>
                    <circle r="2.8" fill="#1CA9DE" opacity="0.85"><animateMotion dur="2.9s" begin="0.7s" repeatCount="indefinite" path="M320 280 C 390 300, 450 310, 500 300"/></circle>
                    <circle r="2.5" fill="#38BDF8" opacity="0.8"><animateMotion dur="3.4s" begin="1s" repeatCount="indefinite" path="M320 280 C 350 340, 380 400, 400 450"/></circle>
                    <circle r="2.7" fill="#1CA9DE" opacity="0.85"><animateMotion dur="3.1s" begin="0.5s" repeatCount="indefinite" path="M320 280 C 270 340, 200 380, 150 420"/></circle>
                    <circle r="2.4" fill="#38BDF8" opacity="0.8"><animateMotion dur="2.8s" begin="1.2s" repeatCount="indefinite" path="M320 280 C 250 300, 180 290, 130 250"/></circle>
                    <circle r="2.6" fill="#1CA9DE" opacity="0.9"><animateMotion dur="3s" begin="0.2s" repeatCount="indefinite" path="M320 280 C 280 240, 220 200, 170 160"/></circle>
                  </g>

                  <g class="pv-card is-active" data-node="0" transform="translate(168 72)" filter="url(#pv-card-shadow)">
                    <rect width="148" height="58" rx="14" fill="url(#pv-card)" stroke="#D0EAF5" stroke-width="1.2"/>
                    <circle cx="28" cy="29" r="14" fill="#E6F6FC"/>
                    <path d="M22 33 L28 20 L34 33 Z M24 33 H32" stroke="#0E7490" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
                    <text x="50" y="26" fill="#0F172A" font-size="12" font-family="Satoshi, system-ui, sans-serif" font-weight="700">Architecture</text>
                    <text x="50" y="42" fill="#64748B" font-size="10" font-family="Satoshi, system-ui, sans-serif">10x-ready systems</text>
                  </g>

                  <g class="pv-card" data-node="1" transform="translate(430 108)" filter="url(#pv-card-shadow)">
                    <rect width="148" height="58" rx="14" fill="url(#pv-card)" stroke="#E2E8F0" stroke-width="1.2"/>
                    <circle cx="28" cy="29" r="14" fill="#EEF2FF"/>
                    <path d="M22 31 H34 V35 H22 Z M24 24 H32 V31 H24 Z M28 24 V21" stroke="#4338CA" stroke-width="1.4" fill="none"/>
                    <text x="50" y="26" fill="#0F172A" font-size="12" font-family="Satoshi, system-ui, sans-serif" font-weight="700">Security</text>
                    <text x="50" y="42" fill="#64748B" font-size="10" font-family="Satoshi, system-ui, sans-serif">Zero-trust controls</text>
                  </g>

                  <g class="pv-card" data-node="2" transform="translate(470 268)" filter="url(#pv-card-shadow)">
                    <rect width="148" height="58" rx="14" fill="url(#pv-card)" stroke="#E2E8F0" stroke-width="1.2"/>
                    <circle cx="28" cy="29" r="14" fill="#ECFDF5"/>
                    <path d="M21 22 H35 V36 H21 Z M24 27 H32 M24 31 H32 M24 35 H28" stroke="#047857" stroke-width="1.4" fill="none"/>
                    <text x="50" y="26" fill="#0F172A" font-size="12" font-family="Satoshi, system-ui, sans-serif" font-weight="700">Documentation</text>
                    <text x="50" y="42" fill="#64748B" font-size="10" font-family="Satoshi, system-ui, sans-serif">Runbooks &amp; APIs</text>
                  </g>

                  <g class="pv-card" data-node="3" transform="translate(330 430)" filter="url(#pv-card-shadow)">
                    <rect width="148" height="58" rx="14" fill="url(#pv-card)" stroke="#E2E8F0" stroke-width="1.2"/>
                    <circle cx="28" cy="29" r="14" fill="#FFF7ED"/>
                    <path d="M21 34 L25 26 L29 30 L33 22 L37 34" stroke="#C2410C" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <text x="50" y="26" fill="#0F172A" font-size="12" font-family="Satoshi, system-ui, sans-serif" font-weight="700">Monitoring</text>
                    <text x="50" y="42" fill="#64748B" font-size="10" font-family="Satoshi, system-ui, sans-serif">Live ops signals</text>
                  </g>

                  <g class="pv-card" data-node="4" transform="translate(70 380)" filter="url(#pv-card-shadow)">
                    <rect width="148" height="58" rx="14" fill="url(#pv-card)" stroke="#E2E8F0" stroke-width="1.2"/>
                    <circle cx="28" cy="29" r="14" fill="#F5F3FF"/>
                    <circle cx="28" cy="29" r="5" stroke="#6D28D9" stroke-width="1.4" fill="none"/>
                    <path d="M28 20 V23 M28 35 V38 M19 29 H22 M34 29 H37" stroke="#6D28D9" stroke-width="1.4" stroke-linecap="round"/>
                    <text x="50" y="26" fill="#0F172A" font-size="12" font-family="Satoshi, system-ui, sans-serif" font-weight="700">Integrations</text>
                    <text x="50" y="42" fill="#64748B" font-size="10" font-family="Satoshi, system-ui, sans-serif">APIs &amp; SaaS mesh</text>
                  </g>

                  <g class="pv-card is-active" data-node="5" transform="translate(48 210)" filter="url(#pv-card-shadow)">
                    <rect width="148" height="58" rx="14" fill="url(#pv-card)" stroke="#D0EAF5" stroke-width="1.2"/>
                    <circle cx="28" cy="29" r="14" fill="#E6F6FC"/>
                    <path d="M21 29 H35 M28 22 V36" stroke="#0E7490" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="28" cy="29" r="7" stroke="#0E7490" stroke-width="1.3" fill="none"/>
                    <text x="50" y="26" fill="#0F172A" font-size="12" font-family="Satoshi, system-ui, sans-serif" font-weight="700">AI Agents</text>
                    <text x="50" y="42" fill="#64748B" font-size="10" font-family="Satoshi, system-ui, sans-serif">Workflow automation</text>
                  </g>

                  <g class="pv-card" data-node="6" transform="translate(92 118)" filter="url(#pv-card-shadow)">
                    <rect width="148" height="58" rx="14" fill="url(#pv-card)" stroke="#E2E8F0" stroke-width="1.2"/>
                    <circle cx="28" cy="29" r="14" fill="#ECFEFF"/>
                    <rect x="21" y="23" width="14" height="12" rx="2" stroke="#0E7490" stroke-width="1.4" fill="none"/>
                    <path d="M24 23 V21 H32 V23" stroke="#0E7490" stroke-width="1.4"/>
                    <text x="50" y="26" fill="#0F172A" font-size="12" font-family="Satoshi, system-ui, sans-serif" font-weight="700">Data Layer</text>
                    <text x="50" y="42" fill="#64748B" font-size="10" font-family="Satoshi, system-ui, sans-serif">Postgres · Redis</text>
                  </g>

                  <g class="pv-micro">
                    <g transform="translate(250 200)"><circle r="8" fill="#fff" stroke="#1CA9DE" stroke-width="1.4"/><circle r="2.5" fill="#1CA9DE"/></g>
                    <g transform="translate(380 220)"><circle r="7" fill="#fff" stroke="#94A3B8" stroke-width="1.2"/><circle r="2" fill="#64748B"/></g>
                    <g transform="translate(360 340)"><circle r="7.5" fill="#fff" stroke="#94A3B8" stroke-width="1.2"/><circle r="2.2" fill="#64748B"/></g>
                    <g transform="translate(250 360)"><circle r="7" fill="#fff" stroke="#94A3B8" stroke-width="1.2"/><circle r="2" fill="#64748B"/></g>
                    <g transform="translate(210 280)"><circle r="7" fill="#fff" stroke="#1CA9DE" stroke-width="1.3"/><circle r="2.2" fill="#1CA9DE"/></g>
                  </g>

                  <g class="pv-hub" transform="translate(320 280)" filter="url(#pv-soft)">
                    <circle class="pv-hub__ring" r="54" fill="#E8F7FC" stroke="#B6E4F5" stroke-width="1"/>
                    <circle class="pv-hub__pulse" r="42" fill="none" stroke="#1CA9DE" stroke-width="1.5"/>
                    <circle r="36" fill="url(#pv-hub)"/>
                    <text y="-2" text-anchor="middle" fill="#fff" font-size="11" font-family="Satoshi, system-ui, sans-serif" font-weight="700" letter-spacing="0.08em">PLATFORM</text>
                    <text y="14" text-anchor="middle" fill="#E0F2FE" font-size="10" font-family="Satoshi, system-ui, sans-serif">CORE</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

'''

new_style = r'''    <style>
      /* Platform visualization — denser securiti-like command graph */
      .platform-viz {
        position: relative;
        width: 100%;
        isolation: isolate;
      }

      .platform-viz__glow {
        position: absolute;
        inset: 8% 10%;
        z-index: 0;
        background: radial-gradient(circle at 50% 45%, rgba(28, 169, 222, 0.16), transparent 65%);
        filter: blur(8px);
        pointer-events: none;
      }

      .platform-viz__svg {
        position: relative;
        z-index: 1;
        width: 100%;
        height: auto;
        display: block;
        overflow: visible;
      }

      .pv-orbit {
        transform-origin: 320px 280px;
        animation: pv-spin 50s linear infinite;
      }

      .pv-orbit--rev {
        animation-duration: 70s;
        animation-direction: reverse;
      }

      @keyframes pv-spin {
        to { transform: rotate(360deg); }
      }

      .pv-link {
        stroke-dasharray: 7 12;
        stroke-dashoffset: 0;
        opacity: 0.22;
        animation: pv-dash 3.2s linear infinite;
        transition: opacity 0.45s ease, stroke-width 0.35s ease;
      }

      .pv-link.is-active {
        opacity: 1;
        stroke-width: 2.4;
        animation-duration: 1.7s;
      }

      @keyframes pv-dash {
        to { stroke-dashoffset: -40; }
      }

      .pv-card {
        cursor: pointer;
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .pv-card rect {
        transition: stroke 0.35s ease, filter 0.35s ease;
      }

      .pv-card.is-active {
        transform: translateY(-3px);
      }

      .pv-card.is-active rect {
        stroke: #1CA9DE;
        filter: drop-shadow(0 0 10px rgba(28, 169, 222, 0.25));
      }

      .pv-hub__pulse {
        transform-origin: 320px 280px;
        animation: pv-hub-pulse 2.6s ease-out infinite;
      }

      @keyframes pv-hub-pulse {
        0% { r: 42; opacity: 0.5; }
        70% { r: 68; opacity: 0; }
        100% { r: 68; opacity: 0; }
      }

      .pv-dust circle:nth-child(odd) {
        animation: pv-twinkle 3.5s ease-in-out infinite;
      }

      .pv-dust circle:nth-child(even) {
        animation: pv-twinkle 4.2s ease-in-out infinite reverse;
      }

      @keyframes pv-twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.55; }
      }

      .feature-word,
      .feature-desc {
        transition: opacity 0.35s ease, transform 0.35s ease;
      }

      .feature-word.fade-out,
      .feature-desc.fade-out {
        opacity: 0;
        transform: translateY(8px);
      }

      @media (max-width: 640px) {
        #featureGraphWrap { max-width: 100%; }
      }

      @media (prefers-reduced-motion: reduce) {
        .pv-orbit,
        .pv-link,
        .pv-hub__pulse,
        .pv-dust circle {
          animation: none !important;
        }
        .pv-card.is-active { transform: none; }
      }
    </style>
'''

# Replace right-side graph block
start_markers = [
    "<!-- Right Side: Platform graph",
    "<!-- Right Side: Animated platform graph",
    'id="featureGraphWrap"',
]
start = -1
for m in start_markers:
    i = t.find(m)
    if i >= 0:
        if m.startswith("id="):
            start = t.rfind('<div class="relative flex justify-center', 0, i)
        else:
            start = t.rfind("          <!-- Right Side", 0, i + 5)
            if start < 0:
                start = i
        break

if start < 0:
    raise SystemExit("Could not find graph start")

end = t.find("        <!-- Explainer + CTA")
if end < 0:
    raise SystemExit("Could not find explainer marker")

# Ensure we only replace the right column, not the grid closer.
# Content between start and end should be the right column + whitespace before grid close.
# Looking at structure, before explainer there is:  </div> (grid). So end should include only up to before that grid close if it's before explainer.
# From earlier: after right side: \n\n        </div>\n\n        <!-- Explainer
# So between svg end and explainer is: wrap closes, flex closes, blank, grid close, blank, explainer

# Find grid close before explainer
pre = t[:end]
# The last </div> before explainer closes the grid - keep it
# Our new_graph ends with flex close only (two divs). So we need to not eat the grid closer.

# Determine: from `start` through the end of the right-side flex div.
# Search for featureGraph and then count div closes.
idx = t.find('id="featureGraph"', start)
svg_end = t.find("</svg>", idx) + len("</svg>")
# After svg: close platform-viz, featureGraphWrap, flex — 3 divs if platform-viz exists, else 2
after = t[svg_end:end]
# Walk and find end of right column: after 2-4 closing divs that belong to right side
# Safer: replace from start of right comment/div to just before the grid-closing `        </div>` that precedes explainer.

# Find the last occurrence of `        </div>` before explainer - that's grid close
grid_close = t.rfind("        </div>", start, end)
if grid_close < 0:
    raise SystemExit("grid close not found")

# Right side ends just before grid_close
right_end = grid_close
t2 = t[:start] + new_graph + t[right_end:]

# Replace style block for feature graph
s0 = t2.find("/* Animated platform graph")
if s0 < 0:
    s0 = t2.find("/* Platform visualization")
if s0 < 0:
    s0 = t2.find("/* Feature Image")
if s0 >= 0:
    style_start = t2.rfind("<style>", 0, s0)
    style_end = t2.find("</style>", s0) + len("</style>")
    t2 = t2[:style_start] + new_style + t2[style_end:]
else:
    # insert after featureHighlighter section end
    ins = t2.find('id="featureHighlighter"')
    # after section closing
    pass

path.write_text(t2, encoding="utf-8")
print("HTML patched OK")
print("platform-viz" in t2, "pv-card" in t2, "featureImage" in t2)
