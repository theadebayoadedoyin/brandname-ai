"use client";

type LoadingOverlayProps = {
  isLoading: boolean;
  message: string;
};

export default function LoadingOverlay({
  isLoading,
  message,
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[320px] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        </div>

        <h3 className="text-center text-lg font-semibold text-gray-900">
          BrandName AI
        </h3>

        <p className="mt-3 text-center text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}