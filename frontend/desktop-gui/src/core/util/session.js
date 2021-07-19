import { ModeId, CursorOptions, Row, Col, Chars, SerializedBlock } from './types';
import Cursor from './cursor';
import EventEmitter from "./eventEmitter";
import Document from './document';
import Path from './path';
import * as Modes from './modes';

export default class Session extends EventEmitter {
    constructor() {
        super();

        // this.register = new Register(this);

        this.document = new Document();
        this.menu = null;

        this.viewRoot = Path.root();
        this.cursor = new Cursor(this, 0);
        this._anchor = null;

        // this.reset_history();
        // this.reset_jump_history();

        const mode = 'NORMAL';
        // NOTE: this is fire and forget
        // this.setMode(mode);
        this.mode = mode;
        this.line = "";
        return this;
    }

    async addCharsAtCursor(chars) {
        console.log("add char: ", chars)
        // await this.addChars(this.cursor.row, this.cursor.col, chars);
        this.line += chars[0]
    }

    async save() {

    }

    async startAnchor() {

    }

    async stopAnchor() {
    }

    async getVisualLineSelections() {
        return [null, null, null]

    }

    async nextVisible(path) {
        return new Path();
    }

    async prevVisible(path) {
        return new Path();
    }

    async lastVisible(path = this.viewRoot) {
        return new Promise();
    }
    async setMode(newmode) {
        if (newmode === this.mode) {
            return;
        }

        const oldmode = this.mode;
        if (oldmode) {
            await Modes.getMode(oldmode).exit(this, newmode);
        }

        this.mode = newmode;
        await Modes.getMode(this.mode).enter(this, oldmode);

        this.emit('modeChange', oldmode, newmode);
    }

    async showMessage(msg, ...options) {

    }

    async isVisble() {
        return true;
    }

}