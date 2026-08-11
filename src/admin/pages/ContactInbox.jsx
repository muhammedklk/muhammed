import React, { useEffect, useState } from 'react';
import { contactApi } from '../services/api';
import { Search, Trash2, Reply } from '../components/Icons';

const ContactInbox = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await contactApi.getMessages({ search, status: filterStatus });
      if (res.data && res.data.data) {
        setMessages(res.data.data.messages || []);
        setUnreadCount(res.data.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search, filterStatus]);

  const handleSelectMessage = async (msg) => {
    setSelectedMessage(msg);
    setReplyText(msg.replyMessage || '');
    if (!msg.isRead) {
      try {
        await contactApi.toggleRead(msg._id, true);
        fetchMessages();
      } catch (err) {
        console.error('Failed to mark read:', err);
      }
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!selectedMessage || !replyText) return;
    try {
      await contactApi.replyMessage(selectedMessage._id, replyText);
      alert('Reply recorded!');
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      alert('Failed to send reply');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message permanently?')) {
      try {
        await contactApi.deleteMessage(id);
        if (selectedMessage?._id === id) setSelectedMessage(null);
        fetchMessages();
      } catch (err) {
        alert('Failed to delete message');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Contact Inbox</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Manage client inquiries, search messages, and record replies.</p>
        </div>
        <div style={{ background: '#0f172a', padding: '8px 16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '13px', color: '#d2ea26', fontWeight: '700' }}>
          {unreadCount} Unread Messages
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search messages by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 42px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff', fontSize: '13.5px' }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#ffffff', fontSize: '13.5px' }}
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
          <option value="replied">Replied Only</option>
        </select>
      </div>

      {/* Split Inbox View */}
      <div className="row g-3">
        <div className={selectedMessage ? "col-12 col-lg-5" : "col-12"}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden' }}>
            {messages.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No messages found.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => handleSelectMessage(msg)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background: selectedMessage?._id === msg._id ? 'rgba(210, 234, 38, 0.08)' : msg.isRead ? 'transparent' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: msg.isRead ? '600' : '800', color: '#ffffff' }}>{msg.name}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span style={{ fontSize: '12.5px', color: '#d2ea26', fontWeight: '700', display: 'block', marginBottom: '4px' }}>{msg.subject}</span>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Message Detail View */}
        {selectedMessage && (
          <div className="col-12 col-lg-7">
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>{selectedMessage.subject}</h3>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</span>
                </div>
                <button onClick={() => handleDelete(selectedMessage._id)} style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', fontSize: '14px', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '24px', whiteSpace: 'pre-wrap' }}>
                {selectedMessage.message}
              </div>

              {/* Reply Section */}
              <form onSubmit={handleSendReply}>
                <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase' }}>RECORD REPLY & SEND RESPONSE</label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response email message here..."
                  style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: '#ffffff', fontSize: '13.5px', marginBottom: '16px' }}
                />

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {/* Direct Email Sender Button */}
                  <a
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent('Re: ' + selectedMessage.subject)}&body=${encodeURIComponent('Hi ' + selectedMessage.name + ',\n\n' + (replyText || '') + '\n\nBest regards,\nMuhammed\nUI/UX Designer & Front-End Developer\nPhone/WhatsApp: +91 9656216086\nPortfolio: https://muhammedfolio.vercel.app')}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#3b82f6', color: '#ffffff', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', fontSize: '13.5px' }}
                  >
                    <span>✉️ Send Email to {selectedMessage.name}</span>
                  </a>

                  {/* Save Status in CMS DB */}
                  <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '13.5px' }}>
                    <Reply size={16} />
                    <span>{selectedMessage.isReplied ? 'Update Reply Status' : 'Save Reply Status'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInbox;
