# Floating journal prototype artwork

This separate prototype lives at `floating-journal.html`. The existing entrance page and its links are unchanged.

`open-book.webp` is a 1536 × 1024 RGBA image (WebP quality 93), edited from the floating-book concept image approved in this conversation using the built-in image generation tool. The generated PNG is retained separately; only encoding was changed for the website. The existing materials folder and origami artwork provide the other visuals. The collage is an illustrative composition, not an app screenshot.

The prototype uses HTML text and links, CSS transitions, and lightweight SVG page-turn and projection overlays. The book itself is a static raster image, not a fully simulated 3D book. No runtime dependencies, analytics, storage, or external scripts were added. `noindex` keeps this experimental page out of search indexing.

## Book asset edit prompt

Use case: precise-object-edit. Asset type: isolated open-book base for the MEMORIA floating journal web prototype. Input image: the provided concept image is the edit target. Extract and adapt ONLY the physical open book at the bottom. Keep its warm ivory paper, many realistically layered tan page edges, softly worn powder-blue linen hardcover, fine paper grain and dimensional gentle shadows, frontal slightly elevated view and balanced left-right spread. Remove all floating information screens, text, photos, flowers, blue beams, arrows, surrounding tabletop and background. Deliver ONE open book, fully visible with a small transparent margin, centered across a wide landscape canvas, with genuine transparent alpha around its silhouette. Both top pages must be blank ivory paper and lie calmly open with a slight natural curved rise by the spine; remove the tall page currently flipping, do not leave any standing pages. The top blank spread should have a clear central gutter and natural shadows. The book must feel like the same tactile elegant antique journal as the reference, not a vector icon or plastic. No lettering, no symbols, no hologram, no ornaments, no detached objects, no opaque background, no baked checkerboard, no black fringe. Wide composition roughly 3:2, book spanning 90% of width. Preserve realistic thickness and crisp paper edges; subtle natural translucent contact shadow under the book.

## Review scope

Three pages: welcome, page-making illustration, and saving guidance. Navigate using buttons, page dots, left/right arrow keys or horizontal touch swipes. Vertical scrolling is preserved. The operating system's reduced-motion preference is respected; a page control also reduces motion. No automatic carousel or looping animation.

This is for visual review. Do not merge to main before user approval.

## Verification

- JavaScript syntax and relative asset/link paths checked.
- Desktop and 320px/390px mobile review frames inspected in Chromium; mobile horizontal overflow corrected.
- Previous/next buttons, page dots, keyboard wraparound and manual reduced-motion toggle exercised. Panel heights remain stable across the three pages at the inspected mobile sizes.
- Touch swipe handlers are implemented; real-device swipe behavior and iOS Safari still need user review.
- Existing entrance files are byte-for-byte unchanged from `design/origami-entrance` at `7a017dbb65a00e2d99b657ae2ee8c7593c91fad9`.

## Projection refinement

The treatment now reads as a frameless hologram projected from the book: a light source follows the gutter, and a soft fan of light connects it to the information. The rectangular outline and corner marks are hidden; the remaining translucent glow and fine static scan lines fade in every direction without making the text or pictures translucent. The book sits closer to the information, and the separate stacked glass sheets are removed. On entry and each page turn, the information grows upward from the light source; the page-turn emergence lasts 1.08 seconds. There is no looping movement.

The source position and animation origin use untransformed layout coordinates, updated on page changes and resizing, so the beam remains attached to the book. All guidance, links, and existing artwork are retained. No new image assets, packages, or services are needed.

Verified in a local Chromium preview at desktop, 320px, and 390px CSS viewport widths: all three panels remain readable, no mobile horizontal overflow, buttons and page dots work, controls unlock after the updated animation, and the light source stays aligned with the gutter. Manual reduced motion disables the pane and beam animations; system reduced-motion styles remain in place. Real-device touch and Safari still need user review.
