var jsTree = (function(){
    var instance;

    function Init(){
        function getElement(id){
            if(!id)
            throw new Error('Id is not present on Dom or not a valid Id');
            
            var element = document.getElementById(id);
            if(!element)
            throw new Error('Element Not found');
            
            return element;
        }
        function checkId(obj){
            if(!obj.hasOwnProperty('id')){
                throw new Error('Id is not present on the defined object');
            }else if(obj.id === undefined){
                throw new Error('Id is not empty');
            }
            return obj.id;
        }        
        /* function getTargetNode(event){
            let target = event.target,
            element = document.getElementById('children_'+target.id);
            if(target.nodeName === 'I' && target.id){
                if(element.classList){					
                    element.classList.toggle('parent-open');
                } else {
                    var classes = element.className.split(' ');
                    var i = classes.indexOf('parent-open');
    
                    if (i >= 0) 
                        classes.splice(i, 1);
                    else 
                        classes.push('parent-open');
                        element.className = classes.join(' '); 
                }					
                // document.getElementById('children_'+event.target.id).classList.add('parent-open');
            }
        } */
    
        function generateTree(tree,id){
            treeNode = '';
            if(tree.length === 0)
            return false;
    
            tree.map((item,index) => {
                const len = item.children.length;
                let nodeId = (id)? id+'_'+index : index;
                treeNode += '<li id="'+nodeId+'">';
                if(len){				
                    /* treeNode += '<i id="'+nodeId+'" class="fa fa-caret-right"></i>'; */
                    treeNode += item.text;
                    treeNode += '<ul class="parent" id="children_'+nodeId+'">'+generateTree(item.children,nodeId)+'</ul>';						
                }else{
                    treeNode += item.text;
                }
                treeNode += '</li>';
            });
            return treeNode;
        }
        
        function createTree(obj){
            var id = checkId(obj);
            var element = getElement(id);
            element.innerHTML = '<ul>'+generateTree(obj.data)+'</ul>';
        }

        return {
            jsTree: function(obj) {
                createTree(obj)
            }
        }
    }

    return {
        init: function(){
            if(!instance)
            instance = new Init();

            return instance;
        }
    }    
})();