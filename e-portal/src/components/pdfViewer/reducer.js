const pdfViewerReducerState = {
  openPDFModal: false
}

const pdfViewerReducer = (state = pdfViewerReducerState, action) => {
  if (action.type === 'close') {
    return {
      ...state,
      openPDFModal: !state.openPDFModal
    }
  }
  if (action.type === 'open') {
    console.log("-----------------------------------------");
    return {
      ...state,
      openPDFModal: !state.openPDFModal
    }
  }

  return state;
}

export default pdfViewerReducer;