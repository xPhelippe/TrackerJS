import { add, sub, set } from "date-fns";

class DataTransformer {
    /*
    take in a time series object and return a frequency object for today

    */
    static createDayData(obj) {
        let newData = [];

        // instantiate time slot array
        for (let i = 0; i <= 23; i++) {
            let timeStr = "";
            if (i > 12) {
                let time = "PM";
                let hour = (i % 13) + 1;
                timeStr = hour + " " + time;
            } else {
                let time = "AM";
                let hour = i;
                timeStr = hour + " " + time;
            }

            // create object for current hour
            let newItem = { time: timeStr, value: 0 };

            // see if any of the raw data is on today and that hour
            // TODO: also check to see if the day matches today
            for (let j = 0; j < obj.length; j++) {
                // see if date is today
                let now = new Date(Date.now());
                let dayMatch = obj[j].time.getDate() === now.getDate();
                let monthMatch = obj[j].time.getMonth() === now.getMonth();
                let yearMatch = obj[j].time.getYear() === now.getYear();
                if (!(dayMatch && monthMatch && yearMatch)) continue;

                // see if hour is current hour
                if (obj[j].time.getHours() !== i) continue;

                newItem.value += obj[j].value;
            }
            newData.push(newItem);
        }

        return newData;
    }

    /*
        take in a time series object and create an object for this week

    */
    static createWeekData(obj) {
        //generate array of items for the current week
        let week = [];

        // find sunday
        let now = new Date(Date.now());
        let sunday = sub(now, { days: now.getDay() });

        for (let i = 0; i < 7; i++) {
            week.push({
                time: add(sunday, { days: i }),
                value: 0,
            });

            set(week[i].time, {
                hours: 0,
                minute: 0,
                seconds: 0,
                milis: 0,
            });
        }

        for (let i = 0; i < obj.length; i++) {
            for (let j = 0; j < week.length; j++) {
                let dayMatch = obj[i].time.getDate() === week[j].time.getDate();
                let monthMatch =
                    obj[i].time.getMonth() === week[j].time.getMonth();
                let yearMatch =
                    obj[i].time.getYear() === week[j].time.getYear();

                if (!(dayMatch && monthMatch && yearMatch)) continue;

                week[j].value += obj[i].value;
            }
        }

        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        for (let i = 0; i < week.length; i++) {
            let curTime = week[i].time;
            let newStr = months[curTime.getMonth()] + "-" + curTime.getDate();

            week[i].time = newStr;
        }

        return week;
    }

    /*
        take in a time series object and create an object for this month

    */
    static createMonthData(obj) {
        let month = [];
        let thisMonth = new Date(Date.now()).getMonth();
        let thisYear = new Date(Date.now()).getFullYear();
        let firstDayofMonth = new Date(thisYear, thisMonth, 1);

        for (let i = 0; i < 31; i++) {
            let curday = add(firstDayofMonth, { days: i });

            if (curday.getMonth() !== thisMonth) break;

            month.push({ time: curday, value: 0 });
        }

        for (let i = 0; i < obj.length; i++) {
            for (let j = 0; j < month.length; j++) {
                let monthMatch =
                    obj[i].time.getMonth() === month[j].time.getMonth();
                let dayMatch =
                    obj[i].time.getDate() === month[j].time.getDate();
                let yearMatch =
                    obj[i].time.getYear() === month[j].time.getYear();

                if (!(monthMatch && dayMatch && yearMatch)) continue;

                month[j].value += obj[i].value;
            }
        }

        return month;
    }

    /*
        take in a time series object and create an object for this year

    */

    static createYeardata(obj) {
        let year = [];
        let curYear = new Date(Date.now()).getFullYear();
        let firstofYear = new Date(curYear, 0, 1);

        for (let i = 0; i < 366; i++) {
            let curDay = add(firstofYear, { days: i });

            if (curDay.getFullYear() !== curYear) break;

            year.push({ time: curDay, value: 0 });
        }

        for (let i = 0; i < obj.length; i++) {
            for (let j = 0; j < year.length; j++) {
                let monthMatch =
                    obj[i].time.getMonth() === year[j].time.getMonth();
                let dayMatch = obj[i].time.getDate() === year[j].time.getDate();
                let yearMatch =
                    obj[i].time.getYear() === year[j].time.getYear();

                if (!(monthMatch && dayMatch && yearMatch)) continue;

                year[j].value += obj[i].value;
            }
        }

        return year;
    }
}

export default DataTransformer;
