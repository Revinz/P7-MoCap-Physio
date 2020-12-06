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
    //   audio_didWrongTryAgain = new Sound('voice_1_1_did_wrong_try_again.mp4', Sound.MAIN_BUNDLE);
    //   audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp4', Sound.MAIN_BUNDLE);
    //   audio_1stDone = new Sound('voice_2_2_first_repetition_done', Sound.MAIN_BUNDLE);
    //   audio_halfwayDoneSet = new Sound('voice_2_3_you_are_halfway_done_with_this_set.mp4', Sound.MAIN_BUNDLE);
    //   audio_lastRep = new Sound('voice_2_4_last_repetition.mp4', Sound.MAIN_BUNDLE);
    //   audio_setDone1setRemaining = new Sound('voice_2_5_set_done_you_have_one_set_of_this_exercise_remaining.mp4', Sound.MAIN_BUNDLE);
    //   audio_2nd = new Sound('voice_3_3_second.mp4', Sound.MAIN_BUNDLE);
    //   audio_3rd = new Sound('voice_3_4_third.mp4', Sound.MAIN_BUNDLE);
    //   audio_4th = new Sound('voice_3_5_fourth.mp4', Sound.MAIN_BUNDLE);
    //   audio_halfwayDone = new Sound('voice_3_6a_halfway_done.mp4', Sound.MAIN_BUNDLE);
    //   audio_5th = new Sound('voice_3_6b_fifth.mp4', Sound.MAIN_BUNDLE);
    //   audio_6th = new Sound('voice_3_7_sixth.mp4', Sound.MAIN_BUNDLE);
    //   audio_7th = new Sound('voice_3_8_seventh.mp4', Sound.MAIN_BUNDLE);
    //   audio_8th = new Sound('voice_3_9_eighth.mp4', Sound.MAIN_BUNDLE);
    //   audio_9th = new Sound('voice_3_10_ninth.mp4', Sound.MAIN_BUNDLE);
    //   audio_1SetRemaining = new Sound('voice_3_11_one_set_remaining_and_two_other_exercises_left.mp4', Sound.MAIN_BUNDLE);
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
      audio_didWrongTryAgain = new Sound('voice_1_1_did_wrong_try_again.mp4', Sound.MAIN_BUNDLE);
      audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp4', Sound.MAIN_BUNDLE);
      audio_1stDone = new Sound('voice_2_2_first_repetition_done', Sound.MAIN_BUNDLE);
      audio_halfwayDoneSet = new Sound('voice_2_3_you_are_halfway_done_with_this_set.mp4', Sound.MAIN_BUNDLE);
      audio_lastRep = new Sound('voice_2_4_last_repetition.mp4', Sound.MAIN_BUNDLE);
      audio_setDone1setRemaining = new Sound('voice_2_5_set_done_you_have_one_set_of_this_exercise_remaining.mp4', Sound.MAIN_BUNDLE);
      audio_2nd = new Sound('voice_3_3_second.mp4', Sound.MAIN_BUNDLE);
      audio_3rd = new Sound('voice_3_4_third.mp4', Sound.MAIN_BUNDLE);
      audio_4th = new Sound('voice_3_5_fourth.mp4', Sound.MAIN_BUNDLE);
      audio_halfwayDone = new Sound('voice_3_6a_halfway_done.mp4', Sound.MAIN_BUNDLE);
      audio_5th = new Sound('voice_3_6b_fifth.mp4', Sound.MAIN_BUNDLE);
      audio_6th = new Sound('voice_3_7_sixth.mp4', Sound.MAIN_BUNDLE);
      audio_7th = new Sound('voice_3_8_seventh.mp4', Sound.MAIN_BUNDLE);
      audio_8th = new Sound('voice_3_9_eighth.mp4', Sound.MAIN_BUNDLE);
      audio_9th = new Sound('voice_3_10_ninth.mp4', Sound.MAIN_BUNDLE);
      audio_1SetRemaining = new Sound('voice_3_11_one_set_remaining_and_two_other_exercises_left.mp4', Sound.MAIN_BUNDLE);
    } catch (error) {
      console.log("Error loading audio: ", error)
    }
    //------------------------------------------------------------------------------------------------------------

  } */
  
  // We have to load the audio just before playing them
  // Loading them all at startup does not work for this many files for some reason

  static playAudioFeedback(exercise, currentRep) {
    var Sound = require('react-native-sound');
    Sound.setCategory('Playback'); // Enable playback in silence mode
    console.log("Giving audio feedback for exercise", exercise , "rep", currentRep)
    
    switch(currentRep) {
      case 0:
        var audio_pleaseBegin = new Sound('voice_2_1_please_begin.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_2nd = new Sound('voice_3_3_second.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_3rd = new Sound('voice_3_4_third.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_4th = new Sound('voice_3_5_fourth.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_5th = new Sound('voice_3_6b_fifth.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_6th = new Sound('voice_3_7_sixth.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_7th = new Sound('voice_3_8_seventh.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_8th = new Sound('voice_3_9_eighth.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        var audio_9th = new Sound('voice_3_10_ninth.mp4', Sound.MAIN_BUNDLE, (error) => {
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
        audio_9th = new Sound('voice_3_10_ninth.mp4', Sound.MAIN_BUNDLE);
        audio_9th.play();
        break;
      case 10:
        var audio_setDone1setRemaining = new Sound('voice_2_5_set_done_you_have_one_set_of_this_exercise_remaining.mp4', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }           
          // Play the sound with an onEnd callback
          audio_setDone1setRemaining.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
        audio_setDone1setRemaining = new Sound('voice_2_5_set_done_you_have_one_set_of_this_exercise_remaining.mp4', Sound.MAIN_BUNDLE);
        audio_setDone1setRemaining.play();
        break;
      default:
        console.log("Error in determining audio feedback for rep", currentRep)
    }
  }
  
  render() {
    return <View></View>;
  }
}
