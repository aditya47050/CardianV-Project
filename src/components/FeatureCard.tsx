import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
  highlightValue?: string;
  highlightText?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className = "",
  iconClassName = "",
  highlightValue,
  highlightText,
}: FeatureCardProps) {
  return (
    <div
      className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-soft bg-white border border-gray-100 hover:border-circadian-200 flex flex-col justify-between ${className}`}
    >
      <div>
        <div
          className={`w-12 h-12 mb-5 rounded-xl flex items-center justify-center bg-circadian-50 text-circadian-600 group-hover:bg-circadian-100 transition-colors ${iconClassName}`}
        >
          {icon}
        </div>

        {highlightValue && (
          <div className="mb-3 flex items-baseline">
            <span className="text-3xl font-bold text-circadian-600">
              {highlightValue}
            </span>
            {highlightText && (
              <span className="text-muted-foreground ml-2 text-sm font-medium">
                {highlightText}
              </span>
            )}
          </div>
        )}

        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
