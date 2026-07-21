from pathlib import Path

path = Path(r"C:\Users\muham\Downloads\securiti\templates\index.html")
t = path.read_text(encoding="utf-8")

new_right = r'''          <!-- Right Side: Feature illustrations (clean, transparent) -->
          <div class="relative flex justify-center lg:justify-end">
            <div class="feature-visual relative h-[260px] sm:h-[320px] lg:h-[380px] w-full max-w-[320px] sm:max-w-[360px] flex items-center justify-center">
              <div class="feature-visual__ring" aria-hidden="true"></div>
              <img id="featureImage"
                src="{{ url_for('static', filename='images/features/architecture.svg') }}"
                alt="Architecture"
                class="feature-img relative z-[1] w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px]"
                data-feature="architecture">
            </div>
          </div>

'''

new_style = r'''    <style>
      /* Feature illustrations — clean SVGs, no photo backgrounds */
      .feature-visual {
        isolation: isolate;
      }

      .feature-visual__ring {
        position: absolute;
        width: min(88%, 300px);
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(circle at 50% 50%, rgba(28, 169, 222, 0.12), transparent 62%);
        border: 1px solid rgba(28, 169, 222, 0.12);
        z-index: 0;
        pointer-events: none;
        animation: featureRing 6s ease-in-out infinite;
      }

      @keyframes featureRing {
        0%, 100% { transform: scale(0.96); opacity: 0.7; }
        50% { transform: scale(1.04); opacity: 1; }
      }

      .feature-img {
        object-fit: contain;
        filter: drop-shadow(0 12px 24px rgba(15, 23, 42, 0.12));
        transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: opacity, transform;
      }

      .feature-img.is-out {
        opacity: 0;
        transform: scale(0.92) translateY(10px);
      }

      .feature-img.is-in {
        opacity: 1;
        transform: scale(1) translateY(0);
        animation: featurePop 0.65s cubic-bezier(0.22, 1, 0.36, 1);
      }

      @keyframes featurePop {
        0% { opacity: 0; transform: scale(0.88) translateY(14px); }
        60% { opacity: 1; transform: scale(1.03) translateY(-2px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }

      .feature-word,
      .feature-desc {
        transition: opacity 0.35s ease, transform 0.35s ease;
      }

      @media (prefers-reduced-motion: reduce) {
        .feature-visual__ring,
        .feature-img.is-in {
          animation: none !important;
        }
      }
    </style>
'''

# Find right side start
start = t.find("<!-- Right Side:")
if start < 0:
    start = t.find('id="featureGraphWrap"')
    if start >= 0:
        start = t.rfind("<div", 0, start)
if start < 0:
    raise SystemExit("Could not find right side start")

# Align to beginning of line
start = t.rfind("\n", 0, start) + 1

end_marker = "        <!-- Explainer + CTA"
end = t.find(end_marker)
if end < 0:
    raise SystemExit("Could not find explainer")

# Keep the grid closing div before explainer
grid_close = t.rfind("        </div>", start, end)
if grid_close < 0:
    raise SystemExit("grid close not found")

print(f"Replacing [{start}:{grid_close}] ({grid_close-start} chars)")
t2 = t[:start] + new_right + t[grid_close:]

# Replace existing feature styles
replaced_style = False
for hint in (
    "/* Platform visualization",
    "/* Animated platform graph",
    "/* Feature Image",
    "/* Feature illustrations",
    ".feature-img",
    ".platform-viz",
    ".feature-graph",
):
    s0 = t2.find(hint)
    if s0 >= 0:
        # only if inside a style near featureHighlighter
        style_start = t2.rfind("<style>", max(0, s0 - 5000), s0)
        if style_start < 0:
            continue
        style_end = t2.find("</style>", s0)
        if style_end < 0:
            continue
        style_end += len("</style>")
        # only replace if this style is after featureHighlighter
        fh = t2.find("featureHighlighter")
        if style_start > fh:
            t2 = t2[:style_start] + new_style + t2[style_end:]
            replaced_style = True
            print("Style replaced at", style_start)
            break

if not replaced_style:
    # insert after feature section
    ins = t2.find(end_marker)
    # after the style that might already exist after section - find first </section> after featureHighlighter
    sec_end = t2.find("</section>", t2.find("featureHighlighter"))
    if sec_end > 0:
        # after style following section or after section
        after = sec_end + len("</section>")
        # if next is style, replace it
        next_style = t2.find("<style>", after, after + 200)
        if next_style >= 0:
            style_end = t2.find("</style>", next_style) + len("</style>")
            t2 = t2[:next_style] + new_style + t2[style_end:]
        else:
            t2 = t2[:after] + "\n\n" + new_style + t2[after:]
        print("Style inserted after section")
    else:
        raise SystemExit("Could not place style")

path.write_text(t2, encoding="utf-8")
print("OK featureImage", "featureImage" in t2)
print("OK arch", "architecture.svg" in t2)
print("graph left?", "featureGraph" in t2)
