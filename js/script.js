function currentTimeOutput(seconds) {
    if (seconds % 60 >= 10) return `${Math.trunc(seconds / 60)}:${seconds % 60}`;
    return `${Math.trunc(seconds / 60)}:0${seconds % 60}`;
}
let players = document.querySelectorAll('.beat__player');
players.forEach((player) => {
    const audio = player.querySelector('.audio');
    const timelineInput = player.querySelector('.timeline__input');
    const timeCurrent = player.querySelector('.time__current');
    const timeFull = player.querySelector('.time__full');
    const playButton = player.querySelector('.play-pause');
    function timeFill() {
        if (Math.round(audio.duration) % 60 >= 10) {
            timeFull.textContent = `${Math.trunc(Math.round(audio.duration) / 60)}:${Math.round(audio.duration) % 60}`;
        } else {
            timeFull.textContent = `${Math.trunc(Math.round(audio.duration) / 60)}:0${Math.round(audio.duration) % 60}`;
        }
        timelineInput.max = Math.round(audio.duration);
    }
    console.log(`${audio.duration} before event`);
    if (audio.duration !== NaN) timeFill();
    audio.addEventListener('loadedmetadata', () => {
        console.log(`${audio.duration} after event`);
        timeFill();
    })
    audio.addEventListener('ended', () => {
        playButton.setAttribute('id', 'paused');
        audio.currentTime = 0;
    });

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            playButton.setAttribute('id', 'playing');
            audio.play();
        } else {
            audio.pause();
            playButton.setAttribute('id', 'paused');
        }
        setInterval(() => {
            timeCurrent.textContent = currentTimeOutput(Math.round(audio.currentTime));
            timelineInput.value = Math.round(audio.currentTime) ;
        }, 10);
    })
    
    timelineInput.addEventListener('input', () => {
        timeCurrent.textContent = currentTimeOutput(timelineInput.value);
        audio.currentTime = timelineInput.value;
    })
});
document.addEventListener('play', (e) => {
    for (let i = 0; i < players.length ; i++) {
        const playerAudio = players[i].querySelector('.audio');
        const playerPlayButton = players[i].querySelector('.play-pause');
        if (playerAudio != e.target) {
            playerPlayButton.setAttribute('id', 'paused');
            playerAudio.pause();
            playerAudio.currentTime = 0;
        }
    }
}, true);

document.addEventListener("DOMContentLoaded", audioInit, false);