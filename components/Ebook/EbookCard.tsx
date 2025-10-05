import { ArrowTopRightOnSquareIcon, SparklesIcon } from "@heroicons/react/24/outline";
import type { EbookItem } from "./ebookData";

interface EbookCardProps {
  ebook: EbookItem;
  isDark: boolean;
  className?: string;
}

const baseCardClass =
  "relative w-full overflow-hidden rounded-3xl border shadow-xl transition-colors duration-500";

export function EbookCard({ ebook, isDark, className }: EbookCardProps) {
  const containerClass = [
    baseCardClass,
    isDark ? "border-gray-800 bg-gray-900/80" : "border-gray-200 bg-white",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass}>
      <div
        className={`pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-500 ${
          isDark
            ? `bg-gradient-to-br ${ebook.darkGradient}`
            : `bg-gradient-to-br ${ebook.lightGradient}`
        }`}
        aria-hidden
      />

      <div className="relative flex h-full flex-col gap-6 p-8">
        <div className="space-y-4">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest transition-colors duration-500 ${
              isDark ? "bg-gray-800 text-gray-200" : "bg-gray-900 text-white"
            }`}
          >
            {ebook.badge}
          </span>
          <div className="space-y-4">
            <h3
              className={`text-2xl font-light transition-colors duration-500 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {ebook.title}
            </h3>
            <p
              className={`text-sm font-light leading-relaxed transition-colors duration-500 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {ebook.description}
            </p>
            <div
              className={`flex items-start gap-3 text-sm font-light transition-colors duration-500 ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <SparklesIcon className="h-5 w-5 flex-shrink-0" />
              <span>
                <span className="font-medium">{ebook.highlightLabel}: </span>
                {ebook.highlight}
              </span>
            </div>
          </div>
        </div>

        <a
          href={ebook.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
            isDark
              ? "bg-white text-gray-900 hover:bg-gray-200"
              : "bg-gray-900 text-white hover:bg-black"
          }`}
        >
          {ebook.buyLabel}
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
