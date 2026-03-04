document.addEventListener('DOMContentLoaded', () => {

    // --- Theme System ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        // Load saved theme
        const savedTheme = localStorage.getItem('cse_theme') || 'hacker';
        if (savedTheme === 'luxury') {
            document.body.classList.add('luxury');
            themeBtn.innerText = '💎';
        } else {
            themeBtn.innerText = '🌗';
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('luxury');
            const isLuxury = document.body.classList.contains('luxury');
            localStorage.setItem('cse_theme', isLuxury ? 'luxury' : 'hacker');
            themeBtn.innerText = isLuxury ? '💎' : '🌗';
        });
    }

    // --- Notification System ("Coming Soon") ---
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerText = 'Coming Soon... 🚀';
    document.body.appendChild(notif);

    let notifTimeout;
    function showNotification(msg) {
        if(msg) notif.innerText = msg;
        notif.classList.add('show');
        clearTimeout(notifTimeout);
        notifTimeout = setTimeout(() => {
            notif.classList.remove('show');
        }, 2000);
    }

    const comingSoonLinks = document.querySelectorAll('.coming-soon');
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // sequential bounce animation
            link.classList.add('bounce');
            setTimeout(() => link.classList.remove('bounce'), 1000);
            showNotification('Coming Soon... 🚀');
        });
    });

    // --- Hero Typing Animation ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const phrases = [
            "Welcome to the Engineer's World",
            "Chai Sutta Or Engineering",
            "Get Into Creative Mode"
        ];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;

        function type() {
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                typewriterElement.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typewriterElement.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000);
    }

    // --- Rotating Subtext ---
    const rotatingTexts = document.querySelectorAll('.rotating-text');
    if (rotatingTexts.length > 0) {
        let currentRot = 0;
        setInterval(() => {
            rotatingTexts[currentRot].classList.remove('active');
            currentRot = (currentRot + 1) % rotatingTexts.length;
            rotatingTexts[currentRot].classList.add('active');
        }, 2500);
    }

    // --- Drift Text Animation ---
    const driftTexts = document.querySelectorAll('.drift-text');
    if (driftTexts.length > 0) {
        let currentDrift = 0;
        setInterval(() => {
            driftTexts[currentDrift].classList.remove('active');
            currentDrift = (currentDrift + 1) % driftTexts.length;
            driftTexts[currentDrift].classList.add('active');
        }, 3000);
    }

    // --- Dropout Calculator Form ---
    const dropoutForm = document.getElementById('dropout-form');
    if (dropoutForm) {
        dropoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = dropoutForm.querySelector('button');
            btn.innerText = "Calculating...";
            
            const data = {
                study_hours: document.getElementById('study_hours').value,
                internship_attempts: document.getElementById('internship_attempts').value,
                skill_growth: document.getElementById('skill_growth').value,
                clarity_score: document.getElementById('clarity_score').value,
                consistency: document.getElementById('consistency').value,
                confidence: document.getElementById('confidence').value
            };

            try {
                const res = await fetch('/calculate-dropout', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                
                const resultDiv = document.getElementById('dropout-result');
                resultDiv.innerHTML = `
                    <h3>Risk Level: <span style="color:var(--accent)">${result.risk_level} (${result.risk_percentage}%)</span></h3>
                    <ul>${result.suggestions.map(s => `<li>> ${s}</li>`).join('')}</ul>
                `;
            } catch(e) {
                showNotification("Error calculating risk.");
            } finally {
                btn.innerText = "Analyze Risk";
            }
        });
    }

    // --- Anonymous Board ---
    const anonForm = document.getElementById('anon-form');
    const postsContainer = document.getElementById('posts-container');
    
    if(postsContainer) {
        const fetchPosts = async () => {
            const res = await fetch('/anonymous-posts');
            const data = await res.json();
            postsContainer.innerHTML = '';
            data.posts.forEach(post => {
                const el = document.createElement('div');
                el.className = 'post-card';
                el.innerHTML = `
                    <p>${post.content}</p>
                    <div class="post-actions">
                        <small>${new Date(post.created_at).toLocaleString()}</small>
                        <button class="btn coming-soon" style="padding: 0.2rem 0.5rem; font-size:0.8rem;" onclick="likePost(${post.id})">👍 ${post.likes}</button>
                    </div>
                `;
                postsContainer.appendChild(el);
            });
        };
        fetchPosts();

        if (anonForm) {
            anonForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const content = document.getElementById('anon-content').value;
                await fetch('/anonymous-post', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({content})
                });
                document.getElementById('anon-content').value = '';
                showNotification("Post added.");
                fetchPosts();
            });
        }

        window.likePost = async (id) => {
            await fetch(`/anonymous-post/${id}/like`, { method: 'POST' });
            fetchPosts();
        };
    }
});
