"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAnimationFrame } from "framer-motion";
import {
  products,
  JOURNEY,
  MOBILE_LEG,
  PROGRESS_REF,
  MOBILE_PROGRESS_REF,
  DESKTOP_MIN,
  type JourneyLeg,
} from "@/config/drums";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

type Cur = { x: number; y: number; s: number; rz: number; ry: number; inited: boolean };

/**
 * ScrollDrum — the live journey overlay. Each product lives on a fixed overlay
 * and is positioned every frame by interpolating between two live DOM anchors:
 * its rest slot in the hero composition and its landing slot in the lineup.
 * Because it reads the anchors' live rects, it sits exactly on the static render
 * at rest and exactly in the lineup slot once landed — one persistent object,
 * no duplicate fade, no layout jump.
 *
 * All legs share ONE scroll progress (so they detach and land together) but each
 * interpolates between its own anchors with its own twirl/tilt, so the group
 * fans out into place. Desktop runs all three products; mobile keeps the
 * original single-product (sunflower) behaviour. Pure CSS 3D transforms only.
 */
export function ScrollDrum() {
  const [mode, setMode] = useState<"desktop" | "mobile" | null>(null);
  const nodes = useRef<Record<string, HTMLDivElement | null>>({});
  const cur = useRef<Record<string, Cur>>({});

  useEffect(() => {
    const update = () => setMode(window.innerWidth >= DESKTOP_MIN ? "desktop" : "mobile");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Re-seat smoothing when the active set changes (breakpoint flip).
  useEffect(() => {
    cur.current = {};
  }, [mode]);

  const legs: JourneyLeg[] = mode === "mobile" ? [MOBILE_LEG] : JOURNEY;
  const ref = mode === "mobile" ? MOBILE_PROGRESS_REF : PROGRESS_REF;

  useAnimationFrame((t) => {
    if (!mode) return;

    // Shared scroll progress from the reference anchor pair.
    const heroRef = document.getElementById(ref.heroAnchorId);
    const slotRef = document.getElementById(ref.slotAnchorId);
    if (!heroRef || !slotRef) return;
    const rr = heroRef.getBoundingClientRect();
    const sref = slotRef.getBoundingClientRect();
    if (!rr.width) return; // reference hidden at this breakpoint — wait a frame
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const start = rr.top + scrollY - vh * 0.05;
    const end = sref.top + sref.height / 2 + scrollY - vh * 0.52;
    const p = clamp((scrollY - start) / Math.max(1, end - start), 0, 1);
    const e = easeInOut(p);
    const wave = Math.sin(e * Math.PI); // 0 → 1 → 0 across the fall

    for (const leg of legs) {
      const el = nodes.current[leg.id];
      if (!el) continue;
      const heroEl = document.getElementById(leg.heroAnchorId);
      const slotEl = document.getElementById(leg.slotAnchorId);
      if (!heroEl || !slotEl) continue;
      const hr = heroEl.getBoundingClientRect();
      const sr = slotEl.getBoundingClientRect();
      if (!hr.width || !sr.width) continue;

      const heroW = hr.width;
      const heroH = hr.height;

      const cx = lerp(hr.left + hr.width / 2, sr.left + sr.width / 2, e);
      let cy = lerp(hr.top + hr.height / 2, sr.top + sr.height / 2, e);
      const bump = 1 + wave * 0.05; // subtle weight mid-fall
      const s = lerp(1, sr.width / heroW, e) * bump;
      let rz = leg.spin * wave; // twirl out and back → lands upright (0)
      const ry = leg.tilt * wave; // gentle 3D on the way down

      // Idle float + breath when at rest in the hero (staggered per product).
      if (p < 0.03) {
        const f = 1 - p / 0.03;
        cy += Math.sin(t / 900 + leg.floatPhase) * 5 * f;
        rz += Math.sin(t / 1500 + leg.floatPhase) * 1.1 * f;
      }

      const prev = cur.current[leg.id];
      let c: Cur;
      if (!prev || !prev.inited) {
        c = { x: cx, y: cy, s, rz, ry, inited: true };
      } else {
        const k = 0.16; // trailing ease → "expensive" motion
        c = {
          x: lerp(prev.x, cx, k),
          y: lerp(prev.y, cy, k),
          s: lerp(prev.s, s, k),
          rz: lerp(prev.rz, rz, k),
          ry: lerp(prev.ry, ry, k),
          inited: true,
        };
      }
      cur.current[leg.id] = c;

      el.style.width = `${heroW}px`;
      el.style.transform = `perspective(1300px) translate3d(${c.x - heroW / 2}px, ${c.y - heroH / 2}px, 0) rotateY(${c.ry}deg) rotateZ(${c.rz}deg) scale(${c.s})`;
      el.style.opacity = "1";
    }
  });

  if (!mode) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-visible" aria-hidden>
      {legs.map((leg) => {
        const d = products[leg.id];
        return (
          <div
            key={leg.id}
            ref={(el) => {
              nodes.current[leg.id] = el;
            }}
            className="absolute left-0 top-0 opacity-0 will-change-transform"
            style={{ transformOrigin: "center center", zIndex: leg.z }}
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
      })}
    </div>
  );
}
