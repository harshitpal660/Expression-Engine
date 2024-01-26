// this is a food comonent which we will feed to our alien
// import food from "../Images/food.png"
import food from "../Images/food2.png"
export const Food =({height,width})=>{
    const innerdivStyleFood = {
        width: "100px", 
        height: "100px",
        top: height+"px", // Random position
        left: width+"px", // Random position
    };
    return(
        <div className="overflow-hidden position-absolute" id="food" style={innerdivStyleFood}>
            <img src={food} className="h-100 w-100"></img>
        </div>
    )
}