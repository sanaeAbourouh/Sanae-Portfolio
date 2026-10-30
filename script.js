/* ============================================================
   SANAE PORTFOLIO — MAIN SCRIPT
   ============================================================ */

console.log('Sanae Portfolio loaded ✨');

// 1. Theme Toggle Animation
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const icon = themeToggle.querySelector('i');
    icon.style.transition = 'transform 0.4s ease';
    icon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      icon.style.transform = 'rotate(0deg)';
      icon.style.transition = 'none';
    }, 400);
  });
}

// 2. Skills "Show More" Toggle Functionality
const toggleSkillsBtn = document.getElementById('toggle-skills');
const extraSkills = document.getElementById('extra-skills');
if (toggleSkillsBtn && extraSkills) {
  toggleSkillsBtn.addEventListener('click', () => {
    extraSkills.classList.toggle('active');
    if (extraSkills.classList.contains('active')) {
      toggleSkillsBtn.innerHTML = 'Show less <i class="fa-solid fa-arrow-up"></i>';
    } else {
      toggleSkillsBtn.innerHTML = 'Show more <i class="fa-solid fa-arrow-right"></i>';
    }
  });
}

// 3. Projects "View All / Other Projects" Toggle Functionality
const toggleProjectsBtn = document.getElementById('toggle-other-projects');
const otherProjectsSection = document.getElementById('other-projects-section');
if (toggleProjectsBtn && otherProjectsSection) {
  toggleProjectsBtn.addEventListener('click', () => {
    otherProjectsSection.classList.toggle('active');
    if (otherProjectsSection.classList.contains('active')) {
      toggleProjectsBtn.innerHTML = 'Show less <i class="fa-solid fa-arrow-up"></i>';
      setTimeout(() => {
        otherProjectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      toggleProjectsBtn.innerHTML = 'View all projects <i class="fa-solid fa-arrow-right"></i>';
    }
  });
}

// 4. Contact Form Submission (Formspree Integration)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    formStatus.className = 'form-status';
    
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        formStatus.textContent = 'Message sent successfully! I will get back to you soon. ♥';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
        } else {
          formStatus.textContent = 'Oops! There was a problem sending your message.';
        }
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = 'Network error. Please try again later.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// 5. Mobile Hamburger Menu + Outside Click + Escape Key
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
  // Toggle menu on hamburger click
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the click from bubbling to the document
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
}