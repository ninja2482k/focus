// Toggle between Login and Signup forms
const loginToggle = document.getElementById('login-toggle');
const signupToggle = document.getElementById('signup-toggle');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const formToggle = document.querySelector('.form-toggle');

loginToggle.addEventListener('click', () => {
  loginToggle.classList.add('active');
  signupToggle.classList.remove('active');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  formToggle.classList.remove('signup-active');
});

signupToggle.addEventListener('click', () => {
  signupToggle.classList.add('active');
  loginToggle.classList.remove('active');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  formToggle.classList.add('signup-active');
}); 