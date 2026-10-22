import GitHubActivity from '@/components/ui/github-activity';
import { useI18n } from '@/i18n/I18nProvider.jsx';
import { activity, skills } from '@/data/site.js';
import { SectionHead } from '@/components/site/skills-section.jsx';

// Loaded on demand (App.jsx): the contribution graph is below the fold.
export default function ActivitySection() {
  const { lang } = useI18n();
  return (
    <section id="activite" className="relative mx-auto max-w-5xl scroll-mt-20 px-5 pb-20 md:px-6 md:pb-28">
      <div className="grid items-center gap-10 rounded-3xl border bg-[radial-gradient(60%_90%_at_0%_0%,rgb(57_211_83/0.08),transparent)] p-6 md:grid-cols-[1fr_auto] md:p-10">
        <div>
          <SectionHead kicker={activity.kicker[lang]} title={activity.title[lang]} sub={activity.sub[lang]} />
          <a href="https://github.com/RYZ-up" target="_blank" rel="noreferrer" className="btn-ghost mt-6">
            github.com/RYZ-up
          </a>
        </div>
        <div className="flex justify-center overflow-x-auto">
          <GitHubActivity username="RYZ-up" months={10} label={skills.ghLabel[lang]} />
        </div>
      </div>
    </section>
  );
}
