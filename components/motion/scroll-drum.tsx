"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAnimationFrame } from "framer-motion";
import { drums, HERO_DRUM, HERO_ANCHOR_ID, SLOT_ANCHOR_ID } from "@/config/drums";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * ScrollDrum — ONE persistent sunflower drum that lives on a fixed overlay and
 * is positioned every frame by interpolating between two live DOM anchors:
 * the hero rest slot (#drum-hero-anchor) and the product lineup slot
 * (#drum-slot-anchor). Because it reads the anchors' live rects, it sits exactly
 * in the hero at rest and exactly in the lineup slot once landed — no duplicate
 * fade, no layout jump. Pure CSS 3D transforms (translate3d/rotate/scale), so
 * it stays on the GPU. Rendered only when motion is allowed (see ProductJourney).
 */
export function ScrollDrum() {
  const d = drums[HERO_DRUM];
  const elRef = useRef<HTMLDivElement>(null);
  const geo = useRef({ heroW: 340, aspect: d.height / d.width, mobile: false });
  const cur = useRef({ x: 0, y: 0, s: 1, rz: 0, ry: 0, inited: false });

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById(HERO_ANCHOR_ID);
      if (hero) geo.current.heroW = hero.getBoundingClientRect().width;
      geo.current.mobile = window.innerWidth < 768;
      cur.current.inited = false; // re-seat on resize to avoid a lerp jump
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((t) => {
    const el = elRef.current;
    if (!el) return;
    const hero = document.getElementById(HERO_ANCHOR_ID);
    const slot = document.getElementById(SLOT_ANCHOR_ID);
    if (!hero || !slot) return;

    const hr = hero.getBoundingClientRect();
    const sr = slot.getBoundingClientRect();
    const vh = window.innerHeight;
    const heroW = geo.current.heroW;
    const heroH = heroW * geo.current.aspect;

    // Scroll progress: 0 while the drum rests in the hero, 1 once the lineup
    // slot has risen to ~half the viewport (its landed resting point).
    const start = hr.top + window.scrollY - vh * 0.05;
    const end = sr.top + sr.height / 2 + window.scrollY - vh * 0.52;
    const p = clamp((window.scrollY - start) / Math.max(1, end - start), 0, 1);
    const e = easeInOut(p);

    // Live anchor centres → the drum is always pinned to a real target.
    const hcx = hr.left + hr.width / 2;
    const hcy = hr.top + hr.height / 2;
    const scx = sr.left + sr.width / 2;
    const scy = sr.top + sr.height / 2;

    let cx = lerp(hcx, scx, e);
    let cy = lerp(hcy, scy, e);
    const targetScale = lerp(1, sr.width / heroW, e);
    const bump = 1 + Math.sin(e * Math.PI) * 0.05; // subtle weight mid-travel
    let s = targetScale * bump;
    let rz = e * 360; // one smooth revolution — lands upright at 360 ≡ 0
    let ry = Math.sin(e * Math.PI) * (geo.current.mobile ? 8 : 16); // gentle 3D on the way

    // Idle float + breath when at rest in the hero.
    if (p < 0.03) {
      const f = 1 - p / 0.03;
      cy += Math.sin(t / 900) * 6 * f;
      rz += Math.sin(t / 1500) * 1.4 * f;
    }

    if (!cur.current.inited) {
      cur.current = { x: cx, y: cy, s, rz, ry, inited: true };
    } else {
      const k = 0.16; // trailing ease → "expensive" motion
      cur.current.x = lerp(cur.current.x, cx, k);
      cur.current.y = lerp(cur.current.y, cy, k);
      cur.current.s = lerp(cur.current.s, s, k);
      cur.current.rz = lerp(cur.current.rz, rz, k);
      cur.current.ry = lerp(cur.current.ry, ry, k);
    }

    const c = cur.current;
    el.style.width = `${heroW}px`;
    el.style.transform = `translate3d(${c.x - heroW / 2}px, ${c.y - heroH / 2}px, 0) rotateY(${c.ry}deg) rotateZ(${c.rz}deg) scale(${c.s})`;
    el.style.opacity = "1";
  });

  return (
    <div
      ref={elRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 opacity-0 will-change-transform"
      style={{ transformOrigin: "center center", perspective: 1200 }}
    >
      <Image
        src={d.src}
        alt=""
        width={d.width}
        height={d.height}
        priority
        draggable={false}
        className="h-auto w-full select-none [filter:drop-shadow(0_30px_34px_rgb(16_22_24/0.30))]"
      />
    </div>
  );
}
