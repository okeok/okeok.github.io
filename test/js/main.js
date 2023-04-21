const steps = document.getElementsByClassName('steps__step');
for (let step of steps) {
    step.addEventListener('click', function() {
        const activeStep = document.querySelector('.steps__step_active');
        activeStep.classList.remove('steps__step_active');
        this.classList.add('steps__step_active');
    });
}