'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_REPLIES = [
  '💰 What are your prices?',
  '🛠️ What services do you offer?',
  '📱 Can you build mobile apps?',
  '📅 How do I book a call?',
  '🌍 Do you work remotely?',
  '⚡ How fast do you deliver?',
];

const WEBHOOK = '/api/chat';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hey! 🐝 I'm BeeBot — Brian's AI assistant. I can answer questions about his services, pricing, tech stack and more. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  async function send(text: string) {
    if (!text.trim() || typing) return;
    setShowQuick(false);

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply =
        data.reply ||
        data.message ||
        'Having trouble right now! WhatsApp Brian directly: wa.me/254768771559 🐝';

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Connection issue! Reach Brian on WhatsApp: wa.me/254768771559 🐝',
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '22px',
            zIndex: 500,
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f5c842, #00f5c8)',
            border: '3px solid rgba(255,255,255,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            boxShadow: '0 4px 24px rgba(0,245,200,0.5)',
            animation: 'beePulse 2.5s infinite',
          }}
          aria-label="Open chat"
        >
          🐝
        </button>
      )}

      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '22px',
            zIndex: 500,
            width: '340px',
            maxHeight: '540px',
            background: '#0d1220',
            border: '1px solid rgba(0,245,200,0.25)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #f5c842 0%, #00f5c8 100%)',
              padding: '1rem 1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(5,7,13,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0,
                }}
              >
                🐝
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.1rem',
                    letterSpacing: '0.08em',
                    color: '#05070d',
                    lineHeight: '1',
                  }}
                >
                  BUNDOXXBEE
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.58rem',
                    color: 'rgba(5,7,13,0.65)',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#00c16e',
                      display: 'inline-block',
                    }}
                  />
                  Brian's AI · Usually replies in seconds
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(5,7,13,0.15)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: '#05070d',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              maxHeight: '340px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '0.7rem 0.95rem',
                    borderRadius:
                      msg.role === 'user'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                    background:
                      msg.role === 'user'
                        ? 'linear-gradient(135deg, #00f5c8, #00c4a0)'
                        : 'rgba(255,255,255,0.05)',
                    color: msg.role === 'user' ? '#05070d' : '#eef0f6',
                    fontSize: '0.82rem',
                    lineHeight: '1.65',
                    fontFamily: "'Outfit', sans-serif",
                    border:
                      msg.role === 'assistant'
                        ? '1px solid rgba(255,255,255,0.07)'
                        : 'none',
                    fontWeight: msg.role === 'user' ? '600' : '400',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.7rem 1rem',
                    borderRadius: '18px 18px 18px 4px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#00f5c8',
                        animation: `dot 1.2s infinite ${dot * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showQuick && messages.length === 1 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginTop: '0.4rem',
                }}
              >
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem',
                      color: '#00f5c8',
                      background: 'rgba(0,245,200,0.08)',
                      border: '1px solid rgba(0,245,200,0.2)',
                      padding: '0.32rem 0.65rem',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      lineHeight: '1.4',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,245,200,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,245,200,0.08)';
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div
            style={{
              padding: '0.5rem 0.8rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: '0.4rem',
            }}
          >
            <a
              href="https://wa.me/254768771559"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                background: '#25D366',
                color: '#fff',
                border: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                padding: '0.4rem',
                borderRadius: '8px',
                textDecoration: 'none',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              💬 WhatsApp
            </a>
            <a
              href="/book"
              style={{
                flex: 1,
                background: 'rgba(0,245,200,0.1)',
                color: '#00f5c8',
                border: '1px solid rgba(0,245,200,0.2)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                padding: '0.4rem',
                borderRadius: '8px',
                textDecoration: 'none',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              📅 Book Call
            </a>
          </div>

          <div
            style={{
              padding: '0.7rem 0.8rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#eef0f6',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.82rem',
                padding: '0.55rem 0.9rem',
                borderRadius: '50px',
                outline: 'none',
                minHeight: '38px',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'rgba(0,245,200,0.3)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(255,255,255,0.08)')
              }
            />
            <button
              type="button"
              onClick={() => send(input)}
              disabled={typing || !input.trim()}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: input.trim()
                  ? 'linear-gradient(135deg, #00f5c8, #8b5cf6)'
                  : 'rgba(255,255,255,0.06)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
                color: input.trim() ? '#05070d' : '#5a6278',
                transition: 'all 0.2s',
              }}
              aria-label="Send message"
            >
              →
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes beePulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(0,245,200,0.5); }
          50% { box-shadow: 0 4px 32px rgba(245,200,66,0.7); }
        }
        @keyframes dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
