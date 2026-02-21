// =============================================
// WithCare — AI Photo Analyzer
// Drop this file into your project and include
// it with: <script src="ai-analyzer.js"></script>
// =============================================

(function () {

  // ── Inject styles ──────────────────────────
  const style = document.createElement("style");
  style.textContent = `
    #withcare-ai-panel {
      font-family: 'Segoe UI', sans-serif;
      background: #ffffff;
      border-radius: 14px;
      padding: 20px;
      margin-top: 16px;
      border: 1px solid #e4ede9;
      box-shadow: 0 2px 12px rgba(58,143,123,.08);
    }

    #withcare-ai-panel h3 {
      color: #2f7a68;
      margin-bottom: 14px;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ai-upload-zone {
      border: 2px dashed #a8d5cb;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: background .2s, border-color .2s;
      position: relative;
    }

    .ai-upload-zone:hover {
      background: #f0faf7;
      border-color: #3a8f7b;
    }

    .ai-upload-zone input[type="file"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }

    .ai-upload-zone p {
      color: #777;
      font-size: 14px;
      pointer-events: none;
    }

    #ai-image-preview {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 10px;
      margin-top: 12px;
      display: none;
    }

    #ai-analyze-btn {
      margin-top: 12px;
      width: 100%;
      padding: 11px;
      background: #3a8f7b;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background .2s, transform .1s;
      display: none;
    }

    #ai-analyze-btn:hover  { background: #2f7a68; }
    #ai-analyze-btn:active { transform: scale(.98); }
    #ai-analyze-btn:disabled {
      background: #a0ccc5;
      cursor: not-allowed;
    }

    #ai-result-box {
      margin-top: 14px;
      background: #f4fbf8;
      border-left: 3px solid #3a8f7b;
      border-radius: 0 8px 8px 0;
      padding: 14px;
      font-size: 14px;
      line-height: 1.6;
      color: #334;
      display: none;
      white-space: pre-wrap;
    }

    #ai-result-box.error {
      border-left-color: #e25555;
      background: #fff5f5;
      color: #c0392b;
    }

    .ai-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #fff;
      border-top-color: transparent;
      border-radius: 50%;
      animation: ai-spin .7s linear infinite;
      vertical-align: middle;
      margin-right: 6px;
    }

    @keyframes ai-spin { to { transform: rotate(360deg); } }

    .ai-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .5px;
      padding: 2px 8px;
      border-radius: 20px;
      text-transform: uppercase;
    }

    .ai-badge.ok  { background:#d4f7ec; color:#1a7a55; }
    .ai-badge.warn{ background:#fff3cd; color:#856404; }
    .ai-badge.alert{ background:#fde8e8; color:#b91c1c; }
  `;
  document.head.appendChild(style);

  // ── Find or create container ───────────────
  function getContainer() {
    // Prefer the #aiAnalyser div in family.html
    let el = document.getElementById("aiAnalyser");
    if (el) return el;

    // Fallback: append to main
    const main = document.querySelector(".main") || document.body;
    el = document.createElement("div");
    el.id = "aiAnalyser";
    main.appendChild(el);
    return el;
  }

  // ── Build the panel HTML ───────────────────
  function buildPanel(container) {
    container.innerHTML = `
      <div id="withcare-ai-panel">
        <h3>🤖 AI Patient Photo Analyser</h3>

        <div class="ai-upload-zone" id="ai-drop-zone">
          <input type="file" id="ai-file-input" accept="image/*">
          <p>📷 Click or drop a patient photo here</p>
        </div>

        <img id="ai-image-preview" alt="Patient photo preview">

        <button id="ai-analyze-btn">Analyse Photo</button>

        <div id="ai-result-box"></div>
      </div>
    `;

    attachEvents();
  }

  // ── State ──────────────────────────────────
  let currentBase64 = null;

  // ── Events ────────────────────────────────
  function attachEvents() {
    const fileInput  = document.getElementById("ai-file-input");
    const preview    = document.getElementById("ai-image-preview");
    const analyzeBtn = document.getElementById("ai-analyze-btn");
    const resultBox  = document.getElementById("ai-result-box");

    // File chosen
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const dataUrl = e.target.result;
        currentBase64 = dataUrl.split(",")[1];   // raw base64

        preview.src = dataUrl;
        preview.style.display = "block";
        analyzeBtn.style.display = "block";
        resultBox.style.display = "none";
        resultBox.className = "";
        resultBox.textContent = "";

        // Also push to caretaker photo slot if present
        const carePreview = document.getElementById("photoPreview");
        if (carePreview) {
          carePreview.src = dataUrl;
          carePreview.style.display = "block";
        }
        localStorage.setItem("latestCarePhoto", dataUrl);
      };
      reader.readAsDataURL(file);
    });

    // Analyse clicked
    analyzeBtn.addEventListener("click", function () {
      if (!currentBase64) return;
      runAnalysis(currentBase64, analyzeBtn, resultBox);
    });
  }

  // ── Claude API Call ────────────────────────
  async function runAnalysis(base64Image, btn, resultBox) {
    btn.disabled = true;
    btn.innerHTML = '<span class="ai-spinner"></span>Analysing…';

    resultBox.style.display = "none";
    resultBox.className = "";
    resultBox.textContent = "";

    const prompt = `
You are a compassionate AI care assistant integrated into a family care-monitoring platform called WithCare.

Analyse this patient photo and provide a structured report covering:

1. **Wellbeing Indicators** – Does the person appear comfortable, distressed, or in pain? Note any visible signs.
2. **Medication / Activity** – Is the patient taking medication, eating, exercising, resting? Describe what you observe.
3. **Environment Safety** – Does the visible environment look safe and clean?
4. **Alert Level** – Classify as one of: ✅ OK | ⚠️ Monitor | 🚨 Urgent
5. **Recommended Action** – Brief next step for the caretaker or family.

Be concise, factual, and empathetic. Do NOT diagnose medical conditions.
    `.trim();

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "x-api-key": "https://hidden-firefly-c89e.thejabnair14.workers.dev/anthropic-key",
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-ipc": "true"
},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/jpeg",
                    data: base64Image
                  }
                },
                { type: "text", text: prompt }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const text = data.content
        .filter(b => b.type === "text")
        .map(b => b.text)
        .join("\n");

      resultBox.textContent = text;
      resultBox.style.display = "block";
      resultBox.className = "";

      // Log to activity feed
      if (typeof addActivity === "function") {
        addActivity("🤖 AI analysed patient photo");
      }

      // Push to alert feed for family panel
      const feed = JSON.parse(localStorage.getItem("withcare_alert_feed") || "[]");
      feed.unshift({ text: "🤖 AI photo analysis completed", time: new Date().toLocaleString() });
      localStorage.setItem("withcare_alert_feed", JSON.stringify(feed.slice(0, 50)));

    } catch (err) {
      resultBox.textContent = "⚠️ Analysis failed: " + err.message;
      resultBox.style.display = "block";
      resultBox.className = "error";
      console.error("[WithCare AI]", err);
    } finally {
      btn.disabled = false;
      btn.innerHTML = "Analyse Photo";
    }
  }

  // ── Init ───────────────────────────────────
  function init() {
    const container = getContainer();
    if (container) buildPanel(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();