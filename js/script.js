let players = document.querySelectorAll('.beat__player');

function currentTimeOutput(seconds) {
    if (seconds % 60 >= 10) {
        return `${Math.trunc(seconds / 60)}:${seconds % 60}`;
    } else {
        return `${Math.trunc(seconds / 60)}:0${seconds % 60}`;
    }
}

players.forEach(function(player) {
    const audio = player.querySelector('.audio');
    const timelineInput = player.querySelector('.timeline__input');
    const timeCurrent = player.querySelector('.time__current');
    const timeFull = player.querySelector('.time__full');
    const playButton = player.querySelector('.play-pause');

    audio.onloadedmetadata = function() {
        timeFull.innerHTML = `${Math.trunc(Math.round(audio.duration) / 60)}:${Math.round(audio.duration) % 60}`;
        timelineInput.max = Math.round(audio.duration);
    }

    audio.addEventListener('loadedmetadata', function() {
        timeFull.innerHTML = `${Math.trunc(Math.round(audio.duration) / 60)}:${Math.round(audio.duration) % 60}`;
        timelineInput.max = Math.round(audio.duration);
    })

    playButton.addEventListener('click', function() {
        if (audio.paused) {
            playButton.setAttribute('id', 'playing');
            audio.play();
        } else {
            audio.pause();
            playButton.setAttribute('id', 'paused');
        }
        setInterval(function() {
            timeCurrent.innerHTML = currentTimeOutput(Math.round(audio.currentTime));
            timelineInput.value = Math.round(audio.currentTime) ;
            if (Math.round(audio.currentTime) === Math.round(audio.duration)) {
                audio.pause();
                playButton.setAttribute('id', 'paused');
                audio.currentTime = 0;
            }
        }, 10);
    })
    
    timelineInput.addEventListener('input', function() {
        timeCurrent.innerHTML = currentTimeOutput(timelineInput.value);
        audio.currentTime = timelineInput.value;
    })
});

document.addEventListener('play', function(e){
    for(let i = 0; i < players.length ; i++){
        const playerAudio = players[i].querySelector('.audio');
        const playerPlayButton = players[i].querySelector('.play-pause');
        const timelineInput = players[i].querySelector('.timeline__input');
        if(playerAudio != e.target){
            playButton.setAttribute('id', 'paused');
            playerAudio.pause();
            playerAudio.currentTime = 0;
        }
    }
}, true);

