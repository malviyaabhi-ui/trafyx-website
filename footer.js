// Injects the shared big footer. holder needs data-footer="." (root), ".." (features), "../.." (mira sub-pages)
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const holder = document.querySelector('[data-footer]');
    if (!holder) return;
    const base = holder.dataset.footer || '.';
    holder.outerHTML = `
<footer class="footer-big">
  <div class="wrap">
    <div class="footer-cols">
      <div class="footer-brand">
        <a href="${base}/index.html" class="nav-logo" style="text-decoration:none;">
          <div class="nav-logo-mark">Tx</div><span>Trafyx</span>
        </a>
        <p class="footer-brand-desc">The multi-tenant ISP B/OSS platform. Real RADIUS. Real billing. Real AI ops. Built for UAE, MENA, and beyond.</p>
        <div style="margin-top: 10px; display: flex; gap: 6px;">
          <a href="#" aria-label="X" style="width:26px;height:26px;border-radius:6px;background:var(--surface);display:grid;place-items:center;color:var(--text-dim);border:1px solid var(--border);"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" aria-label="LinkedIn" style="width:26px;height:26px;border-radius:6px;background:var(--surface);display:grid;place-items:center;color:var(--text-dim);border:1px solid var(--border);"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg></a>
          <a href="#" aria-label="GitHub" style="width:26px;height:26px;border-radius:6px;background:var(--surface);display:grid;place-items:center;color:var(--text-dim);border:1px solid var(--border);"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Product</h5>
        <ul>
          <li><a href="${base}/features/mira.html">Mira AI</a></li>
          <li><a href="${base}/features/waas.html">WaaS</a></li>
          <li><a href="${base}/features/subscribers.html">Subscribers</a></li>
          <li><a href="${base}/features/billing.html">Billing</a></li>
          <li><a href="${base}/features/radius.html">RADIUS</a></li>
          <li><a href="${base}/features/portal.html">Portal</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>More features</h5>
        <ul>
          <li><a href="${base}/features/vouchers.html">Vouchers</a></li>
          <li><a href="${base}/features/prepaid.html">Prepaid &amp; Wallet</a></li>
          <li><a href="${base}/features/helpdesk.html">Helpdesk</a></li>
          <li><a href="${base}/features/pricebooks.html">Price Books</a></li>
          <li><a href="${base}/features/noc.html">NOC</a></li>
          <li><a href="${base}/features/resellers.html">Resellers</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="${base}/about.html">About</a></li>
          <!-- Pricing link hidden — restore when public pricing is ready
          <li><a href="${base}/pricing.html">Pricing</a></li> -->
          <li><a href="${base}/integrations.html">Integrations</a></li>
          <li><a href="${base}/security.html">Security</a></li>
          <li><a href="${base}/contact.html">Contact us</a></li>
          <li><a href="${base}/changelog.html">Changelog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Resources</h5>
        <ul>
          <li><a href="${base}/docs.html">Documentation</a></li>
          <li><a href="${base}/docs.html#api">API reference</a></li>
          <li><a href="${base}/status.html">System status</a></li>
          <li><a href="${base}/index.html#cta">Book a demo</a></li>
          <li><a href="${base}/contact.html">Support</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-legal">
      <div>© 2026 Riser Technologies. All rights reserved.</div>
      <div class="footer-status"><span class="live-dot"></span><a href="${base}/status.html" style="color: inherit; text-decoration: none;">All systems operational</a></div>
      <div class="footer-legal-links">
        <a href="${base}/privacy.html">Privacy</a>
        <a href="${base}/terms.html">Terms</a>
        <a href="${base}/dpa.html">DPA</a>
      </div>
    </div>
  </div>
</footer>`;
  });
})();
