import { Lightbulb, Medal, Target } from 'lucide-react';
import type { ComponentType } from 'react';
import type { ScoredCompany } from '../types';

export function InsightPanels({ companies }: { companies: ScoredCompany[] }) {
  const leader = [...companies].sort((a, b) => b.overallRating - a.overallRating)[0];
  const fastest = [...companies].sort((a, b) => a.averageDispatchTime - b.averageDispatchTime)[0];
  const priority = [...companies].sort((a, b) => a.digitalMaturityIndex + a.conversionRate - (b.digitalMaturityIndex + b.conversionRate))[0];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel
        icon={Medal}
        title="Кто лидер рынка и почему"
        text={`${leader.name}: рейтинг ${leader.overallRating}, доля ${leader.marketShare}%, сильная комбинация парка, доверия и скорости.`}
        color="bg-sunpop"
      />
      <Panel
        icon={Target}
        title="Что улучшить в первую очередь"
        text={`${priority.name}: приоритет - ${priority.recommendations[0].toLowerCase()}, чтобы поднять конверсию и цифровую зрелость.`}
        color="bg-candy"
      />
      <Panel
        icon={Lightbulb}
        title="Операционный инсайт"
        text={`${fastest.name} задает бенчмарк подачи ${fastest.averageDispatchTime} мин. Остальным нужно сокращать простой и зональное покрытие.`}
        color="bg-skyjam"
      />
    </div>
  );
}

function Panel({ icon: Icon, title, text, color }: { icon: ComponentType<{ className?: string }>; title: string; text: string; color: string }) {
  return (
    <div className={`toon-card rounded-[24px] ${color} p-5`}>
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-ink bg-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm font-bold leading-6 text-ink/75">{text}</p>
    </div>
  );
}
