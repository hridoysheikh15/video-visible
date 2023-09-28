var mainVideo = document.querySelector('.main-video');
var mainImage = document.querySelector('.main-image');
let videoList = document.querySelectorAll(".video-list-container .list");
let imageSRC = document.querySelector('.main-image');
videoList.forEach((vid) => {
  vid.onclick = () => {
    videoList.forEach((remove) => {
      remove.classList.remove("active");
    });
    vid.classList.add("active");
    let src = vid.querySelector(".list-video").getAttribute("value");
    let title = vid.querySelector(".list-title").innerHTML;
    document.querySelector(".main-video-container .main-video").src = src;
    var video = document.querySelector(".main-video-container .main-video");
    video.muted = false;
    document.querySelector(".main-video-container .main-vid-title").innerHTML = title;
    let newSourch = document.querySelector(".active .list-video").src;
    imageSRC.src = newSourch;
  };
});

// Function to play or pause the video based on visibility
function handleVideoVisibility(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Video is in the viewport, play it
      mainVideo.contentWindow.postMessage('{"event":"command","func":"palyVideo","args":""}', '*');
       // Hide the image
    } else {
      // Video is not in the viewport, pause it
      mainVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
       // Show the image
    }
  });
}

// Create an Intersection Observer to track the visibility of the video
var observer = new IntersectionObserver(handleVideoVisibility, {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.5, // Trigger when at least 50% of the video is visible
});

// Observe the main video container
observer.observe(document.querySelector('.main-video'));

// scroll for iframe fixed bottom

function scrollEffect() {
  let scroll = window.scrollY;
  if (scroll > 200) {
    mainVideo.classList.add("videoFixed");
    mainImage.style.display = 'block';
  } else {
    mainVideo.classList.remove("videoFixed");
    mainImage.style.display = 'none';
  }
}

window.addEventListener("scroll", scrollEffect);