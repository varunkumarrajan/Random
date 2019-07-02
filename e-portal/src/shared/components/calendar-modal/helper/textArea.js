import React from 'react';

const TextArea = props => {
  const {
    name,
    value,
    onChangeHandle,
    className,
    errorMessage,
    placeHolder,
    rows,
    style,
    isFocus
  } = props;
  let textArea = React.createRef();
  
  function setFocusTextArea() {
    textArea.current.focus();
  }
  if (isFocus) {
    setTimeout(()=> {
      setFocusTextArea()
    });
  }
  // setTimeout(handleClick, 1)
  return (
    <div className="form-group">
      <textarea
        name={name}
        onChange={onChangeHandle}
        className={className}
        id="exampleFormControlTextarea2"
        placeholder={placeHolder}
        rows={rows ? rows : '3'}
        style={style ? style : {}}
        ref={textArea}
      >
        
      </textarea>

      <div className="c-error">{errorMessage}</div>
    </div>
  );
};

export default TextArea;
