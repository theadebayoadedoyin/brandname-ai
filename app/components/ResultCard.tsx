"use client";

export type BrandResult = {
  name: string;
  reason: string;
  personality: string[];
};

type ResultCardProps = {
  result: BrandResult;
};

export default function ResultCard({
  result,
}: ResultCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-xl">

      <div className="flex items-start justify-between gap-6">

        <div className="flex-1">

          <h3 className="font-display text-2xl text-gray-900">
            {result.name}
          </h3>

          <p className="mt-4 leading-7 text-gray-600">
            {result.reason}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {result.personality.map((trait) => (
              <span
                key={trait}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {trait}
              </span>
            ))}
          </div>

        </div>

        <button
          onClick={() => navigator.clipboard.writeText(result.name)}
          className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium transition hover:bg-gray-100"
        >
          Copy
        </button>

      </div>

    </div>
  );
}