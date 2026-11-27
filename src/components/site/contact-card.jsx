import { useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { postcard } from '@/data/site.js';
import signature from '@/assets/images/avatar.png';

const MOTIVES = ['stage', 'alternance', 'projet', 'autre'];
const MIN_FILL_MS = 3000; // the server ignores cards sent faster than this (bots)
const INK = 'text-[#24304f]';
const FIELD = 'bg-transparent font-serif italic text-[#1c2747] placeholder:text-[#9a8f7a] focus:outline-none aria-invalid:border-[#d33a2c]';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Stamp: off-white paper, a hairline ink frame, the RY signature, one touch of pink.
function Stamp() {
  return (
    <span
      aria-hidden="true"
      className="rotate-3 bg-[radial-gradient(circle_at_center,transparent_2.2px,#fffdf8_2.7px)] bg-size-[8px_8px] bg-position-[-4px_-4px] p-[5px] drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.22)]"
    >
      <span className="flex h-[80px] w-[64px] flex-col items-center justify-between bg-[#fbf8f1] px-1.5 py-1.5 font-mono text-[6px] tracking-[0.14em] text-[#24304f]/70 ring-1 ring-[#24304f]/30 ring-inset">
        <span className="flex w-full items-center justify-between">
          FRANCE
          <span className="size-1 rounded-full bg-[#E0569F]" />
        </span>
        <img src={signature} alt="" className="size-10 object-contain mix-blend-multiply" />
        <span className="whitespace-nowrap tracking-[0.08em]">PARIS · {new Date().getFullYear()}</span>
      </span>
    </span>
  );
}

function Postmark({ lang }) {
  const date = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '·');
  return (
    <m.span
      aria-hidden="true"
      className="pointer-events-none absolute top-6 right-12 grid size-[68px] place-items-center rounded-full border-2 border-[#24304f]/60 text-center font-mono text-[8px] leading-snug text-[#24304f]/70"
      initial={{ opacity: 0, scale: 1.6, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: -14 }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
    >
      PARIS
      <br />
      {date}
    </m.span>
  );
}

export function ContactCard({ linkedin, github }) {
  const { lang } = useI18n();
  const reduce = useReducedMotion();
  const shownAt = useRef(Date.now());
  const trap = useRef(null);
  const messageRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', motive: 'stage', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | posted | sent
  const [error, setError] = useState(null); // field name, 'rate' or 'unavailable'
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  // The message grows with its text instead of scrolling inside the card.
  const grow = () => {
    const el = messageRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const set = key => e => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (error === key) setError(null);
  };

  const submit = async e => {
    e.preventDefault();
    if (status !== 'idle') return;
    const el = e.currentTarget;
    if (!el.checkValidity()) {
      el.reportValidity();
      return;
    }
    setStatus('sending');
    setError(null);
    const wait = MIN_FILL_MS - (Date.now() - shownAt.current);
    if (wait > 0) await sleep(wait);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: trap.current?.value ?? '', elapsed: Date.now() - shownAt.current, lang })
      });
      if (res.ok) {
        setStatus('posted');
        await sleep(reduce ? 200 : 750);
        setStatus('sent');
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(res.status === 429 ? 'rate' : data.field && postcard.errors[data.field] ? data.field : 'unavailable');
    } catch {
      setError('unavailable');
    }
    setStatus('idle');
  };

  const again = () => {
    setForm(f => ({ ...f, message: '' }));
    shownAt.current = Date.now();
    requestAnimationFrame(grow);
    setStatus('idle');
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl text-left">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <m.div
            key="sent"
            role="status"
            className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-foreground/15 px-6 py-12 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase">✓ {postcard.sentTitle[lang]}</p>
              <p className="mt-3 font-serif text-3xl italic">{postcard.sentText[lang]}</p>
              <button type="button" onClick={again} className="btn-ghost mt-6">
                {postcard.again[lang]}
              </button>
            </div>
          </m.div>
        ) : (
          <m.form
            key="card"
            noValidate={false}
            onSubmit={submit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -70, x: 40, rotate: 9, scale: 0.92, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
          >
            {/* Honeypot: invisible to people, filled by naive bots. */}
            <input ref={trap} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />

            {/* Airmail edge: red and blue stripes around the paper. */}
            <div className="rounded-[7px] bg-[repeating-linear-gradient(135deg,#c8414b_0_12px,#f3ede1_12px_18px,#2f4f9a_18px_30px,#f3ede1_30px_36px)] p-[5px] shadow-[0_40px_70px_-25px_rgb(0_0_0/0.85),0_0_0_1px_rgb(0_0_0/0.25)] [backface-visibility:hidden] sm:-rotate-[1.5deg]">
            <div
              className={cn(
                'relative grid overflow-hidden rounded-[3px] bg-[#f3ede1] bg-[radial-gradient(rgb(60_40_10/0.05)_1px,transparent_1.2px),linear-gradient(160deg,#f7f2e8,#ece4d4)] bg-size-[4px_4px,100%_100%] shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] md:grid-cols-[1.25fr_1fr]',
                INK
              )}
            >
              {/* Letter */}
              <div className="border-b-[1.5px] border-dashed border-[#c5b79f] p-6 font-serif text-[17px] leading-[1.6] italic md:border-r-[1.5px] md:border-b-0 md:pr-6 md:pl-7">
                <p className="mb-2 text-right text-[13px] text-[#6b6250]">Paris, {lang === 'en' ? today : `le ${today}`}</p>
                <p>{postcard.hello[lang]}</p>
                <p>
                  {postcard.iam[lang]}{' '}
                  <input
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={set('name')}
                    placeholder={postcard.name[lang]}
                    aria-label={postcard.name[lang]}
                    aria-invalid={error === 'name' || undefined}
                    autoComplete="name"
                    className={cn(FIELD, 'w-40 border-b-[1.5px] border-dotted border-[#8f846f] px-1 text-[15px] focus:border-[#E0569F]')}
                  />{' '}
                  <span className="inline-block">{postcard.writing[lang]}</span>
                </p>
                <fieldset className="my-1.5">
                  <legend className="sr-only">{postcard.motiveLegend[lang]}</legend>
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {MOTIVES.map(k => (
                      <label key={k} className="relative cursor-pointer text-[#5e6680] has-checked:text-[#1c2747] has-focus-visible:underline">
                        <input type="radio" name="motive" value={k} checked={form.motive === k} onChange={set('motive')} className="peer sr-only" />
                        {postcard.motives[k][lang]}
                        <span aria-hidden="true" className="pointer-events-none absolute -inset-x-2.5 -top-0.5 -bottom-px hidden -rotate-3 rounded-[50%] border-[1.8px] border-[#E0569F] peer-checked:block" />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <textarea
                  ref={messageRef}
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  value={form.message}
                  onChange={e => {
                    set('message')(e);
                    grow();
                  }}
                  placeholder={postcard.message[lang]}
                  aria-label={postcard.message[lang]}
                  aria-invalid={error === 'message' || undefined}
                  className={cn(FIELD, 'mt-1 block min-h-28 w-full resize-none overflow-hidden bg-[repeating-linear-gradient(transparent_0_27px,#cdbfa8_27px_28px)] text-[15px] leading-[28px]')}
                />
              </div>

              {/* Address side */}
              <div className="relative flex flex-col gap-6 p-6 md:pl-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="pt-1 font-mono text-[9px] leading-relaxed tracking-[0.3em] text-[#8a7f69] uppercase">
                    {postcard.label[lang]}
                    <br />
                    <span className="text-[#2f4f9a]">{postcard.airmail[lang]}</span>
                  </p>
                  <Stamp />
                </div>
                {status === 'posted' && <Postmark lang={lang} />}
                <div className="mt-auto">
                  <p className="mb-1.5 font-mono text-[8.5px] tracking-[0.15em] text-[#8a7f69] uppercase">{postcard.to[lang]}</p>
                  <p className="border-b border-[#c5b79f] py-1 font-serif text-[15px]">Rayane Yazid</p>
                  <p className="border-b border-[#c5b79f] py-1 font-serif text-[15px]">Paris, France</p>
                </div>
                <div>
                  <p className="mb-1.5 font-mono text-[8.5px] tracking-[0.15em] text-[#8a7f69] uppercase">{postcard.reply[lang]}</p>
                  <input
                    required
                    type="email"
                    maxLength={254}
                    value={form.email}
                    onChange={set('email')}
                    placeholder={postcard.email[lang]}
                    aria-label={postcard.email[lang]}
                    aria-invalid={error === 'email' || undefined}
                    autoComplete="email"
                    className={cn(FIELD, 'w-full border-b border-[#c5b79f] py-1 text-[14px] focus:border-[#E0569F]')}
                  />
                </div>
              </div>
            </div>
            </div>

            {/* Phones: full-width button first, clear of the floating back-to-top button. */}
            <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {postcard.or[lang]}{' '}
                <a href={linkedin} target="_blank" rel="noreferrer" className="text-foreground/80 underline decoration-foreground/25 underline-offset-4 hover:text-foreground">
                  LinkedIn
                </a>{' '}
                {postcard.orJoin[lang]}{' '}
                <a href={github} target="_blank" rel="noreferrer" className="text-foreground/80 underline decoration-foreground/25 underline-offset-4 hover:text-foreground">
                  GitHub
                </a>{' '}
                ?
              </p>
              <button type="submit" disabled={status !== 'idle'} className="btn-primary w-full disabled:opacity-70 sm:w-auto">
                {status === 'sending' ? postcard.sending[lang] : `${postcard.send[lang]} →`}
              </button>
            </div>
            <p role="alert" className="mt-3 min-h-5 text-sm text-[#ff8a7a] sm:text-right">
              {error ? postcard.errors[error][lang] : ''}
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
