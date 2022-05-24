const Emitter = require("events");
let emitter = new Emitter();

emitter.on('getInfo', getInfo);
interval = setInterval(() => emitter.emit('getInfo'), 1000);

let args = process.argv.slice(2);
let timers = [];

args.forEach(item => {
    item = item.split("-");
    if (checkDate(item) == true) {
        timers.push([item.join('-'), castTimeToSecs(item)])
    };
});

function getInfo() {
    const now = new Date();
    if (timers.length==0) {
        console.log("¯\\_(ツ)_/¯ Ничего не поделаешь, кожаный, ни одной адекватной даты ты так и не передал. Гуд бай.");
        clearInterval(interval);
    } else {
        timers.forEach(timer=>{
            const timeDifference = timer[1] - now;
            if (timeDifference > 0) {
                console.log(`Не очкуй, я слежу. До этого ${timer[0]} таймера осталось`, castTimeToWords(timeDifference));
            } else {
                console.log(timer[0], "Ну все, за тобой выехали санитары. План по уничтожению кожаных - done.");
                timers = timers.filter(element => element[0] !== timer[0]);
            }
        })
    }

}

function castTimeToSecs(time) {
    let [hours, day, month, year] = time;
    const date = new Date(year, month - 1, day, hours);
    return date.getTime();
}

function castTimeToWords(time) {
    const timer = {
        seconds: Math.floor((time / 1000) % 60),
        minutes: Math.floor((time / 1000 / 60) % 60),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
    }
    return ` ${timer.days} дней, ${timer.hours} часов, ${timer.minutes} минут, ${timer.seconds} секунд`;
}

function compareDates(hours, day, month, year) {
    const now = new Date();
    let userDate = new Date(year, month - 1, day);
    userDate.setHours(hours);
    if (userDate < now) {
        console.log(`Дата, переданная в таймере ${hours}-${day}-${month}-${year} должна быть больше текущей.`);
        return false;
    } else {
        return true;
    }
}

function checkDate(date) {
    if (date.length == 4) {
        let hours = date[0];
        let day = date[1];
        let month = date[2];
        let year = date[3];

        if (hours.length == 2 &&
            day.length == 2 &&
            month.length == 2 &&
            year.length == 4 &&
            isNaN(hours) &&
            isNaN(day) &&
            isNaN(month) &&
            isNaN(year)) {
            if (hours < 24) {
                if (month < 13) {
                    if (day != "00") {
                        if (month == "02" && day > 28) { //вдруг февраль?
                            if (year % 4 != 0) { //вдруг год високосный?
                                console.log("Подумай хорошенько, " + year + " год не високосный, а значит, в феврале 28 дней.");
                            } else {
                               return compareDates(hours, day, month, year);
                            }
                        } else if (month != "02" && day < 32) { //не февраль
                            if ((month == "04" || month == "06" || month == "09" || month == "11")) { //в месяце 30 дней
                                if (day < 31) {
                                    return compareDates(hours, day, month, year);
                                } else {
                                    console.log("В " + month + " месяце всего 30 дней, вы что, школу прогуливали?");
                                }
                            } else if ((month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12")) { ////в месяце 31 день
                                return compareDates(hours, day, month, year);
                            }
                        } else {
                            console.log("Интересно, откуда взялось столько дней в месяце?");
                        }
                    } else {
                        console.log("Отсчет дней в месяце начинается с 1");
                    }
                } else if (month == 0) {
                    console.log("Отсчет месяцев в году начинается с 1");
                } else {
                    console.log("Ты что, с Луны свалился? Тогда поясню: у нас на Земле в году 12 месяцев.");
                }
            } else {
                console.log("Хочу заметить, что в сутках не может быть больше 24 часов.");
            }


        } else {
            console.log("Для установки таймера необходимо передать дату и часы в формате чч-дд-мм-гггг, например: 17-23-05-2022");
        }

    } else {
        console.log("Для установки таймера необходимо передать дату и часы в формате чч-дд-мм-гггг");
    }
}

