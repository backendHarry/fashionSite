gsap.registerPlugin(ScrollTrigger)


// my preloader ...
let loaders = document.querySelectorAll('.loaders');

gsap.to(loaders, {y:'-100%', duration:1, stagger:0.3, opacity:0, ease:'power0.out'})

// end preloaders

// for parrallax view enable pin to true, else leave this way and users wont use tracker btns
gsap.utils.toArray('section').forEach((panel, i)=> {
    ScrollTrigger.create({
        trigger:panel,
        start:'top top',
        pin:false,
        pinSpacing:false
    })
})


// initial animation for first section 

let s1 = gsap.timeline();

s1.to('.intro .first', {duration:0.6, x:'10rem', opacity:1})
  .from('.intro .second', {duration:0.5, y:300, opacity:0})
  .fromTo('.intro h1', 0.5 , {opacity:0, scale:0}, {opacity:1, scale:1, rotation:'-10deg', ease:'power0.in'})
  .to('.intro h2', {duration:0.5, opacity:1, ease:'power2.in'}, '+=0.1');

// an animation for first section when scrolling out 

let s2= gsap.timeline()

s2.to('.intro .first', {duration:0.6, x:'60rem', opacity:0})
    .to('.intro .second', {duration:0.5, x:-300, opacity:0})
    .fromTo('.intro h1', 0.5 , {opacity:1, scale:1, rotation:'-10deg'}, {opacity:0, scale:0, rotation:'0deg', ease:'power0.out'})
    .to('.intro h2', {duration:0.5, opacity:0, ease:'power2.in'}, '+=0.1');

ScrollTrigger.create({
  animation:s2,
  start:'top top',
  markers:true,
  toggleActions:'restart none reverse reverse'
})

// for section 2

let s3= gsap.timeline()

s3.fromTo('.vid-section h1', 0.5 , {opacity:0, scale:0}, {opacity:1, scale:1, rotation:'-10deg', ease:'power0.in'})
    .fromTo('.vid-section h2', {opacity:0}, {duration:0.5, opacity:1, ease:'power2.in'}, '+=0.1');

ScrollTrigger.create({
  animation:s3,
  start:'top top',
  markers:true,
  toggleActions:'restart none reverse reverse'
})

// for last section 
let s4 = gsap.timeline({defaults:{repeat:-1, yoyo:true}});
s4.to('.animate-gallery h1' , {duration:1, y:-70, scale:1});


// nav Bars ...

let barAnime = gsap.timeline();
let hamburger = document.querySelector('.hamburger');
let nav = document.querySelector('.nav')
let cancel = document.querySelector('.nav i');
let listItems = document.querySelectorAll('.list-item');

// nav bar animation 

let menuAnime = gsap.timeline({paused:true, reversed:true});

menuAnime.to(nav, {right:0})
          .from(listItems, {opacity:0, stagger:0.2, x:40}, '+=.2');

hamburger.addEventListener('click', (e) => {
 menuAnime.reversed() ? menuAnime.play() : menuAnime.reverse();
});

cancel.addEventListener('click', (e) => {
  menuAnime.reversed() ? menuAnime.play() : menuAnime.reverse();
 });

//  stop nav bar animation

// // using full page ..and vanilla js

const btnArray = Array.from(document.querySelectorAll('.trackerBtn'));
const sectionArray = Array.from(document.querySelectorAll('section'));
const galleryArray = Array.from(document.querySelectorAll('.panel'));
const vidPlay = document.querySelector('.vid-section .toggle-btn button ');
const video = document.querySelector('.vid-section video');

// using arrays for node list coz moz browser does not primarily support it for devs including me

btnArray.forEach((btn) => {
  btn.addEventListener('click', pageIn);
});

// setting the event for all btns ..

// function to highlight button to let users identify current page through current btn ...

let btnShow = (status, index) => {
  if(status === 'show'){
      btnArray.forEach((curBtn, i) =>{
          if(index === i){
              curBtn.classList.add('current');
          }else{
              curBtn.classList.remove('current');
          }
      });
  }
};

// first page to show up by default 
btnShow('show', 0);


// pageIn function 

function pageIn (e) {
  let index = btnArray.indexOf(e.target);
  sectionArray.forEach((section, i) => {
      if(index === i){
          btnShow('show', index);
          section.scrollIntoView();
      }
  });
}

// for key presses .....

window.addEventListener('keydown', (e) =>{
  e.preventDefault();

  if(e.keyCode == '40'){

    btnArray.forEach((item, index) => {

      if(item.classList.contains('current') & (item.nextElementSibling != null)){
        setTimeout(() => {
          btnShow('show', index+1);
          sectionArray[index+1].scrollIntoView();
        }, 100)
      }

    });
      
  }

})

// for down press 


window.addEventListener('keydown', (e) =>{
  e.preventDefault();

  if(e.keyCode == '38'){

    btnArray.forEach((item, index) => {

      if(item.classList.contains('current') & (item.previousElementSibling != null)){
        setTimeout(() => {
          btnShow('show', index-1);
          sectionArray[index-1].scrollIntoView();
        }, 100)
      }

    });
      
  }

})


// video to play 
let playingId = document.querySelector('.toggle-id');

vidPlay.addEventListener('click', (e) => {
  if(video.paused){
    video.play();
    playingId.style.backgroundColor ='#AC5858';
  }
  else{
    video.pause();
    playingId.style.backgroundColor = 'white';
  }
})

video.onended = () => playingId.style.backgroundColor = 'white';


// for gallery ....

let photoShow = (status, index) => {
  if(status === 'show'){
      galleryArray.forEach((gallery, i) =>{
          if(index === i){
              gallery.classList.add('photo');
          }else{
              gallery.classList.remove('photo');
          }
      });
  }
};

photoShow('show', 0);


// for right presses ..... gallery...


window.addEventListener('keydown', (e) =>{
  e.preventDefault();

  if(e.keyCode == '37' && btnArray[2].classList.contains('current')){

    galleryArray.forEach((item, index) => {

      if(item.classList.contains('photo') & (item.nextElementSibling != null)){
        setTimeout(() => {
          photoShow('show', index+1);
          galleryArray[index+1].scrollIntoView();
        }, 100)
        
      }

    });
  }

})

// for left press for gallery


window.addEventListener('keydown', (e) =>{
  e.preventDefault();

  if(e.keyCode == '39' && btnArray[2].classList.contains('current')){

    galleryArray.forEach((item, index) => {

      if(item.classList.contains('photo') & (item.previousElementSibling != null)){
        setTimeout(() => {
          photoShow('show', index-1);
          galleryArray[index-1].scrollIntoView();
        }, 100)
      }

    });
      
  }

})

// note:: left and right presses works only when 3rd btn is highlighted as per my conditional,
// feel free to change it...