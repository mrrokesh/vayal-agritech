import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { api } from '../api.js';

const ROLES = [
  ['farmer', 'Farmer', 'விவசாயி'],
  ['fpo', 'FPO / producer company', 'FPO / உற்பத்தியாளர் நிறுவனம்'],
  ['carbon', 'Carbon developer / programme', 'கார்பன் டெவலப்பர் / திட்டம்'],
  ['buyer', 'Buyer (mill, trader, exporter)', 'வாங்குபவர் (ஆலை, வியாபாரி, ஏற்றுமதியாளர்)'],
  ['dealer', 'Distributor / dealer', 'விநியோகஸ்தர் / டீலர்'],
  ['business', 'Business / urban farm', 'நிறுவனம் / நகர்ப்புறப் பண்ணை'],
];
const PRODUCTS = [
  ['Vayal Kit', 'Vayal Kit', 'வயல் கிட்'],
  ['Vayal Hub', 'Vayal Hub', 'வயல் ஹப்'],
  ['Vayal Node', 'Vayal Node', 'வயல் நோட்'],
  ['Vayal Tag (bulk)', 'Vayal Tag (bulk)', 'வயல் டேக் (மொத்தம்)'],
  ['Vertical farming', 'Vertical farming', 'செங்குத்து விவசாயம்'],
  ['Custom automation', 'Custom field automation', 'தனிப்பயன் தானியங்கி'],
  ['Drone spraying', 'Drone spraying', 'ட்ரோன் தெளிப்பு'],
  ['Farm visit to sell on Uzhvan', 'Farm visit to sell on Uzhvan', 'உழவனில் விற்க வயல் வருகை'],
  ['Buying on Uzhvan', 'Buying on Uzhvan', 'உழவனில் வாங்குதல்'],
];
const EMPTY = { name: '', phone: '', role: 'farmer', district: '', acres: '', message: '' };

export default function Contact({ enquiry }) {
  const { lang, t } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [product, setProduct] = useState(enquiry.product);
  const [msg, setMsg] = useState(null); // { ok: boolean, text }
  const [busy, setBusy] = useState(false);
  const nameRef = useRef(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // An "Enquire" click elsewhere on the page picks the product and focuses the form.
  useEffect(() => {
    if (!enquiry.n) return;
    setProduct(enquiry.product);
    nameRef.current?.focus({ preventScroll: true });
  }, [enquiry]);

  async function submit(e) {
    e.preventDefault();
    const phone = form.phone.replace(/\D/g, '');
    if (!form.name.trim() || phone.length !== 10) {
      return setMsg({ ok: false, text: t('Please enter your name and a 10-digit mobile number.', 'உங்கள் பெயரையும் 10 இலக்க மொபைல் எண்ணையும் உள்ளிடவும்.') });
    }
    setBusy(true);
    try {
      await api('/enquiries', { method: 'POST', body: { ...form, phone, product, lang } });
      const [, en, ta] = PRODUCTS.find(([v]) => v === product);
      setMsg({ ok: true, text: t(
        `Thanks ${form.name.trim()}. Our team will call ${phone} about ${en}.`,
        `நன்றி ${form.name.trim()}. ${ta} பற்றி எங்கள் குழு ${phone} எண்ணை அழைக்கும்.`) });
      setForm(EMPTY);
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="band">
      <div className="wrap contact">
        <div>
          <span className="eyebrow">{t('Get started', 'தொடங்குங்கள்')}</span>
          <h2 style={{ marginBlock: 14 }}>{t('Book a free farm visit.', 'இலவச வயல் வருகையை முன்பதிவு செய்யுங்கள்.')}</h2>
          <p className="lead">{t(
            'Our team checks your borewell, starter and field, then recommends the right setup. Selling a harvest? We also visit to grade it and list it on Uzhvan. Available across Tamil Nadu.',
            'எங்கள் குழு உங்கள் போர்வெல், ஸ்டார்ட்டர், வயலைச் சோதித்துச் சரியான அமைப்பைப் பரிந்துரைக்கும். அறுவடையை விற்க விரும்பினால், தரம் பிரித்து உழவனில் பட்டியலிடவும் வருவோம். தமிழ்நாடு முழுவதும் சேவை.')}</p>
          <div className="facts">
            <div><span>{t('Phone', 'தொலைபேசி')}</span><b className="mono">+91 00000 00000</b></div>
            <div><span>{t('Email', 'மின்னஞ்சல்')}</span><b>hello@vayal.example</b></div>
            <div><span>{t('Office', 'அலுவலகம்')}</span><b>{t('Thanjavur, Tamil Nadu', 'தஞ்சாவூர், தமிழ்நாடு')}</b></div>
          </div>
        </div>
        <div className="panel">
          <form onSubmit={submit} noValidate>
            <label htmlFor="fName"><span>{t('Your name', 'உங்கள் பெயர்')}</span>
              <input id="fName" ref={nameRef} required autoComplete="name" value={form.name} onChange={set('name')} /></label>
            <label htmlFor="fPhone"><span>{t('Mobile number', 'மொபைல் எண்')}</span>
              <input id="fPhone" type="tel" required inputMode="numeric" placeholder={t('10 digits', '10 இலக்கங்கள்')} value={form.phone} onChange={set('phone')} /></label>
            <label htmlFor="fType"><span>{t('I am a', 'நான் ஒரு')}</span>
              <select id="fType" value={form.role} onChange={set('role')}>
                {ROLES.map(([v, en, ta]) => <option key={v} value={v}>{t(en, ta)}</option>)}
              </select></label>
            <label htmlFor="fDist"><span>{t('District', 'மாவட்டம்')}</span>
              <input id="fDist" placeholder={t('e.g. Thiruvarur', 'எ.கா. திருவாரூர்')} value={form.district} onChange={set('district')} /></label>
            <label htmlFor="fProduct"><span>{t('Interested in', 'ஆர்வம்')}</span>
              <select id="fProduct" value={product} onChange={(e) => setProduct(e.target.value)}>
                {PRODUCTS.map(([v, en, ta]) => <option key={v} value={v}>{t(en, ta)}</option>)}
              </select></label>
            <label htmlFor="fAcres"><span>{t('Farm area (acres)', 'பரப்பு (ஏக்கர்)')}</span>
              <input id="fAcres" type="number" min="0" value={form.acres} onChange={set('acres')} /></label>
            <label className="full" htmlFor="fMsg"><span>{t('Message', 'செய்தி')}</span>
              <textarea id="fMsg" rows="3" placeholder={t('Crop, borewell depth, motor HP, anything else', 'பயிர், போர்வெல் ஆழம், மோட்டார் HP, வேறு ஏதேனும்')} value={form.message} onChange={set('message')} /></label>
            <div className="full">
              <button className="btn" type="submit" disabled={busy}>{busy ? t('Sending…', 'அனுப்புகிறது…') : t('Request callback', 'திரும்ப அழைக்கக் கோருக')}</button>
            </div>
            {msg && <p className={`full ${msg.ok ? 'ok' : 'err'}`} role="status">{msg.text}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
