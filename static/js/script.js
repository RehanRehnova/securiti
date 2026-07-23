
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

// Header hide-on-scroll only (is-scrolled / colors handled in header banner IIFE below)
const header = document.getElementById('siteHeader'); let lastScrollY = window.scrollY; let ticking = false;
function updateHeader() {
    if (!header) return;
    const currentY = window.scrollY;
    // do NOT toggle is-scrolled here — conflicts with home/other page nav colors
    if (currentY > lastScrollY && currentY > 100) {
        header.classList.add('is-hidden');
    } else if (currentY < lastScrollY) {
        header.classList.remove('is-hidden');
    }
    if (currentY < 10) header.classList.remove('is-hidden');
    lastScrollY = currentY;
    ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; } }); updateHeader();

// Subtle professional reveal on scroll
(function initReveals() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Auto-tag major section blocks if not already marked
    const autoTargets = document.querySelectorAll(
        'main section > .max-w-7xl, main section > .max-w-6xl, main section > .max-w-5xl, ' +
        'main section > .max-w-4xl, main section > div.max-w-7xl, ' +
        '#solutions > div, #why > div, #process-full > div, ' +
        '.clients-section > div, ' +
        'section.py-16 > div, section.py-20 > div, section.bg-white > div.max-w-7xl'
    );
    autoTargets.forEach((el) => {
        if (!el.classList.contains('reveal') && !el.closest('.reveal')) {
            el.classList.add('reveal');
        }
    });

    // Tag section heads / feature cards lightly
    document.querySelectorAll(
        'section h2, section .grid > div, section article, ' +
        '#featureHighlighter .group, #solutions .group'
    ).forEach((el, i) => {
        if (el.closest('header') || el.closest('nav') || el.closest('footer')) return;
        if (el.classList.contains('reveal')) return;
        // Only direct-ish content blocks, skip nested noise
        if (el.tagName === 'H2' || el.parentElement?.classList?.contains('grid') || el.classList.contains('group')) {
            el.classList.add('reveal');
            const d = (i % 4) + 1;
            if (d <= 4) el.classList.add('reveal-d' + Math.min(d, 4));
        }
    });

    const nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;

    if (reduce) {
        nodes.forEach((el) => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    nodes.forEach((el, i) => {
        // Soft stagger only within same viewport batch
        if (!el.style.transitionDelay) {
            el.style.transitionDelay = ((i % 5) * 35) + 'ms';
        }
        observer.observe(el);
    });
})();

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



// Clients / operators board
(function initOwnersBoard() {
    const board = document.querySelector('[data-owners-board]');
    if (!board) return;

    const owners = [
        {
            name: 'Ahmed Al-Rashid',
            role: 'Owner, Gulf Formation Advisors',
            company: 'Gulf Formation Advisors',
            location: 'Dubai · Business setup',
            badge: 'GF',
            badgeColor: '#0e7490',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
            quote: '“Passport copies used to live on WhatsApp. Now clients upload to one portal, see live visa status, and we stopped being a human chatbot.”',
            stat: '−60%',
            statLabel: 'Support messages',
            tag: 'Document portal · n8n · WhatsApp API'
        },
        {
            name: 'Omar Khalid',
            role: 'Managing Partner, Marina Property',
            company: 'Marina Property Group',
            location: 'Dubai · Real estate',
            badge: 'MP',
            badgeColor: '#1e3a5f',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
            quote: '“Leads used to die in WhatsApp groups. Response time went from two hours to three minutes. Agents stop fighting over the same lead.”',
            stat: '3 min',
            statLabel: 'Lead response',
            tag: 'Custom CRM · webhooks · round-robin'
        },
        {
            name: 'Hassan Raza',
            role: 'Founder, Studio North',
            company: 'Studio North',
            location: 'Lahore · Design agency',
            badge: 'SN',
            badgeColor: '#7c3aed',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
            quote: '“Clients thought we were unprofessional before design even started. Onboarding dropped from three days to eight hours — one portal, not six tools.”',
            stat: '8 hrs',
            statLabel: 'Onboarding time',
            tag: 'Client portal · Stripe · Figma API'
        },
        {
            name: 'Fatima Noor',
            role: 'Principal, Greenfield Academy',
            company: 'Greenfield Academy',
            location: 'Pakistan · Education',
            badge: 'GA',
            badgeColor: '#047857',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
            quote: '“I used to run the school from Excel and WhatsApp. ScholarMS gives live attendance, fees, and reports on my phone — staff got their weekends back.”',
            stat: '15h / wk',
            statLabel: 'Admin time saved',
            tag: 'ScholarMS · fees · parent portal'
        }
    ];

    const tabs = Array.from(board.querySelectorAll('.owner-tab'));
    const panel = board.querySelector('#owner-panel');
    const progress = board.querySelector('#owner-progress');
    const els = {
        badge: board.querySelector('#owner-badge'),
        company: board.querySelector('#owner-company'),
        location: board.querySelector('#owner-location'),
        stat: board.querySelector('#owner-stat'),
        statLabel: board.querySelector('#owner-stat-label'),
        quote: board.querySelector('#owner-quote'),
        avatar: board.querySelector('#owner-avatar'),
        name: board.querySelector('#owner-name'),
        role: board.querySelector('#owner-role'),
        tag: board.querySelector('#owner-tag')
    };

    let current = 0;
    let timer = null;
    let raf = null;
    let startedAt = 0;
    const DURATION = 7000;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function paint(index) {
        const o = owners[index];
        if (!o || !panel) return;

        const apply = () => {
            els.badge.textContent = o.badge;
            els.badge.style.background = o.badgeColor;
            els.company.textContent = o.company;
            els.location.textContent = o.location;
            els.stat.textContent = o.stat;
            els.statLabel.textContent = o.statLabel;
            els.quote.textContent = o.quote;
            els.avatar.src = o.image;
            els.avatar.alt = o.name;
            els.name.textContent = o.name;
            els.role.textContent = o.role;
            els.tag.textContent = o.tag;
            panel.setAttribute('aria-labelledby', 'owner-tab-' + index);

            tabs.forEach((tab, i) => {
                const active = i === index;
                tab.classList.toggle('is-active', active);
                tab.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        };

        if (reduceMotion) {
            apply();
            return;
        }

        panel.classList.add('is-fading');
        window.setTimeout(() => {
            apply();
            panel.classList.remove('is-fading');
        }, 180);
    }

    function stopAuto() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
        }
        if (progress) progress.style.width = '0%';
    }

    function tickProgress() {
        if (!progress) return;
        const elapsed = Date.now() - startedAt;
        const pct = Math.min(100, (elapsed / DURATION) * 100);
        progress.style.width = pct + '%';
        if (pct < 100) {
            raf = requestAnimationFrame(tickProgress);
        }
    }

    function scheduleNext() {
        stopAuto();
        if (reduceMotion) return;
        startedAt = Date.now();
        raf = requestAnimationFrame(tickProgress);
        timer = window.setTimeout(() => {
            current = (current + 1) % owners.length;
            paint(current);
            scheduleNext();
        }, DURATION);
    }

    function goTo(index) {
        if (index === current && timer) return;
        current = index;
        paint(current);
        scheduleNext();
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const i = Number(tab.getAttribute('data-owner'));
            if (!Number.isNaN(i)) goTo(i);
        });
        tab.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
            e.preventDefault();
            const dir = e.key === 'ArrowDown' ? 1 : -1;
            const next = (current + dir + owners.length) % owners.length;
            goTo(next);
            tabs[next].focus();
        });
    });

    board.addEventListener('mouseenter', stopAuto);
    board.addEventListener('mouseleave', scheduleNext);
    board.addEventListener('focusin', stopAuto);
    board.addEventListener('focusout', (e) => {
        if (!board.contains(e.relatedTarget)) scheduleNext();
    });

    paint(0);
    scheduleNext();
})();



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

// Header behavior:
// - At top (all pages): transparent bar
// - Index (hero video) at top: white links + white logo filter
// - Other pages at top: slate-600 links + natural logo color
// - Scrolled (all pages): full-width solid banner + slate links + natural logo
(() => {
    const header = document.getElementById('siteHeader');
    const bar = document.getElementById('headerBar');
    const logoImg = document.getElementById('logoImg');
    const cta = document.getElementById('headerCta');
    const headerContact = document.getElementById('headerContact');
    const navLinks = document.querySelectorAll('#desktopNav .nav-link');
    const menuIcon = document.getElementById('menuIcon');
    if (!header || !bar) return;

    // Homepage = dark video hero present
    const isHome = !!document.getElementById('heroBg');
    header.classList.toggle('has-dark-hero', isHome);
    header.classList.toggle('is-home', isHome);

    const BAR_BASE =
        'header-banner w-full border-b transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]';
    const NAV_BASE =
        'nav-link transition-colors text-[15px] font-medium py-6 font-body';
    const NAV_BTN_BASE =
        'nav-link transition-colors text-[15px] font-medium flex items-center gap-1 py-6';
    const CTA_BASE =
        'inline-flex h-9 px-4 lg:px-5 items-center justify-center text-[14px] lg:text-[15px] font-semibold rounded-lg transition-colors';
    const CONTACT_BASE =
        'inline-flex h-9 px-4 lg:px-5 items-center justify-center bg-transparent border text-[14px] lg:text-[15px] font-medium rounded-lg transition-colors';

    let lastY = 0;
    let hidden = false;

    /** whiteLinks: only home + at top */
    const setNavColors = (whiteLinks) => {
        navLinks.forEach((a) => {
            const isBtn = a.tagName === 'BUTTON';
            const base = isBtn ? NAV_BTN_BASE : NAV_BASE;
            if (whiteLinks) {
                a.className = base + ' text-white hover:text-white';
            } else {
                a.className = base + ' text-slate-600 hover:text-slate-900';
            }
        });
        if (headerContact) {
            headerContact.className =
                CONTACT_BASE +
                (whiteLinks
                    ? ' border-white/40 hover:border-white text-white'
                    : ' border-slate-300 hover:border-slate-400 text-slate-600');
        }
        if (cta) {
            cta.className =
                CTA_BASE +
                (whiteLinks
                    ? ' bg-white text-slate-900 hover:bg-white/90'
                    : ' bg-[#1DA9CE] hover:bg-[#1888A8] text-white');
        }
        if (menuIcon) {
            menuIcon.classList.toggle('text-white', whiteLinks);
            menuIcon.classList.toggle('text-slate-600', !whiteLinks);
        }
        // Logo: invert only on home at top (white on dark video). Else keep brand color.
        if (logoImg) {
            logoImg.style.filter = whiteLinks ? 'brightness(0) invert(1)' : 'none';
        }
    };

    const update = () => {
        const y = window.scrollY;
        const down = y > lastY && y > 80;
        const atTop = y < 40;
        // ONLY homepage at top gets white links
        const whiteLinks = isHome && atTop;

        if (down && !hidden) {
            header.style.transform = 'translateY(-100%)';
            hidden = true;
        } else if (!down && hidden) {
            header.style.transform = 'translateY(0)';
            hidden = false;
        }
        if (y < 10) {
            header.style.transform = 'translateY(0)';
            hidden = false;
        }

        header.classList.toggle('at-top', atTop);
        header.classList.toggle('over-hero', whiteLinks);
        header.classList.toggle('is-scrolled', !atTop);

        if (atTop) {
            // Transparent bar on ALL pages when at top
            bar.className = BAR_BASE + ' border-transparent bg-transparent';
        } else {
            // Full-width solid banner after scroll
            bar.className =
                BAR_BASE +
                ' border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.04)]';
        }

        setNavColors(whiteLinks);
        lastY = y;
    };

    let ticking = false;
    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
                ticking = true;
            }
        },
        { passive: true }
    );
    update();

    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let open = false;

    if (menuBtn && mobileMenu) {
        menuBtn.onclick = () => {
            open = !open;
            mobileMenu.style.maxHeight = open ? mobileMenu.scrollHeight + 'px' : '0';
            if (menuIcon) {
                menuIcon.innerHTML = open
                    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12"/>'
                    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 7h16M4 12h16M4 17h16"/>';
            }
        };
    }
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



