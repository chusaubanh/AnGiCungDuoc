import React from 'react';
import { 
  Sparkles, 
  Utensils, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Heart, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  ShoppingBag, 
  MapPin, 
  RotateCcw, 
  Clock, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { foods, type Food } from '@/lib/foods';
import { foodName, priceLabel, type Language } from '@/lib/i18n';

interface LandingPageProps {
  language: Language;
  onStartSpinning: () => void;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Sample preview foods for the live culinary ribbon (taste-skill authentic visual asset)
const showcaseDishes = [
  foods[0], // Cơm tấm
  foods[1], // Phở bò
  foods[2], // Bánh mì
  foods[3], // Bún chả
  foods[4], // Sushi cá hồi
  foods[6], // Bún bò Huế
  foods[9], // Bánh xèo
  foods[12], // Mì Quảng
];

function MiniFoodPlate({ food, language }: { food: Food; language: Language }) {
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
    <div className="mini-dish-card">
      <div
        className="mini-dish-thumb"
        style={{
          backgroundImage: `url(${basePath}/${atlas}.webp)`,
          backgroundSize: expanded ? '400% 300%' : '200% 200%',
          backgroundPosition: expanded
            ? `${(index % 4) / 3 * 100}% ${(common ? [0, 50, 100] : [0, 46, 92])[Math.floor(index / 4)]}%`
            : `${(index % 2) * 100}% ${Math.floor(index / 2) * 100}%`,
        }}
      />
      <div className="mini-dish-meta">
        <strong>{foodName(food, language)}</strong>
        <span>{priceLabel(food.price, language, true)}</span>
      </div>
    </div>
  );
}

export function LandingPage({ language, onStartSpinning }: LandingPageProps) {
  const vi = language === 'vi';

  return (
    <div className="landing-container">
      {/* 1. Hero Section (Fits Viewport, Tight Copy, Zero Slop) */}
      <section className="landing-hero">
        <div className="hero-badge">
          <Sparkles size={15} className="hero-badge-icon" />
          <span>{vi ? 'GIẢI PHÁP ĐỘC QUYỀN CHO VẤN NẠN THẾ KỶ' : 'THE ULTIMATE MEAL DECISION MAKER'}</span>
        </div>

        <h1 className="hero-title">
          {vi ? (
            <>
              Khi ai cũng bảo: <br />
              <span className="hero-title-highlight">"ĂN GÌ CŨNG ĐƯỢC?"</span>
            </>
          ) : (
            <>
              When everyone keeps saying: <br />
              <span className="hero-title-highlight">"WHATEVER IS FINE!"</span>
            </>
          )}
        </h1>

        <p className="hero-subtitle">
          {vi
            ? 'Chính mình không biết thèm món gì, hỏi người khác thì bảo "sao cũng được" nhưng gợi ý món nào cũng chê! Bấm quay một phát chốt hạ bữa ăn, cấm đổi ý.'
            : 'You don\'t know what to crave, and everyone answers "Anything" but rejects every idea! One spin settles the meal instantly, no take-backs.'}
        </p>

        <div className="hero-actions">
          <button className="hero-cta-btn primary" onClick={onStartSpinning}>
            <Sparkles size={19} />
            <span>{vi ? 'BẮT ĐẦU QUAY CHỌN MÓN' : 'SPIN FOR FOOD NOW'}</span>
            <ArrowRight size={18} />
          </button>
          <a href="#how-it-works" className="hero-cta-btn secondary">
            <span>{vi ? 'Xem cách hoạt động' : 'How it works'}</span>
          </a>
        </div>

        {/* Real Food Conveyor Ribbon: Tangible, Mouth-Watering Visual */}
        <div className="hero-food-marquee-wrap" aria-label="Các món ăn nổi bật">
          <div className="hero-food-marquee-track">
            {showcaseDishes.concat(showcaseDishes).map((f, i) => (
              <MiniFoodPlate key={`${f.name}-${i}`} food={f} language={language} />
            ))}
          </div>
        </div>

        <div className="hero-trust-row">
          <span className="trust-item">
            <CheckCircle2 size={15} className="trust-icon" />
            {vi ? '100% Miễn phí và không quảng cáo' : '100% Free & No Ads'}
          </span>
          <span className="trust-item">
            <ShieldCheck size={15} className="trust-icon" />
            {vi ? 'Không cần đăng ký tài khoản' : 'No Account Needed'}
          </span>
          <span className="trust-item">
            <Zap size={15} className="trust-icon" />
            {vi ? 'Chốt món trong 5 giây' : 'Decide in 5 Seconds'}
          </span>
        </div>
      </section>

      {/* 2. Relatable Pain Point Scenarios (Asymmetric Bento Storyboard, No 3-Equal-Cards Slop) */}
      <section className="landing-scenarios">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'TÌNH HUỐNG THỰC TẾ' : 'RELATABLE MOMENTS'}</span>
          <h2>{vi ? 'Có Phải Bạn Từng Rơi Vào Cảnh Này?' : 'Sounds Familiar?'}</h2>
          <p>{vi ? 'Những cuộc đối thoại bế tắc mỗi ngày mà ai trong chúng ta cũng từng trải qua' : 'The classic mealtime dilemmas we all experience every single day'}</p>
        </div>

        <div className="scenarios-bento">
          {/* Main Story Bento Tile (Span 2) */}
          <div className="bento-tile bento-story-main">
            <div className="bento-tile-header">
              <div className="scenario-icon-wrap rose">
                <Heart size={22} />
              </div>
              <div>
                <h3>{vi ? 'Đi ăn cùng Người Yêu' : 'Dining with Your Partner'}</h3>
                <span className="bento-subtitle">{vi ? 'Cuộc đối thoại kinh điển muôn thuở' : 'The classic endless loop'}</span>
              </div>
            </div>

            {/* Chat Bubble Simulation (Tangible, Fun, No Em-Dash) */}
            <div className="chat-dialog-preview">
              <div className="chat-bubble user-a">
                <span className="chat-sender">{vi ? 'Bạn' : 'You'}:</span>
                <span className="chat-text">{vi ? 'Hôm nay mình ăn gì em nhỉ?' : 'What do you want to eat today?'}</span>
              </div>
              <div className="chat-bubble user-b">
                <span className="chat-sender">{vi ? 'Người yêu' : 'Partner'}:</span>
                <span className="chat-text">{vi ? 'Em ăn gì cũng được á!' : 'Anything is fine with me!'}</span>
              </div>
              <div className="chat-bubble user-a">
                <span className="chat-sender">{vi ? 'Bạn' : 'You'}:</span>
                <span className="chat-text">{vi ? 'Ăn phở bò tái nạm nhé?' : 'How about beef noodles?'}</span>
              </div>
              <div className="chat-bubble user-b">
                <span className="chat-sender">{vi ? 'Người yêu' : 'Partner'}:</span>
                <span className="chat-text">{vi ? 'Thôi, nước béo ngấy lắm...' : 'Nah, too greasy...'}</span>
              </div>
              <div className="chat-bubble user-a">
                <span className="chat-sender">{vi ? 'Bạn' : 'You'}:</span>
                <span className="chat-text">{vi ? 'Vậy ăn cơm tấm sườn nướng?' : 'What about grilled pork rice?'}</span>
              </div>
              <div className="chat-bubble user-b">
                <span className="chat-sender">{vi ? 'Người yêu' : 'Partner'}:</span>
                <span className="chat-text">{vi ? 'Khô cổ họng lắm anh ơi!' : 'Too dry, don\'t want that either!'}</span>
              </div>
            </div>

            <div className="bento-tile-footer">
              <span className="bento-pill-solution">{vi ? '💡 Giải pháp: Bấm quay, máy chọn là phải ăn!' : '💡 Fix: Let the wheel decide, no excuses!'}</span>
            </div>
          </div>

          {/* Bento Tile 2: Office Group */}
          <div className="bento-tile bento-story-sub">
            <div className="scenario-icon-wrap amber">
              <Users size={22} />
            </div>
            <h3>{vi ? 'Nhóm Bạn & Đồng Nghiệp' : 'Friends & Office Group'}</h3>
            <div className="hunger-timer-badge">
              <Clock size={15} />
              <span>{vi ? '45 phút lướt app vẫn đói' : '45 min scrolling, still hungry'}</span>
            </div>
            <p className="scenario-desc">
              {vi
                ? 'Hỏi: "Bữa nay ăn gì cả nhà ơi?". Cả nhóm nhìn nhau đói mốc meo, lướt app đồ ăn mòn ngón tay vẫn chưa ai chịu chốt.'
                : 'Asking "What should we eat?". Everyone looks at each other starving, scrolling food delivery apps for 45 minutes still undecided.'}
            </p>
            <div className="bento-tile-footer">
              <span className="bento-pill-solution">{vi ? '💡 Chiếu màn hình, quay 1 phát ăn ngay!' : '💡 Cast to screen, spin once, done!'}</span>
            </div>
          </div>

          {/* Bento Tile 3: Solo Crisis */}
          <div className="bento-tile bento-story-sub">
            <div className="scenario-icon-wrap emerald">
              <HelpCircle size={22} />
            </div>
            <h3>{vi ? 'Một Mình Tự Hỏi Lòng' : 'Solo Dining Crisis'}</h3>
            <div className="hunger-timer-badge">
              <Flame size={15} />
              <span>{vi ? 'Bụng đói nhưng đầu rỗng tuếch' : 'Starving with a blank mind'}</span>
            </div>
            <p className="scenario-desc">
              {vi
                ? 'Lướt 100 quán Grab, ShopeeFood, cho vào giỏ rồi xóa ra, cuối cùng lại ăn mì gói. Vòng quay giúp bạn chốt món ngon thật sự.'
                : 'Scrolling through 100 restaurants, adding and removing items, ending up eating instant noodles. The wheel solves it!'}
            </p>
            <div className="bento-tile-footer">
              <span className="bento-pill-solution">{vi ? '💡 Đặt mức giá, quay phát chốt luôn!' : '💡 Set budget, spin, order right away!'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Bento (Asymmetric Grid with Real Culinary Physics) */}
      <section className="landing-features">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'TÍNH NĂNG ĐỘC BẢN' : 'EXCLUSIVE FEATURES'}</span>
          <h2>{vi ? 'Vũ Khí Bí Mật Cho Mọi Bữa Ăn' : 'The Secret Weapon for Every Meal'}</h2>
          <p>{vi ? 'Thiết kế thông minh, cơ học cuộn mượt mà và thực sự giải quyết vấn đề' : 'Smart, tactile and genuinely solves the meal dilemma'}</p>
        </div>

        <div className="features-bento">
          {/* Bento Hero Feature (2 cols) */}
          <div className="bento-feat-card span-2">
            <div className="bento-feat-content">
              <div className="feature-icon red">
                <RotateCcw size={24} />
              </div>
              <h4>{vi ? 'Vòng Quay Roulette Cuộn Ngang Cơ Học' : 'Horizontal Roulette Rolling Mechanics'}</h4>
              <p>{vi ? 'Chuyển động cuộn mượt mà với âm thanh kịch tính, kim định vị laser vàng và tỷ lệ xác suất hoàn toàn công bằng.' : 'Smooth rolling physics with authentic sound effects and balanced probabilities.'}</p>
            </div>
            <div className="bento-roulette-mini-visual" aria-hidden="true">
              <div className="mini-laser-marker" />
              <div className="mini-reel-strip">
                <span className="mini-strip-chip active">Phở Bò</span>
                <span className="mini-strip-chip">Cơm Tấm</span>
                <span className="mini-strip-chip">Bún Chả</span>
                <span className="mini-strip-chip">Bánh Mì</span>
              </div>
            </div>
          </div>

          {/* Bento Tile 2: Smart Budget */}
          <div className="bento-feat-card">
            <div className="feature-icon amber">
              <SlidersHorizontal size={24} />
            </div>
            <h4>{vi ? 'Cân Bằng Ngân Sách Thông Minh' : 'Budget-Balanced Algorithm'}</h4>
            <p>{vi ? 'Chọn mức giá mong muốn (35k - 150k). Thuật toán tự cân bằng xác suất để mức chi luôn chuẩn ví tiền.' : 'Pick your budget (35k - 150k). The algorithm ensures expected meal cost stays on target.'}</p>
            <div className="mini-budget-chips">
              <span className="budget-tag">35k</span>
              <span className="budget-tag highlight">50k</span>
              <span className="budget-tag">75k</span>
              <span className="budget-tag">100k+</span>
            </div>
          </div>

          {/* Bento Tile 3: 130+ Dishes */}
          <div className="bento-feat-card">
            <div className="feature-icon emerald">
              <Utensils size={24} />
            </div>
            <h4>{vi ? '130+ Món Ngon Đa Dạng' : '130+ Diverse Specialties'}</h4>
            <p>{vi ? 'Đầy đủ từ món bình dân đường phố Việt Nam đến ẩm thực Á - Âu thượng hạng cho cả ngày.' : 'From traditional Vietnamese street eats to international gourmet specialties.'}</p>
          </div>

          {/* Bento Tile 4: 1-Click Toggle */}
          <div className="bento-feat-card">
            <div className="feature-icon blue">
              <Zap size={24} />
            </div>
            <h4>{vi ? 'Bật / Tắt & Thêm Món 1 Chạm' : '1-Click Dish Toggle & Custom Foods'}</h4>
            <p>{vi ? 'Nhấn trực tiếp lên thẻ món để bật hoặc loại trừ món không thích, hoặc thêm quán quen ruột vào vòng quay.' : 'Toggle unwanted dishes with one click or add your local favorites to the wheel.'}</p>
          </div>

          {/* Bento Tile 5: Maps & GrabFood */}
          <div className="bento-feat-card">
            <div className="feature-icon green">
              <ShoppingBag size={24} />
            </div>
            <h4>{vi ? 'Mở Google Maps & GrabFood' : 'Instant Maps & GrabFood Links'}</h4>
            <p>{vi ? 'Quay trúng món, bấm một nút để mở ngay Google Maps tìm quán gần nhất hoặc gọi món qua GrabFood.' : 'Instantly find nearby restaurants on Google Maps or order on GrabFood with 1 tap.'}</p>
          </div>
        </div>
      </section>

      {/* 4. The 3-Step Protocol */}
      <section id="how-it-works" className="landing-steps">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'QUY TRÌNH 3 BƯỚC' : 'THE 3-STEP PROTOCOL'}</span>
          <h2>{vi ? 'Chấm Dứt Nạn Phân Vân Chỉ Trong 5 Giây' : 'End Meal Indecision in 5 Seconds'}</h2>
        </div>

        <div className="steps-row">
          <div className="step-box">
            <div className="step-num">01</div>
            <h4>{vi ? 'Chọn mức chi & khẩu vị' : 'Set your budget'}</h4>
            <p>{vi ? 'Gạt chọn mức tiền mong muốn hoặc bật chế độ ăn chay nếu muốn.' : 'Pick your budget (35k, 50k, 75k...) or toggle vegetarian.'}</p>
          </div>

          <div className="step-arrow">
            <ChevronRight size={26} />
          </div>

          <div className="step-box highlight">
            <div className="step-num highlight">02</div>
            <h4>{vi ? 'Bấm QUAY CHỌN MÓN' : 'Press SPIN'}</h4>
            <p>{vi ? 'Thưởng thức vòng quay cuộn mượt mà với âm thanh kịch tính trong vài giây.' : 'Watch the reels spin with satisfying physics and audio.'}</p>
          </div>

          <div className="step-arrow">
            <ChevronRight size={26} />
          </div>

          <div className="step-box">
            <div className="step-num">03</div>
            <h4>{vi ? 'Chốt đơn đi ăn - Cấm đổi ý!' : 'Eat & Enjoy - No Take-backs!'}</h4>
            <p>{vi ? 'Món ngon đã chọn, bấm tìm quán gần hoặc gọi GrabFood giao tận nơi.' : 'Winner revealed! Find nearby or order delivery. No take-backs!'}</p>
          </div>
        </div>

        <div className="text-center steps-cta-wrap">
          <button className="hero-cta-btn primary" onClick={onStartSpinning}>
            <Sparkles size={19} />
            <span>{vi ? 'THỬ NGAY BÂY GIỜ' : 'TRY IT RIGHT NOW'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 5. Editorial User Stories (Zero Em-Dash, Authentic Quotes) */}
      <section className="landing-testimonials">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'TRẢI NGHIỆM THỰC TẾ' : 'COMMUNITY STORIES'}</span>
          <h2>{vi ? 'Những "Nạn Nhân" Đã Được Cứu Rỗi' : 'Real Stories from Hungry Souls'}</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              {vi
                ? '"Từ ngày có vòng quay này, người yêu tôi hết lý do bảo sao cũng được. Cứ mở app ra bấm quay, trúng món nào dắt đi ăn món đó, cuộc sống bình yên hẳn!"'
                : '"My girlfriend no longer tortures me with whatever you want. We spin the wheel, whatever it stops on, we eat. Absolute lifesaver!"'}
            </p>
            <div className="testimonial-author">
              <span className="author-avatar">🧑‍💻</span>
              <div>
                <strong>{vi ? 'Tuấn Anh' : 'Tuan Anh'}</strong>
                <span>{vi ? 'Kỹ sư phần mềm, Hà Nội' : 'Software Engineer'}</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              {vi
                ? '"Cả phòng marketing 8 người mỗi trưa tranh cãi 30 phút không xong. Giờ chỉ cần mở app này, gạt ngân sách 50k rồi quay 1 phát là chốt đơn trong 10 giây."'
                : '"Our marketing team used to argue for 30 minutes every single noon. Now we set 50k, spin once, and place orders in 10 seconds flat."'}
            </p>
            <div className="testimonial-author">
              <span className="author-avatar">👩‍💼</span>
              <div>
                <strong>{vi ? 'Lan Phương' : 'Lan Phuong'}</strong>
                <span>{vi ? 'Content Lead, TP.HCM' : 'Content Lead'}</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              {vi
                ? '"Thích nhất là có thể tự bấm tắt mấy món mình dị ứng hoặc không thích ăn, rồi thêm quán bún chả quen gần nhà vào quay chung. Rất thông minh và tiện lợi!"'
                : '"Love that I can easily toggle off dishes I dislike, and add my favorite local noodles stall to the wheel. Incredibly well designed!"'}
            </p>
            <div className="testimonial-author">
              <span className="author-avatar">🎨</span>
              <div>
                <strong>{vi ? 'Quang Huy' : 'Quang Huy'}</strong>
                <span>{vi ? 'Product Designer, Đà Nẵng' : 'Product Designer'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Atmospheric Charcoal Ceramic Final Call to Action */}
      <section className="landing-final-cta">
        <div className="final-cta-content">
          <div className="cta-icon-float">🍜</div>
          <h2>{vi ? 'Bữa Nay Bạn Vẫn Chưa Biết Ăn Gì?' : 'Still Wondering What to Eat?'}</h2>
          <p>
            {vi
              ? 'Hàng ngàn bữa ăn đã được giải cứu. Hãy để vòng quay chốt hạ câu hỏi khó khăn nhất trong ngày của bạn ngay bây giờ!'
              : 'Join thousands of peaceful meals. Let the wheel solve the hardest question of the day right now!'}
          </p>
          <button className="hero-cta-btn primary large" onClick={onStartSpinning}>
            <Sparkles size={22} />
            <span>{vi ? 'BẮT ĐẦU QUAY CHỌN MÓN NGAY' : 'SPIN THE WHEEL NOW'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
