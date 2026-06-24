import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';

const HERO_IMG = 'https://cdn.poehali.dev/projects/bae17107-083a-4448-bb43-47ef012801a7/files/611ef455-24a7-410c-a5bc-0b82dcf71c8d.jpg';
const FACADE_IMG = 'https://cdn.poehali.dev/projects/bae17107-083a-4448-bb43-47ef012801a7/files/01821fc0-3bba-4a63-a1e9-f2ec28167c45.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'object', label: 'Объект' },
  { id: 'specs', label: 'Характеристики' },
  { id: 'location', label: 'Локация' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'contact', label: 'Контакты' },
];

const SPECS = [
  { icon: 'Maximize', label: 'Площадь', value: '88 м²' },
  { icon: 'MoveVertical', label: 'Потолки', value: '4,5 м' },
  { icon: 'PanelTop', label: 'Панорамных окон', value: '6 в пол' },
  { icon: 'Compass', label: 'Окна', value: 'на 3 стороны' },
  { icon: 'DoorOpen', label: 'Вход', value: 'отдельный' },
  { icon: 'SquareParking', label: 'Парковка', value: 'у фасада' },
  { icon: 'Layers', label: 'Этаж', value: '1-й, ЖК 2024 г.' },
  { icon: 'Hammer', label: 'Отделка', value: 'под ваш проект' },
];

const USAGE = [
  { icon: 'Stethoscope', t: 'Стоматология' },
  { icon: 'TestTube', t: 'Лабораторный пункт' },
  { icon: 'HeartPulse', t: 'Медицинский центр' },
  { icon: 'Glasses', t: 'Оптика' },
  { icon: 'Activity', t: 'Медтехника' },
  { icon: 'Salad', t: 'Здоровое питание' },
  { icon: 'Scale', t: 'Нотариальная контора' },
  { icon: 'PawPrint', t: 'Ветклиника' },
];

const PHOTO_1 = 'https://cdn.poehali.dev/projects/bae17107-083a-4448-bb43-47ef012801a7/files/f5a13dae-1455-4b3c-83e8-ea074e45d10e.jpg';
const PHOTO_2 = 'https://cdn.poehali.dev/projects/bae17107-083a-4448-bb43-47ef012801a7/files/1a645226-3049-480a-ae78-25260ea51402.jpg';
const PHOTO_3 = 'https://cdn.poehali.dev/projects/bae17107-083a-4448-bb43-47ef012801a7/files/edc23e24-030c-4038-a82a-e56825ca3c9b.jpg';
const FLOORPLAN = 'https://cdn.poehali.dev/projects/bae17107-083a-4448-bb43-47ef012801a7/files/249ae011-bc9a-41f8-a911-311a761e00bf.jpg';

const GALLERY = [PHOTO_1, PHOTO_2, PHOTO_3];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container || container.querySelector('iframe')) return;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A1576949f2db510e51cb4e86a6e7f99929edd3d5fbe5b6fb7304183f55b5fdd26&width=560&height=460&lang=ru_RU&scroll=true';
    container.appendChild(script);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    setForm({ name: '', phone: '', message: '' });
    setPopupOpen(false);
  };

  const formFields = (
    <>
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Имя</label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          placeholder="Как к вам обращаться"
          className="mt-2 rounded-none bg-background border-border h-12"
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Телефон</label>
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          placeholder="+7 (___) ___-__-__"
          className="mt-2 rounded-none bg-background border-border h-12"
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Сообщение</label>
        <Textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Интересует показ / вопрос по объекту"
          className="mt-2 rounded-none bg-background border-border min-h-[110px]"
        />
      </div>
      <Button type="submit" size="lg" className="w-full bg-gold text-primary-foreground hover:bg-gold/90 rounded-none h-13">
        Отправить заявку
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo('home')} className="font-display text-2xl md:text-[28px] tracking-wide leading-none">
            <span className="gold-text-gradient">М</span><span className="text-gold mx-0.5">·</span>88
            <span className="hidden lg:inline-block ml-3 align-middle text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans">Аренда</span>
          </button>
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="story-link hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+74951416515" className="text-sm text-foreground hover:text-gold transition-colors font-display text-lg">
              +7 (495) 141-65-15
            </a>
            <Button onClick={() => setPopupOpen(true)} className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none tracking-wide">
              Оставить заявку
            </Button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 px-6 py-5 flex flex-col gap-4">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => { scrollTo(n.id); setMenuOpen(false); }} className="text-left text-muted-foreground hover:text-gold">
                {n.label}
              </button>
            ))}
            <div className="hairline-divider my-1" />
            <a href="tel:+74951416515" className="font-display text-xl text-gold">+7 (495) 141-65-15</a>
            <Button onClick={() => { setPopupOpen(true); setMenuOpen(false); }} className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none tracking-wide mt-1">
              Оставить заявку
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Помещение" className="w-full h-full object-cover slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="reveal eyebrow text-gold tracking-[0.25em] md:tracking-luxe text-[11px] md:text-sm uppercase mb-5 md:mb-6" style={{ animationDelay: '0.1s' }}>
              Аренда · ЖК «Томилино Парк», Люберцы
            </p>
            <h1 className="reveal font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.98] md:leading-[0.95] mb-5 md:mb-6" style={{ animationDelay: '0.25s' }}>
              Коммерческое<br />помещение <span className="gold-text-gradient">88 м²</span>
            </h1>
            <p className="reveal text-base md:text-xl text-muted-foreground max-w-xl mb-8 md:mb-10 leading-relaxed" style={{ animationDelay: '0.4s' }}>
              Первый этаж ЖК «Томилино Парк».
              Гарантированный трафик 300–800 человек в день.
            </p>
            <div className="reveal flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6" style={{ animationDelay: '0.55s' }}>
              <Button onClick={() => scrollTo('contact')} size="lg" className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none px-10 h-14 md:h-16 text-base md:text-lg w-full sm:w-auto">
                Запросить информацию
              </Button>
              <button onClick={() => scrollTo('object')} className="flex items-center justify-center sm:justify-start gap-2 px-8 h-14 md:h-16 border border-border hover:border-gold/50 text-base md:text-lg text-muted-foreground hover:text-foreground transition-colors w-full sm:w-auto">
                Подробнее об объекте <Icon name="ArrowDown" size={18} />
              </button>
            </div>
            <div className="reveal mt-10 md:mt-14" style={{ animationDelay: '0.7s' }}>
              <div className="hairline-divider max-w-xs mb-6" />
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="font-display text-4xl sm:text-5xl md:text-6xl gold-text-gradient">220 000 ₽</span>
                <span className="text-sm md:text-base text-muted-foreground mb-1 md:mb-2">/ мес · 2 500 ₽ за м²</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECT */}
      <section id="object" className="py-20 md:py-36">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="eyebrow text-gold tracking-luxe text-xs uppercase mb-4 md:mb-5">Объект</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 leading-tight">
                Пространство, которое работает на вас
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 md:mb-6">
                Помещение свободной планировки без отделки — реализуйте собственный
                дизайн-проект под любой формат бизнеса. Высота потолков 4,5 метра
                открывает возможность организации мезонина и увеличения полезной площади.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 md:mb-10">
                Шесть панорамных окон в пол обеспечивают отличную видимость с улицы
                и естественное освещение в течение всего дня. Подведены все центральные
                коммуникации — можно приступать к ремонту сразу после подписания договора.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { v: '88', l: 'м² площадь' },
                  { v: '4,5', l: 'м потолки' },
                  { v: '300+', l: 'чел/день' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-3xl md:text-4xl text-gold">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-first md:order-last">
              <div className="absolute -inset-2 md:-inset-3 border border-gold/30 -z-10" />
              <img src={FACADE_IMG} alt="Фасад ЖК" className="w-full aspect-[4/3] md:aspect-[4/5] object-cover" />
            </div>
          </div>

          {/* USAGE */}
          <div className="mt-20 md:mt-28">
            <p className="text-gold tracking-luxe text-xs uppercase mb-3 text-center">Назначение</p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-center mb-4">Идеально подходит под</h3>
            <p className="text-sm md:text-base text-muted-foreground text-center max-w-lg mx-auto mb-10 md:mb-12">
              Готовый формат под медицину и сервис — арендаторы из этих сфер ценят
              высокий пешеходный трафик возле поликлиники.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {USAGE.map((u) => (
                <div key={u.t} className="premium-card bg-background p-6 md:p-8 flex flex-col items-center text-center gap-3 md:gap-4 hover:bg-card transition-colors group">
                  <Icon name={u.icon} size={28} className="text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{u.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="py-20 md:py-36 bg-card border-y border-border">
        <div className="container">
          <p className="eyebrow text-gold tracking-luxe text-xs uppercase mb-3">Характеристики</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-10 md:mb-14 max-w-xl leading-tight">Всё для вашего бизнеса</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {SPECS.map((s) => (
              <div key={s.label} className="premium-card bg-card p-5 md:p-8">
                <Icon name={s.icon} size={26} className="text-gold mb-4 md:mb-6" />
                <div className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-wide mb-1">{s.label}</div>
                <div className="font-display text-xl md:text-2xl">{s.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 md:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { i: 'CalendarClock', t: 'Арендные каникулы', d: 'На время ремонта — условия обсуждаются' },
              { i: 'FileSignature', t: 'Долгосрочный договор', d: 'С фиксацией арендной ставки' },
              { i: 'Eye', t: 'Гибкий график показов', d: 'Покажем объект в удобное время' },
            ].map((c) => (
              <div key={c.t} className="premium-card border border-border p-6 md:p-7 hover:border-gold/40">
                <Icon name={c.i} size={24} className="text-gold mb-4" />
                <div className="font-display text-lg md:text-xl mb-2">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-20 md:py-36">
        <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="eyebrow text-gold tracking-luxe text-xs uppercase mb-4 md:mb-5">Локация</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 leading-tight">мкр. Мирный, Люберцы (Томилино)</h2>
            <div className="space-y-5 md:space-y-7">
              {[
                { i: 'MapPin', t: 'Напротив поликлиники', d: 'Единственная в районе — гарантированный поток 300–800 человек в день' },
                { i: 'Route', t: '10 км от МКАД', d: 'Удобный транспортный доступ' },
                { i: 'Train', t: '10 минут до м. Котельники', d: 'Близость к метро' },
                { i: 'SquareParking', t: 'Парковка перед фасадом', d: 'Удобно для клиентов и сотрудников' },
              ].map((l) => (
                <div key={l.t} className="flex gap-4 md:gap-5">
                  <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 border border-gold/40 flex items-center justify-center">
                    <Icon name={l.i} size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">{l.t}</div>
                    <div className="text-sm text-muted-foreground">{l.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            ref={mapRef}
            className="relative h-[320px] sm:h-[420px] md:h-[520px] border border-border overflow-hidden [&_iframe]:!w-full [&_iframe]:!h-full"
          />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-36 bg-card border-y border-border">
        <div className="container">
          <p className="eyebrow text-gold tracking-luxe text-xs uppercase mb-3">Галерея</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">Взгляд изнутри</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mb-10 md:mb-14">
            Светлое помещение с панорамными окнами — оцените масштаб и потенциал пространства.
          </p>
          <div className="grid md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group ring-1 ring-border hover:ring-gold/50 transition-all ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`Коммерческое помещение — фото ${i + 1}`}
                  loading="lazy"
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${i === 0 ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[4/3]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* FLOORPLAN */}
          <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative ring-1 ring-border hover:ring-gold/50 transition-all bg-background p-4 md:p-8">
              <div className="shimmer-line absolute top-0 inset-x-0 h-px" />
              <img
                src={FLOORPLAN}
                alt="Планировка помещения 88 м²"
                loading="lazy"
                className="w-full object-contain"
              />
            </div>
            <div>
              <p className="eyebrow text-gold tracking-luxe text-xs uppercase mb-4 md:mb-5">Планировка</p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-5 md:mb-6 leading-tight">
                Свободная планировка 88 м²
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Прямоугольное пространство без внутренних перегородок — легко адаптировать
                под любой формат. Окна на три стороны и отдельный вход дают максимум
                сценариев для зонирования.
              </p>
              <div className="grid grid-cols-2 gap-px bg-border">
                {[
                  { v: '88 м²', l: 'Общая площадь' },
                  { v: '4,5 м', l: 'Высота потолков' },
                  { v: '6', l: 'Панорамных окон' },
                  { v: '1', l: 'Отдельный вход' },
                ].map((s) => (
                  <div key={s.l} className="premium-card bg-card p-5 md:p-6">
                    <div className="font-display text-2xl md:text-3xl text-gold mb-1">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-36">
        <div className="container grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <p className="eyebrow text-gold tracking-luxe text-xs uppercase mb-4 md:mb-5">Контакты</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 leading-tight">Запросите информацию или забронируйте показ</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 md:mb-10">
              Оставьте заявку — расскажем подробности, обсудим арендные каникулы и
              согласуем удобное время для просмотра помещения. Отвечаем в течение рабочего дня.
            </p>
            <div className="space-y-4 md:space-y-5">
              <a href="tel:+74951416515" className="flex items-center gap-4 hover:text-gold transition-colors">
                <Icon name="Phone" size={20} className="text-gold" />
                <span className="font-display text-xl md:text-2xl">+7 (495) 141-65-15</span>
              </a>
              <a href="mailto:i.kogane@napetrovke.ru" className="flex items-center gap-4 hover:text-gold transition-colors">
                <Icon name="Mail" size={20} className="text-gold shrink-0" />
                <span className="text-base md:text-lg break-all">i.kogane@napetrovke.ru</span>
              </a>
              <div className="flex items-start gap-4 text-muted-foreground">
                <Icon name="MapPin" size={20} className="text-gold shrink-0 mt-0.5" />
                <span>Московская обл., г.о. Люберцы, пгт Мирный,<br className="hidden sm:block" /> ул. Военкора Максима Фомина, 6</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="relative border border-gold/25 gold-border-glow p-6 sm:p-8 md:p-10 bg-card space-y-5">
            <div className="shimmer-line absolute top-0 inset-x-0 h-px" />
            {formFields}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="hairline-divider" />
        <div className="container py-12 md:py-14">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div>
              <div className="font-display text-2xl text-foreground mb-3">
                <span className="gold-text-gradient">М</span><span className="text-gold mx-0.5">·</span>88 <span className="text-muted-foreground text-lg">— Аренда</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Коммерческое помещение 88 м² на первом этаже нового ЖК напротив поликлиники.
              </p>
            </div>
            <div className="text-sm space-y-2.5">
              <div className="text-gold tracking-luxe text-xs uppercase mb-4">Контакты</div>
              <a href="tel:+74951416515" className="block text-foreground hover:text-gold transition-colors">+7 (495) 141-65-15</a>
              <a href="mailto:i.kogane@napetrovke.ru" className="block text-muted-foreground hover:text-gold transition-colors break-all">i.kogane@napetrovke.ru</a>
              <p className="text-muted-foreground pt-1">Московская обл., г.о. Люберцы, пгт Мирный, ул. Военкора Максима Фомина, 6</p>
            </div>
            <div className="text-sm space-y-2.5 md:text-right">
              <div className="text-gold tracking-luxe text-xs uppercase mb-4">Условия</div>
              <p className="font-display text-2xl text-gold">220 000 ₽<span className="text-muted-foreground text-base font-sans"> / мес</span></p>
              <p className="text-muted-foreground">2 500 ₽ за м² · 88 м²</p>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 text-xs text-muted-foreground">
            © 2024 · Все права защищены
          </div>
        </div>
      </footer>

      {/* POPUP DIALOG */}
      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="rounded-none border border-gold/25 gold-border-glow bg-card p-6 sm:p-8 max-w-md">
          <div className="shimmer-line absolute top-0 inset-x-0 h-px" />
          <p className="eyebrow text-gold tracking-luxe text-xs uppercase mb-2">Заявка</p>
          <h3 className="font-display text-2xl md:text-3xl mb-1 leading-tight">Оставьте заявку</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Перезвоним и расскажем подробности по объекту 88 м².
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {formFields}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;