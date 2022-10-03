# TrackerJS

Welcome to Tracker.js, a productivity app aimed to help the user slowly develop their habits. Launch the website to see a day, week, month, and year view of progress. To track, select a habit from the drop down menu, enter a number into the input field, select the time the event took place, and press 'Add'; the value and time is tracked for all entries. Look back at the end of the year and see the progress made!

check it out here: https://trackerjs.xphelippe.com

### Graphics

Each graphic is it's own component. The [day](https://github.com/xPhelippe/TrackerJS/tree/main/src/components/dailyChartView) and [week](https://github.com/xPhelippe/TrackerJS/tree/main/src/components/weeklyChartView) components came from a third party component library listed below. The [month](https://github.com/xPhelippe/TrackerJS/tree/main/src/components/monthHeatMap) and [year](https://github.com/xPhelippe/TrackerJS/tree/main/src/components/heatMap) components were custom created in React with the help of some nifty css grid styling.

### Data

Once a number is added, the value and the entered timestamp are appended to an array and stored in local storage. When the home page is loaded, This array is read and a hook is triggered to process the data for each of the 4 views, relying on helper functions created in [src/utils/dataTransformer.js](https://github.com/xPhelippe/TrackerJS/blob/main/src/utils/dataTransformer.js) for the data processing. To maintain consistency and ensure all componets are updated on a change in data, React Context is used to maintain state across the application

### Changing the color

A third party component (listed below) was used for the color picker. Once the user clicked save, the ':root' css selector was modified with the user's new color. In addition, the MUI theme had to be changed. I tried using the localStorage hook at the highest level component to accomplish this, but my useEffect((),[localStorage]) hook would not trigger. Instead I used the searchParams() hook and passed the color as a search parameter. Future updates might look into making a custon localStorage hook that exhibits the behavior I am looking for.

# How to Use

Once you have cloned the repository, run the following code to launch the app.

```bash
$ cd TrackerJS
$ npm install
$ npm start
```

# Frameworks and Libraries Used

### [React](https://reactjs.org/)

A framework for creating front end websites. Was used to create component view for the different pages on the website.

### [Material UI](https://mui.com/)

A component library used in conjunction with React to ease the styling aspect of creating UIs. Components such as buttons, radio buttons, input fields, and many more were used to speed up development of the site.

### [Recharts](https://recharts.org/en-US)

A React library for visualizing data quickly and easily. Used to create the bar charts for the daily and weekly views.

### [use-local-storage](https://www.npmjs.com/package/use-local-storage)

A hook library for quick and easy access to the local storage of a browser. Used to store the user's color and their data in between browser sessions.

### [date-fns](https://date-fns.org/)

a javascript library for Date objects. Used to process the data from time series in to the day, week, month, and year view.

### [React Router](https://reactrouter.com/)

A React library for creating and routing to pages on the website. Used to create the different of the site.

### [react-colorful](https://omgovich.github.io/react-colorful/)

A React component for picking a color.
