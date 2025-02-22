const contactForm = document.querySelector('.contact-form');
const formStatus = document.createElement('div');
formStatus.className = 'form-status';
contactForm.insertBefore(formStatus, contactForm.firstChild);

async function submitForm(formData) {
  const scriptURL = "YOUR_WEB_APP_URL"; // Replace with your Apps Script URL
  
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function handleFormSubmission(e) {
  e.preventDefault();
  
  formStatus.className = 'form-status submitting';
  formStatus.textContent = 'Submitting...';
  
  const formData = new FormData(contactForm);
  const data = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  try {
    const result = await submitForm(data);
    
    if (result.success) {
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Message sent successfully!';
      contactForm.reset();
      
      setTimeout(() => {
        formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 2000);
    } else {
      throw new Error(result.message || 'Failed to send message');
    }
  } catch (error) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Failed to send message. Please try again later.';
  }
}

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmission);
}