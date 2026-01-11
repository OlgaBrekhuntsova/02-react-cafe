Feedback Widget

Create an application that allows users to leave feedback about a café. There
are three rating options: good, neutral, and bad. The user selects one of the
options and sees the statistics.

Review the demo video of the application.

Components

This is your first application, so the interface has already been divided into
components and ready-made HTML markup and styles are provided. Your task is to
focus on the logic in React and TypeScript: assemble the interface, implement
the functionality, and add proper typing.

Styles for all components are already created. Copy them from this repository:
https://github.com/goitacademy/react-cafe-styles

After creating your components, copy the corresponding .module.css files into
the appropriate folders in src/components.

Parts of the interface that belong to individual components are highlighted with
borders of the corresponding color. All components are rendered inside the App
component.

Step 1. App Component

The App component is a container for the rest of the components and initially
renders the following markup:

<div className={css.app}></div>

Step 2. CafeInfo Component

Create a component with the café name and a short description. It should render
the following markup:

<div className={css.container}>
  <h1 className={css.title}>Sip Happens Café</h1>
  <p className={css.description}>
    Please rate our service by selecting one of the options below.
  </p>
</div>

Add it to App. After this step, the application interface should look like this:

Step 3. Application State

Continue implementing the voting functionality and handling user feedback.

When clicking one of the buttons ("Good", "Neutral", "Bad") in the VoteOptions
component, you need to store the user’s choice and pass it to other components,
in particular to the one responsible for displaying statistics — <VoteStats />.
For this, we need state.

Create a votes state in App that will store the number of votes. It should be an
object with the following properties:

{ good: 0, neutral: 0, bad: 0 }

Type this state using an interface Votes, which should be declared and exported
in the file src/types/votes.ts. In the same file, create a type VoteType — a
union of allowed string values 'good' | 'neutral' | 'bad'.

Add functions to App for working with the state:

handleVote(type) — updates the votes state. Use the VoteType type to type its
parameter.

resetVotes() — resets the state.

Thus, votes will be the central source of voting data, and all related
components will be able to receive up-to-date values via props.

Step 4. VoteOptions Component

Next, create the VoteOptions component. This component is responsible for
rendering the voting buttons (Good, Neutral, Bad) and the Reset button for
clearing the results. It should render the following markup:

<div className={css.container}>
  <button className={css.button}>Good</button>
  <button className={css.button}>Neutral</button>
  <button className={css.button}>Bad</button>
  <button className={`${css.button} ${css.reset}`}>Reset</button>
</div>

The component should accept three props:

onVote — a function that is called when one of the voting buttons is clicked;

onReset — a function that is called when the Reset button is clicked and is
responsible for resetting the votes;

canReset — a boolean value that determines whether the Reset button should be
shown (at this stage, you can simply pass true).

In the component file, declare an interface VoteOptionsProps that describes the
types of the component props.

At this stage, the buttons should work by updating the state in App.

Step 5. VoteStats Component

Create the VoteStats component, which will display the voting statistics. It
should render the following markup:

<div className={styles.container}>
  <p className={styles.stat}>Good: <strong>0</strong></p>
  <p className={styles.stat}>Neutral: <strong>0</strong></p>
  <p className={styles.stat}>Bad: <strong>0</strong></p>
  <p className={styles.stat}>Total: <strong>0</strong></p>
  <p className={styles.stat}>Positive: <strong>0%</strong></p>
</div>

To allow VoteStats to dynamically display statistics collected from button
clicks, it should accept three props:

votes — an object containing the number of votes for each category: good,
neutral, bad;

totalVotes — the total number of votes (for now, you can pass 0);

positiveRate — the percentage of positive votes (also pass 0 for now).

In the component file, declare an interface VoteStatsProps that describes the
types of the component props.

After this step, the application interface should look and work as follows —
clicking the buttons in VoteOptions updates the data displayed in VoteStats.

Step 6. Statistics Calculation

Since the application state is stored in the App component, all calculations
related to the state should also be performed in App, and the already calculated
values should be passed to the VoteStats component via props.

Add calculations in the App component for the total number of collected votes
across all categories and the percentage of positive feedback.

The total number of votes is simply the sum of the state values:

totalVotes = good + neutral + bad

To calculate the percentage of positive feedback, you can use the following
expression:

positiveRate = totalVotes ? Math.round((votes.good / totalVotes) \* 100) : 0

Note that you do not need to create separate state properties for totalVotes and
positiveRate, as these values can be easily derived from the existing state.

After this step, the application interface should look like this:

Step 7. Notification Component

Create a Notification component that displays a message indicating that there is
no feedback yet. It should render the following markup:

<p className={css.message}>No feedback yet</p>

This component does not accept any props.

Implement conditional rendering based on the value of totalVotes. The VoteStats
component should be rendered only after at least one vote has been received.
Therefore:

If totalVotes is greater than 0, render the VoteStats component.

If there are no votes (totalVotes equals 0), render the Notification component.

After this step, the application interface should look like this:

Step 8. Conditional Reset Button

Make the Reset button appear only when there is at least one vote. To do this,
use the totalVotes variable in the App component and pass the canReset prop to
the VoteOptions component with a value that indicates whether the Reset button
should be displayed.
