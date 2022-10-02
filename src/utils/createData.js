import { add } from "date-fns";

class DataGenerator {
    // helper function for random number generation
    static getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // completely random data
    static random() {
        var n = 1500; //number of data instances to create

        let randomData = [];

        for (var i = 0; i < n; i++) {
            // get a random value
            var value = this.getRandomArbitrary(0, 20);

            // random date and time for the past several months
            var day = this.getRandomArbitrary(1, 28);
            var month = this.getRandomArbitrary(0, 12);
            if (month === 12) month = 11;
            var year = 2022;
            var hour = this.getRandomArbitrary(0, 23);
            var minute = this.getRandomArbitrary(0, 60);
            var second = 0;

            var time = new Date(year, month, day, hour, minute, second);

            randomData.push({ time: time, value: value });
        }

        return randomData;
    }

    // data that tapers off after january
    static zigZag() {
        let randomData = [];

        //idea: after every 7 days, I will divide the number of data points by someting
        let year = new Date(Date.now()).getFullYear();
        let start = new Date(year, 0);

        for (let i = 0; i < 366; i++) {
            let value = ((i % 4) / 4) * 20;

            let curDate = add(start, { days: i });

            if (curDate.getFullYear() > new Date(Date.now()).getFullYear())
                break;

            randomData.push({ time: curDate, value: value });
        }

        return randomData;
    }

    static strongSoFar() {
        let randomData = [];

        let today = new Date(Date.now());

        //let year = new Date(Date.now()).getFullYear()
        //let start = new Date(year,0)

        let n = 400;

        for (let i = 0; i < n; i++) {
            // create random values between the star of the year and today
            // get a random value
            let value = this.getRandomArbitrary(0, 20);

            // random date and time for the past several months
            let day = this.getRandomArbitrary(1, 28);
            let month = this.getRandomArbitrary(0, today.getMonth() + 1);
            if (month === 12) month = 11;
            let year = 2022;
            let hour = this.getRandomArbitrary(0, 23);
            let minute = this.getRandomArbitrary(0, 60);
            let second = 0;

            let time = new Date(year, month, day, hour, minute, second);

            if (time > today) continue;

            randomData.push({ time: time, value: value });
        }

        return randomData;
    }
}

export default DataGenerator;
