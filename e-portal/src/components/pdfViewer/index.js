import React, { Component } from 'react';
//import { Document, Page } from "react-pdf";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';

class PDFViewer extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  onOpenPDFModal = () => {
    console.log(this.props.openPDFModal, 'onOpenPDFModal');
    this.setState({ open: true });
  };

  onClosePDFModal = () => {
    this.setState({ open: false });
  };


  render() {
    const { modalState } = this.props;
    const { pageNumber, numPages } = this.state;
    console.log('this.openModal in class', modalState)
    return (

      <Modal open={modalState} onClose={this.props.closePDFModal} center>
        <div>
          <nav>
            <button onClick={this.goToPrevPage}>Prev</button>
            <button onClick={this.goToNextPage}>Next</button>
          </nav>

          <div style={{ width: '100vh'}}>
            <Document
              file="/Livingston- Invoice month of September 2018.pdf"
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} width={'100vh'} />
            </Document>
          </div>

          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
        </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    modalState: state.pdfViewer.openPDFModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closePDFModal: () => dispatch({ type: 'close' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PDFViewer);