import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { api, inr } from '../api.js';

function DroneCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, cx = cv.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    let t = 1.3, drops = [], raf;
    function frame() {
      const W = cv.clientWidth, H = cv.clientHeight, dpr = devicePixelRatio || 1;
      if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, H);
      const leaf = css('--leaf'), water = css('--water'), ink = css('--ink');
      for (let x = 11; x < W; x += 22) for (let y = 20; y < H; y += 24) { cx.fillStyle = leaf; cx.beginPath(); cx.ellipse(x, y, 3, 6, 0.4, 0, 7); cx.fill(); }
      const lanes = 4, lh = H / lanes, prog = (t % (lanes * 2)) / 2;
      const lane = Math.floor(prog), f = prog - lane, dir = lane % 2 ? -1 : 1;
      const x = dir > 0 ? 30 + f * (W - 60) : W - 30 - f * (W - 60), y = lh * lane + lh / 2;
      cx.fillStyle = water; cx.globalAlpha = 0.14;
      for (let i = 0; i < lane; i++) cx.fillRect(0, lh * i + 8, W, lh - 16);
      cx.fillRect(dir > 0 ? 0 : x, y - lh / 2 + 8, dir > 0 ? x : W - x, lh - 16); cx.globalAlpha = 1;
      for (let i = 0; i < 3; i++) drops.push({ x: x + (Math.random() - 0.5) * 30, y: y + 6, v: 1 + Math.random() * 1.5, l: 1 });
      drops = drops.filter((d) => (d.y += d.v, d.l -= 0.04) > 0);
      cx.fillStyle = water; drops.forEach((d) => { cx.globalAlpha = d.l; cx.fillRect(d.x, d.y, 2, 3); }); cx.globalAlpha = 1;
      cx.strokeStyle = ink; cx.fillStyle = ink; cx.lineWidth = 2;
      cx.beginPath(); cx.moveTo(x - 16, y - 10); cx.lineTo(x + 16, y + 10); cx.moveTo(x + 16, y - 10); cx.lineTo(x - 16, y + 10); cx.stroke();
      cx.fillRect(x - 7, y - 6, 14, 12);
      [[-16, -10], [16, -10], [-16, 10], [16, 10]].forEach(([a, b]) => { cx.beginPath(); cx.ellipse(x + a, y + b, 9, 2.5, t * 8, 0, 7); cx.stroke(); });
      if (!reduce) { t += 0.006; raf = requestAnimationFrame(frame); }
    }
    frame();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} aria-label="Animation of a drone spraying rows of crops" />;
}

export default function Drone() {
  const { t } = useLang();
  const [rates, setRates] = useState([]);
  const [crop, setCrop] = useState('paddy');
  const [acres, setAcres] = useState('5');

  useEffect(() => { api('/drone-rates').then(setRates).catch(() => {}); }, []);

  const r = rates.find((x) => x.crop === crop);
  const a = Math.max(0, Number(acres) || 0);
  const ticks = [
    [<><b>Much less water.</b> Less water per acre than a knapsack sprayer, with even coverage.</>, <><b>மிகக் குறைந்த நீர்.</b> கைத் தெளிப்பானைவிட ஏக்கருக்குக் குறைவான நீர், சீரான தெளிப்பு.</>],
    [<><b>No chemical exposure.</b> Safer for farmers and labourers.</>, <><b>ரசாயன பாதிப்பு இல்லை.</b> விவசாயிகளுக்கும் தொழிலாளர்களுக்கும் பாதுகாப்பு.</>],
    [<><b>Nano urea and nano DAP ready.</b> With doses for each crop stage.</>, <><b>நானோ யூரியா, நானோ DAP தயார்.</b> ஒவ்வொரு பயிர் நிலைக்கும் ஏற்ற அளவுடன்.</>],
    [<><b>Spray report.</b> Map, litres used and time, saved in your app.</>, <><b>தெளிப்பு அறிக்கை.</b> வரைபடம், பயன்படுத்திய லிட்டர், நேரம் உங்கள் ஆப்பில் சேமிக்கப்படும்.</>],
  ];

  return (
    <section id="drone">
      <div className="wrap">
        <div className="feature flip">
          <div>
            <span className="eyebrow">{t('Drone sprinkler', 'ட்ரோன் தெளிப்பான்')}</span>
            <h2 style={{ marginBlock: 14 }}>{t('Spray fertiliser and pesticide without walking the field.', 'வயலில் நடக்காமலேயே உரமும் பூச்சிக்கொல்லியும் தெளியுங்கள்.')}</h2>
            <p className="lead">{t(
              'Book an agri drone from the Vayal app. A licensed pilot arrives with a 16-litre drone and sprays your plot along a GPS-mapped route.',
              'வயல் ஆப்பில் விவசாய ட்ரோனை முன்பதிவு செய்யுங்கள். உரிமம் பெற்ற பைலட் 16 லிட்டர் ட்ரோனுடன் வந்து, GPS வரைபட வழியில் உங்கள் நிலத்தில் தெளிப்பார்.')}</p>
            <ul className="ticks">
              {ticks.map(([en, ta], i) => <li key={i}><span>{t(en, ta)}</span></li>)}
            </ul>
          </div>
          <div className="panel">
            <div className="drone-field"><DroneCanvas /></div>
            <div className="drone-ctrl">
              <label htmlFor="dCrop"><span>{t('Crop', 'பயிர்')}</span>
                <select id="dCrop" value={crop} onChange={(e) => setCrop(e.target.value)}>
                  {rates.map((x) => <option key={x.crop} value={x.crop}>{t(x.name_en, x.name_ta)}</option>)}
                </select>
              </label>
              <label htmlFor="dAcres"><span>{t('Area (acres)', 'பரப்பு (ஏக்கர்)')}</span>
                <input id="dAcres" type="number" min="1" max="200" value={acres} onChange={(e) => setAcres(e.target.value)} />
              </label>
            </div>
            <div className="calc" aria-live="polite">
              <div><small>{t('Flight time', 'பறக்கும் நேரம்')}</small><b>{r ? `${Math.round(a * r.minutes_per_acre)} ${t('min', 'நிமி')}` : '—'}</b></div>
              <div><small>{t('Spray mix', 'தெளிப்புக் கலவை')}</small><b>{r ? `${a * r.litres_per_acre} ${t('L', 'லி')}` : '—'}</b></div>
              <div><small>{t('Est. cost', 'மதிப்பிட்ட செலவு')}</small><b>{r ? inr(a * r.cost_per_acre) : '—'}</b></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
