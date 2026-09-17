/* site.js — the clone's own behaviour layer.
   The platform's 771 script references were removed, which also removed the
   behaviours they carried. This reimplements the ones the markup actually needs,
   using only the classes and elements the theme already ships. No dependencies. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* --- <details> based menus and modals ---------------------------------
     The theme wires header menus, the search modal and disclosures as <details>
     elements. Native <details> already toggles; what the platform added was
     click-outside and Escape to close. */
  function bindDetails() {
    $$('details').forEach(function (d) {
      var summary = $('summary', d);
      if (!summary) return;
      summary.setAttribute('role', summary.getAttribute('role') || 'button');
      summary.setAttribute('aria-expanded', d.hasAttribute('open') ? 'true' : 'false');
      d.addEventListener('toggle', function () {
        summary.setAttribute('aria-expanded', d.hasAttribute('open') ? 'true' : 'false');
      });
    });
    document.addEventListener('click', function (e) {
      $$('details[open]').forEach(function (d) {
        if (!d.contains(e.target)) d.removeAttribute('open');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      $$('details[open]').forEach(function (d) { d.removeAttribute('open'); });
    });
  }

  /* --- announcement bar ---------------------------------------------------
     The theme rotates the slides on a timer. Its own rotator threw
     "Cannot read properties of undefined (reading 'classList')" on the live site
     every cycle; this one reads the slide list before touching it. */
  function bindAnnouncement() {
    var bars = $$('.announcement-bar-slider, slideshow-component.announcement-bar-slider');
    bars.forEach(function (bar) {
      var slides = $$('.slideshow__slide, .announcement-bar__link, [id^="Slide-"]', bar);
      if (slides.length < 2) return;
      var i = slides.findIndex(function (s) { return s.getAttribute('aria-hidden') !== 'true'; });
      if (i < 0) i = 0;
      /* The source keeps every slide display:flex, visibility:visible, opacity:1 and
         hides the inactive ones by the slider track's scroll position — only
         aria-hidden differs. Toggling display:none instead removed two client
         sentences ("Now Shipping Internationally", "Free Shipping on Orders $75+")
         from innerText and from assistive tech, which the source does not do
         (measured against the live page, 2026-09-04). Move the track, not the box. */
      var track = slides[0] && slides[0].parentElement;
      var show = function (n) {
        slides.forEach(function (s, k) {
          if (!s || !s.setAttribute) return;
          s.setAttribute('aria-hidden', k === n ? 'false' : 'true');
        });
        var target = slides[n];
        if (track && target && track.scrollWidth > track.clientWidth) track.scrollLeft = target.offsetLeft;
      };
      show(i);
      setInterval(function () { i = (i + 1) % slides.length; show(i); }, 5000);
    });
  }

  /* --- localization selector ---------------------------------------------
     490 country/currency options that the platform posted to /localization.
     A static clone has no such endpoint, so the choice is remembered locally and
     reflected in the button label. Every option and label is left in place. */
  function bindLocalization() {
    $$('form[action*="localization"], .localization-form').forEach(function (form) {
      var button = $('button, summary', form);
      var options = $$('a[href="#top"], .disclosure__link', form);
      /* One reader for an option's label. textContent carries the source's newlines and
         indentation — "Afghanistan\n      \n        AFN\n        ؋" went into
         localStorage verbatim and into the button label, and the equality test on reload
         then compared raw whitespace. Collapse once, here, so the stored value, the
         rendered label and the comparison are all the same string. */
      var labelOf = function (o) { return o.textContent.replace(/\s+/g, ' ').trim(); };
      var key = 'clone:localization:' + (form.getAttribute('data-scope') || form.className || 'default');
      var saved = null;
      try { saved = localStorage.getItem(key); } catch (e) { saved = null; }
      if (saved && button) {
        var match = options.find(function (o) { return labelOf(o) === saved; });
        if (match) {
          var label = $('.localization-form__currency, span', button) || button;
          label.textContent = saved;
        }
      }
      options.forEach(function (o) {
        o.addEventListener('click', function (e) {
          e.preventDefault();
          var value = labelOf(o);
          try { localStorage.setItem(key, value); } catch (err) { /* private mode */ }
          if (button) {
            var lbl = $('.localization-form__currency, span', button) || button;
            lbl.textContent = value;
          }
          var open = o.closest('details');
          if (open) open.removeAttribute('open');
        });
      });
    });
  }

  /* --- cart notification --------------------------------------------------
     Present in the markup, hidden until the platform's cart JS revealed it.
     With no cart backend it stays hidden; the close control is still wired so the
     element behaves rather than sitting inert. */
  function bindCartNotification() {
    $$('#cart-notification, .cart-notification').forEach(function (n) {
      $$('.cart-notification__close, [aria-label*="Close" i]', n).forEach(function (btn) {
        btn.addEventListener('click', function () { n.classList.remove('active'); n.setAttribute('aria-hidden', 'true'); });
      });
    });
  }

  /* --- in-page anchors ----------------------------------------------------
     REMOVED. bindTopLinks() listened for a[href="#top"] and skipped any inside a
     localization form. Counted across the built site: 29,151 such anchors on 41 pages,
     and ZERO outside a localization form — every one is a country/currency option, which
     bindLocalization already preventDefaults. So the guard made the body of its own
     handler unreachable, and it cost a document-level click listener on every page for
     a link pattern this theme does not use. If a real back-to-top link ever appears,
     the native anchor jump is the correct behaviour anyway. */

  /* --- forms with no backend ----------------------------------------------
     The platform served /search, /cart, /cart/add, /localization and /contact. This
     build serves none of them — measured: all four return 404 — so submitting the footer
     newsletter, which sits on all 41 pages, navigated the visitor to a 404. The BUILDER
     marks these (it is the only thing that knows what the build contains); this only has
     to honour the mark. The form is left exactly as the source rendered it: no invented
     message, no disabled control, just no navigation to a page that is not there. */
  function bindUnwiredForms() {
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (!form || !form.hasAttribute || !form.hasAttribute('data-clone-unwired')) return;
      e.preventDefault();
      form.setAttribute('data-clone-submitted', form.getAttribute('data-clone-unwired'));
    }, true);
    /* Same stamp, same rule, for anchors: the theme's account links point at the platform's
       customer_authentication endpoint on the ORIGINAL store. Following one would take a
       visitor of the clone to the old shop's login. */
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('a[data-clone-unwired]');
      if (!a) return;
      e.preventDefault();
    }, true);
  }

  function init() {
    bindUnwiredForms();
    bindDetails();
    bindAnnouncement();
    bindLocalization();
    bindCartNotification();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
