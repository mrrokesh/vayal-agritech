import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useLang } from './i18n.jsx';

// Demo simulation of three paddy plots running Alternate Wetting and Drying.
export const LOW = -15, HIGH = 5, MIN = -20, MAX = 10;

const initial = () => [
  { name: ['North paddy', 'வடக்கு நெல்'], day: 42, lv: -13.5, motor: false },
  { name: ['East paddy', 'கிழக்கு நெல்'], day: 38, lv: 3, motor: false },
  { name: ['South paddy', 'தெற்கு நெல்'], day: 45, lv: -8, motor: false },
];

export const pct = (v) => ((v - MIN) / (MAX - MIN)) * 100;

export function useAwdSim(toast) {
  const { lang, t } = useLang();
  const plots = useRef(initial());
  const [, rerender] = useReducer((x) => x + 1, 0);

  // The interval reads the latest language through a ref so messages stay current.
  const i18n = useRef();
  i18n.current = { t, nm: (p) => p.name[lang === 'ta' ? 1 : 0] };

  useEffect(() => {
    const id = setInterval(() => {
      const { t, nm } = i18n.current;
      for (const p of plots.current) {
        p.lv = Math.max(MIN, Math.min(MAX, p.lv + (p.motor ? 1.2 : -0.15)));
        if (!p.motor && p.lv <= LOW) {
          p.motor = true;
          toast(t(`${nm(p)} reached −15 cm. Hub started the motor.`, `${nm(p)} −15 செ.மீ. அடைந்தது. ஹப் மோட்டாரை இயக்கியது.`));
        }
        if (p.motor && p.lv >= HIGH) {
          p.motor = false;
          toast(t(`${nm(p)} is at +5 cm. Hub stopped the motor.`, `${nm(p)} +5 செ.மீ. அடைந்தது. ஹப் மோட்டாரை நிறுத்தியது.`));
        }
      }
      rerender();
    }, 1500);
    return () => clearInterval(id);
  }, [toast]);

  const toggleMotor = useCallback((i) => {
    const p = plots.current[i];
    p.motor = !p.motor;
    rerender();
    const { t, nm } = i18n.current;
    toast(p.motor
      ? t(`Motor started for ${nm(p)}. SMS sent in Tamil.`, `${nm(p)}: மோட்டார் இயங்கியது. தமிழில் SMS அனுப்பப்பட்டது.`)
      : t(`Motor stopped for ${nm(p)}.`, `${nm(p)}: மோட்டார் நிறுத்தப்பட்டது.`));
  }, [toast]);

  return { plots: plots.current, toggleMotor };
}

export function useFmt() {
  const { t } = useLang();
  return (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v)) + t(' cm', ' செ.மீ.');
}
