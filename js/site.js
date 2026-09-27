/* Aurum Frux — private exclusive Sicily selection */
(function () {
  'use strict';

  const CEILING = 380000;
  const MEDIA_SET = (function () {
    var meta = document.querySelector('meta[name="aurum-media-set"]');
    return (meta && meta.getAttribute('content')) || 'premium-enhanced';
  })();
  const IMG = MEDIA_SET === 'legacy' ? 'img' : MEDIA_SET === 'fomo' ? 'img_fomo' : 'img_enhanced';

  function specLine(prop) {
    if (!prop || !prop.specs) return '';
    var s = prop.specs;
    var parts = [];
    if (s.built_sqm) parts.push(s.built_sqm + ' m²');
    if (s.bedrooms) parts.push(s.bedrooms + ' bed');
    if (s.bathrooms) parts.push(s.bathrooms + ' bath');
    if (s.energy_class) parts.push('Class ' + s.energy_class);
    return parts.join(' · ');
  }

  function renderDriveHtml(dt) {
    if (!dt) return '';
    var rows = Object.keys(dt).map(function (k) {
      var label = k.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
      return '<div><dt>' + label + '</dt><dd>' + dt[k] + '</dd></div>';
    }).join('');
    return (
      '<div class="location-strip glass">' +
        '<p class="eyebrow">Drive times (guide)</p>' +
        '<dl class="spec-grid">' + rows + '</dl>' +
      '</div>'
    );
  }

  function renderCostsHtml(costs) {
    if (!costs) return '';
    var rows = [
      ['IMI (property tax)', costs.imi_annual],
      ['Utilities in use', costs.utilities],
      ['Pool maintenance', costs.pool_maintenance]
    ].filter(function (r) { return r[1]; }).map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>';
    }).join('');
    return (
      '<div class="costs-strip glass">' +
        '<p class="eyebrow">Holding costs (guide)</p>' +
        '<p class="spec-note">Estimates only — not tax advice. Confirmed in the private pack.</p>' +
        '<dl class="spec-grid">' + rows + '</dl>' +
      '</div>'
    );
  }

  function renderSpecHtml(specs) {
    if (!specs) return '';
    var rows = [
      ['Area', specs.area_label],
      ['Built size', specs.built_sqm ? specs.built_sqm + ' m²' : '—'],
      ['Plot / garden', specs.plot_sqm ? ('~' + specs.plot_sqm + ' m² garden') : specs.garden],
      ['Layout', specs.rooms ? (specs.rooms + (typeof specs.rooms === 'number' ? ' rooms' : '')) : null],
      ['Bedrooms', specs.bedrooms],
      ['Bathrooms', specs.bathrooms],
      ['Floors', specs.floors],
      ['Condition', specs.condition],
      ['Furnished', specs.furnished],
      ['Pool', specs.pool],
      ['Parking', specs.parking],
      ['Heating', specs.heating],
      ['Cooling', specs.cooling],
      ['Condo / fees', specs.condo_fees],
      ['Energy class', specs.energy_class ? ('Class ' + specs.energy_class) : null]
    ].filter(function (r) { return r[1]; });

    var grid = rows.map(function (r) {
      return '<div><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>';
    }).join('');

    var highlights = (specs.highlights || []).map(function (h) {
      return '<li>' + h + '</li>';
    }).join('');

    return (
      '<div class="spec-panel glass">' +
        '<p class="eyebrow">Property facts</p>' +
        '<p class="spec-note">Per agency listing — guide figures only. Exact cadastral / floor plans in the private pack after you hold a viewing.</p>' +
        '<dl class="spec-grid">' + grid + '</dl>' +
        (highlights ? '<ul class="spec-highlights">' + highlights + '</ul>' : '') +
      '</div>' +
      renderDriveHtml(specs.drive_times) +
      renderCostsHtml(specs.holding_costs_guide)
    );
  }

  const PROPS = {
    se01: {
      code: 'SE-01',
      name: 'Focallo belt',
      ask: 330000,
      askLabel: '€330,000',
      headroomLabel: '€50,000',
      pctLabel: '87%',
      score: 92,
      blurb: 'Modern holiday courtyard and private pool. Clearest holiday match under your preferred band.',
      why: 'Turnkey courtyard + pool under preferred band — holiday readiness without stretching the number.',
      bargain: 'A ready holiday house with its own pool for €50,000 less than your top cash ceiling.',
      best: 'Holiday fit under preferred band',
      specs: {
        area_label: "Santa Maria del Focallo · Ispica (RG)",
        built_sqm: 120,
        rooms: 4,
        bedrooms: 3,
        bathrooms: 2,
        floors: "Single level (ground floor)",
        condition: "Partially renovated · holiday-ready",
        furnished: "Fully furnished",
        parking: "3 outdoor spaces (no enclosed garage)",
        pool: "Private in-ground pool",
        garden: "Private courtyard garden",
        heating: "Autonomous air system · electric",
        cooling: "Air conditioning",
        energy_class: "C",
        condo_fees: "None (detached villa)",
        drive_times: {"focallo_beach": "~5 min", "noto": "~25 min", "modica": "~35 min", "scicli": "~45 min", "catania_airport": "~75 min"},
        holding_costs_guide: {"imi_annual": "€1,000–€1,300 / yr (estimate)", "utilities": "€150–€250 / mo in use (pool + A/C season)", "pool_maintenance": "€800–€1,200 / yr (estimate)"},
        highlights: [
          "Open-plan kitchen–living",
          "Three double bedrooms",
          "Video intercom",
          "Turnkey furnished — arrive and use"
        ],
      },
      images: [
        IMG + '/se01/01.jpg',
        IMG + '/se01/02.jpg',
        IMG + '/se01/03.jpg',
        IMG + '/se01/04.jpg',
        IMG + '/se01/05.jpg',
        IMG + '/se01/06.jpg',
        IMG + '/se01/07.jpg',
        IMG + '/se01/08.jpg'
      ]
    },
    se02: {
      code: 'SE-02',
      name: 'Scicli coast',
      ask: 380000,
      askLabel: '€380,000',
      headroomLabel: '€0',
      pctLabel: '100%',
      score: 88,
      blurb: 'Newer coastal house, lawn, shade, private pool. Ceiling of the shortlist — still inside cash range.',
      why: 'Coastal lawn + pool finished to a high standard — prestige without leaving the cash band.',
      bargain: 'Coastal prestige usually sits above this band — here it still fits inside your cash ceiling.',
      best: 'Coastal prestige at the top of the shortlist',
      specs: {
        area_label: "Playa Grande · Scicli coast (RG)",
        built_sqm: 124,
        plot_sqm: 1000,
        bedrooms: 3,
        bathrooms: 2,
        floors: "Villa / villino",
        condition: "Newer build · Class B energy",
        furnished: "Confirm on viewing",
        parking: "On-site parking (per agency listing)",
        pool: "Private pool with solarium (recent build)",
        garden: "Private garden ~1,000 m² · Mediterranean planting",
        heating: "Autonomous heating & cooling",
        cooling: "Air conditioning",
        energy_class: "B",
        condo_fees: "None (detached villa)",
        drive_times: {"playa_grande_beach": "~3 min", "scicli": "~15 min", "modica": "~25 min", "noto": "~40 min", "catania_airport": "~70 min"},
        holding_costs_guide: {"imi_annual": "€1,200–€1,600 / yr (estimate)", "utilities": "€180–€280 / mo in use", "pool_maintenance": "€900–€1,400 / yr (estimate)"},
        highlights: [
          "Coastal lawn + shade",
          "Largest garden plot on the shortlist",
          "Marina village setting (Playa Grande)",
          "Best energy class (B) on the list"
        ],
      },
      images: [
        IMG + '/se02/01.jpg',
        IMG + '/se02/02.jpg',
        IMG + '/se02/03.jpg',
        IMG + '/se02/04.jpg',
        IMG + '/se02/05.jpg',
        IMG + '/se02/06.jpg'
      ]
    },
    se03: {
      code: 'SE-03',
      name: 'Noto countryside',
      ask: 245000,
      askLabel: '€245,000',
      headroomLabel: '€135,000',
      pctLabel: '64%',
      score: 90,
      blurb: 'Independent house, private pool, open land. Most room left under your number.',
      why: 'Independent house + pool + land at roughly two-thirds of your cash ceiling — maximum flexibility in this brief.',
      bargain: 'Guide €245,000 for a pool house with open land — about €135,000 still free under your €380,000 cash ceiling.',
      best: 'Maximum room left under your cash ceiling & land',
      specs: {
        area_label: "Contrada Burgio Fontanelle · Pachino / Noto (SR)",
        built_sqm: 120,
        rooms: "5+ (3 bedrooms + living zones)",
        bedrooms: 3,
        bathrooms: 3,
        floors: "Two levels",
        condition: "Excellent (agency: ottimo)",
        furnished: "Unfurnished",
        parking: "Driveway / external — confirm on viewing",
        pool: "Private pool",
        garden: "Private garden · large surrounding land",
        heating: "Stove / electric",
        cooling: "Per agency — confirm on viewing",
        energy_class: "C",
        condo_fees: "None (detached villa)",
        drive_times: {"noto": "~15 min", "pachino": "~10 min", "modica": "~45 min", "scicli": "~50 min", "catania_airport": "~60 min"},
        holding_costs_guide: {"imi_annual": "€800–€1,100 / yr (estimate)", "utilities": "€120–€200 / mo in use", "pool_maintenance": "€700–€1,000 / yr (estimate)"},
        highlights: [
          "Panoramic terrace (second floor)",
          "Pantani Longarini nature reserve setting",
          "€135k headroom under your cash ceiling",
          "Three bathrooms — best for guests"
        ],
      },
      images: [
        IMG + '/se03/01.jpg',
        IMG + '/se03/02.jpg',
        IMG + '/se03/03.jpg',
        IMG + '/se03/04.jpg',
        IMG + '/se03/05.jpg',
        IMG + '/se03/06.jpg'
      ]
    }
  };
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.hidden = false;
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove('is-show');
      setTimeout(function () { el.hidden = true; }, 280);
    }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () {
        toast('Copied ' + text + ' — reply with this code to hold a viewing');
      }).catch(function () {
        fallbackCopy(text);
      });
    }
    fallbackCopy(text);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      toast('Copied ' + text + ' — reply with this code to hold a viewing');
    } catch (e) {
      toast('Code: ' + text + ' — reply with this to hold a viewing');
    }
    document.body.removeChild(ta);
  }

  /* ---------- hero cinema reel or ken-burns fallback ---------- */
  function initHero() {
    const media = $('.hero-media');
    const video = $('#heroVideo');
    if (!media) return;
    if (video && !reduceMotion) {
      media.classList.add('has-video');
      media.classList.remove('is-fallback');
      video.play().catch(function () {
        media.classList.add('is-fallback');
        media.classList.remove('has-video');
      });
      return;
    }
    media.classList.add('is-fallback');
  }

  /* ---------- sticky nav + mobile ---------- */
  function initNav() {
    const nav = $('#nav');
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
      // active section highlight
      const sections = ['selection', 'se-01', 'se-02', 'se-03', 'compare', 'private-pack', 'faq', 'next-steps', 'secure'];
      let current = '';
      sections.forEach(function (id) {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= 120) current = id;
      });
      $$('.nav-links a').forEach(function (a) {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('is-active', href === '#' + current);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        const open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $$('a', links).forEach(function (a) {
        a.addEventListener('click', function (e) {
          const href = a.getAttribute('href') || '';
          if (href.charAt(0) === '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            }
          }
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* ---------- 3D tilt ---------- */
  function initTilt() {
    if (reduceMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    $$('.tilt, .tilt-soft').forEach(function (card) {
      const soft = card.classList.contains('tilt-soft');
      const max = soft ? 4 : 8;

      card.addEventListener('pointermove', function (e) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (0.5 - y) * max;
        const ry = (x - 0.5) * max;
        card.style.transform =
          'perspective(1000px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateZ(0)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  /* ---------- galleries ---------- */
  function initGalleries() {
    $$('[data-gallery]').forEach(function (root) {
      const main = $('[data-main]', root);
      const thumbs = $$('.thumb', root);
      const prev = $('[data-prev]', root);
      const next = $('[data-next]', root);
      const expand = $('[data-expand]', root);
      if (!main || !thumbs.length) return;

      let index = 0;
      const sources = thumbs.map(function (t) { return t.getAttribute('data-src'); });
      const key = root.getAttribute('data-gallery');

      function show(i) {
        index = (i + sources.length) % sources.length;
        main.src = sources[index];
        thumbs.forEach(function (t, n) {
          t.classList.toggle('is-active', n === index);
        });
      }

      thumbs.forEach(function (t, n) {
        t.addEventListener('click', function (e) {
          e.stopPropagation();
          show(n);
        });
      });
      if (prev) prev.addEventListener('click', function () { show(index - 1); });
      if (next) next.addEventListener('click', function () { show(index + 1); });

      // swipe
      let startX = 0;
      main.addEventListener('touchstart', function (e) {
        startX = e.changedTouches[0].clientX;
      }, { passive: true });
      main.addEventListener('touchend', function (e) {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      }, { passive: true });

      function openLb() {
        openLightbox(sources, index, (PROPS[key] && PROPS[key].code) || '');
      }
      if (expand) expand.addEventListener('click', openLb);
      main.addEventListener('click', openLb);
    });
  }

  /* ---------- lightbox ---------- */
  let lbSources = [];
  let lbIndex = 0;
  let lbLabel = '';

  function openLightbox(sources, index, label) {
    const lb = $('#lightbox');
    const img = $('#lightboxImg');
    const cap = $('#lightboxCap');
    if (!lb || !img) return;
    lbSources = sources.slice();
    lbIndex = index;
    lbLabel = label || '';
    renderLightbox();
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderLightbox() {
    const img = $('#lightboxImg');
    const cap = $('#lightboxCap');
    if (!img) return;
    img.src = lbSources[lbIndex];
    if (cap) {
      cap.textContent = (lbLabel ? lbLabel + ' · ' : '') + (lbIndex + 1) + ' / ' + lbSources.length;
    }
  }

  function closeLightbox() {
    const lb = $('#lightbox');
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initLightbox() {
    const lb = $('#lightbox');
    if (!lb) return;
    $$('[data-close-lightbox]', lb).forEach(function (b) {
      b.addEventListener('click', closeLightbox);
    });
    const prev = $('[data-lb-prev]', lb);
    const next = $('[data-lb-next]', lb);
    if (prev) prev.addEventListener('click', function () {
      lbIndex = (lbIndex - 1 + lbSources.length) % lbSources.length;
      renderLightbox();
    });
    if (next) next.addEventListener('click', function () {
      lbIndex = (lbIndex + 1) % lbSources.length;
      renderLightbox();
    });

    // swipe in lightbox
    let sx = 0;
    lb.addEventListener('touchstart', function (e) {
      sx = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (!lb.classList.contains('is-open')) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) {
        lbIndex = (lbIndex + (dx < 0 ? 1 : -1) + lbSources.length) % lbSources.length;
        renderLightbox();
      }
    }, { passive: true });

    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        lbIndex = (lbIndex - 1 + lbSources.length) % lbSources.length;
        renderLightbox();
      }
      if (e.key === 'ArrowRight') {
        lbIndex = (lbIndex + 1) % lbSources.length;
        renderLightbox();
      }
    });
  }

  /* ---------- drawer (card click) ---------- */
  function openDrawer(key) {
    const prop = PROPS[key];
    const drawer = $('#drawer');
    const body = $('#drawerBody');
    if (!prop || !drawer || !body) return;

    let thumbs = prop.images.map(function (src, i) {
      return '<button type="button" class="' + (i === 0 ? 'is-active' : '') + '" data-i="' + i + '"><img src="' + src + '" alt=""></button>';
    }).join('');

    body.innerHTML =
      '<p class="code" id="drawerTitle">' + prop.code + ' · ' + prop.name + '</p>' +
      '<img src="' + prop.images[0] + '" alt="' + prop.name + '" data-drawer-main>' +
      '<div class="drawer-thumbs">' + thumbs + '</div>' +
      '<p class="ask">Guide ' + prop.askLabel + '</p>' +
      (specLine(prop) ? '<p class="prop-spec-line">' + specLine(prop) + '</p>' : '') +
      '<p class="blurb">' + prop.blurb + '</p>' +
      renderSpecHtml(prop.specs) +
      '<div class="finance-strip glass" style="margin:16px 0">' +
        '<div><span class="fs-label">Asking guide</span><span class="fs-value">' + prop.askLabel + '</span></div>' +
        '<div><span class="fs-label">Room left under your €380,000 cash ceiling</span><span class="fs-value' + (prop.ask < CEILING ? ' positive' : '') + '">' + prop.headroomLabel + '</span></div>' +
        '<div><span class="fs-label">How much of your cash ceiling this uses</span><span class="fs-value">' + prop.pctLabel + '</span></div>' +
        '<div class="fs-why"><span class="fs-label">Why rare now</span><span class="fs-value-sm">' + prop.why + '</span></div>' +
        '<div class="fs-why"><span class="fs-label">Why this is a bargain</span><span class="fs-value-sm">' + (prop.bargain || '') + '</span></div>' +
      '</div>' +
      '<p class="nugget-note" style="margin-bottom:12px">Desk fit score (private brief) <strong style="font-family:var(--font-serif);font-size:28px;color:var(--gold-deep)">' + prop.score + '</strong> — how the desk scored fit to your brief — not a formal appraisal.</p>' +
      '<button type="button" class="btn btn-primary hold-btn" data-hold="' + prop.code + '">Hold viewing for ' + prop.code + ' — reply with this code</button>' +
      '<div class="hold-reveal" id="drawer-hold" hidden>' +
        '<p class="fomo-copy">Hold viewing for <strong>' + prop.code + '</strong> — reply with this code. We will send the private pack and arrange the viewing (step 3–4 of your path). One buyer. One conversation.</p>' +
        '<div class="hold-actions">' +
          '<button type="button" class="btn btn-ghost copy-code" data-code="' + prop.code + '">Copy code ' + prop.code + '</button>' +
          '<a class="btn btn-primary" href="mailto:jessicamilengo@groundnovagroup.com?subject=Hold%20' + encodeURIComponent(prop.code) + '%20viewing%20%E2%80%94%20Sicily%20exclusive%20shortlist&body=Please%20hold%20a%20viewing%20for%20' + encodeURIComponent(prop.code) + '%20and%20send%20the%20private%20pack.">Send reply</a>' +
        '</div>' +
      '</div>' +
      '<p style="margin-top:18px"><a href="#se-' + key.replace('se0', '0').replace('se', '') + '">Jump to full ' + prop.code + ' section</a> · <a href="#next-steps">See next steps</a></p>';

    // fix jump link
    var jumpMap = { se01: '#se-01', se02: '#se-02', se03: '#se-03' };
    var jump = body.querySelector('a[href^="#se-"]');
    if (jump && jumpMap[key]) jump.setAttribute('href', jumpMap[key]);

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var mainImg = $('[data-drawer-main]', body);
    $$('.drawer-thumbs button', body).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-i'), 10);
        mainImg.src = prop.images[i];
        $$('.drawer-thumbs button', body).forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
      });
    });
    if (mainImg) {
      mainImg.addEventListener('click', function () {
        var i = prop.images.indexOf(mainImg.getAttribute('src'));
        if (i < 0) i = 0;
        openLightbox(prop.images, i, prop.code);
      });
    }

    bindHoldButtons(body);
    bindCopyButtons(body);
  }

  function closeDrawer() {
    const drawer = $('#drawer');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (!$('#lightbox') || !$('#lightbox').classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
  }

  function initDrawer() {
    $$('.prop-card[data-prop]').forEach(function (card) {
      function open(e) {
        if (e && e.target.closest('a, button')) return;
        openDrawer(card.getAttribute('data-prop'));
      }
      card.addEventListener('click', open);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
    $$('[data-close-drawer]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const lb = $('#lightbox');
        if (lb && lb.classList.contains('is-open')) return; // lightbox handles Escape
        closeDrawer();
      }
    });
  }

  /* ---------- hold CTAs + copy codes ---------- */
  function bindHoldButtons(root) {
    $$('.hold-btn', root || document).forEach(function (btn) {
      if (btn._bound) return;
      btn._bound = true;
      btn.addEventListener('click', function () {
        var code = btn.getAttribute('data-hold');
        var id = 'hold-' + String(code || '').toLowerCase().replace(/-/g, '');
        var panel = document.getElementById(id);
        // drawer variant
        if (!panel && root) panel = $('#drawer-hold', root);
        if (panel) {
          panel.hidden = false;
          panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
        }
        toast('Reply with ' + code + ' to hold the viewing');
      });
    });
  }

  function bindCopyButtons(root) {
    $$('.copy-code', root || document).forEach(function (btn) {
      if (btn._bound) return;
      btn._bound = true;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var code = btn.getAttribute('data-code');
        if (code) copyText(code);
      });
    });
  }

  /* ---------- compare mobile labels ---------- */
  function initCompareLabels() {
    var rows = $$('.compare-row:not(.compare-head):not(.compare-cta)');
    var heads = $$('.compare-head .c-col');
    if (!heads.length) return;
    rows.forEach(function (row) {
      $$('.c-col', row).forEach(function (col, i) {
        if (heads[i]) {
          var label = heads[i].querySelector('.code');
          col.setAttribute('data-label', label ? label.textContent : '');
        }
      });
    });
  }

  /* ---------- soft parallax on scroll for section heads ---------- */
  function initParallax() {
    if (reduceMotion) return;
    var nodes = $$('.section-head, .secure-panel');
    if (!nodes.length) return;
    function tick() {
      var vh = window.innerHeight;
      nodes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top / vh) * 12;
        el.style.transform = 'translate3d(0,' + p.toFixed(2) + 'px,0)';
      });
    }
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ---------- boot ---------- */
  function boot() {
    initHero();
    initNav();
    initTilt();
    initGalleries();
    initLightbox();
    initDrawer();
    bindHoldButtons(document);
    bindCopyButtons(document);
    initCompareLabels();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
