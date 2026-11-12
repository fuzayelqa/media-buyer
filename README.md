# Ozih Uddin Al Fuzayel: Portfolio

Single-page portfolio for a performance marketer and media buyer (Meta Ads, search arbitrage, content arbitrage). Design concept: "The Ledger", an accountant's ledger crossed with a trading desk.

Live: http://fuzayelqa.github.io/media-buyer/

Stack
HTML5
Tailwind CSS via CDN (custom config for paper, ink, accent colors and fonts)
Custom CSS (style.css)
Vanilla JavaScript (script.js), no frameworks, no jQuery
Google Fonts: Fraunces, DM Sans, JetBrains Mono
Structure
portfolio/
  index.html    markup, SEO tags, Tailwind config
  style.css     grain overlay, ledger rows, marquee, notes, cursor, reveals
  script.js     menu, reveal on scroll, nav highlight, ROI calculator,
                counters, copy email, mailto form, custom cursor
  img/
    fuzayelimg.jpg   your photo (add this file)
  README.md
Run locally

Open index.html in a browser. No build step. Needs an internet connection for the Tailwind CDN and Google Fonts.

Deploy on Netlify
Put your photo at img/fuzayelimg.jpg (lowercase name, Netlify is case-sensitive).
Drag the portfolio folder onto https://app.netlify.com/drop, or connect the repo.
No build command needed. Publish directory is the project root.
Replace these placeholders

In index.html:

Hero ledger (FIG. 1): Spend, Revenue, ROI, Status
Case notes A, B, C: campaign names, goal, what was tested, what was learned
Counters: set data-to="0" on each .count element to the real number, and update the [XX] fallback text, prefix and suffix
LinkedIn button: use your exact profile URL
Platform notes: reword to match how you actually use each platform
Open Graph: add an og:image tag (1200x630)
Photo: replace img/fuzayelimg.jpg
Features
Sticky nav with active section highlighting and mobile menu
Scrolling marquee (pauses on hover)
ROI calculator (profit, ROI %, ROAS)
Animated counters via IntersectionObserver
Copy-to-clipboard email with toast
Contact form with mailto fallback (opens the visitor's email app, nothing is stored)
Custom cursor dot on desktop only
Respects prefers-reduced-motion
Notes
The contact form uses mailto:, so it only works if the visitor has an email app set up. For a hosted form, use Netlify Forms later.
Fonts and Tailwind load from CDNs. For a faster production build, self-host fonts and compile Tailwind.
Contact

info.ozih@gmail.com | +8801783356008 | Kanaighat, Sylhet, Bangladesh
