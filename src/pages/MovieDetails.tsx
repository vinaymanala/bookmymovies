import React from "react";
import PageContainer from "../layout/PageContainer";
import MovieDetailsSection from "../features/Sections/MovieDetailsSection";

const MovieDetails = () => {
  return (
    <React.Fragment>
      <PageContainer>
        <section>
          <MovieDetailsSection />
        </section>
      </PageContainer>
    </React.Fragment>
  );
};

export default MovieDetails;
