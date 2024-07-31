import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.defaults({ ease: "ease", duration: 0.5 });

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".layered-images",
        start: "center center",
        scrub: 0.2,
        end: "+=150%",
    },
});

tl.to(".center-image", { width: "100%", height: getHeightBasedOnWidth() });

function getHeightBasedOnWidth() {
    return window.innerWidth >= 768 ? 900 : 650;
}

ScrollTrigger.addEventListener("refreshInit", () => {
    tl.to(".center-image", { height: getHeightBasedOnWidth() });
});

let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".layered-images",
        start: "250px center",
        scrub: 0.2,
        end: "+=100%",
    },
});

let tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".layered-images",
        start: "250px center",
        scrub: 0.2,
        end: "+=100%",
    },
});

tl2.to(".right-image", { right: "70%", rotate: -20 });

tl3.to(".left-image", { left: "70%", rotate: 20 });
