import { useState } from 'react';
import { useLang } from '../i18n.jsx';
import { LOW, HIGH, MIN, MAX, pct, useFmt } from '../useAwdSim.js';

function Spark({ lv }) {
  const { t } = useLang();
  // Reconstruct a plausible 7-day history ending at the current level.
  const pts = [];
  let v = lv, falling = true;
  for (let i = 0; i < 56; i++) {
    pts.unshift(v);
    v += falling ? 0.45 : -3;
    if (v <= LOW) { falling = true; v = LOW; }
    if (v >= HIGH) { falling = false; v = HIGH; }
  }
  const w = 300, h = 70, y = (val) => h - ((val - MIN) / (MAX - MIN)) * h;
  const d = pts.map((q, i) => (i ? 'L' : 'M') + (i * (w / 55)).toFixed(1) + ' ' + y(q).toFixed(1)).join(' ');
  return (
    <>
      <svg className="spark" viewBox="0 0 300 70" preserveAspectRatio="none" role="img" aria-label={t('Field water level over the last 7 days', 'கடந்த 7 நாள் வயல் நீர்மட்டம்')}>
        <line x1="0" x2="300" y1={y(0)} y2={y(0)} stroke="var(--muted)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="300" y1={y(LOW)} y2={y(LOW)} stroke="var(--alert)" strokeWidth="1" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
        <path d={`${d} L300 70 L0 70Z`} fill="var(--water)" opacity=".15" />
        <path d={d} fill="none" stroke="var(--water)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="spark-cap">
        <span>{t('7 days ago', '7 நாள் முன்')}</span>
        <span>{t('soil 0 · refill −15 cm', 'மண் 0 · நிரப்பல் −15')}</span>
        <span>{t('now', 'இப்போது')}</span>
      </div>
    </>
  );
}

export default function Irrigation({ awd }) {
  const { lang, t } = useLang();
  const fmt = useFmt();
  const [sel, setSel] = useState(0);
  const nm = (p) => p.name[lang === 'ta' ? 1 : 0];
  const p = awd.plots[sel];

  const [status, cls] = p.motor ? [t('Refilling', 'நீர் நிரப்புகிறது'), 'blue']
    : p.lv <= LOW ? [t('Refill now', 'இப்போது நிரப்பவும்'), 'bad']
    : p.lv < 0 ? [t('Drying (AWD)', 'காய்கிறது (AWD)'), 'warn']
    : [t('Flooded', 'நீர் நிரம்பியது'), ''];

  const ticks = [
    [<><b>Saves water and power.</b> Fewer pumping hours on every crop cycle.</>, <><b>நீரும் மின்சாரமும் மிச்சம்.</b> ஒவ்வொரு பயிர்ச் சுழற்சியிலும் குறைவான பம்பிங் நேரம்.</>],
    [<><b>Knows the power schedule.</b> Starts the motor as soon as three-phase supply returns.</>, <><b>மின் அட்டவணை தெரியும்.</b> மும்முனை மின்சாரம் வந்தவுடன் மோட்டாரைத் தொடங்கும்.</>],
    [<><b>Protects the motor.</b> Stops on dry run, low voltage or phase failure.</>, <><b>மோட்டாரைப் பாதுகாக்கும்.</b> உலர் ஓட்டம், குறைந்த மின்னழுத்தம் அல்லது ஃபேஸ் தவறினால் நிறுத்தும்.</>],
    [<><b>Talks in Tamil.</b> Free IVR call and SMS for basic phones, app for smartphones.</>, <><b>தமிழில் பேசும்.</b> சாதாரண போன்களுக்கு இலவச IVR அழைப்பு, SMS; ஸ்மார்ட்போனுக்கு ஆப்.</>],
  ];
  const cycle = [
    ['+5 cm', '+5 செ.மீ.', 'Field flooded', 'வயலில் நீர் நிரம்பியது', 'Hub stops the motor when the water reaches the top level.', 'நீர் மேல் அளவை அடைந்ததும் ஹப் மோட்டாரை நிறுத்தும்.'],
    ['0 cm', '0 செ.மீ.', 'Water at soil surface', 'மண் மட்டத்தில் நீர்', 'The field dries naturally. No pumping needed.', 'வயல் இயற்கையாகக் காய்கிறது. பம்பிங் தேவையில்லை.'],
    ['−15 cm', '−15 செ.மீ.', 'Refill point', 'மீண்டும் நிரப்பும் அளவு', 'Node sees the level inside its pipe and tells the Hub.', 'நோட் தன் குழாயில் நீர்மட்டத்தைப் பார்த்து ஹப்புக்குத் தெரிவிக்கும்.'],
    ['Auto', 'தானியங்கி', 'Motor starts', 'மோட்டார் இயங்கும்', 'Hub starts the motor and sends you an SMS. The cycle repeats.', 'ஹப் மோட்டாரை இயக்கி உங்களுக்கு SMS அனுப்பும். சுழற்சி தொடரும்.'],
  ];

  return (
    <section id="irrigation" className="band">
      <div className="wrap">
        <div className="feature">
          <div className="console" aria-label="Sample farm dashboard">
            <div className="console-top">
              <h3>{t("Murugan's farm · Thanjavur", 'முருகன் பண்ணை · தஞ்சாவூர்')}</h3>
              <span className="pill">{t('● Live demo', '● நேரடி டெமோ')}</span>
            </div>
            <div className="plots" role="group" aria-label="Choose a plot">
              {awd.plots.map((q, i) => (
                <button key={i} className="plot" aria-pressed={i === sel} onClick={() => setSel(i)}>
                  <small>{nm(q)}</small><b>{fmt(q.lv)}</b>
                  <div className="bar"><i style={{ width: pct(q.lv) + '%' }} /></div>
                </button>
              ))}
            </div>
            <div className="detail">
              <div className="row"><b>{t(`Paddy · Samba · day ${p.day}`, `நெல் · சம்பா · ${p.day}-ஆம் நாள்`)}</b><span className={`pill ${cls}`}>{status}</span></div>
              <Spark lv={p.lv} />
              <div className="row"><span>{t('Water level (Vayal Node)', 'நீர்மட்டம் (வயல் நோட்)')}</span><b className="mono">{fmt(p.lv)}</b></div>
              <div className="row"><span>{t('Three-phase power', 'மும்முனை மின்சாரம்')}</span><b className="mono">{t('ON · till 18:00', 'ON · 18:00 வரை')}</b></div>
              <div className="row"><span>{t('Mode', 'இயக்க முறை')}</span><b className="mono">{t('AUTO · refill at −15 cm', 'AUTO · −15 செ.மீ.-ல் நிரப்பும்')}</b></div>
              <div className="row">
                <span>{t('Motor (Vayal Hub)', 'மோட்டார் (வயல் ஹப்)')}</span>
                <button className="switch" role="switch" aria-checked={p.motor} aria-label={`${t('Motor for', 'மோட்டார்:')} ${nm(p)}`} onClick={() => awd.toggleMotor(sel)} />
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow">{t('How it works', 'செயல்முறை')}</span>
            <h2 style={{ marginBlock: 14 }}>{t('Let the field dry a little. Vayal refills it on time.', 'வயலைச் சற்று காய விடுங்கள். சரியான நேரத்தில் Vayal மீண்டும் நீர் நிரப்பும்.')}</h2>
            <p className="lead">{t(
              'Paddy does not need standing water all season. With AWD, the water is allowed to drop below the soil and is refilled only when it reaches −15 cm. Vayal Node measures this every few minutes and Vayal Hub starts the motor for you.',
              'நெல்லுக்குப் பருவம் முழுவதும் தேங்கிய நீர் தேவையில்லை. AWD முறையில் நீர் மண்ணுக்குக் கீழே இறங்க விடப்பட்டு, −15 செ.மீ. அடைந்ததும் மட்டுமே மீண்டும் நிரப்பப்படுகிறது. வயல் நோட் இதைச் சில நிமிடங்களுக்கு ஒருமுறை அளக்கிறது; வயல் ஹப் உங்களுக்காக மோட்டாரை இயக்குகிறது.')}</p>
            <ul className="ticks">
              {ticks.map(([en, ta], i) => <li key={i}><span>{t(en, ta)}</span></li>)}
            </ul>
          </div>
        </div>

        <div className="awd" aria-label="The AWD cycle">
          {cycle.map(([lv, lvTa, h, hTa, s, sTa]) => (
            <div key={lv}><span className="lvl">{t(lv, lvTa)}</span><b>{t(h, hTa)}</b><small>{t(s, sTa)}</small></div>
          ))}
        </div>

        <div className="duo">
          <figure>
            <img src="/img/node-field.webp" alt="Vayal Node mounted on a pole in a paddy field, with a solar panel on top and a perforated water-level pipe in the soil" loading="lazy" width="2000" height="1333" />
            <figcaption>{t(
              <><b>Vayal Node in the field.</b> Solar powered. The perforated pipe measures water level above and below the soil.</>,
              <><b>வயலில் வயல் நோட்.</b> சூரிய சக்தியில் இயங்கும். துளையிட்ட குழாய் மண்ணுக்கு மேலும் கீழும் நீர்மட்டத்தை அளக்கிறது.</>)}</figcaption>
          </figure>
          <figure>
            <img src="/img/hub-pumphouse.webp" alt="Vayal Hub installed on a pump house wall next to the existing motor starter, its display reading minus 8 centimetres AUTO" loading="lazy" width="2000" height="1333" />
            <figcaption>{t(
              <><b>Vayal Hub in the pump house.</b> Wires into your existing starter. The display shows field water level and mode.</>,
              <><b>பம்ப் அறையில் வயல் ஹப்.</b> உங்கள் தற்போதைய ஸ்டார்ட்டருடன் இணைக்கப்படும். திரையில் வயல் நீர்மட்டமும் இயக்க முறையும் தெரியும்.</>)}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
