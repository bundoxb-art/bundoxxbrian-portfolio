'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! I'm the BundoxxBee assistant 🐝 How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const message = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: message }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const reply = await res.text();
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Something went wrong. Please try again!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '88px', right: '24px',
          width: '320px', maxHeight: '440px',
          background: '#ffffff', borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.16)',
          display: 'flex', flexDirection: 'column',
          zIndex: 9999, border: '1px solid #f3f4f6',
          overflow: 'hidden'
        }}>

          {/* Header */}
          <div style={{
            padding: '14px 16px', background: '#f59e0b',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px'
              }}>🐝</div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#fff', fontSize: '14px' }}>
                  BundoxxBee
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>
                  <span style={{
                    display: 'inline-block', width: '6px', height: '6px',
                    borderRadius: '50%', background: '#86efac',
                    marginRight: '4px', verticalAlign: 'middle'
                  }} />
                  Usually replies in seconds
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none', border: 'none', color: '#fff',
                fontSize: '18px', cursor: 'pointer', padding: '4px', lineHeight: 1
              }}
              aria-label="Close chat"
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '14px 12px',
            display: 'flex', flexDirection: 'column',
            gap: '8px', background: '#f9fafb', minHeight: 0
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? '#f59e0b' : '#ffffff',
                color: msg.role === 'user' ? '#fff' : '#1f2937',
                padding: '9px 13px',
                borderRadius: msg.role === 'user'
                  ? '14px 14px 4px 14px'
                  : '14px 14px 14px 4px',
                fontSize: '13px', maxWidth: '82%',
                boxShadow: '0 1px 2px rgba(0,0,0,0.06)', lineHeight: 1.5
              }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{
                alignSelf: 'flex-start', background: '#ffffff',
                padding: '9px 13px', borderRadius: '14px 14px 14px 4px',
                fontSize: '13px', color: '#9ca3af',
                boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
              }}>typing…</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '10px 12px', borderTop: '1px solid #f3f4f6',
            display: 'flex', gap: '8px', background: '#fff', flexShrink: 0
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1, padding: '8px 12px',
                border: '1.5px solid #e5e7eb', borderRadius: '8px',
                fontSize: '13px', outline: 'none',
                color: '#1f2937', background: '#f9fafb'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: '8px 14px',
                background: loading ? '#fcd34d' : '#f59e0b',
                color: '#fff', border: 'none', borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px', lineHeight: 1
              }}
              aria-label="Send message"
            >→</button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '54px', height: '54px', borderRadius: '50%',
          background: '#f59e0b', border: 'none',
          boxShadow: '0 4px 20px rgba(245,158,11,0.45)',
          cursor: 'pointer', fontSize: '26px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 9999
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : '🐝'}
      </button>
    </>
  );
}