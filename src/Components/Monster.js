// this is our freind who will guide us to the app
import monster from "../Images/monster.webp";
import { DialogBox } from "../Components/DialogBox";
export const Monster = ({text}) => {
    const innerdivStyle = {
        width: "20rem", //
        height: "20rem",
      };
  return (
    <div className="d-flex justify-content-center">
      <div className="w-100 overflow-hidden d-flex flex-row justify-content-center">
        <DialogBox text={text} />
        <div style={innerdivStyle}>
          <img src={monster} alt="Monster" className="h-100 w-100" />
        </div>
      </div>
    </div>
  );
};
