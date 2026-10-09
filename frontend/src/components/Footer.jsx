import { useLang } from '../i18n.jsx';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap">
        <span>{t('© 2026 Vayal Agri-Tech · Tamil Nadu, India', '© 2026 வயல் அக்ரி-டெக் · தமிழ்நாடு, இந்தியா')}</span>
        <span>{t('Vayal Hub · Vayal Node · Vayal Kit · Vayal Tag · Uzhvan app', 'வயல் ஹப் · வயல் நோட் · வயல் கிட் · வயல் டேக் · உழவன் ஆப்')}</span>
      </div>
    </footer>
  );
}
