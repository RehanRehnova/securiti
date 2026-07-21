from pathlib import Path

p = Path(r"C:\Users\muham\Downloads\securiti\static\js\script.js")
t = p.read_text(encoding="utf-8")

replacements = [
    (
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/serverless.svg",
        "/static/images/features/architecture.svg",
    ),
    (
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/bitwarden.svg",
        "/static/images/features/security.svg",
    ),
    (
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/readthedocs.svg",
        "/static/images/features/docs.svg",
    ),
    (
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/grafana.svg",
        "/static/images/features/monitoring.svg",
    ),
]

for old, new in replacements:
    if old not in t:
        print("MISSING", old)
    else:
        t = t.replace(old, new)
        print("OK", new)

old_upd = """    function updateFeature(index) {
        // Fade out
        wordEl.style.opacity = '0';
        descEl.style.opacity = '0';
        imgEl.style.opacity = '0';
        imgEl.style.transform = 'scale(0.92)';

        setTimeout(() => {
            wordEl.textContent = features[index].word;
            descEl.textContent = features[index].desc;
            imgEl.src = features[index].img;
            imgEl.alt = features[index].alt;

            // Fade in
            wordEl.style.opacity = '1';
            descEl.style.opacity = '1';
            imgEl.style.opacity = '1';
            imgEl.style.transform = 'scale(1)';

            // Update dots
            document.querySelectorAll('.indicator-dot').forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('w-10', 'bg-slate-900');
                    dot.classList.remove('w-1.5', 'bg-slate-300');
                } else {
                    dot.classList.remove('w-10', 'bg-slate-900');
                    dot.classList.add('w-1.5', 'bg-slate-300');
                }
            });
        }, 300);
    }"""

new_upd = """    function updateFeature(index) {
        if (!wordEl || !descEl || !imgEl) return;

        wordEl.style.opacity = '0';
        descEl.style.opacity = '0';
        imgEl.classList.remove('is-in');
        imgEl.classList.add('is-out');

        setTimeout(() => {
            wordEl.textContent = features[index].word;
            descEl.textContent = features[index].desc;
            imgEl.src = features[index].img;
            imgEl.alt = features[index].alt;

            wordEl.style.opacity = '1';
            descEl.style.opacity = '1';
            imgEl.classList.remove('is-out');
            void imgEl.offsetWidth;
            imgEl.classList.add('is-in');

            document.querySelectorAll('.indicator-dot').forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('w-10', 'bg-slate-900');
                    dot.classList.remove('w-1.5', 'bg-slate-300');
                } else {
                    dot.classList.remove('w-10', 'bg-slate-900');
                    dot.classList.add('w-1.5', 'bg-slate-300');
                }
            });
        }, 280);
    }"""

if old_upd in t:
    t = t.replace(old_upd, new_upd)
    print("updateFeature replaced")
else:
    print("updateFeature not exact — checking imgEl usage")
    print("imgEl present", "imgEl" in t)

# Ensure init has guard
t = t.replace(
    "const imgEl = document.getElementById('featureImage');\n    let currentIndex = 0;",
    "const imgEl = document.getElementById('featureImage');\n    if (!wordEl || !descEl || !imgEl) return;\n    let currentIndex = 0;",
)

p.write_text(t, encoding="utf-8")
print("done", "architecture.svg" in t)
