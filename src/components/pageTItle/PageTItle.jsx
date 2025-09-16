import "./pageTitle.scss";

function PageTitle({ title }) {
  return (
    <div className="page-title-container">
      <h1 className="page-title" aria-label={title}>{title}</h1>
    </div>
  );
}

export default PageTitle;