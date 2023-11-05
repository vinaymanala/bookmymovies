import React from "react";
import PageContainer from "../layout/PageContainer";
import TopRatedMoviesSection from "../features/Sections/TopRatedMoviesSection";

const TopRated = () => {
  return (
    <React.Fragment>
      <PageContainer>
        <section>
          <TopRatedMoviesSection />
        </section>
      </PageContainer>
    </React.Fragment>
  );
};

export default TopRated;
