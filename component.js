Vue.component('boton-counter',{
template: ` <div class = " outer-container">
<div class = "inner-container">
     <div class = "countdown">
         <h2>{{timeLeft}}</h2>
         <h3>el contador termina a las: <span>{{endTime}}</span></h3>
     </div>
     <ul class="columns is-mobile is-centered">
         <li v-for="(time, index) in times" :key="index" class="column time btn ">
           <button v-on:click.prevent="setTime(time.sec)" :class="[
                 'button',
                 'is-link',
                 'btn btn-danger',
                 {'is-active': time.sec === selectedTime && endTime !== 0 }
               ]">
               {{time.display}}
         </button>
         </li>
       </ul>
</div>
</div>
`,
data() {
    return {
       
        selectedTime: 0 ,
        timeLeft: '00.00',
        endTime: '0',
        times: [
            {
                sec: 1800,
                display: '30 min'
            },
            {
                sec: 600,
                display: '10 min'
            },
            {
                sec: 300,
                display: '5 min'
            },
            {
                sec: 1,
                display: '1 seg'
            },
            {
                 sec: 5,
                 display: '5 seg'
            },
            {
                sec: 10,
                display: '10 seg'
            },
            
           
        ]
    }
},

methods: {
    setTime(seconds){
        clearInterval(intervalTimer);
        this.timer(seconds);
    },
    timer(seconds){
        const now = Date.now();
        const end = now + seconds * 1000;
        this.displayTimeLeft(seconds);

        this.selectedTime = seconds;

        this.displayEndTime(end);
        this.countdown(end);
    },
    countdown(end){
        intervalTimer = setInterval(()=>{
            const secondsLeft = Math.round((end - Date.now()) / 1000);

            if(secondsLeft === 0 ){
                this.endTime = 0;
            }
            else if(secondsLeft < 0) {
                clearInterval(intervalTimer);
                return;
            }
            this.displayTimeLeft(secondsLeft)
        }, 1000);
    },
    displayTimeLeft(secondsLeft){
        const minutes = Math.floor((secondsLeft % 3600) / 60 );
        const seconds = secondsLeft % 60;

        this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp){
        const end = new Date(timestamp);
        const hour = end.getHours();
        const minutes = end.getMinutes();

        this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`
    },
},


})

function zeroPadded(num){
    return num < 10 ? `0${num}` : num;
}

function hourConvert(hour){
    return (hour % 12) || 12;
}
