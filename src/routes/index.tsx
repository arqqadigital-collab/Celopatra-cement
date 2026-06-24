import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
const logo = { url: "/assets/cleopatra-logo-blue.png" };
const heroVideo = { url: "/assets/hero-factory.mp4" };
const whoWeAreImage = { url: "/assets/who-we-are.png" };
const counterFactory = { url: "/assets/counter-factory-white.png" };
const mvvBg = { url: "/assets/mission-vision-bg.png" };
const manufacturingBg = { url: "/assets/pattern-bg.png" };
const productsBackgroundSection = { url: "/assets/products-background-section.png" };
import plantImg from "@/assets/plant.jpg";

import architectureImg from "@/assets/architecture.jpg";
const plantExteriorAsset = { url: "/assets/plant-exterior.png" };
const patternAsset = { url: "/assets/pattern.png" };
const logisticsImg = { url: "/assets/logistics-ship.png" };
const logisticsVideo = { url: "/assets/logistics.mp4" };
const cem1n = { url: "/assets/products/CEM_I_52.5_N.png" };
const cem1r = { url: "/assets/products/CEM_I_52.5_R.png" };
const cem2a = { url: "/assets/products/CEM_II_A-L_52.5_N.png" };
const cem2b42 = { url: "/assets/products/CEM_II_B-L_42.5_N.png" };
const cem2b32 = { url: "/assets/products/CEM_II_B-L_32.5_R.png" };
const masonry = { url: "/assets/products/Masonry_C-91.png" };
import appConstruction from "@/assets/apps/construction.jpg";
import appFlooring from "@/assets/apps/flooring.jpg";
import appDecorative from "@/assets/apps/decorative.jpg";
import appSpecialty from "@/assets/apps/specialty.jpg";
const cert01 = { url: "/assets/certs/c01.png" };
const cert02 = { url: "/assets/certs/c02.png" };
const cert03 = { url: "/assets/certs/c03.png" };
const cert04 = { url: "/assets/certs/c04.png" };
const cert05 = { url: "/assets/certs/c05.png" };
const sustainabilityImg = { url: "/assets/sustainability.jpg" };
const ctaBg = { url: "/assets/pattern-bg-2.png" };
import {
  ArrowRight,
  Globe,
  Factory,
  Award,
  Leaf,
  Ship,
  CheckCircle2,
  Package,
  Building2,
  Sparkles,
  ShieldCheck,
  Target,
  Eye,
  Mail,
  Rocket,
  MapPin,
  Cpu,
  Zap,
  Recycle,
  Sprout,
  Wind,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Home,
});

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { value, ref };
}

function useInView<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Stat({
  value,
  suffix = "",
  label,
  icon: Icon,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const { value: v, ref } = useCountUp(value);
  return (
    <div ref={ref} className="glass-card rounded-2xl p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-3xl md:text-4xl font-semibold brand-gradient-text">
        {v.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function AboutSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const img = imgRef.current;
      if (!section || !img) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // Parallax: shift image based on section position
      const progress = (vh - rect.top) / (vh + rect.height);
      const translate = (progress - 0.5) * 280; // stronger parallax
      img.style.transform = `translate3d(0, ${translate}px, 0) scale(1.35)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative h-screen w-full overflow-hidden">
      <img
        ref={imgRef}
        src={whoWeAreImage.url}
        alt="Cleopatra Cement plant exterior"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "scale(1.2)" }}
      />
      <div
        ref={ref}
        className={`relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 ${inView ? "is-visible" : ""}`}
      >
        <div className="max-w-xl text-white">
          <div className={`reveal ${inView ? "is-visible" : ""}`} style={{ animationDelay: "0ms" }}>
            <SectionTag>Who We Are</SectionTag>
          </div>
          <h2
            className={`reveal mt-4 text-4xl md:text-5xl font-semibold ${inView ? "is-visible" : ""}`}
            style={{ animationDelay: "120ms", color: "#0b131b" }}
          >
            A legacy of white cement excellence.
          </h2>
          <div className="mt-6 space-y-4">
            {[
              "Cleopatra Cement is a premier producer of white cement in Egypt, recognized for delivering high-performance solutions to customers across international markets.",
              "Established in 2018 following the demerger from Helwan Cement Company, we inherited the El-Minya white cement plant — bringing forward more than three decades of manufacturing expertise and operational excellence.",
              "In 2019, Cleopatra Cement became part of Emar Industries — a diversified industrial group strengthening our production capability and global distribution reach.",
            ].map((t, i) => (
              <p
                key={i}
                className={`reveal ${inView ? "is-visible" : ""}`}
                style={{ animationDelay: `${260 + i * 140}ms`, color: "#0b131b" }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      const img = imgRef.current;
      if (!section || !img) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (vh - rect.top) / (vh + rect.height);
      const translate = (progress - 0.5) * 160;
      img.style.transform = `translate3d(0, ${translate}px, 0) scale(1.25)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section ref={sectionRef} className="relative h-[55vh] w-full overflow-hidden">
      <img
        ref={imgRef}
        src={plantExteriorAsset.url}
        alt="Cleopatra Cement plant"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "scale(1.25)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(14,76,135,0.35) 0%, rgba(14,76,135,0.15) 100%)" }}
        aria-hidden
      />
    </section>
  );
}

function CounterStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: v, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
      >
        {v.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
        {label}
      </div>
    </div>
  );
}

function CounterSection() {
  const stats = [
    { value: 20, suffix: "+", label: "Countries served" },
    { value: 6, suffix: "", label: "Continents reached" },
    { value: 420, suffix: "K", label: "Tons cement / year" },
    { value: 300, suffix: "K", label: "Tons clinker / year" },
  ];
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const sec = sectionRef.current;
      const bg = bgRef.current;
      if (!sec || !bg) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (vh - rect.top) / (vh + rect.height);
      const translate = (progress - 0.5) * 160;
      bg.style.transform = `translate3d(0, ${translate}px, 0) scale(1.2)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between"
    >
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${counterFactory.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 md:pt-16 text-center">
        <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
          A global force in <span className="brand-gradient-text">white cement</span>
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
          Trusted by partners across continents — delivering scale, consistency and precision.
        </p>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {stats.map((s) => (
            <CounterStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MvvSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const cards = [
    {
      icon: Target,
      title: "Mission",
      text: "To be the world's most reliable and preferred Egyptian supplier of white cement — combining deep expertise, innovation, and rigorous quality control.",
    },
    {
      icon: Eye,
      title: "Vision",
      text: "Lead the global white cement industry, inspired by the precision and artistry of ancient Egyptian craftsmanship — defined by superior quality and enduring trust.",
    },
    {
      icon: Sparkles,
      title: "Core Values",
      text: "Excellence, Innovation, Integrity, Sustainability, and Customer Focus — the foundation of every decision we make.",
    },
  ];
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{ backgroundImage: `url(${mvvBg.url})` }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight" style={{ color: "#0b131b" }}>
            Our Purpose &amp; Principles
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            The mission, vision and values that shape every decision at Cleopatra Cement.
          </p>
        </div>
        <div ref={ref} className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`reveal-card glass-card group rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 ${
                inView ? "is-visible" : ""
              }`}
              style={{ animationDelay: `${i * 180}ms` }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurPlantSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const stages = [
    {
      icon: Rocket,
      stage: "01",
      title: "Established Heritage",
      text: "Cleopatra Cement operates one of the most established white cement plants in the region. Originally founded in 1989, the facility boasts an annual production capacity of 300,000 tons of clinker and 420,000 tons of white cement, enabling us to meet large-scale demand across domestic and international markets.",
      tags: ["Since 1989", "420,000 t White Cement", "300,000 t Clinker"],
    },
    {
      icon: MapPin,
      stage: "02",
      title: "Strategic Location",
      text: "Our plant is strategically located in Samalout, El-Minya governorate — an area known for its high-quality raw materials, which play a key role in our product's superior whiteness. This central location also allows seamless distribution across all construction sectors, including residential, commercial, industrial, and infrastructure projects.",
      tags: ["Samalout, El-Minya", "Premium Raw Materials", "Nationwide Reach"],
    },
    {
      icon: Cpu,
      stage: "03",
      title: "Advanced Technology",
      text: "Equipped with cutting-edge machinery and automated systems, our plant ensures high-efficiency production with consistent quality. From raw material processing to final packaging, every step is meticulously monitored to deliver white cement with outstanding brightness, strength, and durability. Continuous investment in modern technologies and process innovation ensures our products meet and exceed international standards.",
      tags: ["Automated Systems", "Precision QC", "International Standards"],
    },
  ];
  return (
    <section id="our-plant" className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div ref={ref} className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        {/* LEFT COLUMN — sticky title + subtitle */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionTag>Our Plant</SectionTag>
          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl lg:text-6xl">
            Where <span className="brand-gradient-text">heritage</span> meets innovation
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            A landmark white cement facility built on three decades of expertise, strategic location, and continuous technological advancement.
          </p>
          <a
            href="#manufacturing"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(217_91%_60%)] px-7 py-3.5 text-base font-medium text-white shadow-lg shadow-[hsl(217_91%_60%/0.35)] transition-all hover:bg-[hsl(217_91%_55%)] hover:-translate-y-0.5"
          >
            Explore Our Plant <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* RIGHT COLUMN — scrolling cards */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {stages.map((s, i) => (
            <div
              key={s.title}
              className={`reveal-card glass-card group relative overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1 ${
                inView ? "is-visible" : ""
              }`}
              style={{ animationDelay: `${i * 220}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-border bg-card/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
                  Stage {s.stage}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold md:text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{s.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function ManufacturingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tagRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: -1 (below) -> 0 (centered) -> 1 (above)
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / ((vh + rect.height) / 2);
      const p = Math.max(-1, Math.min(1, progress));
      const apply = (el: HTMLElement | null, speed: number) => {
        if (el) el.style.transform = `translate3d(0, ${(-p * speed).toFixed(2)}px, 0)`;
      };
      apply(tagRef.current, 100);
      apply(headRef.current, 100);
      apply(pRef.current, 100);
      apply(ctaRef.current, 100);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manufacturing"
      className="relative overflow-hidden py-32 md:py-40"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${manufacturingBg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      <div
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <div ref={tagRef} className="will-change-transform">
          <SectionTag>Manufacturing Excellence</SectionTag>
        </div>
        <h2
          ref={headRef}
          className="mt-8 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white will-change-transform md:text-4xl lg:text-5xl"
        >
          Built on experience.{" "}
          <span className="brand-gradient-text opacity-70">Powered by technology.</span>
        </h2>
        <p
          ref={pRef}
          className="mt-8 max-w-2xl text-base leading-relaxed text-white will-change-transform md:text-lg"
        >
          Founded in 1989, our Samalout plant combines premium local raw materials, advanced
          automation, precision quality control, and continuous process optimization — producing
          white cement distinguished by superior brightness, strength, and durability.
        </p>
        <a
          ref={ctaRef}
          href="#contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0b131b] shadow-[0_10px_40px_-10px] shadow-white/30 transition hover:opacity-90 will-change-transform"
        >
          Discover Our Plant <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function ApplicationsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const apps = [
    { title: "Construction", img: appConstruction, num: "01" },
    { title: "Flooring", img: appFlooring, num: "02" },
    { title: "Decorative", img: appDecorative, num: "03" },
    { title: "Specialty", img: appSpecialty, num: "04" },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const hoveredApp = apps.find((a) => a.title === hovered);

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background overflow-hidden py-20 md:py-32"
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Label */}
        <div className="mb-8 md:mb-12">
          <SectionTag>Applications</SectionTag>
        </div>

        {/* Title & subtitle */}
        <div className="mb-12 md:mb-20 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight" style={{ color: "#0b131b" }}>
            Engineered for every surface that matters.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            From iconic structures to fine decorative finishes — Cleopatra white cement performs
            across the full spectrum of modern construction.
          </p>
        </div>

        {/* Titles with hover images */}
        <div className="relative">
          {/* Hover image that follows cursor */}
          {hoveredApp && (
            <div
              className="fixed z-50 pointer-events-none transition-opacity duration-300"
              style={{
                left: mousePos.x + 20,
                top: mousePos.y - 100,
                opacity: hovered ? 1 : 0,
              }}
            >
              <div className="w-64 h-44 sm:w-80 sm:h-52 md:w-96 md:h-60 rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img
                  src={hoveredApp.img}
                  alt={hoveredApp.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Text rows */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 md:gap-x-5 md:gap-y-4">
            {apps.map((app, i) => (
              <div key={app.title} className="flex items-baseline gap-x-3 md:gap-x-5">
                <button
                  className="group relative inline-flex items-baseline gap-2 text-left"
                  onMouseEnter={() => setHovered(app.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight transition-colors duration-300"
                    style={{ color: "#0b131b" }}
                  >
                    {app.title}
                  </span>
                  <sup
                    className="text-xs md:text-sm font-medium text-muted-foreground translate-y-2"
                  >
                    {app.num}
                  </sup>
                </button>
                {i < apps.length - 1 && (
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground/40">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px] shadow-primary" />
      {children}
    </span>
  );
}

function Home() {
  return (
    <div className="min-h-screen text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <img src={logo.url} alt="Cleopatra Cement" className="h-24 w-auto md:h-28" />
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            {[
              { label: "About Us", href: "#about" },
              { label: "Our Plant", href: "#our-plant" },
              { label: "Products", href: "#products" },
              { label: "Solutions", href: "#applications" },
              { label: "Sustainability", href: "#sustainability" },
              { label: "Certificates", href: "#certificates" },
              { label: "Careers", href: "#careers" },
              { label: "Contact Us", href: "#contact" },
            ].map((i) => (
              <a key={i.label} href={i.href} className="hover:text-foreground transition">
                {i.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_30px_-10px] shadow-primary hover:opacity-90 transition"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        {/* Background video */}
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(14, 76, 135, 0.7)" }}
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pt-28 pb-28 md:pt-40 md:pb-40 md:px-[120px]">

          {/* Headline */}
          <h1
            className="mt-8 max-w-5xl text-center text-[36px] font-bold leading-[1.05] tracking-[-1.4px] text-white opacity-0 [animation:fade-up_1s_cubic-bezier(0.2,0.8,0.2,1)_0.1s_both] md:text-[60px] md:tracking-[-2.4px] lg:text-[72px] lg:leading-[1.02] lg:tracking-[-3px]"
          >
            Pure White,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #cfe1ff 0%, #6aa6ff 60%, var(--brand-glow) 100%)",
              }}
            >
              Sustainable Might.
            </span>
          </h1>

          {/* Body */}
          <p className="mt-8 max-w-2xl text-center text-base leading-[26px] tracking-[-0.2px] text-white opacity-0 [animation:fade-up_1s_cubic-bezier(0.2,0.8,0.2,1)_0.35s_both] md:text-lg">
            Premium Egyptian White Cement trusted across more than 20 countries and six
            continents, delivering superior whiteness, strength, precision, and sustainable
            performance.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 opacity-0 [animation:fade-up_1s_cubic-bezier(0.2,0.8,0.2,1)_0.6s_both]">
            <a
              href="#products"
              className="inline-flex cursor-pointer items-center justify-center rounded-[10px] px-5 py-2.5 text-base font-medium leading-[26px] tracking-[-0.5px] text-[#131313] no-underline transition hover:opacity-95"
              style={{ background: "#efeeec" }}
            >
              Explore Products
            </a>
            <a
              href="#about"
              className="inline-flex cursor-pointer items-center justify-center rounded-[10px] bg-white/15 px-5 py-2.5 text-base font-medium leading-[26px] tracking-[-0.5px] text-white no-underline backdrop-blur-[2.5px] transition hover:bg-white/20"
            >
              Global Presence
            </a>
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <AboutSection />

      {/* COUNTER */}
      <CounterSection />

      {/* MISSION VISION VALUES */}
      <MvvSection />

      {/* OUR PLANT */}
      <OurPlantSection />

      {/* MANUFACTURING */}
      <ManufacturingSection />


      {/* PRODUCTS */}
      <section id="products" className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-10 text-center">
          <SectionTag>Product Portfolio</SectionTag>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold">
            Premium <span className="brand-gradient-text">white cement</span> solutions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A diversified portfolio engineered for architectural, industrial, decorative, and
            infrastructure applications.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {(() => {
            const products = [
              {
                code: "CEM I 52.5 N",
                name: "White Portland Cement",
                desc: "High-strength white Portland cement for structural, precast, ready-mix, and industrial construction.",
                img: cem1n.url,
                accent: "#162a6e",
              },
              {
                code: "CEM I 52.5 R",
                name: "White Portland Cement",
                desc: "Rapid-strength premium white cement with exceptional workability, durability, and design flexibility.",
                img: cem1r.url,
                accent: "#162a6e",
              },
              {
                code: "CEM II A-L 52.5 N",
                name: "White Portland Cement",
                desc: "White Portland limestone cement combining performance, durability, and operational efficiency.",
                img: cem2a.url,
                accent: "#1c2c8f",
              },
              {
                code: "CEM II B-L 42.5 N",
                name: "White Portland Limestone Cement",
                desc: "Ideal for tile fixation, decorative solutions, architectural concrete, and chemical building products.",
                img: cem2b42.url,
                accent: "#2f5233",
              },
              {
                code: "CEM II B-L 32.5 R",
                name: "White Portland Limestone Cement",
                desc: "Cost-efficient sustainable white cement for masonry, plastering, precast, and non-structural use.",
                img: cem2b32.url,
                accent: "#c45617",
              },
              {
                code: "Masonry C-91",
                name: "White Masonry Cement",
                desc: "Dedicated masonry cement for superior workability, water retention, plastering, and block applications.",
                img: masonry.url,
                accent: "#c45617",
              },
            ];
            return products.map((p, i) => (
              <div
                key={p.code}
                className="sticky"
                style={{ top: `${80 + i * 24}px` }}
              >
                <div
                  className="relative overflow-hidden rounded-3xl shadow-2xl mb-8"
                  style={{ backgroundColor: p.accent, height: "min(620px, 80vh)" }}
                >
                  <img
                    src={p.img}
                    alt={p.code}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-6 md:px-12 lg:px-16 w-full md:w-1/2 pointer-events-none">
                    <div className="text-white max-w-md pointer-events-auto">
                      <div className="text-xs uppercase tracking-[0.3em] opacity-80">
                        {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                      </div>
                      <div className="mt-3 text-xs md:text-sm uppercase tracking-widest opacity-90">
                        {p.name}
                      </div>
                      <h3 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
                        {p.code}
                      </h3>
                      <p className="mt-4 text-sm md:text-base opacity-90 leading-relaxed">
                        {p.desc}
                      </p>
                      <a
                        href="#contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium shadow-lg hover:-translate-y-0.5 transition"
                      >
                        Request Datasheet <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>


        {/* Packaging */}
        <div
          className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat mt-28 md:mt-36 lg:mt-44 overflow-hidden"
          style={{ backgroundImage: `url(${productsBackgroundSection.url})` }}
        >
          {/* Top-centered title */}
          <div className="relative z-10 mx-auto max-w-4xl px-6 pt-20 md:pt-28 lg:pt-32 text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground whitespace-nowrap">
              Packaging & Delivery Options
            </h2>
            <p className="mt-5 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible formats engineered for every project scale — from retail bags to bulk transport.
            </p>
          </div>

          {/* Hover hotspots */}
          {[
            {
              top: "62%",
              left: "25%",
              title: "Sling Bags & Pallets",
              desc: "Easy to transport and handle — ideal for job sites and retail distribution.",
              cardPos: "top",
            },
            {
              top: "80%",
              left: "42%",
              title: "Bagged Cement",
              desc: "25kg, 40kg & 50kg in polypropylene, polyethylene or kraft paper bags.",
              cardPos: "top",
            },
            {
              top: "60%",
              left: "78%",
              title: "Bulk Cement",
              desc: "High-volume delivery to project locations for large-scale construction.",
              cardPos: "top",
            },
          ].map((spot, i) => (
            <div
              key={i}
              className="absolute z-20 group cursor-pointer -translate-x-1/2 -translate-y-1/2"
              style={{ top: spot.top, left: spot.left }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-primary/30 animate-ping" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-primary border-2 border-white shadow-lg" />
              </div>
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-64 md:w-72 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none ${
                  spot.cardPos === "top" ? "bottom-full mb-4" : "top-full mt-4"
                }`}
              >
                <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-md p-5 shadow-2xl text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Package className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{spot.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{spot.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* APPLICATIONS */}
      <ApplicationsSection />


      {/* LOGISTICS */}
      <section id="logistics" className="relative h-screen w-full overflow-hidden mt-12 md:mt-16">
        <video
          src={logisticsVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Blue dim overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.13 0.05 255 / 0.7) 0%, oklch(0.18 0.08 257 / 0.65) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, oklch(0.42 0.12 257 / 0.35), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <div className="mx-auto max-w-3xl text-center text-white">
            <SectionTag>Logistics Excellence</SectionTag>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Global delivery. <br />
              <span className="brand-gradient-text">Operational reliability.</span>
            </h2>
            <p className="mt-6 text-white/75 text-base md:text-lg max-w-2xl mx-auto">
              Six dedicated port silos, an extensive transportation fleet, and advanced material
              handling — enabling efficient high-volume delivery while preserving product quality
              across the supply chain.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
              {[
                { k: "EXW", v: "Ex-Works" },
                { k: "FOB", v: "Free on Board" },
                { k: "CFR", v: "Cost & Freight" },
                { k: "DAP", v: "Delivered at Place" },
              ].map((x) => (
                <div key={x.k} className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3">
                  <Ship className="h-4 w-4 text-primary" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{x.k}</div>
                    <div className="text-xs text-white/70">{x.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <SectionTag>Certifications</SectionTag>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold">
            Quality, safety & <span className="brand-gradient-text">sustainability</span>, certified.
          </h2>
        </div>
        <div
          className="group/marquee relative mt-14 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="flex w-max items-center gap-8 animate-[marquee_28s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
            {(() => {
              const certs = [
                { src: cert01.url, k: "ISO 9001:2015", v: "Quality management" },
                { src: cert02.url, k: "ISO 14001:2015", v: "Environmental management" },
                { src: cert03.url, k: "ISO 45001:2018", v: "Occupational health & safety" },
                { src: cert04.url, k: "CE Marking", v: "EU compliance" },
                { src: cert05.url, k: "Egyptian Quality Mark", v: "EOS standards" },
              ];
              return [...certs, ...certs].map((c, idx) => (
                <div
                  key={`${c.k}-${idx}`}
                  className="group/card flex w-[240px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-border p-6 transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="flex h-28 w-full items-center justify-center rounded-xl p-4">
                    <img
                      src={c.src}
                      alt={c.k}
                      width={500}
                      height={500}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold">{c.k}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{c.v}</div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section id="sustainability" className="relative h-screen w-full overflow-hidden">
        <img
          src={sustainabilityImg.url}
          alt="Wind turbines over a green landscape"
          width={1920}
          height={1280}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background/20" />
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <SectionTag>Sustainability</SectionTag>
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold" style={{ color: "#0b131b" }}>
              Building responsibly. <span style={{ color: "#0b131b" }}>For generations.</span>
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-foreground/85">
              Sustainability is foundational at Cleopatra Cement. We invest in green technologies
              and eco-friendly processes — minimizing carbon emissions, conserving energy, and
              ensuring our production meets international environmental standards.
            </p>
            <SustainabilityCards />
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <img
            src={ctaBg.url}
            alt="Background pattern"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
          <div className="relative flex flex-col items-center text-center gap-6 p-10 md:p-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-white max-w-3xl">
              Ready to build with the world's purest white cement?
            </h2>
            <p className="max-w-xl text-white/80">
              Talk to our export team for technical datasheets, pricing, and tailored delivery
              across more than 20 countries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:export@cleopatracement.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[color:var(--brand)] hover:opacity-95 transition"
              >
                <Mail className="h-4 w-4" /><span>export@cleopatracement.com</span>
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="Cleopatra Cement" className="h-12 w-auto" />
            <div className="text-xs text-muted-foreground">Pure White, Sustainable Might.</div>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
            <a href="#about" className="hover:text-foreground">About Us</a>
            <a href="#plant" className="hover:text-foreground">Our Plant</a>
            <a href="#products" className="hover:text-foreground">Products</a>
            <a href="#applications" className="hover:text-foreground">Solutions</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-primary" />
            © {new Date().getFullYear()} Cleopatra Cement. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function SustainabilityCards() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const items = [
    { icon: Zap, title: "Energy-efficient operations" },
    { icon: Recycle, title: "Waste minimization" },
    { icon: Sprout, title: "Responsible sourcing" },
    { icon: Wind, title: "Low-emission manufacturing" },
  ];
  return (
    <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, title }, i) => (
        <div
          key={title}
          className={`group glass-card rounded-2xl p-6 text-center transition-all duration-700 ease-out hover:-translate-y-2 hover:glow-ring ${
            visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: visible ? `${i * 140}ms` : "0ms" }}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="mt-4 text-sm font-medium" style={{ color: "#0b131b" }}>{title}</div>
        </div>
      ))}
    </div>
  );
}

