// 🔊 Sound Effects
const tickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
const boomSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2845/2845-preview.mp3");

// Make sounds sharper
tickSound.volume = 0.7;
boomSound.volume = 0.8;

// 🔥 Massive Brutal Roast Database
const roastDatabase = [
{
text: "This outfit looks like it was assembled during a power outage using pure delusion. ⚡🤡 The confidence is screaming, but the coordination is crying in a corner. Fashion just filed a missing person report. 🚨👗",
emoji: "💀"
},
{
text: "You walked into the arena like a warrior… but dressed like a side quest NPC. 🎮😭 Somewhere, a mannequin is embarrassed on your behalf. This is chaos stitched together with audacity. 🧵🔥",
emoji: "☠️"
},
{
text: "This costume had potential… then it gave up halfway. 😵‍💫🪡 It’s giving ‘I tried’ but the universe said ‘no’. Even the mirror avoided eye contact. 🪞💔",
emoji: "🔥"
},
{
text: "This isn’t fashion. This is a social experiment. 🧪💀 The colors are fighting. The fabric is confused. And somehow… you’re still confident. That’s terrifying. 😈",
emoji: "⚠️"
},
{
text: "You look like you lost a bet with destiny. 🎲😂 The theme is unclear, the execution is questionable, and yet… the drama is unmatched. Broadway rejected this instantly. 🎭🚫",
emoji: "💥"
},
{
text: "This outfit entered the battlefield unprepared. 🏹⚔️ It’s stitched with bravery but powered by poor decisions. Even gravity is judging the silhouette. 🌍😬",
emoji: "🔥"
},
{
text: "That ensemble screams creativity… unfortunately it whispers disaster. 🎨💣 Somewhere, style packed its bags and left without notice. 📦🚪",
emoji: "💀"
}
];

const commandPhrases = [
"Stand still while I process this disaster. 🧍‍♂️",
"Explain yourself immediately. 📢",
"Who approved this look? We need names. 📝",
"Take a deep breath… you’ll need it. 😮‍💨",
"Prepare for emotional damage. 🎯",
"Look directly at your choices. 👀"
];

let usedIndexes = [];

// 🎙 Speech
function speak(text){
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.85;
    speech.pitch = 0.6;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}

// 🎲 Get Unique Roast
function getUniqueRoast(){
    let availableIndexes = roastDatabase
        .map((_, index) => index)
        .filter(i => !usedIndexes.includes(i));

    if(availableIndexes.length === 0){
        usedIndexes = [];
        availableIndexes = roastDatabase.map((_, index) => index);
    }

    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    usedIndexes.push(randomIndex);
    return roastDatabase[randomIndex];
}

// 🎬 Countdown
function dramaticCountdown(callback){

    let count = 3;
    const el = document.getElementById("countdown");

    window.speechSynthesis.cancel();

    function playTick(){
        tickSound.currentTime = 0;
        tickSound.play();
    }

    function playBoom(){
        document.body.classList.add("flash");
          setTimeout(()=>{
    document.body.classList.remove("flash");
         },300);

        boomSound.currentTime = 0;
        boomSound.play();
    }

    el.innerText = "🔥 " + count;
    playTick();

    const interval = setInterval(()=>{

        count--;

        if(count > 0){
            el.innerText = "🔥 " + count;
            playTick();
        }
        else{
            el.innerText = "⚡ JUDGMENT ⚡";
            playBoom();
            clearInterval(interval);

            setTimeout(()=>{
                el.innerText = "";
                callback();
            },1200);
        }

    },1000);
}


// 🎉 Confetti
function launchConfetti(){
    for(let i=0;i<70;i++){
        let c=document.createElement("div");
        c.style.position="fixed";
        c.style.width="8px";
        c.style.height="8px";
        c.style.top="0";
        c.style.left=Math.random()*100+"vw";
        c.style.background=`hsl(${Math.random()*360},100%,50%)`;
        c.style.animation="fall 3s linear forwards";
        document.body.appendChild(c);
        setTimeout(()=>c.remove(),3000);
    }
}

// 🖼 Preview
function previewImage(input, previewId){
    const file=input.files[0];
    if(file){
        const reader=new FileReader();
        reader.onload=function(){
            const img=document.getElementById(previewId);
            img.src=reader.result;
            img.style.display="block";
        }
        reader.readAsDataURL(file);
    }
}

document.getElementById("img1")?.addEventListener("change",function(){
    previewImage(this,"preview1");
});
document.getElementById("img2")?.addEventListener("change",function(){
    previewImage(this,"preview2");
});

// ⚔️ MAIN BATTLE
function startRoast(){

    const img1=document.getElementById("img1").files[0];
    const img2=document.getElementById("img2").files[0];

    if(!img1 || !img2){
        alert("Both warriors must enter the arena 😈");
        return;
    }

    dramaticCountdown(()=>{

        let rating1=Math.floor(Math.random()*10)+1;
        let rating2=Math.floor(Math.random()*10)+1;

        const roast1=getUniqueRoast();
        const roast2=getUniqueRoast();

        const command1=commandPhrases[Math.floor(Math.random()*commandPhrases.length)];
        const command2=commandPhrases[Math.floor(Math.random()*commandPhrases.length)];

        let winnerText;

        if(rating1>rating2){
            winnerText="🏆 Player 1 has brutally conquered the runway and survived the roast apocalypse! 🔥👑";
            document.getElementById("player2").classList.add("loser");
            launchConfetti();
        }else if(rating2>rating1){
            winnerText="🏆 Player 2 dominates the battlefield of fashion chaos! ⚔️🔥";
            document.getElementById("player1").classList.add("loser");
            launchConfetti();
        }else{
            winnerText="⚖️ This is a legendary draw. Both outfits equally chaotic. 💀";
        }

        document.getElementById("result").innerHTML=`
            <h3>🔥 Brutal Results 🔥</h3>

            <p><strong>Player 1:</strong><br>
            ${command1}<br>
            ${roast1.text}<br>
            ⭐ Rating: ${rating1}/10</p>

            <p><strong>Player 2:</strong><br>
            ${command2}<br>
            ${roast2.text}<br>
            ⭐ Rating: ${rating2}/10</p>

            <h2 id="winner">${winnerText}</h2>
        `;

        speak(
            command1 + " " + roast1.text + " " +
            command2 + " " + roast2.text + " " +
            winnerText
        );

    });
}
