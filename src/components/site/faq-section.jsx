import { faq } from '@/data/site.js';
import Faq from '@/components/ui/faq';
import { Avatar } from '@/components/site/avatar.jsx';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { FrameRule } from '@/components/site/frame.jsx';

// rareui FAQ: questions as chat bubbles, my answers pop in beside my portrait.
export default function FaqSection() {
  const { lang } = useI18n();
  const items = faq.items.map((item, i) => ({ id: `q${i}`, question: item.q[lang], answer: item.a[lang] }));
  return (
    <section id="faq" className="relative mx-auto max-w-5xl scroll-mt-20 px-5 py-20 md:px-6 md:py-28">
      <FrameRule className="top-0" />
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">FAQ</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{faq.title[lang]}</h2>
          <p className="mt-3 text-muted-foreground">{faq.sub[lang]}</p>
        </div>
        <Faq
          items={items}
          defaultValue="q0"
          accent="#f2f2f2"
          avatar={<Avatar />}
          style={{ '--faq-ink': '#0b0b0b' }}
          className="max-w-none"
        />
      </div>
    </section>
  );
}

