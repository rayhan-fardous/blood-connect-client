import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-md w-full space-y-8">
        {/* Animated Heart / Drop Icon Container */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Pulsing background glow */}
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-ping"></div>

            {/* Main Icon */}
            <div className="relative bg-white p-6 rounded-full shadow-lg border border-red-100">
              <svg
                className="w-20 h-20 text-red-600 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-3">
          <h1 className="text-8xl font-black text-red-600 tracking-tight">
            404
          </h1>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Oops! This donor link went missing.
          </h2>
          <p className="text-base text-slate-600 max-w-xs mx-auto">
            The page you are looking for might have been moved, or it never
            existed. Let's get you back on track to saving lives.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Subtle Footer Quote */}
        <p className="text-xs text-slate-400 pt-8">
          Every second counts. Thank you for your willingness to donate.
        </p>
      </div>
    </div>
  );
}
