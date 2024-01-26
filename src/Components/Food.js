// this is a food comonent which we will feed to our alien
// import food from "../Images/food.png"
import food from "../Images/food.png"
export const Food =({h,w})=>{
    console.log(h);
    const innerdivStyleFood = {
        width: "100px", 
        height: "100px",
        top: h+"px", 
        left: w+"px", 
    };
    return(
        <div className="overflow-hidden position-absolute" id="food" style={innerdivStyleFood}>
            <img src={food} className="h-100 w-100"></img>
        </div>
    )
}