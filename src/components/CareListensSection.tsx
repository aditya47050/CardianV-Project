import {
  HeartPulse,
  Activity,
  Stethoscope,
  UserCheck,
  BarChart2,
  Clock,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function CareListensSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-900">
            Care That Listens Closer
          </h2>
          <p className="text-xl text-muted-foreground">
            We built Circadian to give clinicians a quieter, kinder way to catch
            what often goes unheard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Hearing the Heart"
            description="Our models listen for the subtle murmurs and rhythms that can slip past a busy clinic visit."
            icon={<HeartPulse className="h-6 w-6" />}
            highlightValue="Up to 96%+"
            highlightText="Accuracy"
          />

          <FeatureCard
            title="Earlier Answers"
            description="We help surface concerns long before symptoms speak up — when there's still room to act gently."
            icon={<Activity className="h-6 w-6" />}
          />

          <FeatureCard
            title="A Wider Lens"
            description="From the irregular flutter of arrhythmia to the soft hush of a valve in trouble — we recognize the patterns worth a second look."
            icon={<Stethoscope className="h-6 w-6" />}
          />

          <FeatureCard
            title="Built For Clinicians"
            description="Slips into existing workflows and EHRs, so the focus stays on the patient — not the software."
            icon={<UserCheck className="h-6 w-6" />}
          />

          <FeatureCard
            title="Insights Worth Reading"
            description="Clear, human visualizations that make the data feel like a conversation, not a chart dump."
            icon={<BarChart2 className="h-6 w-6" />}
          />

          <FeatureCard
            title="A Heart Over Time"
            description="Track trends across months and years — because health is a story, not a snapshot."
            icon={<Clock className="h-6 w-6" />}
          />
        </div>
      </div>
    </section>
  );
}
