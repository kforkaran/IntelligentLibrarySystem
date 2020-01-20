import React from 'react';
import { withStyles } from '@material-ui/styles';
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

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

//------------------------COMPONENT-----------------------------

const styles = theme => ({
    root: {
      marginTop: '3.5rem',
      marginBottom: '20vh',
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: '1rem',
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  });

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      listening: false
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen() {
    console.log('listening?', this.state.listening)

    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log("...continue listening...")
        recognition.start()
      }

    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log("Stopped listening per click")
      }
    }

    recognition.onstart = () => {
      console.log("Listening!")
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript
    //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)

      if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
          console.log('Final text is: ' + finalText);
        }
      }
    }
    
  //-----------------------------------------------------------------------
    
    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error)
    }

  }

  render() {
    const {classes} = this.props;
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
      <IconButton id="message microphone-btn" onClick={this.toggleListen} color="primary" className={classes.iconButton} aria-label="directions">
        <MicIcon />
      </IconButton>
      <div id='interim'></div>
      <div id='final'></div>
    </Paper>
  );
  }
}

export default withStyles(styles)(SearchBar);
