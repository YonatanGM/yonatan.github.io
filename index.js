// Get the elements from the document
const thumbBar = document.querySelectorAll('.column'); // changed from querySelector
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');
// Added these lines to get the menu links and the tab content divs
const menuLinks = document.querySelectorAll('.menu a');
const tabContents = document.querySelectorAll('.tabcontent');

// Loop through the columns and add event listeners to each video
thumbBar.forEach(function(column) {
  // Get the video element in the column
  var newVideo = column.querySelectorAll('video');
  // mute video
//  newVideo.muted = true
  // Add a mouseover event listener to the video
    newVideo.forEach(function(video) {
      // Add a mouseover event listener to the video
    video.muted = true;
      video.addEventListener('mouseover', function(e) {
        // Play the hovered video

        try {
          e.target.play();
        } catch (error) {
          if (error.name === "AbortError") return;
          console.log("Error", error);
        }
      });
      // Add a mouseleave event listener to the video
      video.addEventListener('mouseleave', function(e) {
        // Pause the hovered video
        try {
          e.target.pause();
        } catch (error) {
          if (error.name === "AbortError") return;
          console.log("Error", error);
        }
      });
    });
});

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  // Loop through the columns and videos again
  thumbBar.forEach(function(column) {
    var newVideo = column.querySelectorAll('video');
    newVideo.forEach(function(video) {
      // Get the bounding rectangle of the video element
      let rect = video.getBoundingClientRect();
      // Calculate the distance of the bottom edge of the video from the bottom of the visible page
      let distance = window.innerHeight - rect.bottom;
      // Set a maximum distance for the tilting effect
      let maxDistance = 300;
      // Calculate the angle of rotation based on the distance and the maximum distance
      let angle = distance / maxDistance * 20 ;
      // Limit the angle between -20 and 20 degrees
      angle = Math.max(0, Math.min(100, angle));
      // Set the transform property of the video element to rotate it around its bottom center point by the calculated angle
      //video.style.transform = `translateZ(-100px) rotateX(${angle}deg)`; // commented out this line
      // Use setAttribute to set the inline style instead
      video.setAttribute ('style', `transform:  rotateY(${angle}deg)`); // added this line
    });
  });
});

// Add a click event listener to the button
btn.addEventListener('click', function() {
  // Toggle the button class name between dark and light
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    // Change the overlay background color to black with 50% opacity
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    // Change the overlay background color to transparent
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});

// Added these lines to add an event listener to each menu link
menuLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    // Prevent the default behavior of the link
    e.preventDefault();
    // Get the href attribute of the link
    let href = link.getAttribute('href');
    // Call a function to show the corresponding tab content and hide the others
    showTabContent(href);
    // Call another function to toggle the active class for the menu links
    toggleActiveClass(link);
  });
});

// Added this function to show the corresponding tab content and hide the others
function showTabContent(id) {
  // Loop through the tab content divs
  tabContents.forEach(function(tab) {
    // Check if the id of the tab matches the id parameter
    if (tab.getAttribute('id') === id.slice(1)) {
      // Add the active class to the tab content div
      tab.classList.add('active');
    } else {
      // Remove the active class from the tab content div
      tab.classList.remove('active');
    }
  });
}

// Added this function to toggle the active class for the menu links
function toggleActiveClass(link) {
  // Loop through the menu links
  menuLinks.forEach(function(menuLink) {
    // Check if the menu link matches the link parameter
    if (menuLink === link) {
      // Add the active class to the menu link
      menuLink.classList.add('active');
    } else {
      // Remove the active class from the menu link
      menuLink.classList.remove('active');
    }
  });
}

// Added these lines to call the showTabContent and toggleActiveClass functions at the end of the script
// Get the first menu link and its href attribute
let firstMenuLink = menuLinks[1];
let firstHref = firstMenuLink.getAttribute('href');
// Call the functions with the first menu link and its href attribute as arguments
showTabContent(firstHref);
toggleActiveClass(firstMenuLink);
