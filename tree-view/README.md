# Simple-React-Tree-View
simple-react-tree-view is light weight react tree view plugin to help create a nested tree

## Installation
Use the package manager npm to install 
```bash
npm i react-simple-js-tree-view
```

## Usage

```javascript
import TreeView from 'simple-js-tree-view';

const treeData = {
    {
        name: '1',
        children: [],
    },
    {
        name: '2',
        children: [
            {
                name: '2.1',
                children: [
                    {
                        name:'2.1.1',
                        children:[
                            {
                                name:'2.1.1.1',
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
        name: '3',
        children: [],
    }
} 

<TreeView  treeData={treeData}/>
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[ISC](https://www.isc.org/licenses/)