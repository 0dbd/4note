import React, { useState } from "react";
import MarkdownView from '../mkview/MarkdownView'

const remote = window.require('electron').remote;
const eapp = remote.app;
const fs = remote.require('fs');
const path = window.require('path');
// const path = remote.app;

const open_path = "/Users/duongbaoduy/Documents/Workspace/me/MyWork/4note/frontend/desktop-gui"

export const TesterView = () => {
    const app_path = eapp.getAppPath();
    const [fileContent, setFileContent] = useState("");
    fs.readFile(path.join(app_path, "test_data", "guide.md"), 'utf-8', function (err, data) {
        setFileContent(data);
    });
    return (
        <div className="test-app" >
            Hello tester
            <div>
                {app_path}
            </div>
            <div>
                {fileContent}
            </div>
            <MarkdownView data={fileContent}></MarkdownView>
        </div>
    )
};

const TesterApp = () => {
    return (
        <TesterView />
    )
};
export default TesterApp;