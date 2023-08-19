// all the animation stuff will eb in this file

const moonIcon = document.querySelector(".ri-moon-line");
const sunIcon = document.querySelector(".ri-sun-line");
const themeBtn = document.querySelector("#theme-button");

moonIcon.addEventListener("click",() =>{
    gsap.to(".ri-sun-line",{
        rotate: 360,
    });
    
    gsap.to(".ri-moon-line",{
        rotate: 0,
    });
    
})

sunIcon.addEventListener("click",() =>{
        gsap.to(".ri-moon-line",{
            rotate: 360,    
        });

        gsap.to(".ri-sun-line",{
        rotate: 0,
    });
})
