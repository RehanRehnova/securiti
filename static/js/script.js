
// Video optimizer 

(() => {
    const video = document.getElementById('heroBg');
    if (!video) return;
    // Don't load video on slow connections — show poster instead
    if ('connection' in navigator) {

        const conn = navigator.connection;
        if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
            video.removeAttribute('autoplay');
            video.removeAttribute('preload');
            video.style.opacity = '1';
            return;
        }
    }
    // Fallback — if video hasn't started in 4 seconds, just show poster

    const giveUp = setTimeout(() => {

        if (video.readyState < 3) {
            video.style.display = 'none';
        }
    }, 4000);

    // Fade in smoothly once playing


    video.addEventListener('playing', () => {


        clearTimeout(giveUp);


        video.classList.add('ready');


    }, { once: true });





    // Buffering stall — fade slightly so it doesn't freeze visually


    video.addEventListener('waiting', () => {


        video.style.opacity = '0.4';


    });


    video.addEventListener('playing', () => {


        video.style.opacity = '1';


    });


})();




(function () { document.addEventListener("click", function (e) { var a = e.target.closest("[data-product-id]"); if (!a) return; e.preventDefault(); var pid = a.getAttribute("data-product-id"); if (pid) parent.postMessage({ type: "ecto-artifact-link-click", productId: pid }, "*") }) })();


// Mobile Drawer
const menuBtn = document.getElementById('menuBtn');
const drawer = document.getElementById('mobileDrawer');
const backdrop = document.getElementById('drawerBackdrop');
const drawerClose = document.getElementById('drawerClose');
const siteHeader = document.getElementById('siteHeader');
const headerBar = document.getElementById('headerBar');

function openDrawer() {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    siteHeader.classList.add('hidden');
    requestAnimationFrame(() => drawer.classList.add('open'));
}

function closeDrawer() {
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
    siteHeader.classList.remove('hidden');
    drawer.classList.remove('open');
}

menuBtn?.addEventListener('click', openDrawer);
drawerClose?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);

drawer?.querySelectorAll('a').forEach((a, i) => {
    a.style.transitionDelay = `${100 + i * 50}ms`;
    a.addEventListener('click', closeDrawer);
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
        closeDrawer();
    }
});

let touchStartX = 0;
drawer?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

drawer?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX - touchStartX > 50) closeDrawer();
}, { passive: true });

// Header scroll behavior
const header = document.getElementById('siteHeader'); let lastScrollY = window.scrollY; let ticking = false;
function updateHeader() { const currentY = window.scrollY; if (currentY > 50) { header.classList.add('is-scrolled'); } else { header.classList.remove('is-scrolled'); } if (currentY > lastScrollY && currentY > 100) { header.classList.add('is-hidden'); } else if (currentY < lastScrollY) { header.classList.remove('is-hidden'); } if (currentY < 10) { header.classList.remove('is-hidden'); } lastScrollY = currentY; ticking = false; }
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; } }); updateHeader();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 50);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 8) * 60}ms`;
    observer.observe(el);
});

// Region cards hover for map markers
document.querySelectorAll('.region-card').forEach(card => {
    const targetId = card.dataset.target;
    const marker = document.getElementById(targetId);
    if (!marker) return;
    card.addEventListener('mouseenter', () => marker.classList.add('active'));
    card.addEventListener('mouseleave', () => marker.classList.remove('active'));
});

// FAQ accordion
document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const chevron = btn.querySelector('.chevron');
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

        document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = '0px');
        document.querySelectorAll('.chevron').forEach(ch => ch.style.transform = 'rotate(0deg)');

        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            chevron.style.transform = 'rotate(180deg)';
        }
    });
});



// Testimonials


const testimonials = [{ name: "Sarah Chen", role: "CTO, TechFlow", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop", quote: "Rehnova rebuilt our booking platform in Next.js. Page load went from 4.2s to 1.1s, and conversions increased 22% in the first month. Their code quality is the best we've seen.", metric: "4.2s → 1.1s", label: "Load time", project: "SaaS Platform • 6 weeks" }, { name: "Marcus Johnson", role: "Operations Director, BuildCorp", image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop", quote: "The AI agent handles 70% of our support tickets now. Integration with WhatsApp and CRM was flawless. Weekly demos kept us aligned.", metric: "70%", label: "Tickets automated", project: "AI Support • 4 weeks" }, { name: "Elena Rodriguez", role: "Founder, EduTech", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", quote: "We needed ScholarMS customized for multi-campus. They delivered on time, trained staff, and handed over full source code. Zero vendor lock-in.", metric: "100%", label: "IP transferred", project: "Education Platform • 8 weeks" }];
let current = 0; const content = document.getElementById('testimonial-content'); const dots = document.getElementById('testimonial-dots');
function render() {
    const t = testimonials[current]; content.style.opacity = '0';
    setTimeout(() => { content.innerHTML = `            <div class="quote-icon">                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6A4.17 0 003 10.17V18h7v-7.17A4.17 4.17 0 005.83 6H7.17zm10 0A4.17 4.17 0 0013 10.17V18h7v-7.17A4.17 4.17 0 0015.83 6h1.34z"/></svg>            </div>            <blockquote class="testimonial-quote">"${t.quote}"</blockquote>            <div class="testimonial-footer">                <div class="author-info">                    <img src="${t.image}" alt="${t.name}" class="author-img">                    <div>                        <div class="author-name">${t.name}</div>                        <div class="author-role">${t.role}</div>                    </div>                </div>                <div class="metric-group">                    <div class="metric-block">                        <div class="metric-value">${t.metric}</div>                        <div class="metric-label">${t.label}</div>                    </div>                    <div class="metric-divider"></div>                    <div class="project-tag">${t.project}</div>                </div>            </div>        `; content.style.opacity = '1'; }, 200);
    dots.innerHTML = testimonials.map((_, i) => `<button onclick="goTo(${i})" class="dot ${i === current ? 'active' : ''}" aria-label="Go to testimonial ${i + 1}"></button>`).join('');
}
function goTo(i) { current = i; render(); }
function next() { current = (current + 1) % testimonials.length; render(); }
function prev() { current = (current - 1 + testimonials.length) % testimonials.length; render(); }
document.getElementById('next-btn').onclick = next; document.getElementById('prev-btn').onclick = prev;
render(); setInterval(next, 7000);



// Services pills


const pills = document.querySelectorAll('.category-pill');
const grids = document.querySelectorAll('.service-grid');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        const category = pill.dataset.category;

        if (pill.classList.contains('active')) return;

        pills.forEach(p => {
            p.classList.remove('active');
            p.querySelector('div.text-left > div:first-child').classList.add('text-slate-700');
            p.querySelector('div.text-left > div:last-child').classList.add('text-500');
            p.querySelector('div.text-left > div:last-child').classList.remove('opacity-100');
        });

        pill.classList.add('active');
        pill.querySelector('div.text-left > div:first-child').classList.remove('text-slate-700');
        pill.querySelector('div.text-left > div:last-child').classList.remove('text-500');
        pill.querySelector('div.text-left > div:last-child').classList.add('opacity-100');

        const currentGrid = document.querySelector('.service-grid:not(.hidden)');
        const nextGrid = document.querySelector(`[data-grid="${category}"]`);

        if (currentGrid && currentGrid !== nextGrid) {

            currentGrid.classList.add('hidden');


            setTimeout(() => {
                nextGrid.classList.remove('hidden');
            }, 400);
        }
    });
});


// Features section 

document.addEventListener('DOMContentLoaded', () => {
    const features = [
        {
            word: 'Dedicated Architecture',
            desc: 'Senior engineers design your system for 10x scale from day one. No refactoring bills six months later.',
            img: '/static/images/features/architecture.svg',
            alt: 'Architecture'
        },
        {
            word: 'Enterprise Security',
            desc: 'SOC 2 Type II controls, encryption at rest and in transit, and zero-trust policies baked in from commit one.',
            img: '/static/images/features/security.svg',
            alt: 'Security'
        },
        {
            word: 'Complete Documentation',
            desc: 'Runbooks, API docs, and architecture diagrams your team can actually use. No tribal knowledge dependencies.',
            img: '/static/images/features/docs.svg',
            alt: 'Documentation'
        },
        {
            word: '24/7 Monitoring',
            desc: 'Auto-scaling, alerting, and incident response built into your stack. Sleep well knowing we watch the graphs.',
            img: '/static/images/features/monitoring.svg',
            alt: 'Monitoring'
        }
    ];

    const wordEl = document.getElementById('rotatingWord');
    const descEl = document.getElementById('rotatingDesc');
    const imgEl = document.getElementById('featureImage');
    if (!wordEl || !descEl || !imgEl) return;
    let currentIndex = 0;
    let intervalId = null;

    function createIndicators() {
        const container = document.getElementById('indicators');
        container.innerHTML = '';
        features.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `indicator-dot h-1.5 rounded-full transition-all duration-300 ${index === 0 ? 'w-10 bg-slate-900' : 'w-1.5 bg-slate-300'}`;
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => {
                clearInterval(intervalId);
                currentIndex = index;
                updateFeature(currentIndex);
                startRotation();
            });
            container.appendChild(dot);
        });
    }

    function updateFeature(index) {
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
    }

    function startRotation() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % features.length;
            updateFeature(currentIndex);
        }, 4200);
    }

    // Initialize
    createIndicators();
    updateFeature(0);

    // Start rotation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startRotation();
                observer.disconnect(); // Run only once
            }
        });
    }, { threshold: 0.4 });

    observer.observe(document.getElementById('featureHighlighter'));
});

// Hamburger fns
(() => {
    const header = document.getElementById('siteHeader');
    const bar = document.getElementById('headerBar');
    const logo = document.getElementById('logo');
    const cta = document.getElementById('headerCta');
    const headerContact = document.getElementById('headerContact');
    const navLinks = document.querySelectorAll('desktopNav.nav-link');
    const menuIcon = document.getElementById('menuIcon');

    let lastY = 0;
    let hidden = false;

    const update = () => {
        const y = window.scrollY;
        const down = y > lastY && y > 80;
        const top = y < 20;

        // Hide/show on scroll
        if (down && !hidden) {
            header.style.transform = 'translateY(-100%)';
            hidden = true;
        } else if (!down && hidden) {
            header.style.transform = 'translateY(0)';
            hidden = false;
        }

        if (top) {
            logoImg.style.filter = 'brightness(0) invert(1)';
            bar.className = 'border-b border-transparent bg-transparent transition-all duration-500 ';
            logo.className = 'text- font-[550] tracking-tight text-white transition-colors duration-300';
            cta.className = 'ml-2 inline-flex h-9 px-4 rounded-lg items-center bg-white text-black text-[13px] font-medium hover:bg-[#1888A8] transition-colors duration-200';
            headerContact.className = 'inline-flex h-9 px-4 lg:px-5 items-center justify-center bg-transparent border border-slate-300 hover:border-slate-600 text-white  text-[14px] lg:text-[15px] font-medium rounded-lg transition-colors';

            navLinks.forEach(a => {
                a.className = 'text-[14px] text-white/70 hover:text-white transition-colors duration-200';
            });

            menuIcon.classList.add('text-white');
            menuIcon.classList.remove('text-slate-600');

        } else {
            logoImg.style.filter = 'none';
           bar.className = 'm-2 rounded-md border border-slate-200 bg-white/10 sm:h-[60px] lg:h-[65px] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-500';
            logo.className = 'text- font-[550] tracking-tight text-slate-900 transition-colors duration-300';

            cta.className = 'ml-2 inline-flex h-9 px-4 items-center rounded-lg bg-[#1DA9CE] text-white text-[13px] font-medium hover:bg-[#1888A8] transition-colors duration-200';

            navLinks.forEach(a => {
                a.className = 'text-[14px] text-slate-600 hover:text-[#1DA9CE] transition-colors duration-200';
            });

            headerContact.className = 'inline-flex h-9 px-4 lg:px-5 items-center justify-center bg-transparent border border-slate-300 hover:border-slate-600 text-slate-600  text-[14px] lg:text-[15px] font-medium rounded-lg transition-colors';

            menuIcon.classList.remove('text-white');
            menuIcon.classList.add('text-slate-600');
        }
        lastY = y;
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { update(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });

    // Hamburger
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let open = false;

    menuBtn.onclick = () => {
        open = !open;
        mobileMenu.style.maxHeight = open ? mobileMenu.scrollHeight + 'px' : '0';
        menuIcon.innerHTML = open
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12"/>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 7h16M4 12h16M4 17h16"/>';
    };

    update();
})();

//Process section fading 

(() => {
    const steps = [
        {
            img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
            num: '01 — DISCOVERY',
            title: 'Goals & Requirements',
            desc: '2–3 weeks of workshops to deeply understand your business objectives, workflows, users, and technical needs. You receive a clear scope, recommended architecture, and realistic timeline.'
        },
        {
            img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2940&auto=format&fit=crop',
            num: '02 — ARCHITECTURE & DESIGN',
            title: 'System & Solution Design',
            desc: 'We design the complete technical architecture, data flows, AI agent logic (if needed), and user experience. Everything is reviewed and approved before development begins.'
        },
        {
            img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop',
            num: '03 — DEVELOPMENT',
            title: 'Agile Development',
            desc: '6–12 weeks of iterative development with weekly demos. You see working features regularly — whether it’s web applications, AI agents, CRM systems, or custom dashboards.'
        },
        {
            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2940&auto=format&fit=crop',
            num: '04 — LAUNCH & SCALE',
            title: 'Deployment & Ongoing Support',
            desc: 'Security audits, performance testing, deployment, team training, and full handover. We provide post-launch monitoring, SLAs, and continuous improvements as your business grows.'
        }
    ];
    const bg = document.getElementById('pf-bg');
    const num = document.getElementById('pf-num');
    const title = document.getElementById('pf-title');
    const desc = document.getElementById('pf-desc');
    let cur = 0;

    const go = i => {
        if (i === cur) return;
        cur = i;
        const s = steps[i];
        bg.style.opacity = 0;
        setTimeout(() => {
            bg.style.backgroundImage = `url('${s.img}')`;
            bg.style.opacity = 1;
        }, 180);
        [num, title, desc].forEach(e => {
            e.style.opacity = 0;
            e.style.transform = 'translateY(8px)';
        });
        setTimeout(() => {
            num.textContent = s.num;
            title.textContent = s.title;
            desc.textContent = s.desc;
            [num, title, desc].forEach(e => {
                e.style.opacity = 1;
                e.style.transform = 'translateY(0)';
            });
        }, 220);
    };

    const options = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) go(+entry.target.dataset.pf);
        });
    }, options);

    document.querySelectorAll('#process-full [data-pf]').forEach(el => observer.observe(el));
})();


// Message section fns

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const formError = document.getElementById('formError');
const submitBtn = document.querySelector('button[form="contactForm"]');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Clear previous states
    formError.classList.add('hidden');
    formNote.classList.add('hidden');

    // Basic validation
    const messageType = document.getElementById('messageType').value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!messageType || !name || !email || !message) {
        showError('Please fill in all required fields.');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }

    // Disable button + show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Collect form data
    const formData = {
        messageType: messageType,
        name: name,
        email: email,
        whatsapp: document.getElementById('whatsapp').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: message,
        source: 'index_contact_form'
    };

    try {
        // Replace with your actual endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Network error');

        // Success
        formNote.textContent = 'Message sent. Thanks! We’ll reply within 1 business day.';
        formNote.classList.remove('hidden');
        contactForm.reset();

    } catch (error) {
        showError('Something went wrong. Please try again or email us directly.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
    }
});

function showError(msg) {
    formError.textContent = msg;
    formError.classList.remove('hidden');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Reset select color on change

document.getElementById('messageType').addEventListener('change', function () {
    this.classList.remove('text-slate-400');
    this.classList.add('text-slate-700');
});



