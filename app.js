// Theme toggle + nav + animations
(function() {
  const stored = localStorage.getItem('trafyx-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', stored);

  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('trafyx-theme', next);
      });
    }

    // Highlight current nav link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === path || href.endsWith('/' + path)) a.classList.add('active');
    });

    // Mobile menu
    const menuBtn = document.querySelector('.nav-menu-btn');
    const links = document.querySelector('.nav-links');
    if (menuBtn && links) {
      menuBtn.addEventListener('click', () => {
        const open = links.style.display === 'flex';
        links.style.display = open ? '' : 'flex';
        links.style.position = 'absolute';
        links.style.top = '64px';
        links.style.right = '24px';
        links.style.flexDirection = 'column';
        links.style.background = 'var(--surface)';
        links.style.border = '1px solid var(--border)';
        links.style.borderRadius = '14px';
        links.style.padding = '8px';
        links.style.minWidth = '220px';
        if (open) links.style.display = 'none';
      });
    }

    // Animated counters — count up on scroll into view
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0');
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const dur = parseInt(el.dataset.duration || '1400');
      const start = performance.now();
      const frame = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const v = target * easeOutQuart(t);
        el.textContent = prefix + v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    const counters = document.querySelectorAll('.counter');
    if (counters.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !e.target.dataset.animated) {
            e.target.dataset.animated = '1';
            animateCounter(e.target);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.35 });
      counters.forEach(c => io.observe(c));
    }

    // Live-tick numbers (small periodic jitter for "live" feel)
    document.querySelectorAll('[data-live-tick]').forEach(el => {
      const base = parseFloat(el.dataset.liveTick);
      const range = parseFloat(el.dataset.liveRange || '4');
      const decimals = parseInt(el.dataset.decimals || '0');
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      setInterval(() => {
        const jitter = (Math.random() - 0.5) * range;
        const v = base + jitter;
        el.textContent = prefix + v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
        el.classList.add('tick-flash');
        setTimeout(() => el.classList.remove('tick-flash'), 300);
      }, 3200 + Math.random() * 1500);
    });

    // Audit log streamer — reveal each line staggered, then loop
    document.querySelectorAll('[data-audit-stream]').forEach(container => {
      const lines = Array.from(container.querySelectorAll('.audit-line'));
      const cycle = () => {
        lines.forEach((line, i) => {
          line.style.animation = 'none';
          void line.offsetWidth; // reflow
          line.style.animation = `audit-in 0.4s var(--ease) ${i * 0.35}s both`;
        });
      };
      cycle();
      const totalDur = lines.length * 350 + 500;
      setInterval(cycle, totalDur + 4000);
    });

    // Chat animator — reveal each .chat-bubble in sequence with typing indicator
    document.querySelectorAll('[data-chat-anim]').forEach(container => {
      const bubbles = Array.from(container.querySelectorAll('.chat-bubble'));
      const typingSel = container.querySelector('.chat-typing');
      bubbles.forEach(b => { b.style.opacity = '0'; b.style.transform = 'translateY(8px)'; });
      if (typingSel) typingSel.style.display = 'none';

      const runOnce = () => {
        bubbles.forEach(b => { b.style.opacity = '0'; b.style.transform = 'translateY(8px)'; });
        let delay = 400;
        bubbles.forEach((b, i) => {
          const isBot = b.dataset.chatSide === 'bot';
          // Show typing indicator before bot messages
          if (isBot && typingSel) {
            setTimeout(() => { typingSel.style.display = 'flex'; typingSel.scrollIntoView({behavior:'smooth', block:'nearest'}); }, delay);
            delay += 900;
            setTimeout(() => { typingSel.style.display = 'none'; }, delay);
          }
          setTimeout(() => {
            b.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            b.style.opacity = '1';
            b.style.transform = 'translateY(0)';
            b.scrollIntoView({behavior:'smooth', block:'nearest'});
          }, delay);
          delay += (isBot ? 1400 : 700);
        });
      };

      // Start when visible
      if ('IntersectionObserver' in window) {
        const io2 = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting && !container.dataset.played) {
              container.dataset.played = '1';
              runOnce();
              // Loop
              const cycle = bubbles.length * 1400 + 3500;
              setInterval(runOnce, cycle);
              io2.unobserve(container);
            }
          });
        }, { threshold: 0.3 });
        io2.observe(container);
      } else {
        runOnce();
      }
    });
    // Tail-stream — terminal-style sequential line reveal, loops like tail -f
    document.querySelectorAll('[data-tail-stream]').forEach(container => {
      const lines = Array.from(container.querySelectorAll('.tail-line'));
      if (!lines.length) return;

      const runStream = () => {
        lines.forEach(l => { l.style.opacity = '0'; l.style.transform = 'translateY(6px)'; });
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.style.transition = 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
          }, 200 + i * 320);
        });
      };

      if ('IntersectionObserver' in window) {
        const io3 = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting && !container.dataset.tailPlayed) {
              container.dataset.tailPlayed = '1';
              runStream();
              const cycleMs = 200 + lines.length * 320 + 3500;
              setInterval(runStream, cycleMs);
              io3.unobserve(container);
            }
          });
        }, { threshold: 0.3 });
        io3.observe(container);
      } else {
        runStream();
      }
    });
    // Contact form — AJAX submit to Formspree, keeps user on the page
    document.querySelectorAll('[data-contact-form]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type=submit]');
        const okMsg = form.querySelector('.submit-msg');
        const errMsg = form.querySelector('.submit-err');
        const originalLabel = btn.textContent;

        okMsg.style.display = 'none';
        errMsg.style.display = 'none';
        btn.disabled = true;
        btn.textContent = 'Sending…';

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            okMsg.style.display = 'block';
            btn.textContent = 'Sent ✓';
            form.reset();
            // Re-enable after 4s
            setTimeout(() => {
              btn.disabled = false;
              btn.textContent = originalLabel;
              okMsg.style.display = 'none';
            }, 4000);
          } else {
            throw new Error('Form endpoint returned ' + response.status);
          }
        } catch (err) {
          console.error('Contact form error:', err);
          errMsg.style.display = 'block';
          btn.disabled = false;
          btn.textContent = originalLabel;
        }
      });
    });

    // Scroll-reveal — auto-tag common elements + fade them in as they enter viewport.
    // Skips elements inside hero (those already animate on load via CSS keyframes).
    // Respects prefers-reduced-motion via the CSS media query above.
    const revealSelectors = [
      '.section-header',
      '.grid-3 > *',
      '.grid-2 > *',
      '.feat-grid > *',
      '.tier',
      '.split',
      '.cta-block',
      '.term',
      '.check-list > li',
    ];
    const revealTargets = document.querySelectorAll(revealSelectors.join(', '));

    revealTargets.forEach(el => {
      if (el.closest('.hero-inner')) return; // hero handled separately
      el.classList.add('js-reveal');
    });

    // Stagger children inside grids
    document.querySelectorAll('.grid-3, .grid-2, .feat-grid').forEach(grid => {
      Array.from(grid.children).forEach((child, i) => {
        if (child.classList.contains('js-reveal')) {
          child.style.transitionDelay = `${Math.min(i * 0.08, 0.48)}s`;
        }
      });
    });

    // Stagger check-list items
    document.querySelectorAll('.check-list').forEach(list => {
      Array.from(list.children).forEach((li, i) => {
        if (li.classList.contains('js-reveal')) {
          li.style.transitionDelay = `${Math.min(i * 0.09, 0.5)}s`;
        }
      });
    });

    // Observer
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            revealObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      document.querySelectorAll('.js-reveal').forEach(el => revealObserver.observe(el));
    } else {
      // Fallback — reveal everything immediately
      document.querySelectorAll('.js-reveal').forEach(el => el.classList.add('revealed'));
    }

    // Price book toggle animator — cycles through ON toggles, flips one off then back on ~9-10s later,
    // and updates the "hidden plan" note to match whichever plan is currently hidden.
    const pbToggles = document.querySelectorAll('[data-anim-toggle]');
    const pbNoteName = document.querySelector('[data-hidden-plan-name]');
    const pbNote = document.querySelector('[data-hidden-plan-note]');
    const defaultHidden = 'Business 500'; // permanent off row

    if (pbToggles.length && pbNoteName) {
      let idx = 0;
      const setNoteName = (name) => {
        // Brief fade to make the swap noticeable
        if (pbNote) pbNote.style.opacity = '0.4';
        setTimeout(() => {
          pbNoteName.textContent = name;
          if (pbNote) pbNote.style.opacity = '1';
        }, 200);
      };
      const runCycle = () => {
        const t = pbToggles[idx % pbToggles.length];
        idx++;
        if (!t.classList.contains('pb-on')) return;
        const planName = t.dataset.plan || 'this plan';

        // Flip off — note updates to reflect the newly hidden plan
        t.classList.remove('pb-on');
        setNoteName(planName);

        // Flip back on after 2.2s — note reverts to permanent hidden plan
        setTimeout(() => {
          t.classList.add('pb-on');
          setNoteName(defaultHidden);
        }, 2200);
      };
      setTimeout(() => { runCycle(); setInterval(runCycle, 9000); }, 5000);
    }
  });
})();
