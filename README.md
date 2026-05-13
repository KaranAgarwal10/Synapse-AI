# 🧠 Synapse AI: The Cross-Disciplinary Research Catalyst

> **Transforming passive research data into active, life-saving scientific discovery powered by Gemma 4.**

![Synapse AI Banner](https://img.shields.io/badge/Powered%20by-Gemma%204-blue?style=for-the-badge&logo=google)
![Node.js](https://img.shields.io/badge/Node.js-Express-success?style=for-the-badge&logo=node.js)
![Frontend](https://img.shields.io/badge/UI-Glassmorphism%20%7C%20Vanilla%20JS-critical?style=for-the-badge)

---

## 💡 Inspiration: The Knowledge Bottleneck
Humanity produces more scientific research today than at any point in history. Millions of specialized papers, terabytes of genomic sequencing, and endless clinical trial logs are published globally. 

However, scientific progress is frequently stalled by **hyper-specialization**. Brilliant insights in genetics remain completely disconnected from parallel breakthroughs in pharmacology. Crucial clinical trial outcomes are buried in complex academic jargon, making them inaccessible to community doctors or public health policymakers who need to act on them immediately. 

Our science isn't failing—our ability to connect the dots across fragmented disciplines is. We built **Synapse AI** to break this Knowledge Bottleneck, acting as an intuition accelerator for researchers to uncover non-obvious, statistically significant relationships.

---

## ⚙️ Core Features

### 1. Cross-Disciplinary Synthesis Engine
Researchers can simply drag and drop separate data streams—such as **Genomics**, **Pharmacology**, and **Clinical Trials**—into a unified synthesis core. Synapse AI instantly analyzes multi-modal variables across these disparate inputs to discover hidden correlations and suggest novel therapeutic intervention pathways.

### 2. Contextual Translation & Democratization
A breakthrough concept means nothing if local clinicians or policymakers cannot understand it. The Contextual Translation engine takes complex biomedical text and dynamically reshapes it in seconds:
- **🔬 For Researchers:** Focuses on cellular mechanisms, statistical significance (p-values), and biological pathways.
- **🩺 For Clinicians:** Translates findings into practical summaries emphasizing diagnosis, screening protocols, and treatment efficacy.
- **🏛️ For Public Policy Makers:** Renders accessible, jargon-free explanations highlighting public health impacts, funding requirements, and community action steps.

### 3. Automated Hypothesis Generation
Acting as an advanced sandbox for scientific curiosity, researchers can input any high-level topic (e.g., *Cardiology*, *Alzheimer's*). Utilizing pattern recognition across ingested data streams, Synapse AI automatically types out cutting-edge, testable scientific hypotheses bridging multiple disciplines to kickstart fresh research.

---

## 🛠️ Tech Stack & Architecture
- **Frontend:** Pure Semantic HTML5, Bespoke High-Fidelity Glassmorphism CSS, Vanilla JavaScript micro-animations, Custom fluid cursor, interactive drag-and-drop data pills, and real-time **Text Scrambler decoding effects**.
- **Backend:** Lightweight **Node.js / Express** server integrating the official **Google Gen AI SDK** (`@google/genai`).
- **Demonstration Resilience:** Features bulletproof client-side and server-side fallback simulation mechanisms ensuring zero downtime or broken UX during live presentations or API rate limits.

---

## 🚀 Getting Started (Local Setup)

Follow these simple instructions to set up and run Synapse AI on your local machine.

### Prerequisites
- **Node.js** (v18 or higher recommended)
- A **Google Gemini API Key**

### Installation Steps

1. **Clone or Download the Repository:**
   Download the files to your local machine and open the project folder in your terminal.

2. **Install Dependencies:**
   Run the following command inside the project root directory:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Locate the `.env.template` file in the project root.
   - Rename it to `.env` (or create a new `.env` file).
   - Add your Gemini API key inside the `.env` file:
     ```env
     GEMINI_API_KEY=your_actual_google_gemini_api_key_here
     PORT=3000
     ```

4. **Launch the Application:**
   - **On Windows:** Simply double-click the **`start_synapse.bat`** file. It will automatically start the local Node.js server and open the app in your default web browser.
   - **Manual Start (Any OS):** Run the server from your terminal:
     ```bash
     node server.js
     ```
     Then open your browser and navigate to: `http://localhost:3000`

---

## 🚀 What's Next
- **Live Vector Database Integration:** Direct API pipelines to real-time repositories like PubMed, GWAS catalogs, and ClinicalTrials.gov for automated live stream ingestion.
- **Collaborative Research Workspaces:** Allowing multidisciplinary teams to share real-time hypothesis sandboxes and export synthesis models directly to lab notebooks.
