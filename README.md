# Soto: *Organization, your way.*

#### Developers: Tarek Safa, Zhung Keung Moo Feng, Harsh Rana
#### Link to website: https://fp-soto.herokuapp.com

*Soto is a one-stop solution for living your best life through purposefully scheduling where you put in your time. It allows users with different preferences to experience scheduling the way they want to on the fly, incorporating common scheduling tools like todo lists and calendars beautifully into one location.*

## User Experience Design
We designed Soto with the user in mind. We wanted to provide users with the ability to experience todo lists in different formats, while maintaining a simple and pleasant to user experience. In order to acheieve this, we utilized a simple UI design which can be seen below:
![Home Screen](https://github.com/hr23232323/fp/blob/master/img/main.PNG "Home Screen")


Further, we utilized angular conditional formatting to show inplace editing to maintain the minimal look which can be seen below:
![Editing Feature](https://github.com/hr23232323/fp/blob/master/img/edit.PNG "In place editing")


Moreover, we also implemented a calendar view into our app which queries all todos based on the due date and shows the user what their week will look like:
![Calendar View](https://github.com/hr23232323/fp/blob/master/img/cal-view.PNG "Calendar View")

All of our design choices were made keeping the user and their preferences in mind to give a pleasant, while still useful design implementation

## Technical Achievements
- **Angular Implementation**: Our main technical achievement was the implementation of an Angular project. When we started with this project, no one on our team had any experience in angular and we all had to learn from scratch. This made the development process much slower. Due to our limited knowledge we could not implement all the features we originally set out to implement, but all team members walked away with a base knowledge of angular and we were able to finish the project delieverables.
- **Typescript**: Another technical achievement that was accompanied with angular was learning and using Typescript. Everyone on the project team had to step out of their comfort zones in JavaScript to learn to script in typescript. This was a technical achievement as it allowed us to fully utilize the angular framework.
- **Live Changes**: When adding, updating, and deleting todos, the Angular component and database update immediately, thus giving real-time feedback to the user. This was done by eventEmitters and subscriptions implemented inside the components that we built.

## Design/Evaluation Achievements
- **Skeleton CSS**:  We implemented Skeleton CSS to ensure maximum customizability in our app. This was done to give us complete control over the user interface (as compared to bootstrap/bulma that do it for you). We used Skeleton CSS and styled the different UI components from scratch.
- **Date Picker**: We utilized an external date picker component into our app. This was done after thorough user testing where users gave us feedback saying that instead of typing in dates, they would prefer to use a date picker. This component can be seen below:
![Date Picker](https://github.com/hr23232323/fp/blob/master/img/cal.PNG "Date Picker")
- **Conditional Components**: We utilized Angular conditional formatting to maintain a minimal user interface by creating in place editing capabilities so that the home screen had the least amount of elements. 
