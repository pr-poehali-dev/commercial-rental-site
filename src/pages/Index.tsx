import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

const GALLERY = [HERO_IMG, FACADE_IMG, HERO_IMG, FACADE_IMG];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="font-display text-2xl tracking-wide">
            М<span className="text-gold">·</span>88
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('contact')} className="hidden md:inline-flex bg-gold text-primary-foreground hover:bg-gold/90 rounded-none">
            Оставить заявку
          </Button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 px-6 py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => { scrollTo(n.id); setMenuOpen(false); }} className="text-left text-muted-foreground hover:text-gold">
                {n.label}
              </button>
            ))}
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
        <div className="container relative z-10 pt-20">
          <div className="max-w-2xl">
            <p className="reveal text-gold tracking-luxe text-xs md:text-sm uppercase mb-6" style={{ animationDelay: '0.1s' }}>
              Аренда · мкр. Мирный, Люберцы
            </p>
            <h1 className="reveal font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6" style={{ animationDelay: '0.25s' }}>
              Коммерческое<br />помещение <span className="text-gold">88 м²</span>
            </h1>
            <p className="reveal text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed" style={{ animationDelay: '0.4s' }}>
              Первый этаж нового ЖК 2024 года напротив единственной в районе поликлиники.
              Гарантированный трафик 300–800 человек в день.
            </p>
            <div className="reveal flex flex-wrap items-center gap-6" style={{ animationDelay: '0.55s' }}>
              <Button onClick={() => scrollTo('contact')} size="lg" className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none px-8 h-13">
                Запросить информацию
              </Button>
              <button onClick={() => scrollTo('object')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Подробнее об объекте <Icon name="ArrowDown" size={16} />
              </button>
            </div>
            <div className="reveal mt-14 flex items-end gap-3" style={{ animationDelay: '0.7s' }}>
              <span className="font-display text-5xl md:text-6xl text-gold">220 000 ₽</span>
              <span className="text-muted-foreground mb-2">/ мес · 2 500 ₽ за м²</span>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECT */}
      <section id="object" className="py-28 md:py-36">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold tracking-luxe text-xs uppercase mb-5">Объект</p>
              <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
                Пространство, которое работает на вас
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Помещение свободной планировки без отделки — реализуйте собственный
                дизайн-проект под любой формат бизнеса. Высота потолков 4,5 метра
                открывает возможность организации мезонина.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Шесть панорамных окон в пол обеспечивают отличную видимость с улицы
                и естественное освещение в течение всего дня. Подведены все центральные коммуникации.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { v: '88', l: 'м² площадь' },
                  { v: '4,5', l: 'м потолки' },
                  { v: '300+', l: 'чел/день' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-4xl text-gold">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 border border-gold/30 -z-10" />
              <img src={FACADE_IMG} alt="Фасад ЖК" className="w-full aspect-[4/5] object-cover" />
            </div>
          </div>

          {/* USAGE */}
          <div className="mt-28">
            <p className="text-gold tracking-luxe text-xs uppercase mb-3 text-center">Назначение</p>
            <h3 className="font-display text-3xl md:text-4xl text-center mb-12">Идеально подходит под</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {USAGE.map((u) => (
                <div key={u.t} className="bg-background p-8 flex flex-col items-center text-center gap-4 hover:bg-card transition-colors group">
                  <Icon name={u.icon} size={30} className="text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{u.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="py-28 md:py-36 bg-card border-y border-border">
        <div className="container">
          <p className="text-gold tracking-luxe text-xs uppercase mb-3">Характеристики</p>
          <h2 className="font-display text-4xl md:text-5xl mb-14 max-w-xl leading-tight">Всё для вашего бизнеса</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {SPECS.map((s) => (
              <div key={s.label} className="bg-card p-8">
                <Icon name={s.icon} size={28} className="text-gold mb-6" />
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{s.label}</div>
                <div className="font-display text-2xl">{s.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { i: 'CalendarClock', t: 'Арендные каникулы', d: 'На время ремонта — условия обсуждаются' },
              { i: 'FileSignature', t: 'Долгосрочный договор', d: 'С фиксацией арендной ставки' },
              { i: 'Eye', t: 'Гибкий график показов', d: 'Покажем объект в удобное время' },
            ].map((c) => (
              <div key={c.t} className="border border-border p-7">
                <Icon name={c.i} size={24} className="text-gold mb-4" />
                <div className="font-display text-xl mb-2">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-28 md:py-36">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold tracking-luxe text-xs uppercase mb-5">Локация</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">мкр. Мирный, Люберцы (Томилино)</h2>
            <div className="space-y-7">
              {[
                { i: 'MapPin', t: 'Напротив поликлиники', d: 'Единственная в районе — гарантированный поток 300–800 человек в день' },
                { i: 'Route', t: '10 км от МКАД', d: 'Удобный транспортный доступ' },
                { i: 'Train', t: '10 минут до м. Котельники', d: 'Близость к метро' },
                { i: 'SquareParking', t: 'Парковка перед фасадом', d: 'Удобно для клиентов и сотрудников' },
              ].map((l) => (
                <div key={l.t} className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 border border-gold/40 flex items-center justify-center">
                    <Icon name={l.i} size={20} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-display text-xl mb-1">{l.t}</div>
                    <div className="text-sm text-muted-foreground">{l.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[420px] md:h-[520px] border border-border overflow-hidden">
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=37.948%2C55.654&z=13&text=Люберцы%20Томилино%20мкр%20Мирный"
              className="w-full h-full grayscale-[0.4] contrast-[1.1]"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 md:py-36 bg-card border-y border-border">
        <div className="container">
          <p className="text-gold tracking-luxe text-xs uppercase mb-3">Галерея</p>
          <h2 className="font-display text-4xl md:text-5xl mb-14">Взгляд изнутри</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((img, i) => (
              <div key={i} className={`overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img
                  src={img}
                  alt={`Фото ${i + 1}`}
                  className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 md:py-36">
        <div className="container grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-gold tracking-luxe text-xs uppercase mb-5">Контакты</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">Запросите информацию или забронируйте показ</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Оставьте заявку — расскажем подробности, обсудим арендные каникулы и
              согласуем удобное время для просмотра помещения.
            </p>
            <div className="space-y-5">
              <a href="tel:+70000000000" className="flex items-center gap-4 hover:text-gold transition-colors">
                <Icon name="Phone" size={20} className="text-gold" />
                <span className="font-display text-2xl">+7 (000) 000-00-00</span>
              </a>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Icon name="MapPin" size={20} className="text-gold" />
                <span>мкр. Мирный, г. Люберцы (Томилино)</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="border border-border p-8 md:p-10 bg-card space-y-5">
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
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-display text-xl text-foreground">М<span className="text-gold">·</span>88 — Аренда</div>
          <div>© 2024 · мкр. Мирный, Люберцы · 88 м² · 220 000 ₽/мес</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
