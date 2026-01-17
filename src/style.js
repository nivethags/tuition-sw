
let isRunning = false;
let timerInterval;
let seconds = 24300;

function updateTimer() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    document.querySelector('.time').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
 
    const circle = document.querySelector('.timer circle.progress');
    const percent = (seconds % 3600) / 3600;
    circle.style.strokeDashoffset = 283 * (1 - percent);
}

document.querySelector('.start-pause').addEventListener('click', function() {
    const icon = this.querySelector('i');
    if (!isRunning) {
        isRunning = true;
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        timerInterval = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    } else {
        isRunning = false;
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        clearInterval(timerInterval);
    }
});

document.querySelector('.stop').addEventListener('click', function() {
    isRunning = false;
    clearInterval(timerInterval);
    const playButton = document.querySelector('.start-pause i');
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
    seconds = 24300;
    updateTimer();
});

document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('click', function() {
        document.querySelectorAll('.bar').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('.time-filter button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.time-filter button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

updateTimer();

document.querySelector('.add-task').addEventListener('click', function() {
    console.log('Add task clicked');
});

document.querySelector('.notification').addEventListener('click', function() {
    console.log('Notifications clicked');
});

document.querySelectorAll('.task-item').forEach(task => {
    task.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    task.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});
