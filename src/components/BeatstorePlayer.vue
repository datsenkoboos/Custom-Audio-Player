<template>
    <div class="player">
        <audio
            ref="audio"
            :src="mp3"
            class="audio"
            preload="metadata"
            @loadedmetadata="audioInit"
        ></audio>
        
        <div class="player-controls" v-if="duration">
            <button
                :class="'play-pause-button '+ (playing ? 'pause' : '')"
                @click="playPause"
            >
            </button>
            <CustomRange
                :max="duration - 1"
                :value="current"
                mode="live"
                @change-value="setAudioTime"
                class="timeline"
            />
            <div class="time">
                <span class="time-current">
                    {{ currentOutput }}
                </span>
                <span class="time-separator">
                    /
                </span>
                <span class="time-full">
                    {{ durationOutuput }}
                </span>
            </div>
            <div class="download">
                <a :href="wav" download="" class="download-link"></a>
            </div>
        </div>
        <LoadingShimmer class="beat-shimmer player-placeholder" v-else></LoadingShimmer>  
    </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue';
import CustomRange from './UI/CustomRange.vue';
import LoadingShimmer from './UI/LoadingShimmer.vue'
const props = defineProps({
    mp3: String,
    wav: String,
})

const duration = ref(0)
const current = ref(0)
const playing = ref(false)

const audio = new Audio(props.mp3)
function audioInit() {
    duration.value = Math.ceil(audio.duration)
    current.value = audio.currentTime
}

function currentTimeOutput(seconds) {
    if (seconds % 60 >= 10) {
        return `${Math.trunc(seconds / 60)}:${seconds % 60}`;
    } else {
        return `${Math.trunc(seconds / 60)}:0${seconds % 60}`;
    }
}
const currentOutput = computed(() => {
    return currentTimeOutput(current.value)
})
const durationOutuput = computed(() => {
    return currentTimeOutput(duration.value)
})

function setAudioTime(newValue) {
    current.value = audio.currentTime = +newValue
}
function playPause() {
    playing.value = !playing.value
}
watch(playing, (newValue, oldValue) => {
    let int
    // if playing becomes true
    if (newValue) {
        audio.play()
        int = setInterval(() => {
            // audio end
            if (Math.ceil(audio.currentTime) === duration.value) {
                setAudioTime(0)
                playPause()
                clearInterval(int)
            }
            setAudioTime(Math.ceil(audio.currentTime))
        }, 1000)
        return
    }
    // pause audio
    clearInterval(int)
    audio.pause()
})
</script>

<style lang="scss">
span {
    display: inline-block;
}
.player {
    border-radius: 10px;

    height: 32px;
    width: 290px;
    box-sizing: border-box;

    background: white;

    transition: border-color .1s;
    
    @media screen and (max-width: 550px) {
        border-radius: 7.5px;
        height: 20px;
    }
}
.player-controls {
    padding-inline: 7.5px;

    width: 100%;
    height: 100%;
    box-sizing: border-box;

    display: flex;
    align-items: center;

    border-radius: 10px;
    border: 1px solid #e5e8eb;
    &:hover {
        border-color: #7945fc;
    }
}

.download {
    margin: 0 0 0 7.5px;
    width: 15px;
    height: 30px;
    &-link {
        display: block;
        text-decoration: none;
        width: 100%;
        height: 100%;
        background: center no-repeat url('@/assets/images/download.svg');
        background-size: 15px 15px;
        @media screen and (max-width: 550px) {
          background-size: 12px 12px;
        }
    }
}
.time {
    margin: 0 0 0 7.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 90px;
    font-weight: 500;
    &-current {
        width: 40px;
        text-align: center;
    }
    &-full {
        width: 40px;
        text-align: center;
    }
    &-separator {
        text-align: center;
        width: 10px;
    }
    @media screen and (max-width: 400px) {
        display: none;
    }
}
.controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
}
.timeline {
    cursor: pointer;
    width: calc(100% - 142.5px);
    @media screen and (max-width: 400px) {
        width: calc(100% - 45px);
    }
}
.play-pause-button {
    border: none;
    background: center no-repeat url('@/assets/images/play.svg');
    background-size: 15px 15px;
    @media screen and (max-width: 550px) {
        background-size: 12px 12px;
    }

    margin: 0 7.5px 0 0;
    padding: 0;

    width: 15px;
    height: 30px;

    cursor: pointer;
    &.pause {
        background: center no-repeat url('@/assets/images/pause.svg');
    }
}
#paused {
    // background: center no-repeat url('../images/play.svg');
    background-size: 15px 15px;
    @media screen and (max-width: 550px) {
      background-size: 12px 12px;
    }
}
#playing {
    // background: center no-repeat url('../images/pause.svg');
    background-size: 15px 15px;
    @media screen and (max-width: 550px) {
        background-size: 12px 12px;
    }
}
.beat-shimmer {
    border-radius: 10px;
} 
</style>