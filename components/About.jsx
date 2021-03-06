import styles from "../styles/index.module.css";

const About = () => {
  return (
    <>
      <div className="container">
        <div
          className={`container ${styles.home} ${styles.flexContainer} ${styles.aboutPage}`}
        >
          <div
            className={`${styles.flexItemLeft} d-none d-md-block d-lg-block`}
          >
            <div className={`${styles.flexItemRightContent}`}></div>
          </div>
          <div className={`${styles.flexItemRight}`}>
            <h1>About us</h1>
            <p className="gray-paras">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem nobis illum excepturi sint, omnis atque maxime tempora
              quaerat nostrum placeat.
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
