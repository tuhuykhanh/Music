
let searchBtn = document.querySelector('.header .search-form .fa-search')
let searchForm = document.querySelector('.header .search-form')
let darkmodeBtn = document.querySelector('.header .interface')


searchBtn.onclick = () => {
    searchForm.classList.toggle('active')
}
darkmodeBtn.onclick = () => {
    darkmodeBtn.classList.toggle('active')
    document.body.classList.toggle('light-mode');
}


let sliderShowSrc = document.querySelector('.slider-show img');
let imgsrc = document.querySelectorAll('.slider .slider-dot .box-image img');
let imgParent = document.querySelectorAll('.slider .slider-dot .box-image');
let nextBtn = document.querySelector('.slider .next');
let prevBtn = document.querySelector('.slider .prev');

//slide image

let currentIndex = 0;

renderImg(currentIndex)
function renderImg(index) {
    currentIndex = index
    sliderShowSrc.src = imgsrc[currentIndex].src;
    document.querySelector('.slider .slider-dot .box-image.active').classList.remove('active')
    imgsrc[currentIndex].parentElement.classList.add('active')

}
//auto next 
autoNext(3000);
function autoNext(ms) {
    setInterval(() => {
        currentIndex++;
        if (currentIndex > imgParent.length - 1) {
            currentIndex = 0;
        }
        renderImg(currentIndex)
    }, ms)
}

imgParent.forEach((img, index) => {
    img.onclick = () => {
        renderImg(index)
    }
})
nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex > imgParent.length - 1) {
        currentIndex = 0;
    }
    renderImg(currentIndex)
}
prevBtn.onclick = () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imgParent.length - 1;
    }
    renderImg(currentIndex)
}
//// handle tab playing

const tabBtn = document.querySelectorAll('.navbar .nav-list .pack .list .list-item');
const homeSection = document.querySelector('#home')
const playingSection = document.querySelector('#onplaying')

const btnHome = document.querySelector('.homeBtn')
const btnOnPlay = document.querySelector('.playingBtn')

const tab = {

    handleEvent: function () {

        // tabBtn.forEach(tab => {
        //     tab.onclick = (e) => {
        //         e.preventDefault();
        //     }
        // })
        btnHome.onclick = (e)=>
        {
            e.preventDefault();
            homeSection.classList.remove('active')
            playingSection.classList.add('active')
        }
        btnOnPlay.onclick = (e)=>
        {
            e.preventDefault();
            homeSection.classList.add('active')
            playingSection.classList.remove('active')
        }

    },
    start: function () {
        tab.handleEvent()
    },
}

/// play music right now ////
const PlAYER_STORAGE_KEY = "HUY_KHANH";

let btnPlay = document.querySelector('.play-toggle');
let audio = document.querySelector('#audio');
let song = document.querySelector('.container-song-main');
var rangeTime = document.querySelector('.inputRange')
let nextBtnM = document.querySelector('.control .next');
let prevBtnM = document.querySelector('.control .prev');
const randomBtn = document.querySelector('.random');
const volumeBtn = document.querySelector('.volumn-range .volumnbar');
const muteBtn = document.querySelector('.volumn')
const repeatBtn = document.querySelector('.repeat');
const songClick = document.querySelector('.container-song-main');



const appMusic = {
        isPlaying: false,
        currentIndex: 0,
        isRandom: false,
        isMute: false,
        isRepeat: false,
        config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
        songs: [         
            {
                name: 'Luu So Em Di',
                singer: 'Vũ Phụng Tiên',
                path: '../musics/songs/luusoemdi.mp3',
                // path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
                image: '../images/song/luusoemdi.jpg',
            },
            {
                name: 'Noi Voi Em Mot Loi',
                singer: 'Vũ Phụng Tiên',
                path: '../musics/songs/noivoiem1loiremix.mp3',
                image: '../images/song/noivoiem.jpg',
            },
            {
                name: 'Yeu Anh Nhat Doi',
                singer: 'Vũ Phụng Tiên',
                path: '../musics/songs/yeuanhnhatdoi.mp3',
                image: '../images/song/yeuanhnhatdoi.jpg',
            },            
        ],
        setConfig: function (key, value) {
            this.config[key] = value;
            // (2/2) Uncomment the line below to use localStorage
            localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
          },
        renderSong: function(){

            const html = appMusic.songs.map((song,index)=>{
                return `

                <div class="song-box-main ${index === appMusic.currentIndex ? 'active' : ''} "data-index ="${index}">
                <div class="left">
                    <div class="image">
                        <img src="${song.image}" alt="">
                        <div class="icon-play">
                            <div class="fas fa-play"></div>
                        </div>
                    </div>
                    <div class="title">
                        <h4 class="name"> ${song.name} </h4>
                        <h4 class="author"> <span> ${song.singer}</span></h4>
                    </div>
                </div>
                <div class="middle">            
                </div>
                <div class="right">
                    <div class="far fa-heart"></div>
                    <div class="fas fa-ellipsis-h"></div>
                </div>
            </div>        
                `
            })
            song.innerHTML = html.join('')

        },
        defineProperties: function(){
            Object.defineProperty(appMusic,'currentSong',{
                get: function(){
                    return appMusic.songs[appMusic.currentIndex];
                }
            })
        },
    
        loadCurrentSong: function(){
            
            document.querySelector('.play .play-control .play-control_left .image img').src = appMusic.currentSong.image;
            document.querySelector('.play .play-control .play-control_left .info .name').innerText = appMusic.currentSong.name;
            document.querySelector('.play .play-control .play-control_left .info .author span').innerText = appMusic.currentSong.singer;
            document.querySelector('.content .top .image-album img').src = appMusic.currentSong.image
            document.querySelector('.content .top .title .namenow span').innerText = appMusic.currentSong.name
            // document.querySelector('.content .top .title .nextname span').innerText = appMusic.songs[currentIndex+1].name
            audio.src = appMusic.currentSong.path    
            
            volumeBtn.value = audio.volume
            
          
          
            

        },
        handleEvent:function(){

            const rotate360 = document.querySelector('.content .top .image-album').animate([
                { transform: 'rotate(360deg)' }
              ], {
               
                duration: 8000,
                iterations: Infinity
              });
            rotate360.pause();
            btnPlay.onclick =()=>
            {
               if(appMusic.isPlaying)
               {      
                   audio.pause();
               }else
               {    
                    audio.play();
               }     
            }
            audio.onplay =()=>
            {
                appMusic.isPlaying = true;
                btnPlay.classList.add('playing')
                rotate360.play();
            }
            audio.onpause =()=>
            {
                appMusic.isPlaying = false;
                btnPlay.classList.remove('playing')
                rotate360.pause();
            }
            audio.ontimeupdate=()=>{
              
                if(audio.duration)
                {
                    const percent =  Math.floor((audio.currentTime / audio.duration)*100);
                    rangeTime.value = percent  

                    var minutes = Math.floor(audio.currentTime / 60); 
                    var seconds = (audio.currentTime  - minutes * 60); 
                    
                    document.querySelector('.range .current .min').innerText = minutes
                    document.querySelector('.range .current .sec').innerText = seconds.toFixed()

                    if(audio.duration)
                    {
                        document.querySelector('.range .dura .min').innerText = Math.floor((audio.duration / 60))
                        document.querySelector('.range .dura .sec').innerText = (audio.duration % 60).toFixed();
                    }
                       
                }

            }
            rangeTime.onchange =()=>
            {
                const current = (rangeTime.value / 100 * audio.duration) 
                audio.currentTime = current.toFixed() 
            }
            nextBtnM.onclick =()=>
            {    
                if(appMusic.isRandom)
                {
                    appMusic.ranDomSong();
                }else
                {
                    appMusic.nextSong();  
                }
                audio.play();
                appMusic.renderSong();
                appMusic.crollInView();
            }
            prevBtnM.onclick =()=>
            {
                appMusic.prevSong();

                audio.play();
                appMusic.renderSong();

                
            }
            randomBtn.onclick = ()=>
            {
                appMusic.isRandom = !appMusic.isRandom;
                appMusic.setConfig('isRandom',appMusic.isRandom);
                randomBtn.classList.toggle('active')
                audio.volume = 0.5;
              
            }
            volumeBtn.oninput = ()=>
            {               
                   if(appMusic.isMute)
                   {
                       
                   }else
                   {
                        let defaultVolumn ;
                        defaultVolumn  = volumeBtn.value
                        audio.volume = defaultVolumn;     
                   }
            }
            muteBtn.onclick = ()=>
            {
                appMusic.isMute = !appMusic.isMute;
                muteBtn.classList.toggle('active');
                appMusic.Muted();
            }
            repeatBtn.onclick = () =>
            {   

                appMusic.isRepeat =!appMusic.isRepeat 
                appMusic.setConfig('isRepeat',appMusic.isRepeat);
                
                repeatBtn.classList.toggle('active')           
            }
            audio.onended =()=>
            {
               if(appMusic.isRepeat)
               {
                     appMusic.repeatSong();
               }
               else
               {
                   appMusic.nextSong();
               }
               audio.play();
            }
           songClick.onclick =(e)=>
           {
               if(e.target.closest('.song-box-main:not(.active)') || e.target.closest('.right'))
               {
                   if(e.target.closest('.song-box-main:not(.active)'))
                   {
                         
                        let index = Number(e.target.getAttribute('data-index'))
                        if(index)
                        {
                            appMusic.currentIndex = index;
                            appMusic.loadCurrentSong();
                            audio.play();
                            appMusic.renderSong();
                            
                        }
                   }
               }
           }

        },
        Muted(){
            if(appMusic.isMute)
            {
                audio.volume = 0;
            }else
            {
                audio.volume = volumeBtn.value;
            }
        },
        nextSong (){
            appMusic.currentIndex++;
            
            if(appMusic.currentIndex >= appMusic.songs.length)
            {
                appMusic.currentIndex = 0;
            }
            appMusic.loadCurrentSong();
            audio.play();
        },
        prevSong(){
            appMusic.currentIndex--;
            if(appMusic.currentIndex <0)
            {
                appMusic.currentIndex = appMusic.songs.length -1;
            }
            appMusic.loadCurrentSong();
            audio.play();
        },
        ranDomSong(){
             
                let newindex
                do
                {
                    newindex  = Math.floor(Math.random()* appMusic.songs.length);
                }
                while(appMusic.currentIndex === newindex)
                appMusic.currentIndex = newindex;  
                appMusic.loadCurrentSong();
        },
        repeatSong(){
            appMusic.currentIndex = appMusic.currentIndex
            appMusic.loadCurrentSong();
        },
        crollInView(){       
            document.querySelector('.song-box-main.active').scrollIntoView({behavior: "smooth",inline: "center"})
        },
        loadConfig (){

            appMusic.isRandom = appMusic.config.isRandom
            appMusic.isRepeat = appMusic.config.isRepeat

        },

        start: function(){
                appMusic.loadConfig();
                //difine curretn song 
                appMusic.defineProperties();
                //handle event
                appMusic.handleEvent();
                //loadd current song
                appMusic.loadCurrentSong();
                //render
                appMusic.renderSong();


                randomBtn.classList.toggle('active',appMusic.isRandom)
                repeatBtn.classList.toggle('active',appMusic.isRepeat)  

        }

}
appMusic.start();





