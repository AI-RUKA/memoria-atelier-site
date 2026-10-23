# Floating journal prototype artwork

This separate prototype lives at `floating-journal.html`. The existing entrance page and its links are unchanged.

`open-book.webp` is a 1536 × 1024 RGBA image (WebP quality 93), edited from the floating-book concept image approved in this conversation using the built-in image generation tool. The generated PNG is retained separately; only encoding was changed for the website. The existing materials folder and origami artwork provide the other visuals. The collage is an illustrative composition, not an app screenshot.

The prototype uses HTML text and links, CSS transitions, and lightweight SVG page-turn and projection overlays. The book itself is a static raster image, not a fully simulated 3D book. No runtime dependencies, analytics, storage, or external scripts were added. `noindex` keeps this experimental page out of search indexing.

## Book asset edit prompt

Use case: precise-object-edit. Asset type: isolated open-book base for the MEMORIA floating journal web prototype. Input image: the provided concept image is the edit target. Extract and adapt ONLY the physical open book at the bottom. Keep its warm ivory paper, many realistically layered tan page edges, softly worn powder-blue linen hardcover, fine paper grain and dimensional gentle shadows, frontal slightly elevated view and balanced left-right spread. Remove all floating information screens, text, photos, flowers, blue beams, arrows, surrounding tabletop and background. Deliver ONE open book, fully visible with a small transparent margin, centered across a wide landscape canvas, with genuine transparent alpha around its silhouette. Both top pages must be blank ivory paper and lie calmly open with a slight natural curved rise by the spine; remove the tall page currently flipping, do not leave any standing pages. The top blank spread should have a clear central gutter and natural shadows. The book must feel like the same tactile elegant antique journal as the reference, not a vector icon or plastic. No lettering, no symbols, no hologram, no ornaments, no detached objects, no opaque background, no baked checkerboard, no black fringe. Wide composition roughly 3:2, book spanning 90% of width. Preserve realistic thickness and crisp paper edges; subtle natural translucent contact shadow under the book.

## Review scope

Three pages: welcome, page-making illustration, and saving guidance. Navigate using buttons, page dots, left/right arrow keys or horizontal touch swipes. Vertical scrolling is preserved. Motion follows the operating system's reduced-motion preference, including changes while the page is open. There is no separate motion button. No automatic carousel or looping animation.

This is for visual review. Do not merge to main before user approval.

## Verification

- JavaScript syntax and relative asset/link paths checked.
- Desktop and 320px/390px mobile review frames inspected in Chromium; mobile horizontal overflow corrected.
- Previous/next buttons, page dots, keyboard wraparound exercised. The former manual reduced-motion toggle was also checked before it was removed. Panel heights remain stable across the three pages at the inspected mobile sizes.
- Touch swipe handlers are implemented; real-device swipe behavior and iOS Safari still need user review.
- Existing entrance files are byte-for-byte unchanged from `design/origami-entrance` at `7a017dbb65a00e2d99b657ae2ee8c7593c91fad9`.

## Projection refinement

The treatment now reads as a frameless hologram projected from the book: a light source follows the gutter, and a soft fan of light connects it to the information. The rectangular outline and corner marks are hidden; the remaining translucent glow and fine static scan lines fade in every direction without making the text or pictures translucent. The book sits closer to the information, and the separate stacked glass sheets are removed. There is no looping movement.

On entry and each page turn, a single soft light band travels upward from the book in 1.2 seconds. Each piece of information reveals from the bottom as the band reaches its layout position, then settles into place; controls unlock after the 1.46-second entrance. Illustrations sit closer to the viewer in CSS perspective and move farther than the text during the entrance. The warm palette, frameless silhouette, existing artwork and guidance remain intact. Text is fully opaque and unclipped once the entrance finishes. Reduced motion skips both the sweep and the layered reveal.

The source position and animation origin use untransformed layout coordinates, updated on page changes and resizing, so the beam remains attached to the book. Destination links, existing artwork, and the separate guide pages are retained. No new image assets, packages, or services are needed.

Verified in a local Chromium preview at desktop, 320px, and 390px CSS viewport widths: all three panels remain readable, no mobile horizontal overflow, buttons and page dots work, controls unlock after the updated animation, and the light source stays aligned with the gutter. The system reduced-motion styles and media-query listener remain in place. Real-device touch and Safari still need user review.

Depth/sweep review: checked the active sweep and layer animation styles during arrival, full-opacity unclipped content after arrival, restored controls, and immediate readable content with no sweep under the former manual reduced-motion control. Mobile widths remain free of horizontal overflow.

## Concise guide and glass controls

The floating pages now use shorter headings and one-line invitations. Repeated branding, English chapter labels, and repeated slogans were removed to leave more room for the artwork and projection. Free use without registration, browser-local storage, and the backup reminder remain explicit. All link destinations are unchanged; the existing entrance, saving guide, and prompt shelf are untouched.

Primary links use a soft glass pill with a small arrow, and page turns use round glass buttons. Three illuminated dots replace the visible duplicate page counter; its text and the live page announcement remain available to assistive technology. Arrow targets are 52px and dot targets are 44px. The background fills the viewport even when the shorter content no longer needs scrolling.

Verified in Chromium at desktop, 320px, and 390px: all three pages are readable with no horizontal overflow and stable panel heights (450px desktop, 422px mobile). Next, direct page selection, wraparound, and keyboard navigation work. The former manual reduced-motion control was also checked in that review. All content is opaque and unclipped after arrival, and controls unlock. Link destinations match the previous version; JavaScript syntax and diff whitespace checks pass. Real-device swipe and Safari remain unverified.

The header now contains only the entrance link. The manual motion button and its unused event handler, state, and styles have been removed. System reduced-motion handling still skips the animated page turn, suppresses the light sweep and layered reveal, and updates when the device preference changes.

After removing the motion button, Chromium review at 320px and 390px confirmed the header contains only the entrance link, normal page turns and direct selection still work, controls unlock, content reaches full opacity, and horizontal overflow is absent. System preference handling was reviewed in source; device-level reduced motion was not re-emulated in this pass.
