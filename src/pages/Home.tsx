import React, { useState } from "react";
import PageContainer from "../layout/PageContainer";
import HeroSection from "../features/Sections/HeroSection";
import MoviesSection from "../features/Sections/MoviesSection";

type Results = {};
const Home = () => {
  return (
    <React.Fragment>
      <PageContainer>
        <section className="section">
          <HeroSection />
          <MoviesSection />
        </section>
      </PageContainer>
    </React.Fragment>
  );
};

export default Home;
