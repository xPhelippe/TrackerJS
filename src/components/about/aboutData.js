import bars from "./Bars.png";
import enter from "./EnterValue.png";
import main from "./MainIntro.png";
import year from "./Year.png";

const data = [
    {
        title: "Welcome!",
        content:
            "Welcome to Tracker.js! This project was inspired to\
        help anyone track a key habit that they want to\
        develop. Feel free to shop around, check out the\
        pretty charts, and maybe even start tracking a habit\
        of your own!",
        image: year,
        alt: "year view",
    },
    {
        title: "How to Use",
        content:
            "After deciding on a habit to watch, pick a way to\
        measure it. This could be glasses of water drank,\
        number of pushups pushed, or number of pages read.\
        Whenever you have an update, enter the number in the\
        text box. Tracker.js will keep track of things over\
        time.",
        image: enter,
        alt: "enter data here",
    },
    {
        title: "",
        content:
            " As data is entered, the daily, weekly, monthly, and\
        yearly views are updated. You may not be able to see\
        your biceps grow, but you most certainly can watch\
        these bars get taller.",
        image: bars,
        alt: "bar grapn",
    },
    {
        title: "And There's More!",
        content:
            "In addition, feel free to visit the other tabs where\
        you can see a demo of a full board, change the color\
        of the site, and view the source code.",
        image: main,
        alt: "Main View",
    },
];

export default data;
