"use client";

import { useState } from "react";
import { Gamepad2, Hash, Headphones, Plus, Search, Settings, Users, Send, MessageCircle, Compass, Bell } from "lucide-react";

const channels = [
  { name: "välkommen", count: 0 },
  { name: "allmänt", count: 3 },
  { name: "gaming", count: 8 },
  { name: "memes", count: 2 }
];

const initialMessages = [
  { user: "Nova", time: "20:14", text: "Välkommen till DOMINOS! 🎮" },
  { user: "Pixel", time: "20:16", text: "Vad spelar alla ikväll?" },
  { user: "Alex", time: "20:18", text: "Jag är sugen på något co-op!" }
];

export default function Home() {
  const [channel, setChannel] = useState("allmänt");
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setMessages([...messages, { user: "Du", time: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }), text }]);
    setDraft("");
  }

  return (
    <main className="shell">
      <aside className="servers">
        <div className="brandMark">D</div>
        <div className="server active"><Gamepad2 size={22}/></div>
        <div className="server"><Users size={21}/></div>
        <button className="server add" aria-label="Lägg till server"><Plus size={22}/></button>
        <div className="serverSpacer"/>
        <div className="avatar small">N</div>
      </aside>

      <aside className="sidebar">
        <div className="workspace"><div><strong>DOMINOS</strong><span>Din community-plats</span></div><Settings size={18}/></div>
        <button className="explore"><Compass size={17}/> Utforska communities</button>
        <div className="sectionLabel">TEXTKANALER <Plus size={15}/></div>
        {channels.map(c => <button key={c.name} onClick={() => setChannel(c.name)} className={`channel ${channel === c.name ? "selected" : ""}`}><Hash size={16}/>{c.name}{c.count > 0 && <span>{c.count}</span>}</button>)}
        <div className="sectionLabel voiceLabel">RÖSTKANALER <Plus size={15}/></div>
        <div className="channel muted"><Headphones size={16}/> Lounge</div>
        <div className="voiceStatus"><span className="greenDot"/> Ingen är i röstkanalen</div>
        <div className="profile">
          <div className="avatar">N</div><div className="profileText"><b>Nova</b><span>Online</span></div><Settings size={17}/>
        </div>
      </aside>

      <section className="chat">
        <header className="topbar"><div className="channelTitle"><Hash size={20}/><b>{channel}</b><span className="topic">Snacka med communityn</span></div><div className="topActions"><Bell size={18}/><Users size={19}/><div className="search"><Search size={16}/> Sök</div></div></header>
        <div className="messages">
          <div className="welcome"><div className="welcomeIcon"><MessageCircle size={28}/></div><h1>Välkommen till #{channel}</h1><p>Det här är början på kanalen. Säg hej till communityn!</p></div>
          {messages.map((m, i) => <div className="message" key={i}><div className="avatar messageAvatar">{m.user[0]}</div><div><div className="messageMeta"><b>{m.user}</b><time>{m.time}</time></div><p>{m.text}</p></div></div>)}
        </div>
        <div className="composer"><input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder={`Skriv i #${channel}...`} /><button onClick={sendMessage} aria-label="Skicka meddelande"><Send size={18}/></button></div>
        <p className="prototypeNote">Förhandsvisning · Meddelanden sparas inte ännu</p>
      </section>

      <aside className="members"><div className="membersTitle">MEDLEMMAR — 4</div><div className="memberGroup">ONLINE — 3</div>{["Nova","Pixel","Alex"].map((n,i)=><div className="member" key={n}><div className={`avatar memberAvatar color${i}`}>{n[0]}</div><span>{n}</span><i/></div>)}<div className="memberGroup offline">OFFLINE — 1</div><div className="member"><div className="avatar memberAvatar gray">M</div><span>Mira</span></div></aside>

      {showLogin && <div className="modalShade" onClick={() => setShowLogin(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setShowLogin(false)}>×</button><div className="brandMark modalMark">D</div><h2>Välkommen till DOMINOS</h2><p>Kontoinloggning kopplas in när databasen är konfigurerad.</p><label>Användarnamn<input placeholder="Ditt användarnamn" disabled/></label><label>Lösenord<input type="password" placeholder="Ditt lösenord" disabled/></label><button className="primary" disabled>Kommer snart</button></div></div>}

      <button className="loginButton" onClick={() => setShowLogin(true)}>Logga in / Registrera</button>
    </main>
  );
}
