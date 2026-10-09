import { useLang } from '../i18n.jsx';
import { pct, useFmt } from '../useAwdSim.js';
import { inr } from '../api.js';

export default function Hero({ plot, products }) {
  const { t } = useLang();
  const fmt = useFmt();
  const kit = products.kit ? inr(products.kit.price) : '₹8,999';

  return (
    <div className="wrap hero">
      <div className="stage">
        <img src="/img/node-field.webp" alt="A solar-powered Vayal Node standing in a flooded paddy field in Tamil Nadu, with coconut palms behind" width="2000" height="1333" fetchPriority="high" />
        <div className="stage-copy">
          <div className="tamil"><b>வயல்</b><span>{t('Automatic irrigation for paddy', 'நெல் வயலுக்கான தானியங்கி பாசனம்')}</span></div>
          <h1>{t(<>Your borewell motor, <em>run by your paddy field.</em></>, <>உங்கள் போர்வெல் மோட்டாரை <em>உங்கள் நெல் வயலே இயக்கும்.</em></>)}</h1>
          <p className="lead">{t(
            'Vayal Node reads the water in your field. Vayal Hub starts and stops the motor at the right time. You hear about every run in Tamil, by call, SMS or app.',
            'வயல் நோட் வயலின் நீர்மட்டத்தை அளக்கிறது. வயல் ஹப் சரியான நேரத்தில் மோட்டாரை இயக்கி நிறுத்துகிறது. எல்லாத் தகவலும் அழைப்பு, SMS அல்லது ஆப் மூலம் தமிழில் உங்களுக்கு வரும்.')}</p>
          <div className="cta">
            <a className="btn" href="#products">
              <span>{t(`Get the Vayal Kit · ${kit}`, `வயல் கிட் · ${kit}`)}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a className="btn ghost" href="#irrigation">{t('See how it works', 'எப்படி வேலை செய்கிறது')}</a>
          </div>
        </div>

        <div className="gauge" aria-label="Live water level from a sample Vayal Node">
          <div className="gauge-head">
            <small>{t('Vayal Node · North paddy', 'வயல் நோட் · வடக்கு நெல்')}</small>
            <span className="live-dot">{t('LIVE', 'நேரலை')}</span>
          </div>
          <div className="tube" aria-hidden="true">
            <i style={{ height: pct(plot.lv) + '%' }} />
            <div className="soil" />
            <div className="mark" style={{ bottom: '83.3%' }} />
            <div className="mark" style={{ bottom: '66.7%' }} />
            <div className="mark low" style={{ bottom: '16.7%' }} />
          </div>
          <div className="gauge-read">
            <div>
              <div className="lbl">{t('Water level', 'நீர்மட்டம்')}</div>
              <div className="big">{fmt(plot.lv)}</div>
            </div>
            <div className="scale">
              <span>{t('+5 · stop', '+5 · நிறுத்தம்')}</span>
              <span>{t('0 · soil', '0 · மண் மட்டம்')}</span>
              <span className="low">{t('−15 · start', '−15 · இயக்கம்')}</span>
            </div>
            <div className="gauge-state">
              {plot.motor
                ? <span className="on">{t('Motor ON · filling', 'மோட்டார் ON · நிரப்புகிறது')}</span>
                : <><span>{t('Motor OFF', 'மோட்டார் OFF')}</span><span>AUTO</span></>}
            </div>
          </div>
        </div>
      </div>

      <div className="proof">
        <div className="accent"><b>{kit}</b><small>{t('Hub + Node kit', 'ஹப் + நோட் முழு கிட்')}</small></div>
        <div><b>{t('~2 acres', '~2 ஏக்கர்')}</b><small>{t('per Node', 'ஒரு நோடுக்கு')}</small></div>
        <div><b>₹0</b><small>{t('Tamil IVR, SMS and app', 'தமிழ் IVR, SMS, ஆப்')}</small></div>
        <div><b>{t('Solar', 'சூரிய சக்தி')}</b><small>{t('No wiring to the Node', 'நோட்டுக்கு மின் இணைப்பு தேவையில்லை')}</small></div>
      </div>
    </div>
  );
}
