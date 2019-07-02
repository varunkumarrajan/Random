import dbFactory from '../../dbFactory';
import { CATEGORY } from './../../../constant/Constant';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const getCategoryFromDB = dispatch => {
  const db = dbFactory.create('firebase');
  db.firestore()
    .collection('category')
    .doc('0')
    .get()
    .then(function(doc) {
      if (doc.exists)
        dispatch({ type: CATEGORY.ACTIONS.GET, category: [doc.data()] });
    })
    .catch(err => {
      dispatch({ type: CATEGORY.ACTIONS.ERROR, err });
    });
};

export const manageCategoryFromDB = async (dispatch, tree, state) => {
  const db = dbFactory.create('firebase');
  const treeData = await manageTree(tree, state);
  db.firestore()
    .collection('category')
    .doc('0')
    .set(treeData[0])
    .then(() => {
      dispatch({ type: CATEGORY.ACTIONS.MANAGE, category: treeData });
    })
    .catch(err => {
      dispatch({ type: CATEGORY.ACTIONS.ERROR, err });
    });
};

const manageTree = async (tree, state) => {
  if (state.selectedNodeIndex.length === 1) {
    tree[0].items.push({
      text: state[state.categoryType.toLowerCase()],
      items: []
    });
    return tree;
  }
  await manageNestedTree(tree, state);
  return tree;
};

const manageNestedTree = (tree, state) => {
  let clonedTree = tree;
  const itemHierarchicalIndex = splitItem(state.selectedNodeIndex, '_'),
    len = itemHierarchicalIndex.length;
  itemHierarchicalIndex.forEach((item, index) => {
    if (
      index === len - 1 &&
      (state.categoryType === CATEGORY.TYPE.EDIT ||
        state.categoryType === CATEGORY.TYPE.DELETE)
    ) {
      if (state.categoryType === CATEGORY.TYPE.EDIT) {
        clonedTree = clonedTree[item];
        clonedTree.text = state[state.categoryType.toLowerCase()];
      } else if (state.categoryType === CATEGORY.TYPE.DELETE) {
        clonedTree.splice(item, 1);
      }
    } else {
      clonedTree = clonedTree[item].items;
    }
  });
  if (state.categoryType === CATEGORY.TYPE.ADD) {
    clonedTree.push({
      text: state[state.categoryType.toLowerCase()],
      items: []
    });
  }
  return tree;
};

const splitItem = (item, seprator) => {
  return item.split(seprator);
};

export const getAllCategory = () => {
  return getDbRef('subject');
};
