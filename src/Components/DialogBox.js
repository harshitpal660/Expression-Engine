

// This is the dialogue box of alien
import Typewriter from "typewriter-effect";

export const DialogBox=({text})=>{
    return(
        <>
        {  console.log(text)}
        <div className="d-flex flex-column justify-content-center text-center text-wrap w-auto" style={{width: "auto"}}>
            <div className="bg-light rounded-top rounded-start">
            {/* <Typewriter
                      onInit={(Typewriter) => {
                        Typewriter.typeString(text)
                          .pauseFor(10)
                          .start();
                      }}
                    /> */}
                    {text}
            </div>
           
        </div>
        </>
    )
}