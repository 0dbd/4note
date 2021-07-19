import React, { useEffect, useRef, useState } from "react";
import KeyEmitter from '../../core/util/keyEmitter';
import KeyHandler from '../../core/util/keyHandler';
import Session from "../../core/util/session";
import "./mkview.scss";
import config from "../../core/util/vim";
import keyDefinitions from "../../core/util/keyDefinitions";
import KeyBindings from "../../core/util/keyBindings";
import { set } from "lodash";

function insertNodeAtCursor(node) {
    // https://stackoverflow.com/questions/2213376/how-to-find-cursor-position-in-a-contenteditable-div/2213514#2213514
    var range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
        range = window.getSelection().getRangeAt(0);
        range.insertNode(node);
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        html = (node.nodeType == 3) ? node.data : node.outerHTML;
        range.pasteHTML(html);
    }
}

const Line = ({ }) => {
    const cursorBetweenDiv = (i) => {
        return (
            <div key={`insert-cursor-${i}`}
                className='cursor blink-background'
                style={{
                    display: 'inline-block',
                    height: '1.2em', width: 2, marginLeft: -1, marginRight: -1,
                    ...this.props.cursorStyle,
                }}>
                {' '}
            </div>
        );
    };

    return (
        <div>

        </div>
    )
}

function setup() {
    const mappings = config.defaultMappings;
    const session = new Session()
    // const mappings = KeyMappings.merge(config.defaultMappings, new KeyMappings(saved_mappings));
    const keyBindings = new KeyBindings(keyDefinitions, mappings);
    const keyEmitter = new KeyEmitter();
    const keyHandler = new KeyHandler(session, keyBindings);
    keyEmitter.listen();
    keyEmitter.on('keydown', (key) => {
        keyHandler.queueKey(key);
        // NOTE: this is just a best guess... e.g. the mode could be wrong
        // problem is that we process asynchronously, but need to return synchronously
        // return keyBindings.bindings[session.mode].getKey(key) != null || (session.mode === 'INSERT' && key === 'space');
        return true;
    });
    return {
        handler: keyHandler,
        session: session,
    }
}

const MarkdownView = ({ data }) => {
    let divTestRef = useRef();
    const [edited, setEdited] = useState();
    useEffect(() => {
        const h = setup();
        h.handler.on('handledKey', () => {
            // console.log("handle key press")
            setEdited(h.session.line)
        });

        divTestRef.current.focus();
        return () => { }
    }, [])
    return (
        <>
            <div className="container">
                {data.split("\n").map((e) => {
                    return (
                        <div className="line">{e}</div>
                    )
                })}
            </div>
            <div id="test" className="editor" contenteditable="true" ref={divTestRef}>{edited}</div>
        </>
    )
}

export default MarkdownView;