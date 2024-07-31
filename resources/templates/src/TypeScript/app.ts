import "../Css/style.css";
import "../Views/Components/facts/Assets/facts.module";

import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute("href"));

        const target = document.querySelector(this.getAttribute("href"));

        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true, focusVisible: false });

        target.addEventListener("blur", () => {
            target.removeAttribute("tabindex");
        });

        target.addEventListener("focusout", () => {
            target.removeAttribute("tabindex");
        });
    });
});
