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
  Smile, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import type { Language } from '@/lib/i18n';

interface LandingPageProps {
  language: Language;
  onStartSpinning: () => void;
}

export function LandingPage({ language, onStartSpinning }: LandingPageProps) {
  const vi = language === 'vi';

  return (
    <div className="landing-container">
      {/* 1. Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">
          <Sparkles size={16} className="hero-badge-icon" />
          <span>{vi ? 'GIẢI PHÁP ĐỘC QUYỀN CHO VẤN NẠN THẾ KỶ' : 'THE ULTIMATE LUNCH DECISION MAKER'}</span>
        </div>

        <h1 className="hero-title">
          {vi ? (
            <>
              Khi người yêu hay bạn bè bảo: <br />
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
            ? 'Đừng để 30 phút nghỉ trưa quý báu trôi qua trong vô vọng. Bấm quay một phát — thuật toán ẩm thực chốt hạ món ngon ngay lập tức, khỏi đau đầu suy nghĩ, cấm đổi ý!'
            : 'Stop wasting precious lunch break debating. One spin and your meal is settled by delicious fate — fair, fast, and no take-backs!'}
        </p>

        <div className="hero-actions">
          <button className="hero-cta-btn primary" onClick={onStartSpinning}>
            <Sparkles size={20} />
            <span>{vi ? 'VÀO QUAY CHỌN MÓN NGAY' : 'SPIN FOR LUNCH NOW'}</span>
            <ArrowRight size={18} />
          </button>
          <a href="#how-it-works" className="hero-cta-btn secondary">
            <span>{vi ? 'Xem cách hoạt động' : 'How it works'}</span>
          </a>
        </div>

        <div className="hero-trust-row">
          <span className="trust-item">
            <CheckCircle2 size={16} className="trust-icon" />
            {vi ? '100% Miễn phí & Không quảng cáo' : '100% Free & No Ads'}
          </span>
          <span className="trust-dot">•</span>
          <span className="trust-item">
            <ShieldCheck size={16} className="trust-icon" />
            {vi ? 'Không cần đăng ký tài khoản' : 'No Account or Login'}
          </span>
          <span className="trust-dot">•</span>
          <span className="trust-item">
            <Zap size={16} className="trust-icon" />
            {vi ? 'Chốt món trong 5 giây' : 'Decide in 5 Seconds'}
          </span>
        </div>
      </section>

      {/* 2. Relatable Pain Point Scenarios */}
      <section className="landing-scenarios">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'TÌNH HUỐNG THỰC TẾ' : 'RELATABLE MOMENTS'}</span>
          <h2>{vi ? 'Có Phải Bạn Từng Rơi Vào Cảnh Này?' : 'Sounds Familiar?'}</h2>
          <p>{vi ? 'Những cuộc đối thoại bế tắc mỗi trưa mà ai trong chúng ta cũng từng trải qua' : 'The classic everyday lunch struggles we all experience'}</p>
        </div>

        <div className="scenarios-grid">
          <div className="scenario-card">
            <div className="scenario-icon-wrap rose">
              <Heart size={24} />
            </div>
            <h3>{vi ? 'Đi ăn cùng Người Yêu' : 'Dining with Your Partner'}</h3>
            <p className="scenario-quote">
              {vi 
                ? '— "Trưa nay em ăn gì?"\n— "Ăn gì cũng được anh!"\n— "Ăn bún bò nhé?"\n— "Thôi béo lắm!"\n— "Vậy cơm tấm?"\n— "Khô cổ họng lắm!"'
                : '— "What do you want to eat?"\n— "Anything is fine!"\n— "Burgers?"\n— "Too greasy!"\n— "Salad?"\n— "Too boring!"'}
            </p>
            <div className="scenario-footer">
              <span className="scenario-tag-fix">{vi ? '💡 Giải pháp: Bấm quay, máy chọn là phải ăn!' : '💡 Fix: Let the wheel decide, no excuses!'}</span>
            </div>
          </div>

          <div className="scenario-card">
            <div className="scenario-icon-wrap amber">
              <Users size={24} />
            </div>
            <h3>{vi ? 'Team Văn Phòng 10 Người' : 'Office Team of 10'}</h3>
            <p className="scenario-quote">
              {vi
                ? '11h30 bắt đầu hỏi: "Hôm nay ăn gì cả nhà ơi?". Đến 12h15 cả nhóm vẫn nhìn nhau, đói mốc meo, app đồ ăn lướt mòn ngón tay vẫn chưa chốt được quán.'
                : 'At 11:30 AM someone asks "What to order today?". At 12:15 PM everyone is still scrolling delivery apps, hungry and undecided.'}
            </p>
            <div className="scenario-footer">
              <span className="scenario-tag-fix">{vi ? '💡 Giải pháp: Chiếu màn hình, quay 1 phát ăn ngay!' : '💡 Fix: Cast to screen, spin once, done!'}</span>
            </div>
          </div>

          <div className="scenario-card">
            <div className="scenario-icon-wrap emerald">
              <HelpCircle size={24} />
            </div>
            <h3>{vi ? 'Một Mình Tự Hỏi Lòng' : 'Solo Dining Crisis'}</h3>
            <p className="scenario-quote">
              {vi
                ? 'Mở hết ShopeeFood, GrabFood, Baemin... lướt qua lướt lại 100 quán, cho vào giỏ rồi lại xóa ra, cuối cùng hết giờ nghỉ trưa đành pha mì gói.'
                : 'Opening every food app, adding dishes to cart, removing them, scrolling 45 minutes, ending up eating instant noodles.'}
            </p>
            <div className="scenario-footer">
              <span className="scenario-tag-fix">{vi ? '💡 Giải pháp: Đặt mức giá, quay phát chốt luôn!' : '💡 Fix: Set budget, spin, order immediately!'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Showcase */}
      <section className="landing-features">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'TÍNH NĂNG VƯỢT TRỘI' : 'FEATURE HIGHLIGHTS'}</span>
          <h2>{vi ? 'Vũ Khí Bí Mật Của Mỗi Bữa Trưa' : 'Everything You Need for Lunch'}</h2>
          <p>{vi ? 'Đơn giản, mượt mà và thực sự giải quyết được vấn đề chọn món' : 'Simple, fast and genuinely useful'}</p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon red">
              <RotateCcw size={26} />
            </div>
            <h4>{vi ? 'Vòng Quay Roulette Cuộn Ngang' : 'Horizontal Roulette Rolling'}</h4>
            <p>{vi ? 'Mở món kịch tính với âm thanh sinh động, kim định vị laser và tỷ lệ xác suất hoàn toàn công bằng.' : 'Exciting rolling mechanics with authentic sounds and balanced probabilities.'}</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon amber">
              <SlidersHorizontal size={26} />
            </div>
            <h4>{vi ? 'Cân Bằng Ngân Sách Thông Minh' : 'Budget-Balanced Algorithm'}</h4>
            <p>{vi ? 'Chọn mức giá mong muốn (35k - 150k hoặc tự chỉnh). Hệ thống sẽ tự tính toán để mức chi trung bình luôn chuẩn ví tiền.' : 'Pick your budget (35k - 150k). The algorithm ensures expected meal cost stays on target.'}</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon emerald">
              <Utensils size={26} />
            </div>
            <h4>{vi ? 'Hơn 130+ Món Ngon Việt & Á - Âu' : '130+ Popular & Gourmet Dishes'}</h4>
            <p>{vi ? 'Từ món bình dân quen thuộc (Cơm Tấm, Phở, Bánh Mì, Bún Chả) đến ẩm thực Nhật, Hàn, Thái và món Âu sang trọng.' : 'Comprehensive culinary catalog from traditional street food to gourmet specialties.'}</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon blue">
              <Zap size={26} />
            </div>
            <h4>{vi ? 'Bật / Tắt & Thêm Món Trong 1 Click' : '1-Click Dish Toggle & Custom Foods'}</h4>
            <p>{vi ? 'Dễ dàng loại bỏ món bạn không thích bằng cách bấm thẳng vào thẻ món, hoặc thêm quán quen ruột vào danh sách.' : 'Toggle unwanted dishes with one click or add your favorite local stalls effortlessly.'}</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon green">
              <ShoppingBag size={26} />
            </div>
            <h4>{vi ? 'Mở GrabFood & Tìm Quán Tức Thì' : 'GrabFood & Maps 1-Tap Links'}</h4>
            <p>{vi ? 'Sau khi quay trúng món, chỉ cần bấm nút để mở ngay Google Maps tìm quán gần bạn hoặc đặt món giao tận nơi qua GrabFood.' : 'Instantly find nearby restaurants on Google Maps or place an order on GrabFood.'}</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon purple">
              <ShieldCheck size={26} />
            </div>
            <h4>{vi ? 'Bảo Mật Local-First 100%' : '100% Local & Privacy-First'}</h4>
            <p>{vi ? 'Không lưu dữ liệu lên server, không cần đăng nhập. Toàn bộ thiết lập của bạn được lưu an toàn trên chính trình duyệt này.' : 'No account, no tracking. All your preferences and custom dishes stay in your local browser.'}</p>
          </div>
        </div>
      </section>

      {/* 4. How it works (3 simple steps) */}
      <section id="how-it-works" className="landing-steps">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'DỄ NHƯ ĂN KẸO' : 'HOW IT WORKS'}</span>
          <h2>{vi ? '3 Bước Chấm Dứt Nạn "Ăn Gì Cũng Được"' : '3 Steps to End Lunch Indecision'}</h2>
        </div>

        <div className="steps-row">
          <div className="step-box">
            <div className="step-num">01</div>
            <h4>{vi ? 'Chọn mức chi' : 'Set your budget'}</h4>
            <p>{vi ? 'Gạt chọn mức tiền (35k, 50k, 75k, 100k...) hoặc bật chế độ ăn chay nếu muốn.' : 'Pick your budget (35k, 50k, 75k...) or toggle vegetarian.'}</p>
          </div>

          <div className="step-arrow">
            <ChevronRight size={28} />
          </div>

          <div className="step-box highlight">
            <div className="step-num highlight">02</div>
            <h4>{vi ? 'Bấm QUAY CHỌN MÓN' : 'Press SPIN'}</h4>
            <p>{vi ? 'Thưởng thức vòng quay cuộn mượt mà với âm thanh kịch tính trong vài giây.' : 'Watch the reels spin with satisfying physics and audio.'}</p>
          </div>

          <div className="step-arrow">
            <ChevronRight size={28} />
          </div>

          <div className="step-box">
            <div className="step-num">03</div>
            <h4>{vi ? 'Chốt đơn đi ăn!' : 'Enjoy your meal'}</h4>
            <p>{vi ? 'Món ngon đã chọn, bấm tìm quán hoặc gọi GrabFood giao đến. Cấm đổi ý!' : 'Winner revealed! Find nearby or order delivery. No take-backs!'}</p>
          </div>
        </div>

        <div className="text-center steps-cta-wrap">
          <button className="hero-cta-btn primary" onClick={onStartSpinning}>
            <Sparkles size={20} />
            <span>{vi ? 'THỬ NGAY BÂY GIỜ' : 'TRY IT RIGHT NOW'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* 5. User Quotes / Social Proof */}
      <section className="landing-testimonials">
        <div className="section-intro text-center">
          <span className="section-tag">{vi ? 'NGƯỜI TRONG CUỘC LÊN TIẾNG' : 'USER STORIES'}</span>
          <h2>{vi ? 'Những "Nạn Nhân" Đã Được Cứu Rỗi' : 'Real Stories from the Hungry'}</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              {vi
                ? '"Từ ngày có vòng quay này, người yêu tôi hết lý do bảo "sao cũng được". Cứ mở app ra bấm quay, trúng món nào dắt đi ăn món đó, cuộc sống bình yên hẳn!"'
                : '"My girlfriend no longer tortures me with "whatever you want". We spin the wheel, whatever it stops on, we eat. Absolute lifesaver!"'}
            </p>
            <div className="testimonial-author">
              <span className="author-avatar">🧑‍💻</span>
              <div>
                <strong>{vi ? 'Tuấn Anh' : 'Tuan Anh'}</strong>
                <span>{vi ? 'Software Engineer, Hà Nội' : 'Software Engineer'}</span>
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

      {/* 6. Final Call to Action Banner */}
      <section className="landing-final-cta">
        <div className="final-cta-content">
          <div className="cta-icon-float">🍜</div>
          <h2>{vi ? 'Trưa Nay Bạn Vẫn Chưa Biết Ăn Gì?' : 'Still Wondering What to Eat?'}</h2>
          <p>
            {vi
              ? 'Hàng ngàn bữa trưa đã được cứu rỗi. Hãy để vòng quay giải quyết câu hỏi khó khăn nhất trong ngày của bạn ngay bây giờ!'
              : 'Join thousands of peaceful lunches. Let the wheel solve the hardest question of the day right now!'}
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
