import year from "./Year.png";
import home from "./homePage.png";
import edit from "./EditPage.png";

const data = [
    {
        title: "Welcome!",
        content:
            "Welcome to TrackerJS, a simple way for you to keep track of things. Use it to record a new habit you want to for or to keep tabs on a random event. Investigate the different views to try and find patterns. ",
        image: year,
        alt: "year view",
    },
    {
        title: "How to Use",
        content:
            "Select an activity from the drop down menu to view and modify the data for it. input an amount and a time and press add to record the event. Click on the many different views to see what patterns occur.",
        image: home,
        alt: "enter data here",
    },
    {
        title: "And There's More!",
        content:
            "Explore the Edit page to add more habits, modify past data entries, and give each habit a unique color. Navigate to the Demo page to see what the graphs look like when filled with data. Finally, Click on the Code tab to see how this web app was made.",
        image: edit,
        alt: "Main View",
    },
];

export default data;
