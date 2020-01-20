import React from 'react';

export default class ArtyomCommandsManager {
  constructor(ArtyomInstance) {
    this._artyom = ArtyomInstance;
  }

  loadCommands() {
    let Artyom = this._artyom;
    return Artyom.addComands
  }
}