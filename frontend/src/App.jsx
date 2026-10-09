import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from './api.js';
import { useAwdSim } from './useAwdSim.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Irrigation from './components/Irrigation.jsx';
import Products from './components/Products.jsx';
import Solutions from './components/Solutions.jsx';
import Drone from './components/Drone.jsx';
import Market from './components/Market.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [toastMsg, setToastMsg] = useState('');
  const timer = useRef();
  const toast = useCallback((m) => {
    setToastMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(''), 2800);
  }, []);

  const awd = useAwdSim(toast);

  // Prices come from Postgres; keyed by slug (kit, hub, node, tag, plus).
  const [products, setProducts] = useState({});
  useEffect(() => {
    api('/products')
      .then((rows) => setProducts(Object.fromEntries(rows.map((p) => [p.slug, p]))))
      .catch(() => {});
  }, []);

  // Any "Enquire" button pre-selects the product in the contact form and scrolls there.
  const [enquiry, setEnquiry] = useState({ product: 'Vayal Kit', n: 0 });
  const goForm = useCallback((product) => {
    setEnquiry((e) => ({ product, n: e.n + 1 }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <Hero plot={awd.plots[0]} products={products} />
        <Irrigation awd={awd} />
        <Products products={products} goForm={goForm} />
        <Solutions goForm={goForm} />
        <Drone />
        <Market goForm={goForm} toast={toast} />
        <About />
        <Contact enquiry={enquiry} />
      </main>
      <Footer />
      <div className="toast" role="status" hidden={!toastMsg}>{toastMsg}</div>
    </>
  );
}
