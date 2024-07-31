import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power4.out", duration: 1 });

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".rounded-stat",
        start: "top top",
        end: "+=3000",
        pin: true,
        anticipatePin: 1,
        scrub: true,
    },
});

document.querySelectorAll(".rounded-conainer").forEach((container, index) => {
    if (index > 0) {
        tl.to(container, {
            opacity: 1,
            scale: 1,
        });
    }
});
