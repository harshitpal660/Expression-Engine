// This button will change the dialogs of our alien
export const NextButton = ({text,handleIncrement}) => {
  const buttonStyle = {
    width: "10rem",
    height: "10rem",
    cursor: "pointer" 
  };
  return (
    <>
      <div className="w-100 d-flex flex-row justify-content-center mt-5">
        <div className="rounded-pill  bg-success d-flex flex-column justify-content-center" onClick={handleIncrement} style={buttonStyle}>
            <div>
                {text}
            </div>  
            
        </div>
      </div>
    </>
  );
};
