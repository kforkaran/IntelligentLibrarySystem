import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
// import VoiceAssist from '../../public/assets/voice_assist';
// import Artyom from 'artyom.js';

// const artyom = new Artyom();

// var UserDictation = artyom.newDictation({
//   continuous:true, // Enable continuous if HTTPS connection
//   onResult:function(text){
//       // Do something with the text
//       console.log(text);
//   },
//   onStart:function(){
//       console.log("Dictation started by the user");
//   },
//   onEnd:function(){
//       alert("Dictation stopped by the user");
//   }
// });

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '3.5rem',
    marginBottom: '20vh',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

var grammar = '#JSGF V1.0;'
 
var speechRecognitionList = new SpeechGrammarList();
var recognition = new SpeechRecognition();
recognition.grammars = speechRecognitionList;
speechRecognitionList.addFromString(grammar, 1);
recognition.interimResults = false;
recognition.lang = 'en-US';

const handleChange = (e) => {
  // e.preventDefault();
  // UserDictation.start();
  // setTimeout(UserDictation.stop(),2000);
 
 
  recognition.start();
        
 
        recognition.onresult = function(event) {
            var last = event.results.length - 1;
            var command = event.results[last][0].transcript;
            // message.textContent = 'Voice Input: ' + command + '.';  
            console.log(command);
            console.log('voice recognize');
        };
 
        recognition.onspeechend = function() {
            recognition.stop();
        };
 
        recognition.onerror = function(event) {
            // message.textContent = 'Error occurred in recognition: ' + event.error;
            console.log('Error in recognition');
        }        
 
}

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter Input"
        inputProps={{ 'aria-label': 'enter input' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton id="message" onClick={handleChange} color="primary" className={classes.iconButton} aria-label="directions">
        <MicIcon />
      </IconButton>
    </Paper>
  );
}
