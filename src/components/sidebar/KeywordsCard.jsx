import TextLoop from '../ui/TextLoop/TextLoop.jsx';
import { useI18n } from '../../i18n/I18nProvider.jsx';
import './Sidebar.css';

// Under the carousel: Rayane's key words on a pink ribbon that loops along a
// wave, crossed by a second one going the other way (React Bits Text Loop).
export default function KeywordsCard() {
  const { t } = useI18n();
  return (
    <section className="sidebar-section keywords" aria-label={t('kw.label')}>
      <TextLoop
        text={t('kw.a')}
        separator="✦"
        shape="wave"
        curviness={70}
        speed={70}
        fontSize={44}
        ribbonColor="#e0569f"
        ribbonWidth={80}
        cross
        crossColor="#5f3fe0"
        crossAngle={14}
        edgeFade={0.6}
        pauseOnHover
      />
    </section>
  );
}
