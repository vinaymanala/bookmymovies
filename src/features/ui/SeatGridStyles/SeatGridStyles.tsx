import React, { ChangeEvent, useEffect, useState } from "react";
import "./index.css";
import { SelectedSeatProp, SeatGridProp } from "../../../utils/types";
import { useAppSelector } from "../../../utils/hooks";
import { RootState } from "../../../utils";

type SeatGridStyleProp = {
  image: string | undefined;
  setHandlerOnSeatSelect: React.Dispatch<
    React.SetStateAction<Array<SelectedSeatProp>>
  >;
  seatsSelected: Array<SelectedSeatProp>;
};

type SeatsInfo = {
  info: SeatGridProp;
  setHandlerOnSeatSelect: React.Dispatch<
    React.SetStateAction<Array<SelectedSeatProp>>
  >;
  seatsSelected: Array<SelectedSeatProp>;
  totalSeats: Array<SeatGridProp>;
  setTotalSeats: React.Dispatch<React.SetStateAction<Array<SeatGridProp>>>;
  noOfBookingSeats: number;
};

const SeatTile = ({
  info,
  setHandlerOnSeatSelect,
  seatsSelected,
  totalSeats,
  setTotalSeats,
  noOfBookingSeats,
}: SeatsInfo) => {
  const { id, seat, selected }: SeatGridProp = info;

  const updateGridSeats = (seatId: number) => {
    const isBookingSeatsOnGrid =
      seatsSelected.length >= noOfBookingSeats ? true : false;
    let seatToBeRemoved: SelectedSeatProp;
    if (isBookingSeatsOnGrid) {
      if (seatId <= seatsSelected[0].id) {
        seatToBeRemoved = seatsSelected[0];
        seatsSelected.splice(0, 1);
      } else if (seatId > seatsSelected[0].id) {
        seatToBeRemoved = seatsSelected[0];
        seatsSelected.splice(0, 1);
      }
    }

    let seatsSelectedArray = [
      ...seatsSelected,
      { id: seatId, seat: seat, selected: true },
    ];
    setHandlerOnSeatSelect([...seatsSelectedArray]);
    const totalSeatSelections = totalSeats.map((seats) => {
      if (seats?.seat === seat) {
        return { id: seatId, seat: seat, selected: !selected };
      } else if (isBookingSeatsOnGrid && seats?.seat === seatToBeRemoved.seat) {
        return {
          ...seatToBeRemoved,
          selected: false,
        };
      }
      return seats;
    });
    setTotalSeats([...totalSeatSelections]);
  };

  const handleOnSeatSelect = (e: ChangeEvent<any>) => {
    const seatId = parseInt(e.target.id);
    updateGridSeats(seatId);
  };

  return (
    <button
      className="seatgrid__seat"
      style={{
        backgroundColor: selected ? "var(--primaryColor)" : "gray",
      }}
      id={id.toString()}
      value={seat}
      onClick={handleOnSeatSelect}
    >
      {selected && seatsSelected.findIndex((seats) => seats?.seat == seat) + 1}
    </button>
  );
};

const SeatGridStyles = ({
  image,
  setHandlerOnSeatSelect,
  seatsSelected,
}: SeatGridStyleProp) => {
  const SeatRowNaming: String[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ];

  const [totalSeats, setTotalSeats] = useState<Array<SeatGridProp>>([]);
  const seatOrder = ["left", "middle", "right"];
  const { seatCount } = useAppSelector((state: RootState) => state.booking);

  useEffect(() => {
    let seats: Array<SeatGridProp> = [];
    // for loop with totalseats as 180
    // after every 5 seats will change the occurence of left, middle, right
    // after every 15 seats will change the occurance of row seats name
    const buildSeats = (order: string, rowIndex: number) => {
      let arr = [];
      for (let row of SeatRowNaming.slice(0, rowIndex)) {
        for (let i = 1; i <= 5; i++) {
          arr.push({ id: i, seat: `${order}-${row}-${i}`, selected: false });
        }
      }
      return arr;
    };
    // let seatsbuilt: Object[] = [];
    for (let order of seatOrder) {
      if (order === "left") {
        seats = [...seats, ...buildSeats("left", 10)];
      }
      if (order === "middle") {
        seats = [...seats, ...buildSeats("middle", 5)];
      }
      if (order === "right") {
        seats = [...seats, ...buildSeats("right", 10)];
      }
    }

    for (let order of seatOrder) {
      for (let o = 1; o <= 5; o++) {
        seats = [
          ...seats,
          { id: o, seat: `${order}-K-${o}-last`, selected: false },
        ];
      }
    }
    setTotalSeats([...seats]);
  }, []);

  return (
    <div className="seatgrid__container">
      <img
        className="seatgrid__screen"
        src={`https://image.tmdb.org/t/p/original/${image}`}
      />

      <div className="seatgrid__mainblock">
        <div className="seatgrid__rowname">
          {SeatRowNaming.map((name, id) => (
            <h5 key={id}>{name}</h5>
          ))}
          <h5 style={{ marginTop: "14px" }}>{"K"}</h5>
        </div>
        <div className="seatgrid__left">
          <div className="seatgrid__main">
            {totalSeats.map((seats) => {
              if (
                seats?.seat.startsWith("left") &&
                !seats?.seat.endsWith("last")
              ) {
                return (
                  <SeatTile
                    info={seats}
                    setHandlerOnSeatSelect={setHandlerOnSeatSelect}
                    seatsSelected={seatsSelected}
                    totalSeats={totalSeats}
                    setTotalSeats={setTotalSeats}
                    noOfBookingSeats={seatCount}
                  />
                );
              }
            })}
          </div>
          <div style={{ marginTop: "24px" }}>
            <div className="seatgrid__main">
              {totalSeats.map((seats) => {
                if (
                  seats?.seat.startsWith("left") &&
                  seats?.seat.endsWith("last")
                ) {
                  return (
                    <SeatTile
                      info={seats}
                      setHandlerOnSeatSelect={setHandlerOnSeatSelect}
                      seatsSelected={seatsSelected}
                      totalSeats={totalSeats}
                      setTotalSeats={setTotalSeats}
                      noOfBookingSeats={seatCount}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="seatgrid__middle">
          <div className="seatgrid__main">
            {totalSeats.map((seats) => {
              if (
                seats?.seat.startsWith("middle") &&
                !seats?.seat.endsWith("last")
              ) {
                return (
                  <SeatTile
                    info={seats}
                    setHandlerOnSeatSelect={setHandlerOnSeatSelect}
                    seatsSelected={seatsSelected}
                    totalSeats={totalSeats}
                    setTotalSeats={setTotalSeats}
                    noOfBookingSeats={seatCount}
                  />
                );
              }
            })}
          </div>
          <div style={{ marginTop: "200px" }}>
            <div className="seatgrid__main">
              {totalSeats.map((seats) => {
                if (
                  seats?.seat.startsWith("middle") &&
                  seats?.seat.endsWith("last")
                ) {
                  return (
                    <SeatTile
                      info={seats}
                      setHandlerOnSeatSelect={setHandlerOnSeatSelect}
                      seatsSelected={seatsSelected}
                      totalSeats={totalSeats}
                      setTotalSeats={setTotalSeats}
                      noOfBookingSeats={seatCount}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="seatgrid__right">
          <div className="seatgrid__main">
            {totalSeats.map((seats) => {
              if (
                seats?.seat.startsWith("right") &&
                !seats?.seat.endsWith("last")
              ) {
                return (
                  <SeatTile
                    info={seats}
                    setHandlerOnSeatSelect={setHandlerOnSeatSelect}
                    seatsSelected={seatsSelected}
                    totalSeats={totalSeats}
                    setTotalSeats={setTotalSeats}
                    noOfBookingSeats={seatCount}
                  />
                );
              }
            })}
          </div>
          <div style={{ marginTop: "24px" }}>
            <div className="seatgrid__main">
              {totalSeats.map((seats) => {
                if (
                  seats?.seat.startsWith("right") &&
                  seats?.seat.endsWith("last")
                ) {
                  return (
                    <SeatTile
                      info={seats}
                      setHandlerOnSeatSelect={setHandlerOnSeatSelect}
                      seatsSelected={seatsSelected}
                      totalSeats={totalSeats}
                      setTotalSeats={setTotalSeats}
                      noOfBookingSeats={seatCount}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatGridStyles;
