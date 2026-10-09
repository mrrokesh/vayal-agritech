import { useEffect, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { api, inr } from '../api.js';

const UNIT_TA = { quintal: 'குவிண்டால்', kg: 'கிலோ', nut: 'காய்', tonne: 'டன்' };

function BidDialog({ lot, onClose, toast }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', price: String(lot.price) });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const crop = t(lot.crop_en, lot.crop_ta);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [onClose]);

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || form.phone.replace(/\D/g, '').length !== 10 || !(Number(form.price) > 0)) {
      return setError(t('Please enter your name, a 10-digit mobile number and a price.', 'உங்கள் பெயர், 10 இலக்க மொபைல் எண், விலையை உள்ளிடவும்.'));
    }
    setBusy(true);
    try {
      await api(`/lots/${lot.id}/bids`, { method: 'POST', body: form });
      toast(t(`Bid placed for ${crop}. The farmer will call you.`, `${crop} க்கான உங்கள் ஏலம் பதிவானது. விவசாயி உங்களை அழைப்பார்.`));
      onClose();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="modal-back" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="bidTitle">
        <div className="modal-top">
          <div>
            <span className="eyebrow">{t('Place bid', 'ஏலம் கேட்க')}</span>
            <h3 id="bidTitle" style={{ marginTop: 6 }}>{crop}</h3>
          </div>
          <button type="button" aria-label={t('Close', 'மூடு')} onClick={onClose}>×</button>
        </div>
        <div className="row"><span>{t('Asking price', 'கேட்கும் விலை')}</span><b className="mono">{inr(lot.price)} / {t(lot.unit, UNIT_TA[lot.unit])}</b></div>
        <form onSubmit={submit} noValidate>
          <label>{t('Your name', 'உங்கள் பெயர்')}<input value={form.name} onChange={set('name')} autoComplete="name" autoFocus /></label>
          <label>{t('Mobile number', 'மொபைல் எண்')}<input type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} placeholder={t('10 digits', '10 இலக்கங்கள்')} /></label>
          <label>{t(`Your price (₹ per ${lot.unit})`, `உங்கள் விலை (₹ / ${UNIT_TA[lot.unit]})`)}<input type="number" min="1" value={form.price} onChange={set('price')} /></label>
          {error && <p className="err">{error}</p>}
          <button className="btn" type="submit" disabled={busy}>{busy ? t('Sending…', 'அனுப்புகிறது…') : t('Send bid', 'ஏலம் அனுப்பு')}</button>
        </form>
      </div>
    </div>
  );
}

export default function Market({ goForm, toast }) {
  const { t } = useLang();
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');
  const [lots, setLots] = useState(null);
  const [error, setError] = useState(false);
  const [bidLot, setBidLot] = useState(null);

  // Filtering happens in Postgres; debounce the search box.
  useEffect(() => {
    const ctrl = new AbortController();
    const id = setTimeout(() => {
      const params = new URLSearchParams();
      if (tab !== 'all') params.set('type', tab);
      if (q.trim()) params.set('q', q.trim());
      api(`/lots?${params}`, { signal: ctrl.signal })
        .then((rows) => { setLots(rows); setError(false); })
        .catch((e) => e.name !== 'AbortError' && setError(true));
    }, 200);
    return () => { clearTimeout(id); ctrl.abort(); };
  }, [tab, q]);

  const visit = (e) => { e.preventDefault(); goForm('Farm visit to sell on Uzhvan'); };
  const tabs = [['all', 'All lots', 'அனைத்தும்'], ['B2B', 'B2B · mills & exporters', 'B2B · ஆலைகள், ஏற்றுமதியாளர்கள்'], ['B2D', 'B2D · distributors', 'B2D · விநியோகஸ்தர்கள்']];
  const steps = [
    ['List the lot', 'அறுவடையைப் பட்டியலிடுங்கள்', 'Photo, quantity and expected price in the Uzhvan app.', 'உழவன் ஆப்பில் புகைப்படம், அளவு, எதிர்பார்க்கும் விலை.'],
    ['Quality check', 'தரச் சோதனை', 'A Vayal field officer grades moisture and size.', 'வயல் கள அலுவலர் ஈரப்பதம், அளவைச் சோதித்துத் தரம் பிரிப்பார்.'],
    ['Buyer bids', 'வாங்குபவர் ஏலம்', 'Verified buyers bid or accept your price.', 'சரிபார்க்கப்பட்ட வாங்குபவர்கள் ஏலம் கேட்பார்கள் அல்லது உங்கள் விலையை ஏற்பார்கள்.'],
    ['Paid on pickup', 'எடையின்போது பணம்', 'Money reaches your bank after weighment.', 'எடை போட்டதும் பணம் உங்கள் வங்கிக் கணக்கிற்கு வரும்.'],
  ];

  let body;
  if (error) body = <p className="err">{t('Could not load lots. Is the API server running?', 'பொருட்களை ஏற்ற முடியவில்லை. API சர்வர் இயங்குகிறதா?')}</p>;
  else if (!lots) body = <p className="empty">{t('Loading lots…', 'ஏற்றுகிறது…')}</p>;
  else if (!lots.length) body = <p className="empty">{t(`No lots match "${q}". Try another crop or district.`, `"${q}" க்குப் பொருந்தும் பொருள் இல்லை. வேறு பயிர் அல்லது மாவட்டத்தைத் தேடுங்கள்.`)}</p>;
  else body = (
    <div className="lots">
      {lots.map((l) => (
        <article className="lot" key={l.id}>
          <div className="lot-top"><h3>{t(l.crop_en, l.crop_ta)}</h3><span className="pill">{l.buyer_type}</span></div>
          <span className="farmer">{t(l.farmer_en, l.farmer_ta)}</span>
          <dl>
            <dt>{t('District', 'மாவட்டம்')}</dt><dd>{t(l.district_en, l.district_ta)}</dd>
            <dt>{t('Quantity', 'அளவு')}</dt><dd>{t(l.quantity_en, l.quantity_ta)}</dd>
            <dt>{t('Quality', 'தரம்')}</dt><dd>{t(l.quality_en, l.quality_ta)}</dd>
            <dt>{t('Available', 'கிடைக்கும்')}</dt><dd>{t(l.available_en, l.available_ta)}</dd>
          </dl>
          <div className="price mono">{inr(l.price)} <small>{t(`per ${l.unit}`, `/ ${UNIT_TA[l.unit]}`)}</small></div>
          <button className="btn ghost" onClick={() => setBidLot(l)}>{t('Place bid', 'ஏலம் கேட்க')}</button>
        </article>
      ))}
    </div>
  );

  return (
    <section id="market" className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{t('Uzhvan · farmer–buyer platform', 'உழவன் · விவசாயி–வாங்குபவர் தளம்')}</span>
          <h2>{t('Sell the harvest in bulk, straight from the farm gate.', 'அறுவடையைப் பண்ணை வாசலிலிருந்தே மொத்தமாக விற்பனை செய்யுங்கள்.')}</h2>
          <p className="lead">{t(
            'Uzhvan is our farmer–buyer app. Farmers list graded lots, and rice mills, wholesalers and exporters (B2B) and distributors and dealers (B2D) buy directly. There is no platform fee.',
            'உழவன் எங்கள் விவசாயி–வாங்குபவர் ஆப். விவசாயிகள் தரம் பிரிக்கப்பட்ட பொருட்களைப் பட்டியலிடுகிறார்கள். அரிசி ஆலைகள், மொத்த வியாபாரிகள், ஏற்றுமதியாளர்கள் (B2B), விநியோகஸ்தர்கள், டீலர்கள் (B2D) நேரடியாக வாங்குகிறார்கள். தளக் கட்டணம் இல்லை.')}</p>
        </div>

        <div className="app-band">
          <div className="app-icon" aria-hidden="true">உழவன்</div>
          <div>
            <h3>{t('Download the Uzhvan app', 'உழவன் ஆப்பைப் பதிவிறக்குங்கள்')}</h3>
            <p>{t('List your harvest, get bids and talk to buyers directly. Buyers find verified lots from across Tamil Nadu.', 'உங்கள் அறுவடையைப் பட்டியலிடுங்கள், ஏலங்களைப் பெறுங்கள், வாங்குபவர்களுடன் நேரடியாகப் பேசுங்கள். வாங்குபவர்கள் தமிழ்நாடு முழுவதும் சரிபார்க்கப்பட்ட பொருட்களைக் கண்டறியலாம்.')}</p>
            <div className="app-perks">
              <span>{t('Free download', 'இலவசப் பதிவிறக்கம்')}</span>
              <span>{t('₹0 platform fee', '₹0 தளக் கட்டணம்')}</span>
              <span>{t('Tamil & English', 'தமிழ் & ஆங்கிலம்')}</span>
            </div>
          </div>
          <div className="app-cta">
            <a className="btn" href="https://play.google.com/store/search?q=Uzhvan&c=apps" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 2.5v19c0 .4.4.6.7.4l10.8-9.5L4.7 2.1c-.3-.2-.7 0-.7.4zm12.9 8.7l-2.4-2.1 2.6-2.3 3.4 1.9c.8.5.8 1.6 0 2.1l-3.6 2zM6.3 21.5l8.2-7.3 2.2 2-10.4 5.3zM6.3 2.5l10.4 5.3-2.2 2-8.2-7.3z" /></svg>
              <span>{t('Get it on Google Play', 'Google Play-ல் பெறுங்கள்')}</span>
            </a>
            <a className="btn ghost" href="#contact" onClick={visit}>{t('Book a farm visit', 'வயல் வருகையை முன்பதிவு செய்க')}</a>
          </div>
        </div>

        <div className="mk-bar">
          <div className="tabs" role="tablist" aria-label="Buyer type">
            {tabs.map(([id, en, ta]) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{t(en, ta)}</button>
            ))}
          </div>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search crop or district', 'பயிர் அல்லது மாவட்டம் தேடுக')} aria-label="Search crop or district" />
        </div>
        {body}

        <div className="steps">
          {steps.map(([b, bTa, s, sTa]) => <div key={b}><b>{t(b, bTa)}</b><small>{t(s, sTa)}</small></div>)}
        </div>
        <div className="visit-row">
          <p>{t(
            <><b>Need help selling your harvest?</b> Our field officer visits your farm, grades the lot and lists it on Uzhvan for you.</>,
            <><b>அறுவடை விற்க உதவி வேண்டுமா?</b> எங்கள் கள அலுவலர் உங்கள் பண்ணைக்கு வந்து, தரம் பிரித்து, உழவனில் உங்களுக்காகப் பட்டியலிடுவார்.</>)}</p>
          <a className="btn" href="#contact" onClick={visit}>{t('Book a farm visit', 'வயல் வருகையை முன்பதிவு செய்க')}</a>
        </div>
      </div>
      {bidLot && <BidDialog lot={bidLot} toast={toast} onClose={() => setBidLot(null)} />}
    </section>
  );
}
