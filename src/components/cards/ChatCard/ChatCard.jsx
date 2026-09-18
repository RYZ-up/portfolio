import { useEffect, useRef, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { MessageCircleIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ChatCard.css';

// The page remounts every card when the language is switched: keep the
// conversation at module level so it survives that (the bubbles are stored as
// keys/text, and translated at render time).
let savedMessages = null;

export default function ChatCard() {
  const { t } = useI18n();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(() => savedMessages ?? [{ id: 1, from: 'assistant', hello: true }]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    savedMessages = messages;
  }, [messages]);

  // Keep the newest message in view once the log overflows and scrolls.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async e => {
    e.preventDefault();
    const text = message.trim();
    if (!text || loading) return;
    const next = [...messages, { id: messages.length + 1, from: 'me', text }];
    setMessages(next);
    setMessage('');
    setLoading(true);

    // Only the real conversation goes to the AI (not the canned greeting or errors).
    const history = next
      .filter(m => !m.hello && !m.error)
      .map(m => ({ role: m.from === 'me' ? 'user' : 'assistant', content: m.text }));

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
      reply ? { id: prev.length + 1, from: 'assistant', text: reply } : { id: prev.length + 1, from: 'assistant', error: limited ? 'limit' : true }
    ]);
    setLoading(false);
  };

  return (
    <BentoCard className="cell-chat">
      <div className="bento-card-inner chat-card">
        <div className="card-header">
          <span className="card-header__label">
            <MessageCircleIcon aria-hidden size="1em" /> {t('hdr.chat')}
          </span>
        </div>
        <div className="chat-card__messages" ref={listRef}>
          {messages.map(m => (
            <div key={m.id} className={`chat-bubble-row chat-bubble-row--${m.from}`}>
              <div className={`chat-bubble chat-bubble--${m.from}`}>{m.hello ? t('chat.hello') : m.error ? t(m.error === 'limit' ? 'chat.limit' : 'chat.error') : m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble-row chat-bubble-row--assistant">
              <div className="chat-bubble chat-bubble--assistant" aria-label={t('chat.typing')}>
                …
              </div>
            </div>
          )}
        </div>
        <form className="chat-card__input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-card__input"
            placeholder={t('chat.placeholder')}
            aria-label={t('chat.placeholder')}
            autoComplete="off"
            enterKeyHint="send"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className={`chat-card__send${message.trim() ? ' is-active' : ''}`}
            aria-label={t('chat.send')}
            disabled={!message.trim() || loading}
          >
            <FiArrowUp size="1.1em" strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </BentoCard>
  );
}
