import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power4.out", duration: 1 });

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".fact-area",
        start: "top top",
        end: "+=3000",
        pin: true,
        anticipatePin: 1,
        scrub: true,
    },
});

document.querySelectorAll(".fact-container").forEach((container, index) => {
    if (index > 0) {
        tl.from(container, {
            opacity: 0,
        });
    }
});
