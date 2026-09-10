import { HeartPulse, Cpu, UserCheck } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-gray-50 border-t border-gray-100">
      <div className="container-width">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-900">
            How Circadian Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps — designed to feel less like a scan and more
            like someone paying attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-soft border border-gray-100 hover:border-circadian-200 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-circadian-100 text-circadian-700 flex items-center justify-center mb-6 shadow-inner">
              <HeartPulse className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Listen</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Hold the phone close. Our app captures the soft, steady rhythm of
              the heart — no extra hardware needed.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-soft border border-gray-100 hover:border-circadian-200 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-circadian-100 text-circadian-700 flex items-center justify-center mb-6 shadow-inner">
              <Cpu className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Understand</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Our models translate those sounds into meaningful patterns,
              flagging anything worth a closer look.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-soft border border-gray-100 hover:border-circadian-200 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-circadian-100 text-circadian-700 flex items-center justify-center mb-6 shadow-inner">
              <UserCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Act</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Clinicians get clear, supportive insights — so the next
              conversation with the patient can be the right one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
