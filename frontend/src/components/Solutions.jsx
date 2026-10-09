import { useLang } from '../i18n.jsx';

const SPROUT = 'c0-10 6-16 12-16-2 7-6 12-12 16zm0 0c0-9-5-14-11-15 1 7 5 12 11 15z';

function VerticalArt() {
  const sprouts = [];
  for (const y of [68, 123, 178]) for (const x of [135, 165, 195, 225, 255]) sprouts.push(`M${x} ${y}${SPROUT}`);
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(255,255,255,.35)" strokeWidth="2">
        <path d="M110 20v170M290 20v170" />
        <path d="M110 70h180M110 125h180M110 180h180" />
      </g>
      <g fill="#f3d36b" opacity=".95">
        <rect x="122" y="26" width="156" height="5" rx="2.5" />
        <rect x="122" y="81" width="156" height="5" rx="2.5" />
        <rect x="122" y="136" width="156" height="5" rx="2.5" />
      </g>
      <g fill="#f3d36b" opacity=".12">
        <path d="M122 31h156l12 36H110z" /><path d="M122 86h156l12 36H110z" /><path d="M122 141h156l12 36H110z" />
      </g>
      <g fill="#b8e986">{sprouts.map((d) => <path key={d} d={d} />)}</g>
      <path d="M300 40v140h30" fill="none" stroke="#5cc2f5" strokeWidth="3" strokeLinecap="round" />
      <rect x="320" y="150" width="46" height="40" rx="6" fill="rgba(92,194,245,.25)" stroke="#5cc2f5" strokeWidth="2" />
      <g fontFamily="JetBrains Mono,monospace" fontSize="11" fill="#eaf4ec">
        <text x="20" y="60">pH 6.1</text><text x="20" y="80">EC 1.8</text><text x="20" y="100">24 °C</text><text x="20" y="120">RH 68%</text>
      </g>
    </svg>
  );
}

function CustomArt() {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
      <g stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeDasharray="5 5" fill="none">
        <path d="M200 100L80 50M200 100L80 150M200 100L320 50M200 100L320 150M200 100L200 30M200 100L200 175" />
      </g>
      <circle cx="200" cy="100" r="30" fill="#b8e986" />
      <text x="200" y="105" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="13" fontWeight="700" fill="#0d2a1a">HUB</text>
      <g fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.5)" strokeWidth="1.5">
        <circle cx="80" cy="50" r="20" /><circle cx="80" cy="150" r="20" /><circle cx="320" cy="50" r="20" /><circle cx="320" cy="150" r="20" /><circle cx="200" cy="30" r="16" /><circle cx="200" cy="175" r="16" />
      </g>
      <g fill="none" stroke="#eaf4ec" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M72 44h16l-4 12h-8z" />
        <path d="M80 142v16M72 150h16" />
        <path d="M312 56l8-14 8 14z" />
        <path d="M314 144c4 4 8-4 12 0M314 152c4 4 8-4 12 0" />
        <path d="M194 30h12M200 24v12" />
        <circle cx="200" cy="175" r="5" />
      </g>
    </svg>
  );
}

export default function Solutions({ goForm }) {
  const { t } = useLang();
  const feats = [
    ['Nutrient dosing', 'ஊட்டச்சத்து அளவீடு', 'Automatic pH and EC correction', 'pH, EC தானியங்கி சரிசெய்தல்'],
    ['LED light schedules', 'LED ஒளி அட்டவணை', 'Photoperiod for each crop', 'பயிருக்கு ஏற்ற ஒளி நேரம்'],
    ['Climate control', 'காலநிலைக் கட்டுப்பாடு', 'Temperature, humidity, CO₂', 'வெப்பம், ஈரப்பதம், CO₂'],
    ['Water recirculation', 'நீர் மறுசுழற்சி', 'Tank level and pump alerts', 'தொட்டி அளவு, பம்ப் எச்சரிக்கைகள்'],
  ];
  const chips = [
    ['Polyhouse & greenhouse climate', 'பாலிஹவுஸ், கிரீன்ஹவுஸ்'],
    ['Drip fertigation', 'சொட்டு நீர் உரப்பாசனம்'],
    ['Multi-borewell & pipelines', 'பல போர்வெல், குழாய் இணைப்பு'],
    ['Tank & sump levels', 'தொட்டி, சம்ப் நீர்மட்டம்'],
    ['Dairy & poultry sheds', 'பால் பண்ணை, கோழிப் பண்ணை'],
    ['Fish pond aeration', 'மீன் குளக் காற்றோட்டம்'],
    ['Cold storage monitoring', 'குளிர்பதனக் கிடங்கு'],
    ['Weather stations', 'வானிலை நிலையம்'],
  ];
  const steps = [
    ['Visit and understand', 'வருகை, புரிதல்', 'We study your site, water, power and goals.', 'உங்கள் இடம், நீர் ஆதாரம், மின்சாரம், தேவையைப் பார்க்கிறோம்.'],
    ['Design the system', 'வடிவமைப்பு', 'A plan with sensors, controllers and a clear quote.', 'சென்சார்கள், கட்டுப்படுத்திகள், செலவுடன் திட்டம்.'],
    ['Install and train', 'நிறுவல், பயிற்சி', 'Our team installs it and trains your staff in Tamil.', 'எங்கள் குழு நிறுவி, உங்கள் பணியாளர்களுக்குத் தமிழில் பயிற்சி அளிக்கும்.'],
    ['Support and upgrade', 'ஆதரவு, மேம்பாடு', 'Maintenance, updates and expansion as you grow.', 'பராமரிப்பு, புதுப்பிப்புகள், தேவைக்கேற்ப விரிவாக்கம்.'],
  ];

  return (
    <section id="solutions" className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{t('Solutions', 'தீர்வுகள்')}</span>
          <h2>{t('Beyond paddy. Automation built to your requirement.', 'நெல்லுக்கு அப்பாலும். உங்கள் தேவைக்கு ஏற்ற தானியங்கி அமைப்பு.')}</h2>
          <p className="lead">{t(
            'Every farm is different. We visit your site, understand what you need, then design, install and maintain a system made for it.',
            'ஒவ்வொரு பண்ணையும் வேறுபட்டது. உங்கள் இடத்தைப் பார்த்து, தேவையைப் புரிந்து, அதற்கேற்ற அமைப்பை வடிவமைத்து, நிறுவி, பராமரிக்கிறோம்.')}</p>
        </div>

        <div className="sol-grid">
          <article className="sol">
            <div className="sol-art" aria-hidden="true">
              <VerticalArt />
              <span className="pill">{t('Vertical farming', 'செங்குத்து விவசாயம்')}</span>
            </div>
            <div className="sol-body">
              <h3>{t('Complete automation for vertical and hydroponic farms', 'செங்குத்து, ஹைட்ரோபோனிக் பண்ணைகளுக்கு முழு தானியங்கி')}</h3>
              <p>{t('Grow more in less space. Control nutrients, light, climate and water from one dashboard.', 'சிறிய இடத்தில் அதிக விளைச்சல். ஊட்டச்சத்து, ஒளி, காற்றோட்டம், நீர் அனைத்தையும் ஒரே டாஷ்போர்டில் கட்டுப்படுத்துங்கள்.')}</p>
              <ul className="feat">
                {feats.map(([b, bTa, s, sTa]) => <li key={b}><b>{t(b, bTa)}</b><small>{t(s, sTa)}</small></li>)}
              </ul>
              <p className="sol-for">{t(
                <><b>For:</b> urban farms, microgreens, leafy greens, hydroponic start-ups, schools and institutions.</>,
                <><b>யாருக்கு:</b> நகர்ப்புறப் பண்ணைகள், மைக்ரோகிரீன்ஸ், கீரை வகைகள், ஹைட்ரோபோனிக் தொழில்முனைவோர், பள்ளிகள், நிறுவனங்கள்.</>)}</p>
              <button className="btn" onClick={() => goForm('Vertical farming')}>{t('Plan a vertical farm', 'செங்குத்துப் பண்ணை திட்டமிட')}</button>
            </div>
          </article>

          <article className="sol">
            <div className="sol-art" aria-hidden="true">
              <CustomArt />
              <span className="pill">{t('Custom automation', 'தனிப்பயன் தானியங்கி')}</span>
            </div>
            <div className="sol-body">
              <h3>{t('Field automation designed for your farm', 'உங்கள் வயலுக்கென வடிவமைக்கப்பட்ட தானியங்கி')}</h3>
              <p>{t('Tell us what you need. We build the sensors, controllers and app around your farm, not the other way round.', 'உங்கள் தேவையைச் சொல்லுங்கள். சென்சார்கள், கட்டுப்படுத்திகள், ஆப் அனைத்தையும் உங்கள் பண்ணைக்கு ஏற்ப உருவாக்குவோம்.')}</p>
              <div className="chips">
                {chips.map(([en, ta]) => <span key={en}>{t(en, ta)}</span>)}
              </div>
              <p className="sol-for">{t(
                <><b>For:</b> large farms, estates, FPOs, agri businesses and research stations.</>,
                <><b>யாருக்கு:</b> பெரிய பண்ணைகள், தோட்டங்கள், FPO-க்கள், வேளாண் நிறுவனங்கள், ஆராய்ச்சி நிலையங்கள்.</>)}</p>
              <button className="btn" onClick={() => goForm('Custom automation')}>{t('Discuss your requirement', 'உங்கள் தேவையைப் பேசுவோம்')}</button>
            </div>
          </article>
        </div>

        <div className="process" aria-label="How a custom project works">
          {steps.map(([b, bTa, s, sTa]) => <div key={b}><b>{t(b, bTa)}</b><small>{t(s, sTa)}</small></div>)}
        </div>
      </div>
    </section>
  );
}
