"use client";

type SearchFormProps = {
  description: string;
  setDescription: (value: string) => void;

  keywords: string;
  setKeywords: (value: string) => void;

  isLoading: boolean;

  onGenerate: () => void;
};

export default function SearchForm({
  description,
  setDescription,
  keywords,
  setKeywords,
  isLoading,
  onGenerate,
}: SearchFormProps) {
  return (
    <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

      <div className="space-y-6">

        <div>
          <label className="mb-3 block font-medium text-gray-800">
            Describe your business
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Example: We create premium Christian apparel that helps young believers wear their faith confidently."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
          />

          <p className="mt-2 text-sm text-gray-500">
            The more specific your description, the better the names.
          </p>
        </div>

        <div>
          <label className="mb-3 block font-medium text-gray-800">
            Keywords (Optional)
          </label>

          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="faith, premium, modern"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
          />

          <p className="mt-2 text-sm text-gray-500">
            Separate multiple keywords with commas.
          </p>
        </div>

        <button
          type="button"
          disabled={isLoading || description.trim() === ""}
          onClick={onGenerate}
          className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Strategic Names"}
        </button>

      </div>

    </div>
  );
}