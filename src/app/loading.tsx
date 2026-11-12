import { LoaderMark } from '@/components/Logo';

/**
 * Shown while a route is still streaming in. A server component with a
 * CSS-only animation, so it paints before any JavaScript for the incoming
 * route has run.
 */
export default function Loading() {
  return (
    <div
      className="grid min-h-[60vh] place-items-center bg-canvas px-6"
      role="status"
      aria-label="Loading"
    >
      <LoaderMark className="h-10 w-auto sm:h-12" />
      <span className="sr-only">Loading Reach My Ads…</span>
    </div>
  );
}
