'use client';
import { readCookie, writeCookie } from '@/lib/cookies';
import { createSpinProfile, spinProgress, createFoodSelector, stopFraction } from '@/lib/case-mechanics';
import { foods, type Food } from '@/lib/foods';
import { copy, foodName, foodSubtitle, priceLabel, type Language } from '@/lib/i18n';
import { useLocalSpinCount } from '@/hooks/use-local-spin-count';
import { PreferencesPanel } from '@/components/preferences-panel';
import { usePreferences } from '@/hooks/use-preferences';
import { personalFoods, personalSelector } from '@/lib/personal-pool';
import { CaseAudio } from '@/lib/case-audio';
import { flushSync } from 'react-dom';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, AudioLines, Volume2, VolumeX, Sparkles, Utensils, Leaf, Flame, RotateCcw, MapPin, ShoppingBag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { BrandLogo } from '@/components/brand-logo';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Culinary rarity tier colors (Fresh Green, Turmeric Gold, Chili Red, Royal Plum, Saffron Gold)
const colors = ['#16a34a', '#ca8a04', '#dc2626', '#7c3aed', '#d97706'];

function FoodImage({ food, language }: { food: Food; language: Language }) {
  if (food.customId) {
    return (
      <div className="food-image custom-food-art" role="img" aria-label={food.name}>
        <Utensils size={64} />
      </div>
    );
  }
  const common = food.image >= 120;
  const lunch = food.image >= 72 && !common;
  const expanded = food.image >= 36;
  const index = common
    ? (food.image - 120) % 12
    : lunch
    ? (food.image - 72) % 12
    : expanded
    ? (food.image - 36) % 12
    : food.image % 4;
  const atlas = common
    ? `food-common-${Math.floor((food.image - 120) / 12)}`
    : lunch
    ? `food-lunch-${Math.floor((food.image - 72) / 12)}`
    : expanded
    ? `food-expanded-${Math.floor((food.image - 36) / 12)}`
    : `food-hd-${Math.floor(food.image / 4)}`;

  return (
    <div
      role="img"
      aria-label={foodName(food, language)}
      className="food-image"
      style={{
        clipPath: common ? 'inset(0 0 4% 0)' : lunch ? 'inset(0 0 7% 0)' : undefined,
        backgroundImage: `url(${basePath}/${atlas}.webp)`,
        backgroundSize: expanded ? '400% 300%' : '200% 200%',
        backgroundPosition: expanded
          ? `${(index % 4) / 3 * 100}% ${(common ? [0, 50, 100] : [0, 46, 92])[Math.floor(index / 4)]}%`
          : `${(index % 2) * 100}% ${Math.floor(index / 2) * 100}%`,
      }}
    />
  );
}

function MysteryArt({ language }: { language: Language }) {
  return (
    <div className="mystery-art" role="img" aria-label={copy[language].mysteryAlt}>
      <div className="mystery-rays" />
      <svg className="mystery-emblem" viewBox="0 0 240 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="clocheGold" x1="60" y1="30" x2="180" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff2a8" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="plateGold" x1="40" y1="105" x2="200" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <radialGradient id="clocheGlow" cx="120" cy="75" r="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial glow */}
        <circle cx="120" cy="75" r="65" fill="url(#clocheGlow)" />

        {/* Steam waves */}
        <path d="M105 32c-3-8 3-14 3-18M120 30c-3-10 4-16 4-22M135 32c-3-8 3-14 3-18" stroke="#ffe59a" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

        {/* Golden Cloche Handle Knob */}
        <circle cx="120" cy="40" r="7" fill="url(#clocheGold)" stroke="#fef08a" strokeWidth="1.5" />

        {/* Serving Cloche Dome */}
        <path d="M68 98C68 62 90 47 120 47C150 47 172 62 172 98H68Z" fill="url(#clocheGold)" stroke="#fff3ba" strokeWidth="1.5" />

        {/* Highlight sheen on dome */}
        <path d="M82 92C84 70 100 56 120 54" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Golden Serving Platter Base */}
        <ellipse cx="120" cy="104" rx="66" ry="8" fill="url(#plateGold)" stroke="#fef08a" strokeWidth="1.5" />
        <ellipse cx="120" cy="107" rx="72" ry="5" fill="#78350f" opacity="0.5" />

        {/* Glowing Question Mark on the cloche */}
        <path d="M112 67c0-6 16-7 16 0c0 4-6 6-7 9v3h6v-2c0-4 6-5 6-9c0-8-19-8-19 1zm7 15h6v6h-6z" fill="#ffffff" filter="drop-shadow(0 0 6px rgba(254, 240, 138, 0.9))" />

        {/* Sparkle stars */}
        <path d="M52 48l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM188 42l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4zM178 88l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5z" fill="#ffe59a" />
      </svg>
      <div className="mystery-sheen" />
    </div>
  );
}

const Card = memo(function Card({
  food,
  language,
  small = false,
  slot,
}: {
  food: Food;
  language: Language;
  small?: boolean;
  slot?: number;
}) {
  const mystery = !small && food.rarity === 4;
  const t = copy[language];
  return (
    <div
      className={`food-card ${small ? 'small' : ''} ${mystery ? 'mystery-card' : ''}`}
      data-slot-id={slot}
      data-food-id={food.image}
      style={
        {
          '--rarity': colors[food.rarity],
          ...(slot === undefined ? {} : { position: 'absolute', left: slot * 254 }),
        } as React.CSSProperties
      }
    >
      <span className="tier">{t.tiers[food.rarity]}</span>
      {mystery ? <MysteryArt language={language} /> : <FoodImage food={food} language={language} />}
      <div className="card-copy">
        <strong>{mystery ? t.mystery : foodName(food, language)}</strong>
        <span>{small ? priceLabel(food.price, language, true) : foodSubtitle(food, language)}</span>
      </div>
    </div>
  );
});

export default function Home() {
  const { count: localSpins, enabled: counterEnabled, recordSpin } = useLocalSpinCount();
  const [language, setLanguage] = useState<Language>('vi');
  const preferences = usePreferences();
  const [budget, setBudget] = useState('50');
  const [custom, setCustom] = useState('50');
  const [veg, setVeg] = useState(false);
  const [sound, setSound] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Food | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reel, setReel] = useState(() => foods.slice(0, 12).map((food, id) => ({ food, id })));
  const [moving, setMoving] = useState(false);
  const busy = useRef(false);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let selected: Language = 'vi';
    try {
      const saved = readCookie<string>('language');
      selected = saved === 'en' || saved === 'vi' ? saved : 'vi';
    } catch {}
    setLanguage(selected);
    document.documentElement.lang = selected;
    document.title = selected === 'en' ? 'What should I eat for lunch?' : 'Ăn gì cũng được? - Vòng quay chọn món';
  }, []);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    document.documentElement.lang = next;
    document.title = next === 'en' ? 'What should I eat for lunch?' : 'Ăn gì cũng được? - Vòng quay chọn món';
    try {
      writeCookie('language', next);
    } catch {}
  };

  const [preferencesReady, setPreferencesReady] = useState(false);
  const [cookieError, setCookieError] = useState('');

  useEffect(() => {
    const saved = readCookie<Record<string, unknown>>('settings');
    if (saved && typeof saved === 'object') {
      if (typeof saved.budget === 'string' && ['35', '50', '75', '100', '150', 'custom'].includes(saved.budget))
        setBudget(saved.budget);
      if (typeof saved.custom === 'string' && Number(saved.custom) >= 30 && Number(saved.custom) <= 180)
        setCustom(saved.custom);
      if (typeof saved.veg === 'boolean') setVeg(saved.veg);
      if (typeof saved.sound === 'boolean') setSound(saved.sound);
    }
    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (preferencesReady) {
      try {
        writeCookie('settings', { budget, custom, veg, sound });
        setCookieError('');
      } catch {
        setCookieError(
          language === 'vi'
            ? 'Không thể lưu cookie. Lựa chọn chỉ giữ trong lần mở trang này.'
            : 'Cookies unavailable. Preferences last only for this visit.'
        );
      }
    }
  }, [preferencesReady, budget, custom, veg, sound, language]);

  const target = budget === 'custom' ? Number(custom) : Number(budget);
  const validTarget = Number.isInteger(target) && target >= 30 && target <= 180;
  const population = useMemo(() => personalFoods(preferences.profile), [preferences.profile]);

  useEffect(() => {
    const last = readCookie<{ name?: unknown; price?: unknown; veg?: unknown }>('last-choice');
    if (last && typeof last === 'object') {
      const match = population.find((f) => f.name === last.name && f.price === last.price && !f.veg === !last.veg);
      if (match) setResult(match);
    }
  }, [population]);

  const eligible = useMemo(() => population.filter((f) => !veg || f.veg), [population, veg]);
  const lunchSelector = useMemo(
    () => personalSelector(eligible, validTarget ? target : 50),
    [eligible, target, validTarget]
  );
  const filteredMean = lunchSelector?.expectedPrice ?? 0;

  const audio = useRef<CaseAudio | null>(null);
  useEffect(() => {
    const engine = new CaseAudio(basePath);
    audio.current = engine;
    engine.preload();
    const hide = () => {
      if (document.hidden) engine.pause();
      else engine.recover();
    };
    document.addEventListener('visibilitychange', hide);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      engine.dispose();
      audio.current = null;
    };
  }, []);

  const [visibleStart, setVisibleStart] = useState(0);
  const t = copy[language];
  const inventoryCards = useMemo(
    () =>
      [...eligible]
        .sort(
          (a, b) =>
            a.rarity - b.rarity ||
            a.price - b.price ||
            foodName(a, language).localeCompare(foodName(b, language), language)
        )
        .map((f) => <Card food={f} language={language} small key={f.customId ?? f.image} />),
    [eligible, language]
  );

  const track = useRef<HTMLDivElement>(null);
  const position = useRef(-400);
  const attachTrack = useCallback((node: HTMLDivElement | null) => {
    track.current = node;
    if (node) node.style.transform = `translate3d(${position.current}px,0,0)`;
  }, []);
  const frame = useRef(0);

  useEffect(() => {
    if (spinning || !eligible.length || !lunchSelector) return;
    setReel((current) =>
      current.map((item) => ({
        ...item,
        food:
          eligible.find((f) => (f.customId ?? f.image) === (item.food.customId ?? item.food.image)) ??
          lunchSelector.choose(eligible),
      }))
    );
  }, [eligible, lunchSelector, spinning]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function open() {
    if (busy.current || !validTarget || !eligible.length || !lunchSelector || !track.current || !viewport.current)
      return;
    audio.current?.unlock();
    busy.current = true;
    const winner = lunchSelector.choose(eligible);

    const step = 254;
    const tileWidth = 240;
    const width = viewport.current.clientWidth;
    const start = position.current;
    const center = Math.floor((width / 2 - start) / step);
    const profile = createSpinProfile();
    const target = center + profile.tiles;
    const end = width / 2 - tileWidth * stopFraction() - target * step;

    // Keep visible cards at permanent world coordinates. Generate new cards
    // offscreen to the right; the track only travels left, without a reset.
    const rightEdge = Math.ceil((width - start) / step) + 1;
    const items = reel.filter((item) => item.id >= center - Math.ceil(width / step) - 2 && item.id <= rightEdge);
    const last = Math.max(...items.map((item) => item.id));
    const recent: Food[] = [];
    for (let id = last + 1; id <= target + 4; id++) {
      const alternatives = eligible.filter(
        (food) => !recent.includes(food) && (lunchSelector.probabilities.get(food) ?? 0) > 0
      );
      const food = id === target ? winner : lunchSelector.choose(alternatives.length ? alternatives : eligible);
      items.push({ id, food });
      recent.push(food);
      if (recent.length > 8) recent.shift();
    }
    flushSync(() => {
      setReel(items);
      setSpinning(true);
      setMoving(true);
      setResult(null);
    });
    audio.current?.play('csgo_ui_crate_open');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 150 : profile.durationMs;
    const started = performance.now();
    let renderedStart = visibleStart;
    let lastCell = Math.floor((start - width / 2) / step);

    const animate = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - started) / duration));
      const next = start + (end - start) * spinProgress(progress, profile.friction);
      position.current = next;

      const firstVisible = Math.max(0, Math.floor(-next / step));
      if (firstVisible - renderedStart >= 4 || firstVisible < renderedStart) {
        renderedStart = Math.max(0, firstVisible - 2);
        setVisibleStart(renderedStart);
      }
      if (track.current) track.current.style.transform = `translate3d(${next}px,0,0)`;

      const cell = Math.floor((next - width / 2) / step);
      if (cell !== lastCell) {
        audio.current?.play('csgo_ui_crate_item_scroll');
        lastCell = cell;
      }
      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
        return;
      }
      recordSpin(winner);
      busy.current = false;
      setSpinning(false);
      setMoving(false);
      setResult(winner);
      setRevealed(true);
      audio.current?.play(
        (
          [
            'item_reveal3_rare',
            'item_reveal4_mythical',
            'item_reveal5_legendary',
            'item_reveal6_ancient',
            'item_reveal6_ancient',
          ] as const
        )[winner.rarity]
      );
    };
    frame.current = requestAnimationFrame(animate);
  }

  return (
    <div className="site-shell">
      {/* Background ambient lighting */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <header>
        <a href={`${basePath}/`} className="brand" aria-label="Ăn Gì Cũng Được?">
          <BrandLogo />
        </a>

        <div className="header-actions">
          <PreferencesPanel preferences={preferences} language={language} disabled={spinning} />
          
          <button
            className="sound-button"
            onClick={() => {
              audio.current?.setMuted(sound);
              setSound(!sound);
            }}
            aria-label={sound ? t.turnSoundOff : t.turnSoundOn}
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{sound ? t.soundOn : t.soundOff}</span>
          </button>

          <button
            className="language-button"
            onClick={() => changeLanguage(language === 'vi' ? 'en' : 'vi')}
            aria-label={t.language}
          >
            {language === 'vi' ? 'EN' : 'VI'}
          </button>
        </div>
      </header>

      <main>
        {cookieError && (
          <div role="status" className="preferences-message-banner">
            {cookieError}
          </div>
        )}

        {/* Friendly Hero Intro */}
        <div className="intro">
          <div className="intro-badge">
            <span className="badge-dot" />
            <span>{language === 'vi' ? 'Hỏi ăn gì cũng kêu "sao cũng được"? Quay ngay!' : 'When they say "anything is fine" — Spin now!'}</span>
          </div>
          <h1>{t.title}</h1>
          <p className="intro-description">
            {language === 'vi'
              ? 'Vòng quay giải cứu mỗi bữa ăn khi người yêu hay bạn bè bảo "ăn gì cũng được" — bấm một phát là chốt món, cấm đổi ý!'
              : 'The ultimate meal decider when everyone says "whatever you want" — one spin, decision made, no take-backs!'}
          </p>

          <div className="intro-stats">
            {counterEnabled && (
              <div className="stat-pill" title={language === 'vi' ? 'Lưu bằng cookie trình duyệt' : 'Saved in browser cookies'}>
                <Flame size={15} className="stat-icon" />
                <span>
                  {language === 'vi' ? 'Bạn đã quay ' : 'You spun '}
                  <strong>
                    {localSpins === null
                      ? '—'
                      : new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US').format(localSpins)}
                  </strong>
                  {language === 'vi' ? ' lượt trên máy này' : ' times here'}
                </span>
              </div>
            )}

            {result && !spinning && (
              <div className="stat-pill last-choice-pill">
                <RotateCcw size={14} className="stat-icon" />
                <span>
                  {language === 'vi' ? 'Món vừa chọn: ' : 'Last choice: '}
                  <strong>{foodName(result, language)}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {!eligible.length && (
          <div className="preferences-empty-alert">
            {language === 'vi'
              ? '⚠️ Không có món phù hợp với tiêu chí hiện tại. Vui lòng tắt bộ lọc ăn chay hoặc thêm món mới.'
              : '⚠️ No matching dishes. Turn off the vegetarian filter or add dishes in preferences.'}
          </div>
        )}

        {/* Food Roulette Panel */}
        <section className="case-panel" aria-label={t.caseLabel}>
          <div className="case-top-bar">
            <div className="case-meta">
              <span className="case-series-badge">MENU #01</span>
              <span className="case-title-text">
                {language === 'vi' ? 'Thực Đơn Món Ngon Tuyển Chọn' : 'Selected Gourmet Menu'}
              </span>
            </div>
            <div className="case-indicator">
              <span className={`status-light ${spinning ? 'pulsing' : 'ready'}`} />
              <span className="status-text">
                {spinning
                  ? language === 'vi'
                    ? 'ĐANG QUAY...'
                    : 'SPINNING...'
                  : language === 'vi'
                  ? 'SẴN SÀNG'
                  : 'READY'}
              </span>
            </div>
          </div>

          <div className={`reel-window ${moving ? 'is-spinning' : ''}`} ref={viewport}>
            <div className={`selector-line ${moving ? 'is-spinning-active' : ''}`}>
              <div className="selector-pointer top" />
              <div className="selector-laser-beam" />
              <div className="selector-laser-spark" />
              <div className="selector-pointer bottom" />
            </div>
            <div className="reel-track" ref={attachTrack}>
              {reel
                .filter(({ id }) => id >= visibleStart && id < visibleStart + 12)
                .map(({ food, id }) => (
                  <Card key={id} food={food} language={language} slot={id} />
                ))}
            </div>
            <div className="reel-fade left" />
            <div className="reel-fade right" />
          </div>

          <div className="case-bottom-bar">
            <span>{language === 'vi' ? '✦ Đảm bảo ngẫu nhiên & cân bằng ngân sách' : '✦ Balanced probabilities & budget estimation'}</span>
            <span>{eligible.length} {language === 'vi' ? 'món đang kích hoạt' : 'active dishes'}</span>
          </div>
        </section>

        {/* Control Bar: Filters & Open Button */}
        <div className="control-bar">
          <div className="filters">
            <div className="budget">
              <label id="budget-label">{t.spend}</label>
              <div className="budget-input-group">
                <Select value={budget} onValueChange={(v) => setBudget(v ?? '50')} disabled={spinning}>
                  <SelectTrigger aria-labelledby="budget-label" className="budget-trigger">
                    <SelectValue>
                      {budget === 'custom' ? t.custom : priceLabel(budget, language)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="budget-content">
                    {['35', '50', '75', '100', '150'].map((v) => (
                      <SelectItem key={v} value={v}>
                        {priceLabel(v, language)}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">{t.custom}</SelectItem>
                  </SelectContent>
                </Select>

                {budget === 'custom' && (
                  <div className="custom-spend">
                    <input
                      aria-label={t.customSpend}
                      aria-invalid={!validTarget}
                      type="number"
                      inputMode="numeric"
                      min="30"
                      max="180"
                      step="1"
                      value={custom}
                      disabled={spinning}
                      onChange={(e) => setCustom(e.target.value)}
                      placeholder="50"
                    />
                    <span>{t.thousandPerMeal}</span>
                  </div>
                )}
              </div>

              {!validTarget && (
                <small className="spend-note error" role="alert">
                  {t.spendError}
                </small>
              )}
              {validTarget && eligible.length > 0 && (veg || Math.abs(filteredMean - target) > 0.5) && (
                <small className="spend-note">
                  {t.vegetarianPool} {priceLabel(Math.round(filteredMean), language, true)} /{' '}
                  {language === 'vi' ? 'bữa' : 'meal'}
                </small>
              )}
            </div>

            <label className="veg">
              <Switch checked={veg} onCheckedChange={setVeg} disabled={spinning} aria-label={t.vegetarianOnly} />
              <span className="veg-label">
                <Leaf size={16} className="leaf-icon" />
                <span>{t.vegetarian}</span>
              </span>
            </label>
          </div>

          <div className="open-wrap">
            <button
              className={`open-button ${spinning ? 'is-spinning' : ''}`}
              disabled={spinning || !validTarget || !eligible.length}
              onClick={open}
            >
              <div className="button-shine" />
              <span className="button-icon-wrap">
                {spinning ? <AudioLines size={22} className="spin-icon" /> : <Sparkles size={22} />}
              </span>
              <span className="button-text">
                {spinning ? t.opening : result ? t.openAgain : t.open}
              </span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>

        {/* Winner Celebration Modal */}
        <Dialog open={revealed} onOpenChange={setRevealed}>
          <DialogContent className="winner-dialog" showCloseButton={true}>
            {result && (
              <div className="winner-modal-inner" style={{ '--rarity': colors[result.rarity] } as React.CSSProperties}>
                {/* Rotating heavenly sunburst rays */}
                <div className="winner-sunburst" />
                <div className="winner-glow" />

                {/* Celebration confetti burst */}
                <div className="confetti-burst" aria-hidden="true">
                  <span className="cp cp-1" />
                  <span className="cp cp-2" />
                  <span className="cp cp-3" />
                  <span className="cp cp-4" />
                  <span className="cp cp-5" />
                  <span className="cp cp-6" />
                  <span className="cp cp-7" />
                  <span className="cp cp-8" />
                  <span className="cp cp-9" />
                  <span className="cp cp-10" />
                  <span className="cp cp-11" />
                  <span className="cp cp-12" />
                </div>

                <div className="winner-header">
                  <span className="winner-badge">
                    <Sparkles size={14} />
                    {t.newItem}
                  </span>
                  <span className="winner-tier-tag">{t.tiers[result.rarity]}</span>
                </div>

                <DialogTitle className="winner-title">{foodName(result, language)}</DialogTitle>

                <DialogDescription className="winner-description">
                  {t.referencePrice} · <strong>{priceLabel(result.price, language, true)}</strong> {t.perPerson}
                  {result.sub && <span className="winner-sub"> • {result.sub}</span>}
                </DialogDescription>

                <div className="winner-art-wrap">
                  <div className="winner-art-aura" />
                  <div className="winner-art">
                    <FoodImage food={result} language={language} />
                  </div>
                </div>

                <div className="winner-actions">
                  <a
                    className="find-button"
                    href={`https://www.google.com/maps/search/${encodeURIComponent(result.name + ' ' + t.nearby)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin size={17} />
                    <span>{t.find}</span>
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    className="grabfood-button"
                    href={`https://food.grab.com/vn/vi/restaurants?${new URLSearchParams({
                      search: result.name,
                      'support-deeplink': 'true',
                      searchParameter: result.name,
                    })}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={
                      language === 'vi'
                        ? `Đặt ${result.name} qua GrabFood`
                        : `Find ${foodName(result, language)} on GrabFood`
                    }
                  >
                    <ShoppingBag size={17} />
                    <span className="grabfood-label">
                      {language === 'vi' ? 'Đặt qua' : 'Order on'} <strong>GrabFood</strong>
                    </span>
                    <ArrowUpRight size={15} />
                  </a>

                  <button className="continue-button" onClick={() => setRevealed(false)}>
                    {t.continue}
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Inventory Food Catalog */}
        <section className="inventory">
          <div className="section-heading">
            <div className="section-heading-left">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t.whatsInside}
              </span>
              <div className="inventory-title-row">
                <h2>
                  {t.items} <span className="count-pill">{eligible.length.toString().padStart(2, '0')}</span>
                </h2>
                <PreferencesPanel
                  preferences={preferences}
                  language={language}
                  disabled={spinning}
                  variant="inventory"
                />
              </div>
            </div>

            <div className="rarity-legend">
              {t.tiers.map((tier, i) => (
                <span key={tier} className="legend-chip">
                  <i style={{ background: colors[i], boxShadow: `0 0 8px ${colors[i]}` }} />
                  {tier}
                </span>
              ))}
            </div>
          </div>

          <div className="inventory-grid">{inventoryCards}</div>
        </section>

        <footer>
          <div className="footer-content">
            <div className="footer-brand">
              <strong>Ăn Gì Cũng Được?</strong>
              <span>· Phiên bản Local độc lập</span>
            </div>
            <div className="footer-links">
              <a href={`${basePath}/privacy.html`}>{language === 'vi' ? 'Quyền riêng tư' : 'Privacy'}</a>
              <span>·</span>
              <a href={`${basePath}/terms.html`}>{language === 'vi' ? 'Điều khoản' : 'Terms'}</a>
              <span>·</span>
              <span>{language === 'vi' ? 'Hiệu ứng âm thanh CS:GO SourceSounds' : 'SFX: CS:GO SourceSounds'}</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
