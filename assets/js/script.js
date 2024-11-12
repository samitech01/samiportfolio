// page load spinner and removal
window.addEventListener("load", () => {
    const spinner = document.querySelector(".spinner-main");
    spinner.classList.add("spinner--hidden");
    spinner.addEventListener("transitionend", () => {
      spinner.remove(); 
    });
  });
  // dark theme / light theme
  document.addEventListener('DOMContentLoaded', () => {
    const shift = document.getElementById('shift');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
    shift.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light-theme' : '');
    });
  });
  // nav bg on active section
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  const createObserver = () => {
    return new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active-link'));
          const currentLink = document.querySelector(`nav a[onclick="window.location.href='#${entry.target.id}'"]`);
          if (currentLink) {
            currentLink.classList.add('active-link');
          }
        }
      });
    }, { threshold: window.innerWidth < 640 ? 0.15 : 0.35 });
  };
  let observer = createObserver();
  sections.forEach(section => observer.observe(section));
  window.addEventListener('resize', () => {
    observer.disconnect();
    observer = createObserver();
    sections.forEach(section => observer.observe(section));
  });
  // currsor tail effect
  document.addEventListener("DOMContentLoaded", () => {
    const cursorTails = document.getElementById("cursor-tails");
    const cursorStateText = document.getElementById("cursor-state");
    const toggleButton = document.querySelector(".cursor-effect-toggle");
    // number of / lenght of tail
    const tails = Array.from({ length: 17 }, () => {
      const div = document.createElement("div");
      div.className = "tail";
      cursorTails.appendChild(div);
      return { element: div, x: 0, y: 0 };
    });
  
    let mouseX = 0, mouseY = 0, isEffectOn = true;
    document.addEventListener("mousemove", e => { mouseX = e.clientX; mouseY = e.clientY; });
  
    const animateTails = () => {
      tails.forEach((tail, index) => {
        const [prevX, prevY] = index ? [tails[index - 1].x, tails[index - 1].y] : [mouseX, mouseY];
        // Reduce the smoothing factor to make tails move faster
        tail.x += (prevX - tail.x) * 0.35;
        tail.y += (prevY - tail.y) * 0.35;
        tail.element.style.transform = `translate(${tail.x}px, ${tail.y}px)`;
      });
      requestAnimationFrame(animateTails);
    };
  
    animateTails();
  
    toggleButton.addEventListener("click", () => {
      isEffectOn = !isEffectOn;
      cursorTails.style.display = isEffectOn ? "block" : "none";
      cursorStateText.textContent = isEffectOn ? "ON" : "OFF";
    });
  });
  
  // see more / see less
    const moreToggle = document.getElementById('moreToggle');
    moreToggle.addEventListener('click', function () {
    const extraCards = document.querySelectorAll('.folio-card.transition-height');
    const isExpanded = extraCards[0].classList.contains('max-h-[1000px]');
  
    extraCards.forEach(card => {
      if (isExpanded) {
        card.classList.remove('max-h-[1000px]');
        card.classList.add('max-h-0');
        moreToggle.style.marginTop = '0';
      } else {
        card.classList.remove('max-h-0');
        card.classList.add('max-h-[1000px]');
        moreToggle.style.marginTop = '4.5rem';
      }
    });
    this.textContent = isExpanded ? 'See more' : 'See less';
  });
  // form clear / text changes
  window.addEventListener('pageshow', function(event) {
    if (sessionStorage.getItem('formSubmitted')) {
      document.getElementById('quote').reset();
      document.getElementById('freeSubmit').textContent = "Your request has been submitted, you can submit again.";
      document.getElementById('submitButton').textContent = "Share Your Thoughts";
      sessionStorage.removeItem('formSubmitted');
    }
  });
  
  document.getElementById('quote').addEventListener('submit', function() {
    document.getElementById('submitButton').textContent = "Submitting...";
    sessionStorage.setItem('formSubmitted', true);
  });
  
  // vanilla tilt
  function responsiveTilt() {
    if (window.innerWidth > 1024) {
      VanillaTilt.init(document.querySelectorAll('.tilt-effect'), {
        max: 7,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
      });
    } else {
      document.querySelectorAll('.tilt-effect').forEach((element) => {
        if (element.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      });
    }
  }
  responsiveTilt();
  
  window.addEventListener('resize', responsiveTilt);
  
  // update date
  const updateYear = () => {
    const yearSpan = document.getElementById('update');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  };
  
  updateYear();
  // sal code
  sal({
    threshold: 0.1
  });

// floating nav
 const menuBtn = document.getElementById("menuBtn");
 const menuIcon = document.getElementById("menuIcon");
 const menuItems = document.getElementById("menuItems");
 const menuItemEls = menuItems.querySelectorAll(".menu-item");
 let isOpen = false;

 menuBtn.addEventListener("click", () => {
   isOpen = !isOpen;
   menuIcon.className = isOpen
     ? "bx bx-x text-3xl pointer-events-none"
     : "bx bx-menu text-3xl pointer-events-none";

   if (isOpen) {
     menuItemEls.forEach((item, index) => {
       setTimeout(() => {
         item.classList.add("show");
       }, index * 60); // Smooth entry with delay
     });
   } else {
     menuItemEls.forEach((item, index) => {
       setTimeout(() => {
         item.classList.remove("show");
       }, index * 30); // Smooth exit with delay
     });
   }
 });

//  trigger notification on menu click
 const noti = document.querySelector(".notification");
 const closeNoti = document.getElementById("closeNoti");

 menuBtn.addEventListener('click',()=> {
  noti.classList.add("notiShow")
  closeNoti.addEventListener('click',()=>{
    noti.remove();
  });
});
