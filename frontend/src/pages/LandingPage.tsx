import React, { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ShieldCheck, GitBranch, Play, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const Architecture = lazy(() => import('../components/3d/LivingCodeStructure3D'));

const chapters = [
  ['01', 'See the whole picture.', 'Explore your repository, its structure, and the code behind every finding.', 'map'],
  ['02', 'Make the fix yours.', 'Work through progressive hints. Write your own patch. Understand why it works.', 'repair'],
  ['03', 'Take the skill with you.', 'Verify your repair, then try a fresh challenge without the guiding hand.', 'transfer'],
];

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [show3D, setShow3D] = useState(false);
  return <div className="editorial">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="editorial-nav">
      <Link className="wordmark" to="/"><span className="brand-symbol">d/</span> devmentor</Link>
      <nav aria-label="Main navigation"><a href="#approach">The approach</a><a href="#architecture">Inside the product</a></nav>
      <Link className="quiet-link" to={user ? '/dashboard' : '/auth'}>{user ? 'Your workspace' : 'Sign in'} <ArrowUpRight size={16}/></Link>
    </header>
    <main id="main">
      <section className="editorial-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span/> A little less guessing. A lot more understanding.</p>
          <h1>Good code.<br/>Better <em>instincts.</em></h1>
          <p className="hero-description">Build the confidence to own what you ship. Explore your code, repair security issues, and turn every fix into a skill that stays.</p>
          <div className="hero-actions"><Link className="ink-button" to={user ? '/import' : '/auth'}>Start building confidence <ArrowUpRight size={18}/></Link><a href="#approach" className="text-link">Take a closer look <ArrowRight size={16}/></a></div>
          <p className="hero-footnote">Your repository. Your reasoning. Real verification.</p>
        </div>
        <div className="sculpture" role="img" aria-label="Original architectural illustration: connected ivory and teal layers representing code, repair, and understanding">
          <div className="sculpture-orbit orbit-one"/><div className="sculpture-orbit orbit-two"/>
          <div className="sculpture-stack"><div className="slab slab-top"><span>understand</span></div><div className="slab slab-middle"><span>repair</span></div><div className="slab slab-bottom"><span>explore</span></div></div>
          <span className="art-caption">FIG. 01 — KNOWLEDGE, BUILT IN LAYERS</span>
          <div className="art-note"><ShieldCheck size={18}/><span>From finding<br/><strong>to understanding.</strong></span></div>
        </div>
      </section>
      <div className="principles"><span>Built around the way engineers learn.</span><span><GitBranch size={16}/> Explore</span><span>↗ Repair</span><span><ShieldCheck size={16}/> Verify</span><span>↗ Transfer</span></div>
      <section id="approach" className="approach-section">
        <div className="section-heading"><p className="eyebrow">THE PRACTICE OF BETTER ENGINEERING</p><h2>Don’t just get an answer.<br/><em>Get the understanding.</em></h2><p>A thoughtful workspace for the journey from unfamiliar code to independent problem solving.</p></div>
        <div className="chapter-grid">{chapters.map(([number, title, description, art]) => <article key={number} className="chapter">
          <div className={`chapter-art art-${art}`} aria-hidden="true">{art === 'map' ? <><i/><i/><i/><i/><div className="map-line"/></> : art === 'repair' ? <div className="paper-code"><span>− trust the input</span><strong>+ check the boundary</strong><span>+ protect the resource</span><b>Small change. Clear intent.</b></div> : <div className="transfer-rings"><i/><i/><i/><span>↗</span></div>}</div>
          <p className="chapter-number">{number} / {art === 'map' ? 'EXPLORE' : art === 'repair' ? 'REPAIR' : 'TRANSFER'}</p><h3>{title}</h3><p>{description}</p>
        </article>)}</div>
      </section>
      <section id="architecture" className="inside-section"><div><p className="eyebrow">STRUCTURE WITH SUBSTANCE</p><h2>Beautiful on the surface.<br/><em>Grounded underneath.</em></h2><p>Repository analysis, security auditing, guided repair, and independent challenges share one workspace. Inspect the architecture in an optional interactive 3D view.</p><button className="ink-button" onClick={() => setShow3D(v => !v)} aria-expanded={show3D} aria-controls="architecture-view">{show3D ? <X size={16}/> : <Play size={16}/>} {show3D ? 'Close 3D view' : 'Explore in 3D'}</button></div><div className="architecture-print" aria-hidden="true"><div/><div/><div/><span>CODE → REASON → REPAIR → VERIFY</span></div></section>
      {show3D && <section id="architecture-view" className="architecture-view"><p className="eyebrow">ILLUSTRATIVE PLATFORM ARCHITECTURE · NOT LIVE REPOSITORY DATA</p><Suspense fallback={<p role="status">Loading interactive architecture…</p>}><Architecture/></Suspense></section>}
      <section className="closing-section"><p className="eyebrow">MAKE YOUR NEXT FIX COUNT</p><h2>Ship with understanding.</h2><Link className="ink-button" to={user ? '/dashboard' : '/auth'}>Open your workspace <ArrowUpRight size={18}/></Link></section>
    </main>
    <footer className="editorial-footer"><Link className="wordmark" to="/">devmentor</Link><span>From code to capability.</span><span>Designed for thoughtful engineering.</span></footer>
  </div>;
};
export default LandingPage;
