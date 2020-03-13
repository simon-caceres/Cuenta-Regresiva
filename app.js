var intervalTimer;
const app = new Vue({
    el: '#app',
    data() {
        return {
            mensaje : ' Contador!',
            selectedTime: 0 ,
            timeLeft: '00.00',
            endTime: '0',
            times: [
                {
                     sec: 5,
                     display: '5 seg'
                },
                {
                    sec: 300,
                    display: '5 min'
                },
                {
                    sec: 600,
                    display: '10 min'
                },
                {
                    sec: 1800,
                    display: '30 min'
                }
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
});

function zeroPadded(num){
    return num < 10 ? `0${num}` : num;
}

function hourConvert(hour){
    return (hour % 12) || 12;
}

