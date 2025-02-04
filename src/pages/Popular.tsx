import React from "react";
import PageContainer from "../layout/PageContainer";
import PopularMoviesSection from "../features/Sections/PopularMoviesSection";

const Popular = () => {
  return (
    <React.Fragment>
      <PageContainer>
        <section>
          <PopularMoviesSection />
        </section>
      </PageContainer>
    </React.Fragment>
  );
};

export default Popular;
