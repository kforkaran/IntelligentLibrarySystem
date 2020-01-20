import React, { Component } from "react";
// import logo from './logo.svg';
// import './App.css';
import bwipjs from "bwip-js";
import ReactToPrint from "react-to-print";

class BarcodeCanvases extends Component {
  state = {
    bookIds: [
      "14646465464",
      "51464564614",
      "231645566160",
      "231645566160"
    ]
  };

  componentDidMount() {
    try {
      // The return value is the canvas element
      for (let i in this.state.bookIds) {
        bwipjs.toCanvas("mycanvas" + i, {
          bcid: "code128", // Barcode type
          text: this.state.bookIds[i], // Text to encode
          scale: 2, // 3x scaling factor
          height: 8, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center" // Always good to set this
        });
      }
    } catch (e) {
      // `e` may be a string or Error object
    }
  }

  render() {
    let canvases = [];
    for (let i in this.state.bookIds) {
      canvases.push(
        <canvas key={i} id={"mycanvas" + i} className="barcodeCanvas"></canvas>
      );
    }

    return <div className="App">{canvases}</div>;
  }
}

class Barcode extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <ReactToPrint
          trigger={() => <button>Print Barcodes</button>}
          content={() => this.componentRef}
        />
        <BarcodeCanvases ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}
export default Barcode;
