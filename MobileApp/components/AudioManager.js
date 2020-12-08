import React from "react";
import { Text, View } from "react-native";
import { Exercise } from "./exercise.js";

export default class AudioManager {//extends React.Component<props> {

  
  
  constructor() {
    console.log("AudioManager");
    //var Sound = require('react-native-sound');
    //Sound.setCategory('Playback'); // Enable playback in silence mode
    //setupAudio();
    // try {
    //   console.log("Loading audio")
    //   audio_didWrongTryAgain = new Sound('voice_1_1_did_wrong_try_again.mp3', Sound.MAIN_BUNDLE);
    //   audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp3', Sound.MAIN_BUNDLE);
    //   audio_1stDone = new Sound('voice_2_2_first_repetition_done', Sound.MAIN_BUNDLE);
    //   audio_halfwayDoneSet = new Sound('voice_2_3_you_are_halfway_done_with_this_set.mp3', Sound.MAIN_BUNDLE);
    //   audio_lastRep = new Sound('voice_2_4_last_repetition.mp3', Sound.MAIN_BUNDLE);
    //   audio_setDone1setRemaining = new Sound('voice_2_5_set_done_you_have_one_set_of_this_exercise_remaining.mp3', Sound.MAIN_BUNDLE);
    //   audio_2nd = new Sound('voice_3_3_second.mp3', Sound.MAIN_BUNDLE);
    //   audio_3rd = new Sound('voice_3_4_third.mp3', Sound.MAIN_BUNDLE);
    //   audio_4th = new Sound('voice_3_5_fourth.mp3', Sound.MAIN_BUNDLE);
    //   audio_halfwayDone = new Sound('voice_3_6a_halfway_done.mp3', Sound.MAIN_BUNDLE);
    //   audio_5th = new Sound('voice_3_6b_fifth.mp3', Sound.MAIN_BUNDLE);
    //   audio_6th = new Sound('voice_3_7_sixth.mp3', Sound.MAIN_BUNDLE);
    //   audio_7th = new Sound('voice_3_8_seventh.mp3', Sound.MAIN_BUNDLE);
    //   audio_8th = new Sound('voice_3_9_eighth.mp3', Sound.MAIN_BUNDLE);
    //   audio_9th = new Sound('voice_3_10_ninth.mp3', Sound.MAIN_BUNDLE);
    //   audio_1SetRemaining = new Sound('voice_3_11_one_set_remaining_and_two_other_exercises_left.mp3', Sound.MAIN_BUNDLE);
    // } catch (error) {
    //   console.log("Error loading audio: ", error)
    // }
  }
  

  /* constructor(props) {
    super(props);
    
    console.log("ExerciseCounter");
  } */

   /* static setupAudio() {
     
    //------------------------------------------------------------------------------------------------------------
    // AUDIO
    
    // https://www.npmjs.com/package/react-native-sound
    // Save your sound clip files under the directory android/app/src/main/res/raw
    // Note that files in this directory must be lowercase, underscored and begin with a letter (e.g. my_file_name.mp3) and that subdirectories are not supported by Android.

    try {
      audio_didWrongTryAgain = new Sound('voice_1_1_did_wrong_try_again.mp3', Sound.MAIN_BUNDLE);
      audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp3', Sound.MAIN_BUNDLE);
      audio_1stDone = new Sound('voice_2_2_first_repetition_done', Sound.MAIN_BUNDLE);
      audio_halfwayDoneSet = new Sound('voice_2_3_you_are_halfway_done_with_this_set.mp3', Sound.MAIN_BUNDLE);
      audio_lastRep = new Sound('voice_2_4_last_repetition.mp3', Sound.MAIN_BUNDLE);
      audio_setDone1setRemaining = new Sound('voice_2_5_set_done_you_have_one_set_of_this_exercise_remaining.mp3', Sound.MAIN_BUNDLE);
      audio_2nd = new Sound('voice_3_3_second.mp3', Sound.MAIN_BUNDLE);
      audio_3rd = new Sound('voice_3_4_third.mp3', Sound.MAIN_BUNDLE);
      audio_4th = new Sound('voice_3_5_fourth.mp3', Sound.MAIN_BUNDLE);
      audio_halfwayDone = new Sound('voice_3_6a_halfway_done.mp3', Sound.MAIN_BUNDLE);
      audio_5th = new Sound('voice_3_6b_fifth.mp3', Sound.MAIN_BUNDLE);
      audio_6th = new Sound('voice_3_7_sixth.mp3', Sound.MAIN_BUNDLE);
      audio_7th = new Sound('voice_3_8_seventh.mp3', Sound.MAIN_BUNDLE);
      audio_8th = new Sound('voice_3_9_eighth.mp3', Sound.MAIN_BUNDLE);
      audio_9th = new Sound('voice_3_10_ninth.mp3', Sound.MAIN_BUNDLE);
      audio_1SetRemaining = new Sound('voice_3_11_one_set_remaining_and_two_other_exercises_left.mp3', Sound.MAIN_BUNDLE);
    } catch (error) {
      console.log("Error loading audio: ", error)
    }
    //------------------------------------------------------------------------------------------------------------

  } */
  
  // We have to load the audio just before playing them
  // Loading them all at startup does not work for this many files for some reason

  static playMistakeAudio() {
    var Sound = require('react-native-sound');
    Sound.setCategory('Playback'); // Enable playback in silence mode
    console.log("Playing mistake audio");

    var audio_mistake = new Sound('voice_1_1_did_wrong_try_again.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }           
      // Play the sound with an onEnd callback
      audio_mistake.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }
  static playSetFeedback(currentSet) {

    var Sound = require('react-native-sound');
    Sound.setCategory('Playback'); // Enable playback in silence mode
    console.log("Giving set feedback for set", currentSet);

    switch(currentSet) {
      case 0:
        var audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }           
          // Play the sound with an onEnd callback
          audio_pleaseBegin.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
        break;
      case 1:
        var audio_1stSetDone = new Sound('voice_!_!_!!!!!.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }           
          // Play the sound with an onEnd callback
          audio_1stSetDone.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
        break;
      case 2:
        var audio_2ndSetDone = new Sound('voice_!_!_!!!!!.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }           
          // Play the sound with an onEnd callback
          audio_2ndSetDone.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
        break;
    }
  }

  static playRepFeedback(currentRep, feedbackType) {
    var Sound = require('react-native-sound');
    Sound.setCategory('Playback'); // Enable playback in silence mode
    console.log("Giving audio feedback for rep", currentRep , "feedbacktype", feedbackType);
    
    switch(feedbackType) {

      // No feedback
      case "0": 
        console.log("Giving no feedback");
        // Do nothing
        break;

      // Minimal feedback
      case "1": 
        console.log("Giving minimal feedback");
        switch(currentRep) {
          case 0:
            var audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_pleaseBegin.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 1:
            var audio_1stDone = new Sound('voice_2_2_first_repetition_done', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_1stDone.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 5:
            var audio_halfwayDone = new Sound('voice_3_6a_halfway_done.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_halfwayDone.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 10:
            var audio_setDone = new Sound('voice_completed_set_of_this_exercise.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_setDone.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          default:
            console.log("Gave no audio feedback for rep", currentRep, "probably because of feedback type", feedbackType)
            break;
        }
        break;

      // Full feedback
      case "2": 
        console.log("Giving full feedback");
        switch(currentRep) {
          case 0:
            var audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_pleaseBegin.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 1:
            var audio_1stDone = new Sound('voice_2_2_first_repetition_done', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_1stDone.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 2:
            var audio_2nd = new Sound('voice_3_3_second.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_2nd.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 3:
            var audio_3rd = new Sound('voice_3_4_third.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_3rd.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 4:
            var audio_4th = new Sound('voice_3_5_fourth.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_4th.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 5:
            var audio_5th = new Sound('voice_3_6b_fifth.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_5th.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 6:
            var audio_6th = new Sound('voice_3_7_sixth.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_6th.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 7:
            var audio_7th = new Sound('voice_3_8_seventh.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_7th.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 8:
            var audio_8th = new Sound('voice_3_9_eighth.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_8th.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;  
          case 9:
            var audio_9th = new Sound('voice_3_10_ninth.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_9th.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          case 10:
            var audio_setDone = new Sound('voice_completed_set_of_this_exercise.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }           
              // Play the sound with an onEnd callback
              audio_setDone.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });
            break;
          default:
            console.log("Error in determining audio feedback for rep", currentRep)
            break;
        }
        break;
      default:
        console.log("Couldn't determine feedback type", feedbackType)
        break;
    }
  }
  
  render() {
    return <View></View>;
  }
}
