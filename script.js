// Master function for handling elements related to the audio player (audio element, play button, play/pause image, progress bar container, progress bar fill). This allows multiple audio players to be created and hosted on the same page without duplicating the code. Each button exists purely for user convenience and interaction.
function createPlayer(audioEl, playBtn, playImg, progressContainer, progressFill, replayIconUrl, pauseIconUrl) {
    playBtn.addEventListener("click", () => {
        if (audioEl.paused || audioEl.ended) {
            if (audioEl.ended) {
                audioEl.currentTime = 0;
            }
            audioEl.play();
            playImg.src = pauseIconUrl;
        } else {
            audioEl.pause();
            playImg.src = playIconUrl;
        }
    });

    audioEl.addEventListener("timeupdate", () => {
        const value = (audioEl.currentTime / audioEl.duration) * 100;
        progressFill.style.width = value + "%";
    });

    // When a track finishes without repeat turned on, a distinct 'replay' icon is shown instead of the usual 'play' icon. This signals to the user that clicking it will restart the song rather than resume it, and also tells them they've listened to the full song.
    audioEl.addEventListener("ended", () => {
            playImg.src = playIconUrl;
        }
    });

    progressContainer.addEventListener("click", (event) => {
        const barWidth = progressContainer.clientWidth;
        const clickX = event.offsetX;
        audioEl.currentTime = (clickX / barWidth) * audioEl.duration;
    });
}

// Small helper that swaps a player's icon between play and pause. Used wherever a player's state changes from outside its own click handler for example, when the mutual-exclusivity logic further down pauses one player because the other just started, this is what updates its icon to match, so the display never falls out of sync with what's actually playing.
function updatePlayIcon(imgEl, isPlaying) {
    imgEl.src = isPlaying
        ? "https://img.icons8.com/ios-glyphs/30/pause--v1.png"
        : "https://img.icons8.com/ios-glyphs/30/play--v1.png";
}

// Allows the user to toggle the repeat button and have it actually perform its function. Kept generic since it's used by both players.
function setupRepeatToggle(audioEl, repeatBtn) {
    repeatBtn.addEventListener("click", () => {
        audioEl.loop = !audioEl.loop;
        repeatBtn.classList.toggle("active", audioEl.loop);
    });
}

// --- Hero player setup ---
// Before telling the system what to do with the variables, the system needs to be told what the variables actually are. This section defines the variables before the code further down instructs how they're used.
const heroAudio = document.querySelector("#custom-video-player");
const heroPlayImg = document.querySelector("#play-pause-img");

createPlayer(
    heroAudio,
    document.querySelector("#play-pause-btn"),
    heroPlayImg,
    document.querySelector("#hero-progress-bar"),
    document.querySelector("#hero-progress-bar-fill"),
    "https://img.icons8.com/ios-glyphs/30/play--v1.png",
    "https://img.icons8.com/ios-glyphs/30/pause--v1.png"
);

// --- Album player setup ---
const albumAudio = document.querySelector("#album-audio-player");
const albumPlayImg = document.querySelector("#album-play-pause-img");

createPlayer(
    albumAudio,
    document.querySelector("#album-play-pause-btn"),
    albumPlayImg,
    document.querySelector("#album-progress-bar"),
    document.querySelector("#album-progress-bar-fill"),
    "https://img.icons8.com/ios-glyphs/30/play--v1.png",
    "https://img.icons8.com/ios-glyphs/30/pause--v1.png"
);

// Repeat toggles are only added now, after heroAudio/albumAudio actually exist as variables above. (in an earlier version of the code, this was done before the variables were defined, which caused errors.)
setupRepeatToggle(heroAudio, document.querySelector("#hero-repeat-btn"));
setupRepeatToggle(albumAudio, document.querySelector("#album-repeat-btn"));

// Album track list data structure, including title, file URL, note, and lyrics for each track. This allows for easy management and rendering of the album tracks in the UI.
const albumTracks = [
    {
        title: "Forgive & Forget",
        file: "https://res.cloudinary.com/xdp1p4i5/video/upload/v1790708020/TRACK_2_-_Forgive_Forget.mp3",
        note: "",
        lyrics: `<strong>Intro:</strong>
            You let me down
            You got caught up in the arguments
            And I can't stand the sound
            But I...

            <strong>Verse 1:</strong>
            I wish I could forgive and forget
            I feel the winds of change start blowing
            And everything is ending as I know it
            And I keep trying to fix all that is broken

            <strong>Pre-Chorus:</strong>
            And I keep pushing, and running, and hiding,
            Wherever it goes, I still will be divided

            <strong>Chorus:</strong>
            But god only knows
            What I do for you all

            <strong>Verse 2:</strong>
            I know it's not that easy staying strong
            I never saw it coming all along
            My whole world is changing where do I go?
            Colours fading back I hope that you know

            <strong>Pre-Chorus:</strong>
            That I keep pushing, and running, and hiding,
            Wherever it goes, I still will be divided

            <strong>Chorus:</strong>
            But god only knows
            What I do for you all

            <strong>Outro:</strong>
            You let me down
            You got caught up in the arguments
            And I can't stand the sound`
    },
    {
        title: "Breathe",
        file: "https://res.cloudinary.com/xdp1p4i5/video/upload/v1790708019/TRACK_3_-_Breathe.mp3",
        note: "",
        lyrics: `<strong>Verse 1:</strong>
            I walk these streets, but they never seem the same
            There's a weight I carry, but it's never in my name
            Everything's changing, but I'm standing still
            I hear the voices loud, but none of them can heal

            <strong>Pre-Chorus:</strong>
            I've been waiting for the shift, looking for the sign
            But every time I try, I feel like I'm running out of time

            <strong>Chorus:</strong>
            What if the world is moving too fast for me?
            What if all I need is a little room to breathe?
            I've been chasing shadows, but they're fading out of sight
            Maybe I'm just looking for a way to feel alright

            <strong>Verse 2:</strong>
            I'm caught between the noise and the quiet of the night
            Trying to find meaning, but nothing feels right
            There's a hunger in my heart, but it's hard to name
            I'm searching for answers, but I'm still the same

            <strong>Pre-Chorus:</strong>
            I've been waiting for the shift, looking for the sign
            But every time I try, I feel like I'm running out of time

            <strong>Chorus:</strong>
            What if the world is moving too fast for me?
            What if all I need is a little room to breathe?
            I've been chasing shadows, but they're fading out of sight
            Maybe I'm just looking for a way to feel alright

            <strong>Outro:</strong>
            What if the world is moving too fast for me?
            What if all I need is a little room to breathe?`
    },
    {
        title: "Soul Garden",
        file: "https://res.cloudinary.com/xdp1p4i5/video/upload/v1790708021/TRACK_4_-_Soul_Garden.mp3",
        note: "",
        lyrics: `<strong>Verse 1:</strong>
            Another sleepless night
            When the birds go home
            Another night
            Where I just let myself unfold

            <strong>Verse 2:</strong>
            I see the place I go
            When the dark creeps in
            I make a turn
            And it all changes up again

            <strong>Pre-Chorus:</strong>
            And it feels like the world
            Comes crashing down at my feet
            And I'm here crying
            Oh just crying

            <strong>Chorus:</strong>
            I want to sleep
            In my soul garden tonight
            I want to hide
            From the monsters deep inside
            I've got a feeling
            I'm not in everybody's eyes
            But I'm searching for my peace of mind

            <strong>Verse 3:</strong>
            I see the petals fall
            Where the water runs cold
            I watch the sun rise
            And the clouds return home

            <strong>Pre-Chorus:</strong>
            And it feels like they all
            Can't remember my name
            And I'm here trying
            Really trying

            <strong>Chorus:</strong>
            I want to sleep
            In my soul garden tonight
            I want to hide
            From the monsters deep inside

            I want to sleep
            In my soul garden tonight
            I want to hide
            From the monsters deep inside
            I've got a feeling
            I'm not in everybody's eyes
            But I'm searching for my peace of mind`
    },
    {
        title: "Letters to Caroline",
        file: "https://res.cloudinary.com/xdp1p4i5/video/upload/v1790708021/TRACK_5_-_Letters_to_Caroline.mp3",
        note: "",
        lyrics: `<strong>Verse 1:</strong>
            Wake up
            In the morning
            To the sunrise
            Blinding new found eyes
            I see you laying there
            In your bed
            With messy hair and a dream

            <strong>Chorus:</strong>
            Caroline,
            I see you through your window,
            Clear and bright
            Caroline,
            I know you like I did
            Before you died

            <strong>Verse 2:</strong>
            The mirror holds your shadow
            Half a smile
            Frozen for a while
            I talk to empty space
            In my mind,
            You're just a breath behind

            <strong>Chorus:</strong>
            Caroline,
            I see you through your window,
            Wandering eyes
            Caroline,
            I know you like I did
            Before you died
            Caroline, Caroline, Caroline, Caroline

            <strong>Chorus:</strong>
            Caroline,
            I see you through your window,
            Once alive
            Caroline,
            I know you like I did
            Before you died
            Caroline, Caroline, Caroline, Caroline`
                }
];

const trackListContainer = document.querySelector(".track-list");
const lyricsDisplay = document.querySelector("#lyrics-display");
let currentAlbumIndex = 0;
const lyricsToggleBtn = document.querySelector("#lyrics-toggle-btn");
let lyricsVisible = false;

// Building one button per track and adding it to the page. Runs once, on load, then immediately loads (but doesn't autoplay) the first track so the player and lyrics box aren't empty on page load.
function renderAlbumTrackList() {
    albumTracks.forEach((track, index) => {
        const btn = document.createElement("button");
        btn.classList.add("track-btn");
        btn.textContent = track.title;
        btn.addEventListener("click", () => playAlbumTrack(index, false));
        trackListContainer.appendChild(btn);
    });
    playAlbumTrack(0, false);
}

lyricsToggleBtn.addEventListener("click", () => {
    lyricsVisible = !lyricsVisible;
    lyricsDisplay.classList.toggle("visible", lyricsVisible);
    lyricsToggleBtn.textContent = lyricsVisible ? "Hide Lyrics" : "Show Lyrics";
});

// Gives users the ability to switch the player to a chosen track and gives visual confirmation on which one is active. The visual confirmation is important because it shows users which track is currently playing, and that at least one of the buttons is active. This satisfies the assignment's "user feedback" requirement.
function playAlbumTrack(index, autoplay = true) {
    currentAlbumIndex = index;
    const track = albumTracks[index];
    albumAudio.src = track.file;
    albumAudio.load();

    if (autoplay) {
        albumAudio.play();
        updatePlayIcon(albumPlayImg, true);
    }

    lyricsDisplay.innerHTML = track.lyrics || "Lyrics coming soon.";
    document.querySelectorAll(".track-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".track-btn")[index].classList.add("active");
}

// Lets tracks run into each other in a loop, like a playlist, rather than hitting a dead end at the last song. Inspired by Spotify's own next/previous behaviour: pressing next on the final track loops back to the first, the same way a repeat button loops a single song. Shuffle works the same way, just picking a random track instead of the next one in order. It is inspired by Spotify's shuffle function.
function nextAlbumTrack() {
    playAlbumTrack((currentAlbumIndex + 1) % albumTracks.length);
}

function prevAlbumTrack() {
    playAlbumTrack((currentAlbumIndex - 1 + albumTracks.length) % albumTracks.length);
}

function shuffleAlbumTrack() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * albumTracks.length);
    } while (randomIndex === currentAlbumIndex && albumTracks.length > 1);
    playAlbumTrack(randomIndex);
}

document.querySelector("#album-next-btn").addEventListener("click", nextAlbumTrack);
document.querySelector("#album-prev-btn").addEventListener("click", prevAlbumTrack);
document.querySelector("#album-shuffle-btn").addEventListener("click", shuffleAlbumTrack);

renderAlbumTrackList();

// Stops both audio players from playing at the same time. If one starts, the other pauses. This prevents overlapping audio, which can be jarring and confusing for users. It ensures a better user experience by allowing only one audio source to play at a time, making it easier for users to focus on the content they want to listen to without distraction.
heroAudio.addEventListener("play", () => {
    if (!albumAudio.paused) {
        albumAudio.pause();
        updatePlayIcon(albumPlayImg, false);
    }
});

albumAudio.addEventListener("play", () => {
    if (!heroAudio.paused) {
        heroAudio.pause();
        updatePlayIcon(heroPlayImg, false);
    }
});

