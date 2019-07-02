# Simple-Js-Tree-View
simple-js-tree-view is light weight javascript tree view plugin to help create a nested tree

## Installation
Use the package manager npm to install 
```bash
npm i simple-js-tree-view
```

## Usage

```javascript
var jstree = require('simple-js-tree-view');

var treeData = {
    {
        text: '1',
        children: [],
    },
    {
        text: '2',
        children: [
            {
                text: '2.1',
                children: [
                    {
                        text:'2.1.1',
                        children:[
                            {
                                text:'2.1.1.1',
                                children:[]
                            }
                        ]
                    }
                ],
            }
        ],
    },
    {
        id: 4,
        text: '3',
        children: [],
    }
} 
var obj = {
    id: "root", // element id where to append tree
    data: treeData // tree data 
}
jstree.init().Jstree(obj);
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[ISC](https://www.isc.org/licenses/)