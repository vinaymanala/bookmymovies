import { useState } from "react";
import SeatGridStyles from "../../ui/SeatGridStyles";
import { SelectedSeatProp } from "../../../utils/types";
import "./index.css";
import { useAppDispatch } from "../../../utils/hooks";
import { setSeatCount } from "./SeatGridSlice";
type SeatGridSectionProp = {
  img: string;
};

const SeatGridSection = ({ img }: SeatGridSectionProp) => {
  const dispatch = useAppDispatch();
  const [seatsSelected, setSeatsSelected] = useState<Array<SelectedSeatProp>>(
    []
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [seatSelection, setSeatSelection] = useState<number>(1);
  const selectionOfSeats = Array.from({ length: 10 }, (_, index) => index + 1);
  const handleModal = () => {
    dispatch(setSeatCount(seatSelection));
    setIsDialogOpen(false);
  };
  return (
    <div className={`booking__container ${isDialogOpen ? "dialog-open" : ""}`}>
      {isDialogOpen && (
        <dialog open className="booking__modal">
          <h2>How many seats?</h2>
          <ul className="booking__seatselection">
            {selectionOfSeats.map((noOfSeats) => (
              <button
                className="btn"
                onClick={() => setSeatSelection(noOfSeats)}
              >
                <h3>{noOfSeats}</h3>
              </button>
            ))}
          </ul>
          <button onClick={handleModal} className="btn booking__btn">
            Select Seats
          </button>
        </dialog>
      )}
      <SeatGridStyles
        image={img}
        setHandlerOnSeatSelect={setSeatsSelected}
        seatsSelected={seatsSelected}
      />
    </div>
  );
};

export default SeatGridSection;
