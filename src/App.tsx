import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface BagelItem {
  name: string;
  description: string;
  price: string;
  image: string;
  color: string;
  tag: string;
}

const bagelMenu: BagelItem[] = [
  {
    name: "Turkey Bagel",
    description: "Sliced turkey, fresh greens, tomatoes & creamy spread on a perfectly toasted bagel",
    price: "from 300 MKD",
    image: "/images/turkey-bagel.jpg",
    color: "bg-amber-50 border-amber-300",
    tag: "Popular",
  },
  {
    name: "Chicken Bagel",
    description: "Grilled chicken, fresh lettuce, creamy sauce & crispy chips on the side",
    price: "from 300 MKD",
    image: "/images/chicken-bagel.jpg",
    color: "bg-orange-50 border-orange-300",
    tag: "Bestseller",
  },
  {
    name: "Classic Cream Cheese",
    description: "Generous cream cheese spread with fresh chives on a golden toasted bagel",
    price: "from 200 MKD",
    image: "/images/classic-cream-cheese.jpg",
    color: "bg-yellow-50 border-yellow-300",
    tag: "Classic",
  },
  {
    name: "Smoked Salmon",
    description: "Premium smoked salmon, cream cheese, capers, red onion & fresh dill",
    price: "from 350 MKD",
    image: "/images/salmon-bagel.jpg",
    color: "bg-rose-50 border-rose-300",
    tag: "Premium",
  },
  {
    name: "Avocado Smash",
    description: "Smashed avocado, cherry tomatoes, microgreens & sesame seeds",
    price: "from 280 MKD",
    image: "/images/avocado-bagel.jpg",
    color: "bg-green-50 border-green-300",
    tag: "Healthy",
  },
  {
    name: "Breakfast Club",
    description: "Fried egg, crispy bacon, melted cheese & fresh arugula — the ultimate morning fuel",
    price: "from 320 MKD",
    image: "/images/breakfast-bagel.jpg",
    color: "bg-red-50 border-red-300",
    tag: "Hearty",
  },
  {
    name: "Nutella & Strawberries",
    description: "Rich Nutella spread with fresh strawberries, banana & powdered sugar",
    price: "from 250 MKD",
    image: "/images/nutella-bagel.jpg",
    color: "bg-purple-50 border-purple-300",
    tag: "Sweet",
  },
  {
    name: "Garden Veggie",
    description: "Hummus, roasted peppers, cucumber, shredded carrots & fresh spinach on whole grain",
    price: "from 260 MKD",
    image: "/images/veggie-bagel.jpg",
    color: "bg-lime-50 border-lime-300",
    tag: "Vegan-Friendly",
  },
];

interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
  highlight?: string;
}

const reviews: Review[] = [
  {
    name: "Стефанија Трпковска",
    text: "Absolutely loved my brunch experience at Hoop! We tried the Turkey bagel and the Chicken bagel and they were honestly some of the best bagels we've had. Both were perfectly toasted, golden and crispy on the outside, soft on the inside, loaded with fresh greens, generous fillings, and a delicious creamy spread.",
    rating: 5,
    date: "a month ago",
    highlight: "Perfectly toasted, golden & crispy",
  },
  {
    name: "Zoran Spirkovski",
    text: "Absolutely fantastic place. The bagels were amazing. The coffee was great. The service was impeccable; the owner was very very very nice. I highly recommend this place to everybody.",
    rating: 5,
    date: "a month ago",
    highlight: "Amazing bagels & impeccable service",
  },
  {
    name: "NewFox08",
    text: "Amazing bagel with a lot of options for everyone's tastes!",
    rating: 5,
    date: "2 months ago",
    highlight: "Lots of options for everyone",
  },
  {
    name: "Dacko Kostadinovski",
    text: "👌☕🥯",
    rating: 5,
    date: "2 months ago",
  },
  {
    name: "Noki Avramovski",
    text: "Excellent, delicious food, nice ambiance, a real place for brunch. Great atmosphere and friendly service.",
    rating: 5,
    date: "2 months ago",
    highlight: "A real place for brunch",
  },
  {
    name: "Nina Stojanovic",
    text: "Excellent bagels! Will definitely come back for more.",
    rating: 5,
    date: "2 months ago",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-bagel-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:animate-float">🥯</span>
          <span
            className={`font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-bagel-800" : "text-white"
            }`}
          >
            HOOP
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Menu", "About", "Reviews", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-[family-name:var(--font-heading)] text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-bagel-400 ${
                scrolled ? "text-bagel-700" : "text-white/90"
              }`}
            >
              {item}
            </a>
          ))}
          <a
            href="https://www.instagram.com/hoop_brunch/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 ${
              scrolled
                ? "border-bagel-400 text-bagel-700 hover:bg-bagel-400 hover:text-white"
                : "border-white/40 text-white hover:bg-white/10"
            }`}
          >
            <InstagramIcon />
            <span className="text-sm font-medium">Follow Us</span>
          </a>
        </div>
        {/* Mobile menu */}
        <a
          href="https://www.instagram.com/hoop_brunch/"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden flex items-center gap-2"
        >
          <InstagramIcon className={scrolled ? "text-bagel-700" : "text-white"} />
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      style={{ paddingBottom: "120px" }}
    >
      {/* Background image with overlay — extends below content into wave zone */}
      <div className="absolute inset-0" style={{ bottom: "-80px" }}>
        <img
          src="/images/hero-bg.jpg"
          alt="Fresh bagels"
          className="w-full h-full object-cover"
        />
        {/* Gradient fades to semi-transparent at the bottom so the image shows through the wave */}
        <div className="absolute inset-0 bg-gradient-to-b from-bagel-900/80 via-bagel-900/50 to-bagel-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-white/20">
            <span className="text-bagel-200 text-sm font-[family-name:var(--font-heading)] font-medium tracking-widest uppercase">
              📍 Skopje, North Macedonia
            </span>
          </div>
        </div>

        <h1
          className="font-[family-name:var(--font-display)] text-7xl md:text-9xl font-bold text-white mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          HOOP
        </h1>

        <div
          className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-bagel-300" />
          <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-bagel-200 tracking-[0.3em] uppercase">
            Bagel · Brunch · Coffee
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-bagel-300" />
        </div>

        <p
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Freshly baked bagels & coffee. Your new favorite brunch station.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <a
            href="#menu"
            className="px-8 py-4 bg-gradient-to-r from-bagel-400 to-bagel-500 text-white font-[family-name:var(--font-heading)] font-semibold rounded-full text-lg tracking-wide hover:scale-105 transition-transform duration-300 shadow-lg shadow-bagel-500/30"
          >
            Explore Menu
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-[family-name:var(--font-heading)] font-semibold rounded-full text-lg tracking-wide border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
          >
            Visit Us
          </a>
        </div>

        {/* Rating badge */}
        <div
          className="mt-16 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-bagel-300" filled />
            ))}
          </div>
          <span className="text-white/80 text-sm font-medium">5.0 · 11 reviews on Google</span>
        </div>
      </div>

      {/* Multi-layered wave transition — curvy lines that melt into the menu section */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ marginBottom: "-2px" }}>
        {/* Wave layer 3 (back) — subtle warm cream with slight transparency */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "180px" }}
        >
          <path
            d="M0,80 C180,140 360,20 540,70 C720,120 900,30 1080,80 C1200,110 1350,50 1440,70 L1440,180 L0,180 Z"
            fill="#FAD96B"
            fillOpacity="0.25"
          />
        </svg>

        {/* Wave layer 2 (middle) — golden accent */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "160px", marginTop: "-160px" }}
        >
          <path
            d="M0,100 C240,160 480,40 720,100 C960,160 1200,50 1440,100 L1440,180 L0,180 Z"
            fill="#FEECDC"
          />
        </svg>

        {/* Wave layer 1 (front) — matches bagel-50 background color exactly */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "150px", marginTop: "-150px" }}
        >
          <path
            d="M0,90 C200,150 400,30 600,80 C800,130 1000,20 1200,70 C1350,100 1400,60 1440,80 L1440,180 L0,180 Z"
            fill="#FFF8F0"
          />
        </svg>
      </div>

    </section>
  );
}

function MenuSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  return (
    <section id="menu" className="pt-20 pb-24 bg-bagel-50 relative overflow-hidden" style={{ marginTop: "-1px" }}>
      {/* Decorative background — warm yellow glows in both top corners to blend with hero waves */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-bagel-200/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-bagel-200/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <span className="inline-block font-[family-name:var(--font-heading)] text-sm font-semibold tracking-[0.3em] uppercase text-bagel-500 mb-4">
            Our Menu
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-bagel-900 mb-6">
            Freshly Baked <span className="gradient-text">Goodness</span>
          </h2>
          <p className="text-bagel-600 text-lg max-w-xl mx-auto">
            From classic cream cheese to loaded creations — every bagel is toasted to golden perfection.
          </p>
        </div>
      </div>

      {/* Drag instruction */}
      <div className="flex items-center justify-center gap-3 mb-8 text-bagel-400">
        <ArrowLeftIcon />
        <span className="font-[family-name:var(--font-heading)] text-sm font-medium tracking-wider uppercase">
          Drag to explore
        </span>
        <ArrowRightIcon />
      </div>

      {/* Horizontal scroll menu */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={`flex gap-6 overflow-x-auto menu-scroll px-6 md:px-12 pb-6 cursor-grab ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* Spacer */}
        <div className="min-w-[calc((100vw-1280px)/2-24px)]" />

        {bagelMenu.map((bagel, index) => (
          <MenuCard key={index} bagel={bagel} index={index} />
        ))}

        {/* Spacer */}
        <div className="min-w-[calc((100vw-1280px)/2-24px)]" />
      </div>
    </section>
  );
}

function MenuCard({ bagel, index }: { bagel: BagelItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[320px] md:w-[360px] group"
      style={{ scrollSnapAlign: "center" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
          hovered ? "scale-[1.02] shadow-2xl shadow-bagel-900/15" : "shadow-lg shadow-bagel-900/5"
        } bg-white border-2 ${bagel.color.split(" ")[1]}`}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={bagel.image}
            alt={bagel.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              hovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase 
            ${bagel.color.split(" ")[0]} ${bagel.color.split(" ")[1].replace("border-", "text-").replace("-300", "-700")}`}
          >
            {bagel.tag}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-bagel-900">
              {bagel.name}
            </h3>
            <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-bagel-500 bg-bagel-100 px-3 py-1 rounded-full whitespace-nowrap ml-3">
              {bagel.price}
            </span>
          </div>
          <p className="text-bagel-600 text-sm leading-relaxed">{bagel.description}</p>
        </div>

        {/* Bottom accent line */}
        <div
          className={`h-1 w-full transition-all duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(90deg, ${
              ["#E8A838", "#F5C842", "#C4841D", "#E87C8A", "#6B8E23", "#D94F4F", "#9B59B6", "#84CC16"][index]
            }, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative">
      {/* Full-width image band */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="/images/atmosphere.jpg"
          alt="HOOP atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bagel-900/90 via-bagel-900/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-xl">
              <span className="inline-block font-[family-name:var(--font-heading)] text-sm font-semibold tracking-[0.3em] uppercase text-bagel-300 mb-6">
                Our Story
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Where Every Bite Tells a <span className="text-bagel-300">Story</span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                At HOOP, we believe in the magic of freshly baked bagels. Each morning, we craft our bagels 
                from scratch — golden on the outside, soft and pillowy on the inside. Paired with premium 
                ingredients and a warm cup of coffee, it's more than just brunch. It's your new favorite ritual.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-bagel-300">5.0</div>
                  <div className="text-white/60 text-sm mt-1">Google Rating</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-bagel-300">8+</div>
                  <div className="text-white/60 text-sm mt-1">Bagel Varieties</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-bold text-bagel-300">∞</div>
                  <div className="text-white/60 text-sm mt-1">Love & Passion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🥯",
              title: "Freshly Baked",
              desc: "Every bagel is baked fresh each morning with premium ingredients and traditional techniques.",
            },
            {
              icon: "☕",
              title: "Great Coffee",
              desc: "Carefully selected beans, expertly brewed to pair perfectly with your favorite bagel creation.",
            },
            {
              icon: "💛",
              title: "Made with Love",
              desc: "Friendly service and a cozy atmosphere that makes every visit feel like coming home.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-bagel-900/5 border border-bagel-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-4xl mb-4 block">{card.icon}</span>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-bagel-900 mb-3">
                {card.title}
              </h3>
              <p className="text-bagel-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-bagel-50 to-cream/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 text-8xl opacity-5">🥯</div>
      <div className="absolute bottom-10 left-10 text-8xl opacity-5">☕</div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-heading)] text-sm font-semibold tracking-[0.3em] uppercase text-bagel-500 mb-4">
            What People Say
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-bagel-900 mb-6">
            Loved by <span className="gradient-text">Everyone</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-7 h-7 text-bagel-300" filled />
              ))}
            </div>
            <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-bagel-800">
              5.0
            </span>
          </div>
          <p className="text-bagel-500 font-medium">Based on 11 Google Reviews</p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const bgColors = [
    "bg-white",
    "bg-bagel-50",
    "bg-cream/40",
    "bg-white",
    "bg-bagel-50",
    "bg-cream/40",
  ];

  return (
    <div
      className={`${bgColors[index]} rounded-2xl p-6 border border-bagel-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bagel-300 to-bagel-500 flex items-center justify-center text-white font-bold text-sm">
            {review.name[0]}
          </div>
          <div>
            <div className="font-[family-name:var(--font-heading)] font-semibold text-bagel-900 text-sm">
              {review.name}
            </div>
            <div className="text-bagel-400 text-xs">{review.date}</div>
          </div>
        </div>
        <div className="flex">
          {[...Array(review.rating)].map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-bagel-300" filled />
          ))}
        </div>
      </div>

      {review.highlight && (
        <div className="bg-bagel-100/50 rounded-lg px-3 py-1.5 mb-3 inline-block">
          <span className="text-bagel-700 text-xs font-semibold">✨ {review.highlight}</span>
        </div>
      )}

      <p className="text-bagel-700 text-sm leading-relaxed">{review.text}</p>
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-bagel-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-[10%] text-9xl">🥯</div>
        <div className="absolute top-40 left-[30%] text-7xl">☕</div>
        <div className="absolute bottom-20 right-[20%] text-8xl">🥯</div>
        <div className="absolute bottom-40 left-[60%] text-6xl">🌿</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-heading)] text-sm font-semibold tracking-[0.3em] uppercase text-bagel-400 mb-4">
            Visit Us
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold mb-6">
            Come Grab a <span className="text-bagel-300">Bagel</span>
          </h2>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            We can't wait to welcome you. Stop by for brunch, coffee, or just a quick bite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <MapPinIcon />,
              title: "Address",
              content: "Vladimir Komarov 18A/4, Skopje 1000",
              link: "https://maps.google.com/?q=HOOP+bagel+brunch+coffee+Skopje",
            },
            {
              icon: <PhoneIcon />,
              title: "Phone",
              content: "070 255 665",
              link: "tel:+38970255665",
            },
            {
              icon: <ClockIcon />,
              title: "Hours",
              content: "Mon–Sun: 8:00 AM – 4:00 PM",
              link: null,
            },
            {
              icon: <InstagramIcon />,
              title: "Instagram",
              content: "@hoop_brunch",
              link: "https://www.instagram.com/hoop_brunch/",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-bagel-400/30 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-bagel-400/20 flex items-center justify-center mx-auto mb-4 text-bagel-300">
                {item.icon}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-bagel-300 mb-2 uppercase tracking-wider text-sm">
                {item.title}
              </h3>
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm hover:text-bagel-300 transition-colors"
                >
                  {item.content}
                </a>
              ) : (
                <p className="text-white/70 text-sm">{item.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Map embed */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.0!2d21.4275!3d42.005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHOOP+bagel+brunch+coffee+Skopje!5e0!3m2!1sen!2snl!4v1700000000000"
            width="100%"
            height="350"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(1.5)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HOOP location map"
          />
        </div>

        {/* Price info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
            <span className="text-bagel-300">💰</span>
            <span className="text-white/60 text-sm">Price per person: <strong className="text-bagel-300">MKD 200–400</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-bagel-900 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥯</span>
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
              HOOP
            </span>
            <span className="text-white/30 text-sm ml-2">Bagel, Brunch & Coffee</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/hoop_brunch/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-bagel-300 transition-colors"
            >
              <InstagramIcon />
              <span className="text-sm">@hoop_brunch</span>
            </a>
            <a
              href="tel:+38970255665"
              className="flex items-center gap-2 text-white/50 hover:text-bagel-300 transition-colors"
            >
              <PhoneIcon />
              <span className="text-sm">070 255 665</span>
            </a>
          </div>

          <div className="text-white/30 text-xs">
            © {new Date().getFullYear()} HOOP. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function StarIcon({ className = "w-5 h-5", filled = false }: { className?: string; filled?: boolean }) {
  return filled ? (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-bagel-50">
      <Navbar />
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
