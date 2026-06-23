


 
      (function(){document.addEventListener("click",function(e){var a=e.target.closest("[data-product-id]");if(!a)return;e.preventDefault();var pid=a.getAttribute("data-product-id");if(pid)parent.postMessage({type:"ecto-artifact-link-click",productId:pid},"*")})})();




        // Mobile Drawer
        const menuBtn = document.getElementById('menuBtn');
        const drawer = document.getElementById('mobileDrawer');
        const backdrop = document.getElementById('drawerBackdrop');
        const drawerClose = document.getElementById('drawerClose');
        const siteHeader =document.getElementById('siteHeader');
         const headerBar =document.getElementById('headerBar');

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
     const header = document.getElementById('siteHeader');let lastScrollY = window.scrollY;let ticking = false;
function updateHeader() {    const currentY = window.scrollY;          if (currentY > 50) {        header.classList.add('is-scrolled');    } else {        header.classList.remove('is-scrolled');    }           if (currentY > lastScrollY && currentY > 100) {       header.classList.add('is-hidden');    } else if (currentY < lastScrollY) {    header.classList.remove('is-hidden');    }        if (currentY < 10) {        header.classList.remove('is-hidden');    }        lastScrollY = currentY;    ticking = false;}
window.addEventListener('scroll', () => {    if (!ticking) {        requestAnimationFrame(updateHeader);        ticking = true;    }});updateHeader();

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

        // Contact form
        const form = document.getElementById('contactForm');
        const note = document.getElementById('formNote');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const subject = encodeURIComponent('New Project Inquiry — ' + (data.get('name') || ''));
            const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nProject:\n${data.get('details')}`);
            window.location.href = `mailto:info@rehnova.digital?subject=${subject}&body=${body}`;
            note.classList.remove('hidden');
            form.reset();
            setTimeout(() => note.classList.add('hidden'), 5000);
        });
        
        
        // Testimonials
        
        
        const testimonials = [    {        name: "Sarah Chen",        role: "CTO, TechFlow",        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",        quote: "Rehnova rebuilt our booking platform in Next.js. Page load went from 4.2s to 1.1s, and conversions increased 22% in the first month. Their code quality is the best we've seen.",        metric: "4.2s → 1.1s",        label: "Load time",        project: "SaaS Platform • 6 weeks"    },    {        name: "Marcus Johnson",        role: "Operations Director, BuildCorp",        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop",        quote: "The AI agent handles 70% of our support tickets now. Integration with WhatsApp and CRM was flawless. Weekly demos kept us aligned.",        metric: "70%",        label: "Tickets automated",        project: "AI Support • 4 weeks"    },    {        name: "Elena Rodriguez",        role: "Founder, EduTech",        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",        quote: "We needed ScholarMS customized for multi-campus. They delivered on time, trained staff, and handed over full source code. Zero vendor lock-in.",        metric: "100%",        label: "IP transferred",        project: "Education Platform • 8 weeks"    }];
let current = 0;const content = document.getElementById('testimonial-content');const dots = document.getElementById('testimonial-dots');
function render() {    const t = testimonials[current];    content.style.opacity = '0';
    setTimeout(() => {        content.innerHTML = `            <div class="quote-icon">                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6A4.17 0 003 10.17V18h7v-7.17A4.17 4.17 0 005.83 6H7.17zm10 0A4.17 4.17 0 0013 10.17V18h7v-7.17A4.17 4.17 0 0015.83 6h1.34z"/></svg>            </div>            <blockquote class="testimonial-quote">"${t.quote}"</blockquote>            <div class="testimonial-footer">                <div class="author-info">                    <img src="${t.image}" alt="${t.name}" class="author-img">                    <div>                        <div class="author-name">${t.name}</div>                        <div class="author-role">${t.role}</div>                    </div>                </div>                <div class="metric-group">                    <div class="metric-block">                        <div class="metric-value">${t.metric}</div>                        <div class="metric-label">${t.label}</div>                    </div>                    <div class="metric-divider"></div>                    <div class="project-tag">${t.project}</div>                </div>            </div>        `;        content.style.opacity = '1';    }, 200);
    dots.innerHTML = testimonials.map((_, i) =>        `<button onclick="goTo(${i})" class="dot ${i === current? 'active' : ''}" aria-label="Go to testimonial ${i + 1}"></button>`    ).join('');}
function goTo(i) {    current = i;    render();}
function next() {    current = (current + 1) % testimonials.length;    render();}
function prev() {    current = (current - 1 + testimonials.length) % testimonials.length;    render();}
document.getElementById('next-btn').onclick = next;document.getElementById('prev-btn').onclick = prev;
render();setInterval(next, 7000);

  
  
  // Services pills
  
  
  const pills = document.querySelectorAll('.category-pill');
const grids = document.querySelectorAll('.service-grid');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        const category = pill.dataset.category;
        
        if (pill.classList.contains('active')) return;
        
        pills.forEach(p => {
            p.classList.remove('active');
            p.querySelector('div.text-left > div:first-child').classList.add('text-slate-900');
            p.querySelector('div.text-left > div:last-child').classList.add('text-slate-500');
            p.querySelector('div.text-left > div:last-child').classList.remove('opacity-80');
        });
        
        pill.classList.add('active');
        pill.querySelector('div.text-left > div:first-child').classList.remove('text-slate-900');
        pill.querySelector('div.text-left > div:last-child').classList.remove('text-slate-500');
        pill.querySelector('div.text-left > div:last-child').classList.add('opacity-80');
        
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
   
   
   const features = [    {        word: "dedicated architecture",        desc: "Senior engineers design your system for 10x scale from day one. No refactoring bills six months later."    },    {        word: "SOC 2 compliance",        desc: "Security and access controls built in, not bolted on. Audit-ready from your first deploy."    },    {        word: "complete documentation",        desc: "Runbooks, API docs, and architecture diagrams. Your team can maintain it without us."    },    {        word: "proactive monitoring",        desc: "We watch your infra 24/7. You get paged before your users notice issues."    }];
let currentIndex = 0;let isAnimating = false;const wordEl = document.getElementById('rotatingWord');const descEl = document.getElementById('rotatingDesc');const diagrams = document.querySelectorAll('.feature-diagram');const indicators = document.querySelectorAll('#indicators button');
function animateLines(svg) {    const lines = svg.querySelectorAll('.diagram-line');    lines.forEach(line => {        line.classList.remove('animate');        void line.offsetWidth;        line.classList.add('animate');    });}
function updateFeature(index) {    if (isAnimating || index === currentIndex) return;    isAnimating = true;        wordEl.classList.add('fade-out');    descEl.classList.add('fade-out');        setTimeout(() => {        wordEl.textContent = features[index].word;        descEl.textContent = features[index].desc;                diagrams.forEach((d, i) => {            if (i === index) {                d.classList.remove('hidden');                setTimeout(() => animateLines(d), 100);            } else {                d.classList.add('hidden');            }        });                indicators.forEach((ind, i) => {            if (i === index) {                ind.classList.remove('w-1.5', 'bg-slate-300');                ind.classList.add('w-10', 'bg-slate-900');            } else {                ind.classList.remove('w-10', 'bg-slate-900');                ind.classList.add('w-1.5', 'bg-slate-300');            }        });                setTimeout(() => {            wordEl.classList.remove('fade-out');            descEl.classList.remove('fade-out');            isAnimating = false;        }, 50);    }, 400);        currentIndex = index;}
let interval = setInterval(() => {    const nextIndex = (currentIndex + 1) % features.length;    updateFeature(nextIndex);}, 4000);
indicators.forEach((btn, index) => {    btn.addEventListener('click', () => {        clearInterval(interval);        updateFeature(index);        setTimeout(() => {            interval = setInterval(() => {                const nextIndex = (currentIndex + 1) % features.length;                updateFeature(nextIndex);            }, 4000);        }, 8000);    });});
setTimeout(() => animateLines(diagrams[0]), 500);
const section = document.querySelector('section');section.addEventListener('mouseenter', () => clearInterval(interval));section.addEventListener('mouseleave', () => {    interval = setInterval(() => {        const nextIndex = (currentIndex + 1) % features.length;        updateFeature(nextIndex);    }, 4000);});
    
    
    // Hamburger fns
    
    
    (() => {
  const header = document.getElementById('siteHeader');
  const bar = document.getElementById('headerBar');
  const logo = document.getElementById('logo');
  const cta = document.getElementById('headerCta');
  const navLinks = document.querySelectorAll('#desktopNav.nav-link');
  const menuIcon = document.getElementById('menuIcon');

  let lastY = 0;
  let hidden = false;

  const update = () => {
    const y = window.scrollY;
    const down = y > lastY && y > 80;
    const top = y < 20;

    // Hide/show on scroll
    if (down &&!hidden) {
      header.style.transform = 'translateY(-100%)';
      hidden = true;
    } else if (!down && hidden) {
      header.style.transform = 'translateY(0)';
      hidden = false;
    }

   if (top) {
  logoImg.style.filter = 'brightness(0) invert(1)';
  bar.className = 'border-b border-transparent bg-transparent transition-all duration-500 h-[72px]';
  logo.className = 'text- font-[550] tracking-tight text-white transition-colors duration-300';
  
  cta.className = 'ml-2 inline-flex h-9 px-4 rounded-lg items-center bg-white text-black text-[13px] font-medium hover:bg-[#1888A8] transition-colors duration-200';
  
  navLinks.forEach(a => {
    a.className = 'text-[14px] text-white/70 hover:text-white transition-colors duration-200';
    a.style.color='white';
  });
  
  menuIcon.classList.add('text-white');
  menuIcon.classList.remove('text-slate-900');
  
} else {
  logoImg.style.filter = 'brightness(0) saturate(100%)';
  bar.className = 'border-b border-slate-200/60 bg-white/100 h-[60px] backdrop-blur-xl shadow-sm transition-all duration-500';
  logo.className = 'text- font-[550] tracking-tight text-slate-900 transition-colors duration-300';
  
  cta.className = 'ml-2 inline-flex h-9 px-4 items-center rounded-lg bg-[#1DA9CE] text-white text-[13px] font-medium hover:bg-[#1888A8] transition-colors duration-200';
  
  navLinks.forEach(a => {
    a.className = 'text-[14px] text-slate-600 hover:text-slate-900 transition-colors duration-200';
  });
  
  menuIcon.classList.remove('text-white');
  menuIcon.classList.add('text-slate-900');
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
    open =!open;
    mobileMenu.style.maxHeight = open? mobileMenu.scrollHeight + 'px' : '0';
    menuIcon.innerHTML = open
     ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12"/>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 7h16M4 12h16M4 17h16"/>';
  };

  update();
})();

      
     
