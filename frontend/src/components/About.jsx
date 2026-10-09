import { useLang } from '../i18n.jsx';

const svgProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function About() {
  const { t } = useLang();
  const values = [
    [<svg {...svgProps}><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>,
      'Made for Tamil Nadu fields', 'தமிழ்நாட்டு வயல்களுக்காக', 'Built around power cuts, weak signal and local crops.', 'மின்வெட்டு, குறைந்த சிக்னல், உள்ளூர்ப் பயிர்களை மனதில் கொண்டு உருவாக்கப்பட்டது.'],
    [<svg {...svgProps}><path d="M4 7h10M4 17h6M18 7h2M14 17h6" /><circle cx="16" cy="7" r="2" /><circle cx="12" cy="17" r="2" /></svg>,
      'Customised, not one-size', 'உங்கள் தேவைக்கு ஏற்ப', 'We design the system after we see your farm.', 'உங்கள் பண்ணையைப் பார்த்த பிறகே அமைப்பை வடிவமைக்கிறோம்.'],
    [<svg {...svgProps}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>,
      'Support in Tamil', 'தமிழில் ஆதரவு', 'Call, SMS, app and field visits, all in your language.', 'அழைப்பு, SMS, ஆப், நேரில் வருகை. எல்லாம் உங்கள் மொழியில்.'],
  ];
  const links = [
    ['#irrigation', 'Smart irrigation', 'ஸ்மார்ட் பாசனம்'],
    ['#solutions', 'Vertical farming', 'செங்குத்து விவசாயம்'],
    ['#solutions', 'Custom automation', 'தனிப்பயன் தானியங்கி'],
    ['#drone', 'Drone spraying', 'ட்ரோன் தெளிப்பு'],
    ['#market', 'Uzhvan marketplace', 'உழவன் சந்தை'],
  ];
  return (
    <section id="about">
      <div className="wrap about">
        <div>
          <span className="eyebrow">{t('About us', 'எங்களைப் பற்றி')}</span>
          <p className="about-statement">{t(<>We connect technology <em>and farming.</em></>, <>தொழில்நுட்பத்தையும் <em>விவசாயத்தையும்</em> இணைக்கிறோம்.</>)}</p>
        </div>
        <div className="about-copy">
          <p className="first">{t(
            'Vayal Agri-Tech is an agri-tech company from Tamil Nadu. We design, build and install automation that helps farmers save water, time and money, and we help them sell what they grow at a fair price.',
            'வயல் அக்ரி-டெக் தமிழ்நாட்டைச் சேர்ந்த ஒரு வேளாண் தொழில்நுட்ப நிறுவனம். நீர், நேரம், பணம் மிச்சப்படுத்த உதவும் தானியங்கி அமைப்புகளை வடிவமைத்து, உருவாக்கி, நிறுவுகிறோம். விளைந்ததை நல்ல விலைக்கு விற்கவும் உதவுகிறோம்.')}</p>
          <p>{t(
            "Every farm is different, so we customise every system to the client's requirement, from a single borewell to a full vertical farm.",
            'ஒவ்வொரு பண்ணையும் வேறுபட்டது. அதனால் ஒவ்வொரு அமைப்பையும் வாடிக்கையாளரின் தேவைக்கு ஏற்பத் தனிப்பயனாக்குகிறோம். ஒரு போர்வெல் முதல் முழு செங்குத்துப் பண்ணை வரை.')}</p>
          <div className="values">
            {values.map(([icon, b, bTa, s, sTa]) => (
              <div key={b}>{icon}<b>{t(b, bTa)}</b><small>{t(s, sTa)}</small></div>
            ))}
          </div>
          <nav className="what-we-do" aria-label="What we do">
            {links.map(([href, en, ta]) => <a key={en} href={href}>{t(en, ta)}</a>)}
          </nav>
        </div>
      </div>
    </section>
  );
}
