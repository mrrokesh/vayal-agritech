import { useLang } from '../i18n.jsx';

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--leaf)" />
      <path d="M16 25V13M16 17c-4 0-6-3-6-7 4 0 6 3 6 7zM16 15c4 0 6-3 6-7-4 0-6 3-6 7z" fill="var(--sprout)" stroke="var(--sprout)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 25h18" stroke="var(--sprout)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const { lang, setLang, t } = useLang();
  const links = [
    ['#irrigation', 'How it works', 'செயல்முறை'],
    ['#products', 'Products', 'தயாரிப்புகள்'],
    ['#solutions', 'Solutions', 'தீர்வுகள்'],
    ['#market', 'Uzhvan', 'உழவன் சந்தை'],
    ['#about', 'About us', 'எங்களைப் பற்றி'],
  ];
  return (
    <header className="nav">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Vayal home">
          <Logo />
          <span>{t('Vayal', 'வயல்')}</span>
        </a>
        <ul>
          {links.map(([href, en, ta]) => (
            <li key={href}><a href={href}>{t(en, ta)}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="lang" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button type="button" aria-pressed={lang === 'ta'} onClick={() => setLang('ta')} lang="ta">தமிழ்</button>
          </div>
          <a className="btn" href="#products">{t('Buy Vayal Kit', 'வயல் கிட் வாங்க')}</a>
        </div>
      </div>
    </header>
  );
}
