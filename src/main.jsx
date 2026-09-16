import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import './styles.css';

const A = '/assets/';
const products = [
  { id: '702', name: 'Oval Brilliant Natural Diamond', details: '1.02 ct · F · VS1', price: '$4,850', image: '702-scaled-1-300x300.jpg', badge: 'New arrival' },
  { id: '710', name: 'Cushion Old Mine Cut Diamond', details: '1.18 ct · G · VS2', price: '$5,280', image: '710-scaled-1-300x300.jpg', badge: 'Bestseller' },
  { id: 'op2606', name: 'Marquise Rose Cut Diamond', details: '0.86 ct · F · SI1', price: '$3,960', image: 'OP2606-300x300.jpg', badge: 'Rare cut' },
  { id: 'brilliant', name: 'Classic Brilliant Cut', details: '1.00 ct · E · VS1', price: '$6,100', image: 'Brilliant-Cut-Diamond.webp', badge: 'Curated' },
];
const cuts = [
  { name: 'Brilliant Cut', image: 'Brilliant-Cut-Diamond.webp', path: '/brilliant-cut-diamond/' },
  { name: 'Rose Cut', image: 'rose-cut-diamonds.png', path: '/rose-cut-diamonds/' },
  { name: 'Antique Cut', image: 'antique-cut-diamonds.png', path: '/antique-cut-diamonds/' },
  { name: 'Step Cut', image: 'step-cut-diamonds.png', path: '/step-cut-diamonds/' },
  { name: 'Portrait Cut', image: 'portrait-cut-diamonds.png', path: '/portrait-cut-diamonds/' },
  { name: 'Old Mine Cut', image: 'old-cut-diamonds.png', path: '/old-mine-cut/' },
];
const guides = [
  { title: 'Why Buy Natural Diamonds?', image: 'Why-Buy-Natural-Diamonds.jpg', copy: 'The enduring story, rarity, and character behind a natural stone.' },
  { title: 'The Four Cs, beautifully explained', image: 'The-4-Cs.jpg', copy: 'A clear, considered guide to choosing a diamond with confidence.' },
  { title: 'How Diamonds Are Formed', image: 'How-Diamonds-are-Formed.jpg', copy: 'A journey millions of years in the making.' },
  { title: 'A more considered way to source', image: 'Sustainable-Diamond-Mining.jpg', copy: 'What responsible provenance looks like in practice.' },
];

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Header({ cartCount, onCart, onSearch }) {
  const [menu, setMenu] = useState(false);
  return <header className="site-header">
    <div className="announcement">Complimentary worldwide delivery · Complimentary consultations</div>
    <div className="nav-shell">
      <button className="icon-button mobile-menu" onClick={() => setMenu(!menu)} aria-label="Open menu">{menu ? <X size={20} /> : <Menu size={20} />}</button>
      <button className="wordmark" onClick={() => navigate('/')} aria-label="Opulent Diam home"><span>OPULENT</span><small>DIAM</small></button>
      <nav className={menu ? 'main-nav open' : 'main-nav'}>
        <button onClick={() => navigate('/shop/')}>Shop diamonds</button>
        <button onClick={() => navigate('/collections/')}>Collections</button>
        <button onClick={() => navigate('/diamond-guide/')}>Diamond guide</button>
        <button onClick={() => navigate('/our-story/')}>Our story</button>
      </nav>
      <div className="nav-tools">
        <button className="icon-button" onClick={onSearch} aria-label="Search"><Search size={19} /></button>
        <button className="icon-button bag" onClick={onCart} aria-label="Shopping bag"><ShoppingBag size={19} />{cartCount > 0 && <b>{cartCount}</b>}</button>
      </div>
    </div>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-top">
      <div><button className="wordmark footer-mark" onClick={() => navigate('/')}><span>OPULENT</span><small>DIAM</small></button><p>Natural diamonds, selected for their light, character, and lasting provenance.</p></div>
      <div><h4>Explore</h4><button onClick={() => navigate('/shop/')}>Shop diamonds</button><button onClick={() => navigate('/collections/')}>Collections</button><button onClick={() => navigate('/diamond-guide/')}>Diamond guide</button></div>
      <div><h4>Concierge</h4><button onClick={() => navigate('/contact/')}>Book a consultation</button><button onClick={() => navigate('/shipping-returns/')}>Shipping & returns</button><button onClick={() => navigate('/contact/')}>Contact us</button></div>
      <div><h4>Stay in the know</h4><p>Notes on diamonds, design, and the considered life.</p><div className="newsletter"><input placeholder="Your email address" /><button aria-label="Subscribe"><ArrowRight size={18} /></button></div></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Opulent Diam</span><span>Privacy · Terms · Provenance</span><span>Designed for those who look closer.</span></div>
  </footer>;
}

function PageIntro({ eyebrow, title, copy }) {
  return <section className="page-intro"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{copy && <p>{copy}</p>}</section>;
}

function ProductCard({ product, onAdd }) {
  return <article className="product-card"><div className="product-image"><span>{product.badge}</span><button className="heart" aria-label="Save diamond"><Heart size={17} /></button><img src={`${A}${product.image}`} alt={product.name} onError={e => { e.currentTarget.src = `${A}Brilliant-Cut-Diamond.webp`; }} /></div><div className="product-meta"><h3>{product.name}</h3><p>{product.details}</p><strong>{product.price}</strong><button className="text-link" onClick={() => onAdd(product)}>Add to bag <ArrowRight size={14} /></button></div></article>;
}

function Shop({ onAdd }) {
  const [filter, setFilter] = useState('All diamonds');
  const filtered = filter === 'All diamonds' ? products : products.filter(p => p.badge.toLowerCase().includes(filter.split(' ')[0].toLowerCase()));
  return <><PageIntro eyebrow="The collection" title="Diamonds with a point of view" copy="A considered edit of natural diamonds, selected for exceptional light, proportion, and personality." /><main className="content shop-page"><div className="shop-toolbar"><span>{filtered.length * 42} diamonds available</span><div><button className={filter === 'All diamonds' ? 'active' : ''} onClick={() => setFilter('All diamonds')}>All</button><button className={filter === 'New arrivals' ? 'active' : ''} onClick={() => setFilter('New arrivals')}>New arrivals</button><button className={filter === 'Bestsellers' ? 'active' : ''} onClick={() => setFilter('Bestsellers')}>Bestsellers</button><button className="sort">Sort by <ChevronDown size={15} /></button></div></div><div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}</div></main></>;
}

function Collections() {
  return <><PageIntro eyebrow="Signature cuts" title="The language of light" copy="Explore the silhouettes that have shaped diamond design across generations." /><main className="content"><div className="cut-grid">{cuts.map(c => <button className="cut-card" key={c.name} onClick={() => navigate(c.path)}><img src={`${A}${c.image}`} alt="" /><span>{c.name}</span><small>Explore cut <ArrowRight size={14} /></small></button>)}</div></main></>;
}

function CutPage({ cut }) {
  const data = cuts.find(c => cut.includes(c.name.toLowerCase().replaceAll(' ', '-').replace('diamonds', 'diamond'))) || cuts[0];
  return <><section className="cut-hero"><div><div className="eyebrow">The cut collection</div><h1>{data.name}<br /><em>with a little history.</em></h1><p>A distinctive silhouette, selected and finished by hand for the way it catches light.</p><button className="button" onClick={() => navigate('/shop/')}>Shop {data.name} <ArrowRight size={16} /></button></div><img src={`${A}${data.image}`} alt={data.name} /></section><main className="content editorial-two"><div><div className="eyebrow">A considered choice</div><h2>Not just a shape.<br /><em>A signature.</em></h2></div><p>Each cut carries a different rhythm. From the soft, candlelit glow of an antique diamond to the graphic architecture of a step cut, the stone you choose says something only you can say.</p></main><section className="stone-strip">{products.slice(0, 3).map(p => <ProductCard key={p.id} product={p} onAdd={() => {}} />)}</section></>;
}

function Guides() {
  return <><PageIntro eyebrow="The diamond guide" title="Look closer" copy="The world of diamonds, made clear. Read our notes on rarity, craftsmanship, provenance, and the choices that make a stone yours." /><main className="content"><div className="guide-feature"><img src={`${A}Why-Buy-Natural-Diamonds.jpg`} alt="" /><div><div className="eyebrow">Start here</div><h2>Why natural diamonds?</h2><p>There is a difference you can feel. Learn what makes a natural diamond singular, and why its story matters.</p><button className="text-link">Read the story <ArrowRight size={14} /></button></div></div><div className="guide-grid">{guides.slice(1).map(g => <article className="guide-card" key={g.title}><img src={`${A}${g.image}`} alt="" /><div className="eyebrow">Journal</div><h3>{g.title}</h3><p>{g.copy}</p><button className="text-link">Read more <ArrowRight size={14} /></button></article>)}</div></main></>;
}

function Story({ contact = false }) {
  if (contact) return <><PageIntro eyebrow="The concierge" title="Let’s find your diamond" copy="Whether you know exactly what you’re looking for or are just beginning to explore, we’re here to make it personal." /><main className="content contact-layout"><form onSubmit={e => e.preventDefault()}><h2>Tell us a little more</h2><div className="form-row"><input placeholder="First name" /><input placeholder="Last name" /></div><input placeholder="Email address" /><select defaultValue=""><option value="" disabled>What can we help with?</option><option>Finding a diamond</option><option>Creating a custom piece</option><option>Aftercare</option></select><textarea placeholder="Your message" rows="5" /><button className="button">Send enquiry <ArrowRight size={16} /></button></form><div className="contact-aside"><div className="eyebrow">Visit the atelier</div><h2>Made personal.</h2><p>Our diamond concierge is available Monday–Saturday, 10am–6pm.</p><p>hello@opulentdiam.com<br />+1 212 555 0198</p></div></main></>;
  return <><section className="story-hero"><img src={`${A}Sustainable-Diamond-Mining.jpg`} alt="" /><div><div className="eyebrow">Our story</div><h1>Beauty, <em>with substance.</em></h1><p>Opulent Diam exists for a more considered kind of luxury. We believe a diamond should be beautiful to look at, and meaningful to live with.</p></div></section><main className="content editorial-two"><h2>The long view.</h2><p>From the first conversation to the moment your stone catches the light, we make every detail feel intentional. Our edit is small by design, our standards exacting, and our relationships built to last.</p></main></>;
}

function ProductPage({ productId, onAdd }) {
  const product = products.find(p => p.id.toLowerCase() === productId.toLowerCase()) || products[0];
  return <><main className="product-detail"><div className="detail-image"><img src={`${A}${product.image}`} alt={product.name} /></div><div className="detail-copy"><div className="eyebrow">Natural diamond · {product.badge}</div><h1>{product.name}</h1><p className="detail-price">{product.price}</p><p className="detail-description">A singular stone with beautiful balance and an unmistakable point of view. Each diamond is selected by our atelier for its natural character, exceptional light, and lasting provenance.</p><div className="detail-specs"><div><span>Weight</span><b>{product.details.split(' · ')[0]}</b></div><div><span>Colour</span><b>{product.details.split(' · ')[1]}</b></div><div><span>Clarity</span><b>{product.details.split(' · ')[2]}</b></div></div><button className="button detail-button" onClick={() => onAdd(product)}>Add to bag <ArrowRight size={16} /></button><p className="detail-note">Complimentary worldwide delivery · Certificate included · 30 day returns</p></div></main><section className="detail-bottom"><div className="eyebrow">The Opulent standard</div><h2>Chosen slowly.<br /><em>Made to last.</em></h2></section></>;
}

function CartDrawer({ items, close, remove }) {
  return <div className="drawer-backdrop" onClick={close}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>Your bag</h2><button onClick={close}><X size={20} /></button></div>{items.length === 0 ? <div className="empty-bag"><Sparkles size={24} /><p>Your bag is waiting for something exceptional.</p><button className="text-link" onClick={close}>Explore diamonds <ArrowRight size={14} /></button></div> : <>{items.map((p, i) => <div className="bag-item" key={`${p.id}-${i}`}><img src={`${A}${p.image}`} alt="" /><div><h3>{p.name}</h3><p>{p.details}</p><strong>{p.price}</strong><button onClick={() => remove(i)}>Remove</button></div></div>)}<button className="button checkout">Continue to enquiry <ArrowRight size={16} /></button></>}</aside></div>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [items, setItems] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  useEffect(() => { const fn = () => setPath(window.location.pathname); window.addEventListener('popstate', fn); return () => window.removeEventListener('popstate', fn); }, []);
  const add = p => { setItems(x => [...x, p]); setDrawer(true); };
  const page = useMemo(() => {
    if (path === '/shop/' || path === '/shop') return <Shop onAdd={add} />;
    if (path === '/collections/' || path === '/collections') return <Collections />;
    if (path.includes('diamond-guide')) return <Guides />;
    if (path === '/our-story/' || path === '/our-story') return <Story />;
    if (path === '/contact/' || path === '/contact') return <Story contact />;
    if (path.includes('/product/')) return <ProductPage productId={path.split('/').filter(Boolean).pop()} onAdd={add} />;
    if (path.includes('brilliant-cut') || path.includes('rose-cut') || path.includes('antique-cut') || path.includes('step-cut') || path.includes('portrait-cut') || path.includes('old-mine')) return <CutPage cut={path.replaceAll('/', '').replace('diamonds', 'diamond')} />;
    return <Shop onAdd={add} />;
  }, [path]);
  return <><Header cartCount={items.length} onCart={() => setDrawer(true)} onSearch={() => setSearch(true)} />{page}<Footer />{drawer && <CartDrawer items={items} close={() => setDrawer(false)} remove={i => setItems(items.filter((_, n) => n !== i))} />}{search && <div className="search-overlay"><button onClick={() => setSearch(false)}><X /></button><div><div className="eyebrow">Search the edit</div><input autoFocus placeholder="Try “rose cut”" onKeyDown={e => e.key === 'Enter' && navigate('/shop/')} /></div></div>}</>;
}

createRoot(document.getElementById('root')).render(<App />);
