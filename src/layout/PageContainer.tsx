import Nav from "../features/Nav";
import "../index.css";

type PageContainerProps = { children: React.ReactNode };

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="container">
      <Nav />
      {children}
    </div>
  );
};

export default PageContainer;
