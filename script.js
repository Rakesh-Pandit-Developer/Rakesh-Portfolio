// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// 3D Animated Background
const createBackground = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('hero-background').appendChild(renderer.domElement);

  // Create gradient particles
  const geometry = new THREE.BufferGeometry();
  const particles = 5000;
  const positions = new Float32Array(particles * 3);
  const colors = new Float32Array(particles * 3);

  for (let i = 0; i < particles * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  camera.position.z = 5;

  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    points.rotation.x += 0.001;
    points.rotation.y += 0.001;
    renderer.render(scene, camera);
  };

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

// Initialize background when the page loads
window.addEventListener('load', createBackground);

// Skill bars animation
const observeSkills = () => {
  const skillBars = document.querySelectorAll('.progress');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.parentElement.parentElement.querySelector('.skill-info span:last-child').textContent;
        entry.target.style.width = width;
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
};

// Initialize skill bars animation
observeSkills();

// Form submission handling
const contactForm = document.querySelector('.contact-form');
const formStatus = document.createElement('div');
formStatus.className = 'form-status';
contactForm.insertBefore(formStatus, contactForm.firstChild);

async function submitForm(formData) {
  // This is where you would typically send the data to your server
  // For demonstration, we'll simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Message sent successfully!'
      });
    }, 2000);
  });
}

async function handleFormSubmission(e) {
  e.preventDefault();
  
  // Show submitting status
  formStatus.className = 'form-status submitting';
  formStatus.textContent = 'Submitting...';
  
  // Collect form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());
  
  try {
    // Submit form data
    const result = await submitForm(data);
    
    if (result.success) {
      // Show success message
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Message sent successfully!';
      
      // Reset form
      contactForm.reset();
      
      // Show thank you message after a delay
      setTimeout(() => {
        formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
        
        // Clear the status message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 2000);
    } else {
      throw new Error(result.message || 'Failed to send message');
    }
  } catch (error) {
    // Show error message
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Failed to send message. Please try again later.';
  }
}

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmission);
}