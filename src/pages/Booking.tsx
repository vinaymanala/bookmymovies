import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../layout/PageContainer";
import SeatGridSection from "../features/Sections/SeatGridSection/SeatGridSection";
import "../index.css";
const Booking = () => {
  const { id } = useParams();
  return (
    <div>
      <React.Fragment>
        <PageContainer>
          <section>
            <h3 style={{ margin: "2rem" }}>Booking no: {id}</h3>
            <SeatGridSection />
          </section>
        </PageContainer>
      </React.Fragment>
    </div>
  );
};

export default Booking;
