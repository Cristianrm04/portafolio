/* ==========================================================================
   main.js — entry point. IIFE, no dependencies (vanilla, no GSAP required).
   Every init is wrapped in safe() so one failure never breaks the rest.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------- Sticky nav ---------- */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    var toggle = $("[data-nav-toggle]");
    var mobile = $("[data-nav-mobile]");
    if (!toggle || !mobile) return;
    function close() {
      toggle.setAttribute("aria-expanded", "false");
      mobile.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      mobile.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) close(); else open();
    });
    $$("[data-nav-mobile-link]", mobile).forEach(function (a) {
      a.addEventListener("click", close);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Reveal on scroll (universal, low threshold + safety net) ---------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------- Mouse-reactive mesh gradient (hero + contact) ---------- */
  function initMeshGradient() {
    if (!fineHover) return; // static default gradient on touch, still looks good
    var root = document.documentElement;
    var tx = 50, ty = 40, mx = 50, my = 40;
    document.addEventListener("mousemove", function (e) {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    }, { passive: true });
    function frame() {
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      root.style.setProperty("--mx", mx + "%");
      root.style.setProperty("--my", my + "%");
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Subtle 3D tilt on case cards ---------- */
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (card) {
      var MAX = 5;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.classList.add("has-tilt");
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        card.style.setProperty("--rx", cx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cy.toFixed(2) + "deg");
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------- Magnetic buttons (not on form submits) ---------- */
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = 0.25;
      var inner = document.createElement("span");
      inner.className = "magnetic-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add("has-magnetic");
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) - r.width / 2) * strength;
        ty = ((e.clientY - r.top) - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener("mouseleave", function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
        inner.style.transform = "translate3d(" + cx + "px, " + cy + "px, 0)";
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------- Animated counters ---------- */
  function initCountUp() {
    $$("[data-count-to]").forEach(function (el) {
      var target = parseInt(el.dataset.countTo, 10);
      var duration = 1400;
      var trigger = function () {
        var start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { trigger(); io.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------- Infinite marquee (CSS-driven, JS just clones) ---------- */
  function initMarquee() {
    $$("[data-marquee]").forEach(function (track) {
      var clone = track.cloneNode(true);
      clone.removeAttribute("data-marquee");
      clone.setAttribute("aria-hidden", "true");
      track.parentNode.appendChild(clone);
      track.parentNode.classList.add("marquee-ready");
    });
  }

  /* ---------- Contact form (real submit via Web3Forms) ---------- */
  function initContactForm() {
    var form = $("[data-contact-form]");
    var success = $("[data-contact-success]");
    if (!form || !success) return;
    var msg = $("[data-contact-success-msg]");
    var note = $("[data-contact-note]");
    var noteDefault = note ? note.textContent : "";
    var ERROR_MSG = "No se pudo enviar el mensaje. Escríbeme directo por WhatsApp o a cri.stian123@hotmail.com.";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.classList.contains("is-sending") || form.classList.contains("is-sent")) return;
      if (!form.reportValidity()) return;

      form.classList.remove("is-error");
      form.classList.add("is-sending");
      if (note) {
        note.textContent = noteDefault;
        note.classList.remove("is-error");
      }

      var payload = Object.fromEntries(new FormData(form).entries());

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            return { ok: res.ok && data && data.success, data: data };
          });
        })
        .then(function (result) {
          form.classList.remove("is-sending");
          if (result.ok) {
            var firstName = (form.elements.name.value || "").trim().split(/\s+/)[0] || "";
            if (msg) msg.textContent = (firstName ? firstName + ", gracias" : "Gracias") + " por escribir. Te respondo en menos de 24 horas.";
            form.classList.add("is-sent");
            success.setAttribute("aria-hidden", "false");
            success.classList.add("is-visible");
          } else {
            form.classList.add("is-error");
            if (note) {
              note.textContent = ERROR_MSG;
              note.classList.add("is-error");
            }
          }
        })
        .catch(function () {
          form.classList.remove("is-sending");
          form.classList.add("is-error");
          if (note) {
            note.textContent = ERROR_MSG;
            note.classList.add("is-error");
          }
        });
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    var el = $("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function boot() {
    safe(initNav, "initNav");
    safe(initMobileNav, "initMobileNav");
    safe(initReveals, "initReveals");
    safe(initMeshGradient, "initMeshGradient");
    safe(initTilt, "initTilt");
    safe(initMagnetic, "initMagnetic");
    safe(initCountUp, "initCountUp");
    safe(initMarquee, "initMarquee");
    safe(initContactForm, "initContactForm");
    safe(initFooterYear, "initFooterYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
