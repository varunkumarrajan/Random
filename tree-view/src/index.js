import React from 'react';
import { render } from "react-dom";
import TreeView from "./treeview";
const treeData = [
    {
        name: '1',
        children: [],
    },
    {
        name: '2',
        children: [
            {
                name: '2.1',
                children: [{name:'2.1.1',children:[{name:'2.1.1.1',children:[]}]}],
            }
        ],
    },
    {
        id: 4,
        name: '3',
        children: [],
    }
];
const App = () => (
    <TreeView  treeData={treeData}/>
);

render(<App />, document.getElementById("root"));