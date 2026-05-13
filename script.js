document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .feature-tab, .t-tab, .data-pill').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Scroll Progress
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;
    });
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed if you don't want it to hide again
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Solution Feature Tabs
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featurePanes = document.querySelectorAll('.feature-pane');

    featureTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs & panes
            featureTabs.forEach(t => t.classList.remove('active'));
            featurePanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked tab
            tab.classList.add('active');
            
            // Show corresponding pane
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Contextual Translation Tabs
    const translationTabs = document.querySelectorAll('.t-tab');
    const translationResult = document.getElementById('t-result');

    const translations = {
        'researcher': '<p><strong>Detailed statistical analysis:</strong> p-value < 0.001 correlation observed between Gene X expression and biomarker Y indicating significant structural anomalies.</p>',
        'clinician': '<p><strong>Actionable Summary:</strong> Patients exhibiting biomarker Y should be screened for Gene X mutations. Consider protocol adjustments for this cohort.</p>',
        'policy': '<p><strong>Public Policy Focus:</strong> Identified a new genetic risk factor. Recommend allocating resources for community screening and awareness campaigns.</p>'
    };

    // Text Scrambler function
    class TextScrambler {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 20);
                const end = start + Math.floor(Math.random() * 20);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-muted">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Translation API Logic
    const scrambler = new TextScrambler(translationResult);
    const translateInput = document.getElementById('translation-input-text');
    const translateBtn = document.getElementById('btn-translate');
    let currentAudience = 'researcher';

    translationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            translationTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentAudience = tab.getAttribute('data-t-target');
        });
    });

    translateBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const text = translateInput.value.trim();
        if (!text) return alert('Please enter some text to translate.');

        translateBtn.innerHTML = 'Translating...';
        translateBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, targetAudience: currentAudience })
            });
            const data = await response.json();
            
            if (data.error) throw new Error(data.error);

            scrambler.setText(data.result).then(() => {
                translationResult.innerHTML = data.result;
            });
        } catch (error) {
            translationResult.innerHTML = `<p style="color: var(--accent-red)">Error: ${error.message}</p>`;
        } finally {
            translateBtn.innerHTML = 'Translate';
            translateBtn.disabled = false;
        }
    });

    // Add mouse move parallax to hero for dynamic feel
    const hero = document.querySelector('.hero');
    const bgGrid = document.querySelector('.bg-grid');
    
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        bgGrid.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- NEW: Drag and Drop Logic ---
    const pills = document.querySelectorAll('.data-pill');
    const dropzone = document.getElementById('synthesis-core');
    const btnSynthesize = document.getElementById('btn-synthesize');
    const syncResult = document.getElementById('synthesis-result');
    const syncResultText = document.getElementById('sync-result-text');
    let droppedItems = new Set();

    const addPillToDropzone = (type, originalPill) => {
        if (!droppedItems.has(type)) {
            // Clone pill into dropzone
            const clone = originalPill.cloneNode(true);
            clone.setAttribute('draggable', 'false');
            clone.style.cursor = 'pointer'; // Make it clear it's clickable
            // allow clicking the clone to remove it
            clone.addEventListener('click', () => {
                clone.remove();
                droppedItems.delete(type);
                if (droppedItems.size < 2) {
                    btnSynthesize.disabled = true;
                }
            });
            dropzone.appendChild(clone);
            droppedItems.add(type);
            
            // Enable button if 2 or more
            if (droppedItems.size >= 2) {
                btnSynthesize.disabled = false;
                btnSynthesize.removeAttribute('disabled');
            }
        }
    };

    pills.forEach(pill => {
        // Drag and drop support
        pill.addEventListener('dragstart', (e) => {
            pill.classList.add('dragging');
            e.dataTransfer.setData('text/plain', pill.dataset.type);
            e.dataTransfer.effectAllowed = 'copy';
        });

        pill.addEventListener('dragend', () => {
            pill.classList.remove('dragging');
        });

        // Click support (easier for touch/trackpad)
        pill.addEventListener('click', () => {
            addPillToDropzone(pill.dataset.type, pill);
        });
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        
        const type = e.dataTransfer.getData('text/plain');
        const draggedPill = document.querySelector(`.data-pill[data-type="${type}"]`);
        
        if (draggedPill) {
            addPillToDropzone(type, draggedPill);
        }
    });

    btnSynthesize.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log("Analyze Data clicked. Dropped items size:", droppedItems.size);
        if (droppedItems.size < 2) return;

        btnSynthesize.innerHTML = 'Processing...';
        btnSynthesize.disabled = true;
        syncResult.classList.add('hidden');
        
        try {
            const streams = Array.from(droppedItems);
            const response = await fetch('http://localhost:3000/api/synthesize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ streams })
            });
            const data = await response.json();
            
            if (data.error) throw new Error(data.error);

            syncResult.classList.remove('hidden');
            syncResultText.innerHTML = data.result;
        } catch (error) {
            syncResult.classList.remove('hidden');
            syncResultText.innerHTML = `<span style="color: var(--accent-red)">Error: ${error.message}</span>`;
        } finally {
            btnSynthesize.innerHTML = 'Analyze Data';
            btnSynthesize.disabled = false;
        }
    });

    // --- NEW: Hypothesis Generator Logic ---
    const hypInput = document.getElementById('hypothesis-input');
    const hypBtn = document.getElementById('btn-generate');
    const hypContainer = document.getElementById('hypothesis-output-container');
    const hypTextArea = document.getElementById('hypothesis-typing-area');

    hypBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const topic = hypInput.value.trim();
        if (!topic) return;

        hypBtn.innerHTML = 'Generating...';
        hypBtn.disabled = true;
        hypContainer.classList.remove('hidden');
        hypTextArea.innerHTML = '';
        hypTextArea.classList.add('typing-cursor');
        
        try {
            const response = await fetch('http://localhost:3000/api/hypothesis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });
            const data = await response.json();
            
            if (data.error) throw new Error(data.error);

            const textToType = data.result;
            let i = 0;
            
            const typeInterval = setInterval(() => {
                if (i < textToType.length) {
                    hypTextArea.innerHTML += textToType.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    hypTextArea.classList.remove('typing-cursor');
                }
            }, 20);
        } catch (error) {
            hypTextArea.innerHTML = `<span style="color: var(--accent-red)">Error: ${error.message}</span>`;
            hypTextArea.classList.remove('typing-cursor');
        } finally {
            hypBtn.innerHTML = 'Generate';
            hypBtn.disabled = false;
        }
    });
    
    // Allow Enter key
    hypInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            hypBtn.click();
        }
    });

});
