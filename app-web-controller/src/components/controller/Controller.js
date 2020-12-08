import React from "react";
import "./controller.css";
import {
  IncreaseReps,
  IncreaseSets,
  SetExercise,
  SendMistake,
} from "../../ExerciseFacade";

const MAX_REPS_PER_SET = 10;
export default class Controller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      testType: 0,
      activeExercise: "squat",
      exercises: {
        squat: { reps: 0, sets: 0 },
        single_leg_deadlift: { reps: 0, sets: 0 },
        step_ups: { reps: 0, sets: 0 },
        lunges: { reps: 0, sets: 0 },
        standing_hip_abduction: { reps: 0, sets: 0 },
      },
    };
  }

  componentDidMount() {
    console.log("Sending Message to app");
  }

  changeExercise(exercise) {
    SetExercise(exercise, this.state.uid, this.state.testType).then(
      (statusCode) => {
        if (statusCode === 200) {
          this.setState({ activeExercise: exercise });
          console.log("Changed exercise to: ", exercise);
        } else {
          alert(
            "Failed to set exercise to: " +
              exercise.replaceAll("_", " ").toUpperCase()
          );
        }
      }
    );
  }

  changeTestType(testID) {
    this.setState({ testType: testID });
    console.log(testID);
  }

  IncreaseRep(exercise) {
    IncreaseReps(this.state.uid, this.state.testType).then((statusCode) => {
      if (statusCode != 200) {
        alert("Failed to increase reps for the participant.");
        return;
      }

      let tmpExercises = this.state.exercises;
      console.log(tmpExercises);
      tmpExercises[exercise].reps++;

      //Increase sets if hit max reps per set.
      if (tmpExercises[exercise].reps >= MAX_REPS_PER_SET) {
        tmpExercises[exercise].sets++;
        tmpExercises[exercise].reps = 0;
      }

      this.setState(tmpExercises);
    });
  }

  onMistakeClicked() {
    SendMistake(this.state.uid, this.state.testType).then((statusCode) => {
      if (statusCode != 200) {
        alert("Failed to send mistake notification to user.");
      }
    });
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
              <p>Remember:</p>
              <ul>
                <li>Be sure to give the participants unique IDs.</li>
                <li>
                  APK Download link:{" "}
                  <a href="https://drive.google.com/file/d/1s4c7g9QIX2NkGo6xxdac9WZSdHpva4JW/view?usp=sharing">
                    https://drive.google.com/file/d/1s4c7g9QIX2NkGo6xxdac9WZSdHpva4JW/view?usp=sharing
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="section">
            <div className="section-header rotated">
              <h1 className="sectionA">ID</h1>
            </div>
            <div className="section-content" id="participant-info">
              <div className="column">
                <label>Add the participant's unique ID below:</label>
                <input
                  onChange={(e) => this.setState({ uid: e.target.value })}
                  placeholder="Unique ID"
                  type="text"
                />
              </div>
              <div className="column">
                <label>Condition</label>
                <select
                  value={this.state.testType}
                  onChange={(e) => this.changeTestType(e.target.value)}
                >
                  <option value={0}>No Audio Feedback</option>
                  <option value={1}>Minimal Audio Feedback</option>
                  <option value={2}>All Audio Feedback</option>
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
                <p className="counter">
                  {this.state.exercises[this.state.activeExercise].sets}
                </p>
              </div>
              <div className="column ">
                <label className="bold">REPETITIONS IN CURRENT SET</label>
                <label>
                  Press "Mistake" if it looks like the user has done a deviation
                  from the usual movement. Press "Plus" to record each
                  repetition. (Mistakes are not repetitions)
                </label>
                <div id="repCounter">
                  <button
                    className="mistake_btn"
                    onClick={() => this.onMistakeClicked()}
                  >
                    Mistake
                  </button>
                  <p className="counter no_right_border">
                    {this.state.exercises[this.state.activeExercise].reps}
                  </p>
                  <button
                    className="button_small"
                    onClick={() => this.IncreaseRep(this.state.activeExercise)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
