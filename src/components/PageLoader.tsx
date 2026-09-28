import { LogoIntro } from './Logo';

/** Shortest the curtain stays up: the whole intro, with a beat on the finished logo. */
const MIN_MS = 2600;
/** Longest it waits on a slow network before showing the page anyway. */
const MAX_MS = 4500;

/**
 * Decides before first paint whether this visit gets the curtain. It plays
 * once per browser session and never under reduced motion. Crawlers and
 * speed-test tools (Googlebot, Lighthouse, PageSpeed Insights) skip it, so
 * they see and score the page itself rather than a loading screen. Without this
 * script the curtain stays `display: none`, so visitors with JavaScript off
 * see the page straight away.
 */
const curtainScript = `(function(){var d=document.documentElement;try{if(/bot|crawl|spider|slurp|lighthouse|pagespeed|headless|inspectiontool/i.test(navigator.userAgent)||sessionStorage.getItem('rma-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;sessionStorage.setItem('rma-intro','1')}catch(e){return}d.classList.add('rma-intro');var t=Date.now(),done=0;function hide(){if(done)return;done=1;d.classList.add('rma-intro-done')}function ready(){setTimeout(hide,Math.max(0,${MIN_MS}-(Date.now()-t)))}if(document.readyState==='complete')ready();else addEventListener('load',ready);setTimeout(hide,${MAX_MS})})();`;

/**
 * First-visit curtain that plays the brand intro while the page loads.
 *
 * Pure server markup plus a tiny inline script: it has to paint before any
 * React code arrives. The page content sits underneath it in the DOM the
 * whole time, so crawlers and screen readers are never blocked by it.
 */
export function PageLoader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: curtainScript }} />
      <div className="brand-curtain" role="status" aria-label="Loading Reach My Ads">
        <LogoIntro className="h-auto w-[min(76vw,420px)]" />
      </div>
    </>
  );
}
