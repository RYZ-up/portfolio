import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp02Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import MatrixOrb from '@/components/ui/matrix-orb';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { chat } from '@/data/site.js';
import logo from '@/assets/images/avatar.png';

// The portfolio assistant, back from the previous version: same Netlify
// function (the Groq key stays server-side), greeting, step-by-step status,
// "answered in x s", error / rate-limit bubbles and the colour ring while
// typing; a rareui MatrixOrb now shows what it is doing.

const STEPS = ['think', 'search', 'write'];
const STEP_MS = 1400;

// Kept at module level so the conversation survives a language switch.
let saved = null;

function Status({ done, ms, lang }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), STEP_MS);
    return () => clearInterval(id);
  }, [done]);

  if (done) {
    const s = (ms / 1000).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 1 });
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
        <HugeiconsIcon icon={Tick02Icon} className="size-3 text-emerald-500" />
        {chat.done[lang].replace('{s}', s)}
      </span>
    );
  }
  return (
    <span role="status" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs">
      <span className="size-3 animate-spin rounded-full border-2 border-white/20 border-t-white" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={step}
          className="ai-shine"
          initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
          transition={{ duration: 0.25 }}
        >
          {chat[STEPS[step]][lang]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

export function ChatSection() {
  const { lang } = useI18n();
  const [messages, setMessages] = useState(() => saved ?? [{ id: 1, from: 'ai', hello: true }]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    saved = messages;
  }, [messages]);

  // Scroll the log, never the page.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async raw => {
    const content = raw.trim();
    if (!content || loading) return;
    const next = [...messages, { id: messages.length + 1, from: 'me', text: content }];
    setMessages(next);
    setText('');
    setLoading(true);
    const started = performance.now();

    // Only the real conversation goes to the model, not the greeting or errors.
    const history = next.filter(msg => !msg.hello && !msg.error).map(msg => ({ role: msg.from === 'me' ? 'user' : 'assistant', content: msg.text }));

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    let reply = null;
    let limited = false;
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({ messages: history })
      });
      if (res.status === 429) limited = true;
      else if (res.ok) reply = (await res.json()).reply || null;
    } catch {
      /* falls through to the error bubble */
    } finally {
      clearTimeout(timer);
    }

    setMessages(prev => [
      ...prev,
      reply
        ? { id: prev.length + 1, from: 'ai', text: reply, ms: performance.now() - started }
        : { id: prev.length + 1, from: 'ai', error: limited ? 'limit' : 'error' }
    ]);
    setLoading(false);
  };

  const orbState = loading ? 'thinking' : text ? 'listening' : 'idle';

  return (
    <section id="ia" className="relative mx-auto max-w-5xl scroll-mt-20 px-5 py-20 md:px-6 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.35fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{chat.kicker[lang]}</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{chat.title[lang]}</h2>
          <p className="mt-3 max-w-md text-muted-foreground">{chat.sub[lang]}</p>
          <div className="mt-8 flex justify-center md:justify-start">
            <MatrixOrb state={orbState} level={loading ? 0.7 : text ? 0.4 : 0.15} size={180} color="#e5e5e5" labels={{ idle: chat.idle[lang], listening: chat.listening[lang], thinking: chat.think[lang] }} />
          </div>
        </div>

        <div className="chat-card group relative rounded-3xl border border-white/15 bg-card/30 p-px shadow-[0_0_0_1px_rgb(255_255_255/0.04),0_40px_100px_-30px_rgb(255_255_255/0.18),0_30px_60px_-30px_black]">
          <span className="chat-ring" aria-hidden="true" />
          {/* Soft halo behind the card so it reads as the section's centrepiece. */}
          <span aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgb(255_255_255/0.07),transparent)]" />
          <div className="relative flex h-136 flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0d0d0d]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
              <img src={logo} alt="" className="size-10 rounded-full border border-white/15 bg-white object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{chat.name[lang]}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {loading ? chat.typing[lang] : chat.online[lang]}
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">FR · EN</span>
            </div>
            <div ref={listRef} className="chat-scroll flex-1 space-y-3 overflow-y-auto overscroll-contain p-5" aria-live="polite">
              {messages.map(msg => (
                <m.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className={`flex flex-col gap-1 ${msg.from === 'me' ? 'items-end' : 'items-start pl-9'}`}
                >
                  {msg.ms != null && <Status done ms={msg.ms} lang={lang} />}
                  <div className="relative max-w-[85%]">
                  {msg.from === 'ai' && (
                    <img src={logo} alt="" aria-hidden="true" className="absolute bottom-0 -left-9 size-7 rounded-full border border-white/15 bg-white object-cover" />
                  )}
                  <div
                    className={`rounded-[18px] px-4 py-2.5 text-[15px] leading-[1.45] whitespace-pre-line ${
                      msg.from === 'me' ? 'rounded-br-[6px] bg-[#f2f2f2] text-[#0b0b0b]' : 'rounded-bl-[6px] bg-[#262626] text-foreground'
                    }`}
                  >
                    {msg.hello ? chat.hello[lang] : msg.error ? chat[msg.error][lang] : msg.text}
                  </div>
                  </div>
                </m.div>
              ))}
              {loading && (
                <div className="pl-9">
                  <Status lang={lang} />
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-5 pb-3">
                {chat.suggestions[lang].map(q => (
                  <button key={q} type="button" onClick={() => send(q)} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-left text-xs text-foreground/80 transition-colors hover:border-white/25 hover:text-foreground">
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              className="flex items-center gap-2 border-t border-white/10 p-3"
              onSubmit={e => {
                e.preventDefault();
                send(text);
              }}
            >
              <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={chat.placeholder[lang]}
                aria-label={chat.placeholder[lang]}
                autoComplete="off"
                enterKeyHint="send"
                maxLength={500}
                className="h-11 flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-white/25"
              />
              <button
                type="submit"
                aria-label={chat.send[lang]}
                disabled={!text.trim() || loading}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-background transition-[opacity,transform] active:scale-95 disabled:opacity-30"
              >
                <HugeiconsIcon icon={ArrowUp02Icon} className="size-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
