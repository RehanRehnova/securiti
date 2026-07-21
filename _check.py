from pathlib import Path
t=Path(r"C:\Users\muham\Downloads\securiti\templates\index.html").read_text(encoding="utf-8")
j=t.find("Explainer + CTA")
print(t[j-350:j+60])
print("cards", t.count("pv-card"))
print("links", t.count("pv-link"))
sec=t.find("featureHighlighter")
end=t.find("</section>", t.find("platform-viz"))
chunk=t[sec:end]
print("div open", chunk.count("<div"), "close", chunk.count("</div>"))
print("style ok", "platform-viz__svg" in t)
