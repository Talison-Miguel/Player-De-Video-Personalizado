const video = document.querySelector('.viewer')
const btnPlay = document.querySelector('.toggle')
const volum = document.getElementsByName('volume')
const rate = document.getElementsByName('playbackRate')
const skipButtons = [...document.querySelectorAll('[data-skip]')];
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled');
const btnFullscreen = document.querySelector('.fullscreen')

function playVideo() {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚'
    btnPlay.textContent = icon
}

skipButtons.map(btn => {
    btn.addEventListener('click', () => {
        let dataValue = btn.getAttribute("data-skip")
        video.currentTime += parseInt(dataValue)
    })
})

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen() {
    video.requestFullscreen();
}

video.addEventListener('click', playVideo)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
btnPlay.addEventListener('click', playVideo)

volum[0].addEventListener('change', () => video.volume = volum[0].value)
rate[0].addEventListener('change', () => video.playbackRate = rate[0].value)

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

btnFullscreen.addEventListener('click', toggleFullScreen)