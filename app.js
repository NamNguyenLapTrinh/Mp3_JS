const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const musicNow = $('.header-music-now')
const cd = $('.cd-img')
const cdImg = $('.cd__img')
const auDio = $('#audio')
const play = $('.plays')
const next = $('.next')
const comeback =  $('.Comeback')
const volumes = $('#volume')
const inPut = $('#input')
const random = $('.random')
const rotate = $('.rotate')
const list = $('.list')
const PLAYER_STORAGE_KEY = 'Nam-Nguyen'
app= {
    conFig: JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY')) || {},
    setConfig: function(key,value){
        this.conFig[key] = value
        localStorage.setItem('PLAYER_STORAGE_KEY', JSON.stringify(this.conFig))
    } ,
    currentIndex: 0,
    isPlay: false,
    isRandom: false,
    isRatote: false,
    songs: [
              {
                  names: 'Nhớ Làm Gì Một Người Như Anh',
                  singer: 'Quang Hà',
                  path: './assets/SONG/song1.mp3',
                  image: './assets/IMG/quangha.jpeg'
      
              },
              {
                  names: 'Thật Lòng Anh Xin Lỗi',
                  singer: 'Tuấn Hưng',
                  path: './assets/SONG/song2.mp3',
                  image: './assets/IMG/img1.jpeg'
      
              }, {
                  names: 'Trên Chuyến Xe Lên Đà Lạt',
                  singer: 'Tóc Tiên',
                  path: './assets/SONG/song3.mp3',
                  image: './assets/IMG/toctien1.jpeg'
              },
              {
                  names: 'Giây Phút Tuyệt Vời',
                  singer: 'Tóc Tiên',
                  path: './assets/SONG/song4.mp3',
                  image: './assets/IMG/toctien2.jpeg'
      
              }, {
                  names: 'Nhớ Em Thật Nhiều',
                  singer: 'Vũ Duy Khánh',
                  path: './assets/SONG/song5.mp3',
                  image: './assets/IMG/imgsong5.jpeg'
      
              },
              {
                  names: 'Cũng Bởi Vì Phê',
                  singer: 'Vũ Duy Khánh',
                  path: './assets/SONG/song6.mp3',
                  image: './assets/IMG/imgsong6.jpeg'
      
              },
              {
                  names: 'Anh Là Kẻ Nói Dối',
                  singer: 'Vũ Duy Khánh',
                  path: './assets/SONG/song7.mp3',
                  image: './assets/IMG/imgsong7.jpeg'
      
              },
              {
                  names: 'Em Hiểu Không',
                  singer: 'Vũ Duy Khánh',
                  path: './assets/SONG/song8.mp3',
                  image: './assets/IMG/imgsong8.jpeg'
      
              },
      
          ],


          defineProperties:function(){
            Object.defineProperty(this,'currentSong',{
                get: function(){
                    return this.songs[this.currentIndex] 
                }
            })
         },

          renderSong(){
            const htmls = this.songs.map((song, index)=>{
                return `
                <div class="list ${this.currentIndex === index ? 'listRed' : ''}" data-index="${index}">
                        <div class="list-img">
                            <img src="${song.image}" alt="">
                        </div>
                        <div class="list-names">
                            <h3 class="name-music">${song.names}</h3>
                            <span class="name-songger">${song.singer}</span>
                        </div>
                        <div class="list-items">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>

                </div>
            
                `
            })
            container.innerHTML = htmls.join('')

          },


          
        
        loadSong: function(){
            musicNow.textContent = this.currentSong.names
            cdImg.src = this.currentSong.image
            audio.src = this.currentSong.path
            this.setConfig('currentIndex', this.currentIndex)

        },

        loadsetConfig: function(){
            this.currentIndex = this.conFig.currentIndex
            this.isRandom = this.conFig.isRandom
            this.isRatote = this.conFig.isRatote
        },



        nextSong: function(){
            this.currentIndex++
            if(this.currentIndex >= this.songs.length){
                this.currentIndex = 0
            }

           
            
            this.loadSong()
            auDio.play()
        },

        combackSong: function(){
            this.currentIndex--
            if(this.currentIndex <= 0){
                this.currentIndex = this.songs.length - 1
            }
            this.isPlay = true
            play.classList.toggle('play', this.isPlay)
            this.loadSong()
            auDio.play()
        },

        randomSong: function(){

            let newIndex = 0
            do{
                this.currentIndex = Math.floor(Math.random() * this.songs.length)
            } while(newIndex === this.currentIndex)
           
            this.loadSong()
            auDio.play()
        },

        // 

       
         songNow: function(){
            if(this.currentIndex === list.dataset.index){
                list.classList.add('listRed')
            }

            
         },

         scollredSong: function(){
            setTimeout(()=>{
                $('.list.listRed').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            },500)
         },

         
         


      

        

        handlEvent: function(){

           
            const cdRotate =  cdImg.animate([
                {transform: 'rotate(360deg)',}
            ],{
                duration:10000,
                iterations: Infinity
            })
            cdRotate.pause()

            const _this = this
            play.onclick = function(){
                _this.isPlay =! _this.isPlay
                play.classList.toggle('play', _this.isPlay)
                   if(_this.isPlay){
                       auDio.play()
                        cdRotate.play()

                   } else {
                       auDio.pause()
                         cdRotate.pause()

                   }
                   
               
                
            }


            
            // Next song
            next.onclick = function(){

                if(_this.isRandom){
                    _this.randomSong()
                } else {
                    _this.nextSong()

                    _this.scollredSong()
                    _this.renderSong()
                }
                play.classList.add('play')
            }

            // combackSong
            comeback.onclick = function(){

                if(_this.isRandom){
                    _this.randomSong()
                } else {
                _this.combackSong()

                }
            _this.renderSong()
                _this.scollredSong()

            }
            
            volumes.onchange = function(){
                auDio.volume = volumes.value / 100
            }

            

            auDio.ontimeupdate = function(){
                if(auDio.duration){
                    const times = Math.floor(auDio.currentTime / auDio.duration * 100)
                    inPut.value = times
                }
               
            }

            inPut.onchange = function(){
                auDio.currentTime = auDio.duration * (inPut.value / 100)
            }

            random.onclick = function(){
                _this.isRandom =! _this.isRandom
                _this.setConfig('isRandom', _this.isRandom)

                random.classList.toggle('randomred', _this.isRandom)


            }

            rotate.onclick = function(){
                _this.isRatote =! _this.isRatote
                _this.setConfig('isRatote', _this.isRatote)

                rotate.classList.toggle('red',_this.isRatote)
            }

           auDio.onended = function(){
               if(_this.isRatote){
                 auDio.play()
               } else {
                   next.click()
               }
           }
            
           const Width = cd.offsetWidth


           document.onscroll = function(){
            
            const newWidth = Width - (window.scrollY)

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
              
           }

           container.onclick = function(e){
              const nodeSong = e.target.closest('.list:not(.listRed)')
              
              if(nodeSong || e.target.closest('i')){
                if(nodeSong){
                    _this.currentIndex = Number(nodeSong.dataset.index)
                     play.classList.add('play')
                  
                    _this.loadSong()
                    _this.renderSong()
                    auDio.play()
                }
                
                  
            }
           }
           

        },

  
        start(){
            this.loadsetConfig()
            this.defineProperties()
            this.handlEvent()
            this.renderSong()
            this.loadSong()


            random.classList.toggle('randomred', this.isRandom)

            rotate.classList.toggle('red',this.isRatote)
           
        }

}  

app.start()



























// const $ = document.querySelector.bind(document);



// const $$ = document.querySelectorAll.bind(document);
// const heading = $('.header-music-now');
// const cdItem = $('.cd__img');
// const auDio = $('#audio');
// const cd = $('.cd-img')
// const controlItem = $('.plays')
// const playbtn = $('.contro-item__play')
// const container = $('.container')
// const pause = $('.contro-item__pause')
// const inputTime = $('#input')
// const inputVolume = $('#volume')
// const nextsong = $('.next')
// const comeBack = $('.Comeback')
// const random = $('.random')
// const randoms = $('.randoms')
// const rotates = $('.rotate')
// const list = $('.list')


// const PALYER_STORAGE_KEY ='Nam'

// const app = {

//     currentIndex: 0,
//     isPlaying: false,
//     isRamdom: false,
//     isRatote: false,
//     config: JSON.parse(localStorage.getItem(PALYER_STORAGE_KEY)) || {},
//     songs: [
//         {
//             name: 'Nhớ Làm Gì Một Người Như Anh',
//             singer: 'Quang Hà',
//             path: './assets/SONG/song1.mp3',
//             image: './assets/IMG/quangha.jpeg'

//         },
//         {
//             name: 'Thật Lòng Anh Xin Lỗi',
//             singer: 'Tuấn Hưng',
//             path: './assets/SONG/song2.mp3',
//             image: './assets/IMG/img1.jpeg'

//         }, {
//             name: 'Trên Chuyến Xe Lên Đà Lạt',
//             singer: 'Tóc Tiên',
//             path: './assets/SONG/song3.mp3',
//             image: './assets/IMG/toctien1.jpeg'

//         },
//         {
//             name: 'Giây Phút Tuyệt Vời',
//             singer: 'Tóc Tiên',
//             path: './assets/SONG/song4.mp3',
//             image: './assets/IMG/toctien2.jpeg'

//         }, {
//             name: 'Nhớ Em Thật Nhiều',
//             singer: 'Vũ Duy Khánh',
//             path: './assets/SONG/song5.mp3',
//             image: './assets/IMG/imgsong5.jpeg'

//         },
//         {
//             name: 'Cũng Bởi Vì Phê',
//             singer: 'Vũ Duy Khánh',
//             path: './assets/SONG/song6.mp3',
//             image: './assets/IMG/imgsong6.jpeg'

//         },
//         {
//             name: 'Anh Là Kẻ Nói Dối',
//             singer: 'Vũ Duy Khánh',
//             path: './assets/SONG/song7.mp3',
//             image: './assets/IMG/imgsong7.jpeg'

//         },
//         {
//             name: 'Em Hiểu Không',
//             singer: 'Vũ Duy Khánh',
//             path: './assets/SONG/song8.mp3',
//             image: './assets/IMG/imgsong8.jpeg'

//         },

//     ],

//     setConfig: function(key, value){
//         this.config[key] = value
//         localStorage.setItem(PALYER_STORAGE_KEY, JSON.stringify(app.config))
//     },

 
//     defineProperties: function () {
//         Object.defineProperty(this, 'currentSong', {
//             get: function () {
//                 return this.songs[this.currentIndex]
//             }
//         })


//     },

   
    
//     renderHtml: function () {
//         var htmls = this.songs.map((value,index) => {
//             return `
//                 <div class="list ${index === this.currentIndex ? 'listRed' : ''}" data-index="${index}">
//                     <div class="list-img">
//                         <img src="${value.image}" alt="">
//                     </div>
//                     <div class="list-names">
//                         <h3 class="name-music">${value.name}</h3>
//                         <span class="name-songger">${value.singer}</span>
//                     </div>
//                     <div class="list-items">
//                         <i class="fas fa-ellipsis-h"></i>
//                     </div>
//                 </div>

//                 `
//         })
//         container.innerHTML = htmls.join('')


//     },
//     // Load song
//     loadCurrentsong: function () {

//         this.setConfig('currentIndex', this.currentIndex)
//         heading.textContent = this.currentSong.name
//         cdItem.src = this.currentSong.image
//         auDio.src = this.currentSong.path

        

//     },

//     loadConfig: function(){
//         this.isRamdom = this.config.isRamdom
//         this.isRatote = this.config.isRatote
//         this.currentIndex = this.config.currentIndex
//     },  

//      // Next Song List
//      nextSong: function () {
//         this.currentIndex++
//         if (this.currentIndex >= this.songs.length) {
//             this.currentIndex = 0
//         }
//         this.loadCurrentsong()
//         this.renderHtml()
//         this.scollredSong()

//     },
//     // Lấy giá trị khi quay lại bài hát
//     comebackSong: function(){
//         this.currentIndex--
//         if(this.currentIndex <= 0){
//             this.currentIndex = this.songs.length - 1
//         }
//             this.loadCurrentsong()
//             this.renderHtml()
//             this.scollredSong()

//     },

//     randomSong: function(){

//         let newIndex = 0;
//             do {
//                  newIndex = Math.floor(Math.random() * this.songs.length)
               
//             } while(newIndex === this.currentIndex)
//             this.scollredSong()

//              this.currentIndex =  newIndex
            
//             this.loadCurrentsong()
//             this.renderHtml()

//     },


//     scollredSong: function(){
//       setTimeout(()=>{
//         $('.list.listRed').scrollIntoView({
//             behavior: 'smooth',
//             block: 'center'
//         })
//       },500)
//     },
    


//     handlEvent: function () {
//         const _this = this
//         const cdWidth = cd.offsetWidth

//         document.onscroll = function () {
//             const Width = window.scrollY


//             const newWidth = cdWidth - Width
//             cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
//         }

       


//         // Xu li CD quay

//         const cdplay = cd.animate([
//             { transform: 'rotate(360deg)' }
//         ],
//             {
//                 duration: 10000,
//                 iterations: Infinity
//             }
//         )


//         cdplay.pause()
//         // Xu li khi play
//         controlItem.onclick = function () {
//             if (_this.isPlaying) {
//                 auDio.pause()
//             } else{
//                 auDio.play()
               
//             }
//         }

//         auDio.onplay = function () {
//             _this.isPlaying = true;
//             controlItem.classList.add('play')
//             cdplay.play()
            


//         }

//         auDio.onended = function () {
//             if(_this.isRatote){
//              auDio.play()

//             } else {
//                 nextsong.click()
//             }
//         }

//         auDio.onpause = function () {
//             _this.isPlaying = false
//             controlItem.classList.remove('play')
//             cdplay.pause()


//         }
//         // Xu li khi bai hat chay 
//         // Cập nhật giây hiện tại
//         auDio.ontimeupdate = function () {
//             const timebig = $('.time-big')
//             const time = auDio.duration / 3600
//             timebig.textContent =(time) . toFixed(2)

           
//             $('.time-now').textContent = (auDio.currentTime /60 ) . toFixed(2)
//             if (auDio.duration) {
//                 const Percent = Math.floor(auDio.currentTime / auDio.duration * 100)
//                 inputTime.value = Percent
                
//             }

//         }
//         // Tua
//         inputTime.onchange = function (e) {
//             const seekime = auDio.duration * e.target.value / 100
//             auDio.currentTime = seekime
//         }
//         // Xử lí điều chỉnh volume
//         inputVolume.onchange = function (e) {

//             auDio.volume = e.target.value / 100

//         }

//         nextsong.onclick = function () {

//             if(_this.isRamdom){
//                 _this.randomSong()
//             } else {
//                 app.nextSong()

//             }
//             auDio.play()


//         }

//         comeBack.onclick = function () {

//             if(_this.isRamdom){
//                 _this.randomSong()

//             }else{
//             _this.comebackSong();

//             }
//             auDio.play()
//         }
        

//         random.onclick = function (e) {
//             _this.isRamdom =! _this.isRamdom
//             _this.setConfig('isRamdom',_this.isRamdom)

//             randoms.classList.toggle('randomred', _this.isRamdom)


           
//         }

//         rotates.onclick = function (e) {
//             _this.isRatote =! _this.isRatote
//             _this.setConfig('isRatote',_this.isRatote)

//             rotates.classList.toggle('red', _this.isRatote)



//         }
//         container.onclick = function(e){

//             const songNode = e.target.closest('.list:not(.listRed)')
//             if(songNode || e.target.closest('i')) {
//                     if(songNode){
//                          _this.currentIndex  = Number(songNode.dataset.index) 
//                         _this.loadCurrentsong()
//                         _this.renderHtml()
//                          auDio.play()
                        
//                     }
//             }
//         }

//     },
//     start: function () {

//         this.loadConfig()
//         // Định nghĩa các thuộc tính cho Object
//         this.defineProperties()

//         // Tải thông tin bài hát đầu tiên khi UI vào ứng dụng
//         this.loadCurrentsong()

//         // Lắng nge/ xử lí sự kiện
//         this.handlEvent()

//         // Render playlist
//         this.renderHtml()

//         randoms.classList.toggle('randomred', this.isRamdom)
//         rotates.classList.toggle('red', this.isRatote)

//     }   




// };

// app.start()


 

 
// // function formatTime(seconds) {
// //     let min = Math.floor(seconds / 60);
// //     let sec = Math.ceil(seconds % 60);
// //     min = min < 10 ? '0' + min : min;
// //     sec = sec < 10 ? '0' + sec : sec;
// //     return [min, sec];
// // }





// // updateTime() {
// //     const timePlayed = audio.currentTime;
// //     const timeLeft = audio.duration - timePlayed;
// //     let [min, sec] = formatTime(timePlayed);
// //     $(".time-played").textContent = `${min}:${sec}`;
// //     let [minLeft, secLeft] = formatTime(timeLeft);
// //     $(".time-left").textContent = `${minLeft}:${secLeft}`;
// //     let position = audio.currentTime / audio.duration * 100;
// //     progress.value = isNaN(position) ? 0 : position;
// // },