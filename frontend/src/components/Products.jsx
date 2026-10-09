import { useLang } from '../i18n.jsx';
import { inr } from '../api.js';

function TagArt() {
  return (
    <div className="tag-art" aria-hidden="true">
      <svg viewBox="0 0 120 120" fill="none">
        <rect x="0" y="78" width="120" height="42" fill="var(--line)" />
        <rect x="0" y="66" width="120" height="12" fill="var(--water)" opacity=".25" />
        <path d="M0 78h120" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="52" y="20" width="16" height="92" rx="3" fill="var(--surface)" stroke="var(--muted)" strokeWidth="1.5" />
        <g fill="var(--muted)"><circle cx="60" cy="60" r="2" /><circle cx="60" cy="72" r="2" /><circle cx="60" cy="84" r="2" /><circle cx="60" cy="96" r="2" /></g>
        <rect x="40" y="8" width="40" height="22" rx="5" fill="var(--hub)" />
        <circle cx="72" cy="19" r="2.5" fill="var(--sprout)" />
      </svg>
    </div>
  );
}

export default function Products({ products, goForm }) {
  const { t } = useLang();
  // Live price from the API, with the launch price as a placeholder while loading.
  const price = (slug, fallback) => (products[slug] ? inr(products[slug].price) : fallback);
  const kit = products.kit;
  const saving = kit?.mrp ? inr(kit.mrp - kit.price) : '₹999';

  const devices = [
    {
      img: <img src="/img/hub-pumphouse.webp" alt="Vayal Hub on a pump house wall" loading="lazy" style={{ objectPosition: '58% 42%' }} />,
      name: t('Vayal Hub', 'வயல் ஹப்'), price: price('hub', '₹5,999'),
      desc: t('Smart motor controller for any borewell farmer, any crop.', 'ஸ்மார்ட் மோட்டார் கட்டுப்படுத்தி. எந்த போர்வெல் விவசாயிக்கும், எந்தப் பயிருக்கும்.'),
      specs: [[t('Replaces', 'மாற்று'), t('Mobile starter', 'மொபைல் ஸ்டார்ட்டர்')], [t('Control', 'கட்டுப்பாடு'), t('App, IVR, missed call', 'ஆப், IVR, மிஸ்டு கால்')], [t('Protection', 'பாதுகாப்பு'), t('Dry run, phase, voltage', 'உலர் ஓட்டம், ஃபேஸ், மின்னழுத்தம்')]],
      buy: 'Vayal Hub', cta: t('Enquire', 'விசாரிக்க'),
    },
    {
      img: <img src="/img/node-field.webp" alt="Vayal Node on a pole in a paddy field" loading="lazy" style={{ objectPosition: '62% 45%' }} />,
      name: t('Vayal Node', 'வயல் நோட்'), price: price('node', '₹3,999'),
      desc: t('Solar water-level sensor that adds full AWD automation to a Hub.', 'சூரிய சக்தி நீர்மட்ட சென்சார். ஹப்புடன் இணைந்து முழு AWD தானியங்கி.'),
      specs: [[t('Reads', 'அளவீடு'), t('−20 to +10 cm', '−20 முதல் +10 செ.மீ.')], [t('Power', 'மின்சாரம்'), t('Solar', 'சூரிய சக்தி')], [t('Link', 'இணைப்பு'), t('Radio to Hub', 'ஹப்புடன் ரேடியோ')]],
      buy: 'Vayal Node', cta: t('Enquire', 'விசாரிக்க'),
    },
    {
      img: <><TagArt /><span className="pill">B2B</span></>,
      name: t('Vayal Tag', 'வயல் டேக்'), price: price('tag', '₹1,999'),
      desc: t('Measurement-only sensor for carbon developers and programmes.', 'அளவீடு மட்டும் செய்யும் சென்சார். கார்பன் டெவலப்பர்கள், திட்டங்களுக்கு.'),
      specs: [[t('Pump link', 'பம்ப் இணைப்பு'), t('None', 'இல்லை')], [t('Logs', 'பதிவு'), t('AWD events', 'AWD நிகழ்வுகள்')], [t('Use', 'பயன்'), t('Methane credit MRV', 'மீத்தேன் கிரெடிட் MRV')]],
      buy: 'Vayal Tag (bulk)', cta: t('Request bulk quote', 'மொத்த விலைப்புள்ளி கேட்க'),
    },
  ];

  const plans = [
    [t('Tamil IVR, SMS and app', 'தமிழ் IVR, SMS, ஆப்'), true],
    [t('Motor control and history', 'மோட்டார் கட்டுப்பாடு, வரலாறு'), true],
    [t('Rain skip (no pumping before rain)', 'மழை ஸ்கிப் (மழை வரும்போது பம்பிங் இல்லை)'), false],
    [t('Crop calendar', 'பயிர் நாட்காட்டி'), false],
    [t('Season report', 'பருவ அறிக்கை'), false],
    [t('Carbon credit enrolment', 'கார்பன் கிரெடிட் பதிவு'), false],
  ];
  const plus = price('plus', '₹49');

  return (
    <section id="products">
      <div className="wrap">
        <div className="head-row">
          <div className="sec-head">
            <span className="eyebrow">{t('Products', 'தயாரிப்புகள்')}</span>
            <h2>{t('Start with the Hub. Add a Node when you are ready.', 'ஹப்புடன் தொடங்குங்கள். தயாரானதும் நோடைச் சேர்க்கவும்.')}</h2>
          </div>
          <div className="trust">
            <span>{t('MRP pricing', 'MRP விலை')}</span>
            <span>{t('Installation support', 'நிறுவல் உதவி')}</span>
            <span>{t('Tamil helpline', 'தமிழ் உதவி எண்')}</span>
          </div>
        </div>

        <article className="kit">
          <div className="kit-img">
            <img src="/img/farmer-app.webp" alt="A farmer checks the Vayal app beside a Vayal Node in his paddy field" loading="lazy" />
            <span className="pill">{t('★ Best for paddy', '★ நெல்லுக்குச் சிறந்தது')}</span>
          </div>
          <div className="kit-body">
            <div>
              <span className="eyebrow">{t('Vayal Kit', 'வயல் கிட்')}</span>
              <h3 style={{ marginTop: 8 }}>{t('Everything a paddy field needs for automatic AWD, in one box.', 'நெல் வயலில் தானியங்கி AWD-க்குத் தேவையான அனைத்தும், ஒரே பெட்டியில்.')}</h3>
            </div>
            <div className="equation" aria-label={`Vayal Hub ${price('hub', '₹5,999')} plus Vayal Node ${price('node', '₹3,999')} equals Vayal Kit ${price('kit', '₹8,999')}`}>
              <div><small>{t('Vayal Hub', 'வயல் ஹப்')}</small><b>{price('hub', '₹5,999')}</b></div>
              <i>+</i>
              <div><small>{t('Vayal Node', 'வயல் நோட்')}</small><b>{price('node', '₹3,999')}</b></div>
              <i className="eq2">=</i>
              <div className="sum"><small>{t('Vayal Kit', 'வயல் கிட்')}</small><b>{price('kit', '₹8,999')}</b><s>{kit?.mrp ? inr(kit.mrp) : '₹9,998'}</s></div>
            </div>
            <dl className="specs">
              <div><dt>{t('Covers', 'பரப்பு')}</dt><dd>{t('~2 acres per Node', 'ஒரு நோடுக்கு ~2 ஏக்கர்')}</dd></div>
              <div><dt>{t('Fits', 'பொருந்தும்')}</dt><dd>{t('Your existing starter', 'உங்கள் தற்போதைய ஸ்டார்ட்டர்')}</dd></div>
              <div><dt>{t('Node power', 'மின்சாரம்')}</dt><dd>{t('Solar, no battery changes', 'சூரிய சக்தி, பேட்டரி மாற்ற வேண்டாம்')}</dd></div>
              <div><dt>{t('Alerts', 'எச்சரிக்கைகள்')}</dt><dd>{t('Tamil IVR, SMS and app', 'தமிழ் IVR, SMS, ஆப்')}</dd></div>
            </dl>
            <div className="kit-cta">
              <button className="btn" onClick={() => goForm('Vayal Kit')}>{t(`Enquire for Vayal Kit · Save ${saving}`, `வயல் கிட் விசாரிக்க · ${saving} சேமிப்பு`)}</button>
              <a className="btn ghost" href="#irrigation">{t('Watch the demo', 'டெமோ பாருங்கள்')}</a>
            </div>
          </div>
        </article>

        <div className="devices">
          {devices.map((d) => (
            <article className="dev" key={d.buy}>
              <div className="dev-img">{d.img}</div>
              <div className="dev-top"><h3>{d.name}</h3><span className="price mono">{d.price}</span></div>
              <p className="for">{d.desc}</p>
              <dl>
                {d.specs.map(([dt, dd], i) => <div key={i}><dt>{dt}</dt><dd>{dd}</dd></div>)}
              </dl>
              <button className="btn ghost" onClick={() => goForm(d.buy)}>{d.cta}</button>
            </article>
          ))}
        </div>

        <div className="plans-cmp">
          <div className="plans-intro">
            <span className="eyebrow">{t('Vayal service', 'வயல் சேவை')}</span>
            <h3>{t('Free with every device. Upgrade to Plus when you need it.', 'ஒவ்வொரு சாதனத்துடனும் இலவசம். தேவைப்பட்டால் பிளஸ்.')}</h3>
            <p>{t('Works on any phone. Farmers without a smartphone get a Tamil voice call and SMS.', 'எந்த போனிலும் வேலை செய்யும். ஸ்மார்ட்போன் இல்லாதவர்களுக்குத் தமிழ் குரல் அழைப்பும் SMS-ம் உண்டு.')}</p>
          </div>
          <div className="cmp-wrap">
            <table className="cmp">
              <thead>
                <tr>
                  <th scope="col"><span className="sr">{t('Feature', 'வசதி')}</span></th>
                  <th scope="col"><span>{t('Free', 'இலவசம்')}</span><span className="price mono">₹0</span></th>
                  <th scope="col" className="plus-col"><span>{t('Vayal Plus', 'வயல் பிளஸ்')}</span><span className="price mono">{t(`${plus}/mo`, `${plus}/மாதம்`)}</span></th>
                </tr>
              </thead>
              <tbody>
                {plans.map(([label, free], i) => (
                  <tr key={i}>
                    <td>{label}</td>
                    <td>{free ? <span className="yes">✓</span> : <span className="no">–</span>}</td>
                    <td className="plus-col"><span className="yes">✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
