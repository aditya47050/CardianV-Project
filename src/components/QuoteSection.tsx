export function QuoteSection() {
  return (
    <section className="py-24 bg-circadian-50/40 border-y border-circadian-100/50">
      <div className="container-width">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-relaxed text-gray-800">
            A heart doesn&apos;t ask for attention. It just keeps going —
            <span className="text-circadian-600 font-medium">
              {" "}
              through long shifts, quiet mornings, and the people we love.
            </span>
          </p>
          <p className="mt-8 text-lg text-muted-foreground italic font-light">
            We built Circadian to listen back.
          </p>
        </div>
      </div>
    </section>
  );
}
