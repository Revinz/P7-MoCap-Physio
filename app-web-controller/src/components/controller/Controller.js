import React from "react";
import "./controller.css";
import { IncreaseReps, IncreaseSets, SetExercise } from "../../ExerciseFacade";

export default class Controller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeExercise: "squat",
      testType: 0,
    };
  }

  componentDidMount() {
    console.log("Sending Message to app");
  }

  changeExercise(exercise) {
    this.setState({ activeExercise: exercise });
    SetExercise(exercise);
    console.log("Changed exercise to: ", exercise);
  }

  changeTestType(testID) {
    this.setState({ testType: testID });
    console.log(testID);
  }

  isExerciseActive(exercise) {
    return this.state.activeExercise == exercise ? "active" : "not_active";
  }

  render() {
    return (
      <div id="controller-grid">
        <div id="controller">
          <div className="section">
            <div className="section-header"></div>
            <div className="section-content">
              <h1> (Virtual) User Test Setup Page</h1>
              <p>
                Remember:
                <ul>
                  <li>
                    Start the server with 'node server.js' from the
                    'NotificationServer' folder
                  </li>
                  <li>Be sure to give the participants unique IDs.</li>
                </ul>
              </p>
            </div>
          </div>
          <div className="section">
            <div className="section-header rotated">
              <h1 className="sectionA">ID</h1>
            </div>
            <div className="section-content" id="participant-info">
              <div className="column">
                <label>Add the participant's unique ID below:</label>
                <input placeholder="Unique ID" type="text" />
              </div>
              <div className="column">
                <label>Condition</label>
                <select
                  value={this.state.testType}
                  onChange={(e) => this.changeTestType(e.target.value)}
                >
                  <option value={0}>No Audio</option>
                  <option value={1}>All Audio</option>
                  <option value={2}>Important Audio Only</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="section">
            <div className="section-header rotated">
              <h1>Setup Area</h1>
            </div>
            <div className="section-content" id="exercises">
              <h2>TYPE OF EXERCISE:</h2>
              <p className="description">Choose from the section below</p>
              <div className="horizontal-list">
                <button
                  className={"button " + this.isExerciseActive("squat")}
                  onClick={() => this.changeExercise("squat")}
                >
                  Squat
                </button>
                <button
                  className={
                    "button " + this.isExerciseActive("single_leg_deadlift")
                  }
                  onClick={() => this.changeExercise("single_leg_deadlift")}
                >
                  Single Leg Deadlift
                </button>
                <button
                  className={"button " + this.isExerciseActive("step_ups")}
                  onClick={() => this.changeExercise("step_ups")}
                >
                  Step Ups
                </button>
                <button
                  className={"button " + this.isExerciseActive("lunges")}
                  onClick={() => this.changeExercise("lunges")}
                >
                  Lunges
                </button>
                <button
                  className={
                    "button " + this.isExerciseActive("standing_hip_abduction")
                  }
                  onClick={() => this.changeExercise("standing_hip_abduction")}
                >
                  Standing hip abduction
                </button>
              </div>
            </div>
          </div>
          <hr className="divider" />
          <div className="section">
            <div className="section-header rotated">
              <h1 className="sectionC">Feedback</h1>
            </div>
            <div className="section-content" id="feedback">
              <div className="column_large">
                <p className="bold">Instructions</p>
                <p>
                  Press "+" button after each repetiton in order to record the
                  set progressing and to give audio feedback.
                </p>

                <p>
                  Mistakes are exceptions for the set count and button is
                  disabled for 2 seconds when that audio is played.
                </p>
                <p>When the increment reaches 10, a new set is started.</p>
                <p>
                  Sets already done is a non-interactive element. Its only
                  purpose is to display the number of sets.
                </p>
              </div>
              <p className="spacer_column"></p>
              <div className="column right-divider">
                <label className="bold">SETS ALREADY DONE</label>
                <label>Non-interactive element. Status.</label>
                <p className="counter">0</p>
              </div>
              <div className="column ">
                <label className="bold">REPETITONS in CURRENT SET</label>
                <label>
                  Increase number or count as mistake. Clicking the mistake
                  button will disable the + button for 1.25s.
                </label>
                <div id="repCounter">
                  <button className="mistake_btn">Mistake</button>
                  <p className="counter no_right_border">0</p>
                  <button className="button_small">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
