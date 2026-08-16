import axios from "axios";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import coding from "../assets/coding.svg";
import styles from "./CourseDetail.module.css";
import { getUser } from "../utils/getUser";

export async function courseDetailLoader({ params }) {
  const { id: courseID } = params;

  const URL = `${BASE_URL}/rest/v1/modules?course_id=eq.${courseID}&select=*`;

  const { data: modules } = await axios.get(URL, {
    headers: {
      apikey: SUPABASE_API_KEY,
    },
  });

  const user = await getUser();

  let isPurchased = false;

  if (user) {
    const { data: subscriptions } = await axios.get(
      `${BASE_URL}/rest/v1/subscriptions?user_id=eq.${user.user_id}&course_id=eq.${courseID}&select=id`,
      {
        headers: {
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${user.access_token}`,
        },
      },
    );

    isPurchased = subscriptions.length > 0;
  }

  return {
    modules,
    courseID,
    isPurchased,
  };
}

function CourseDetail() {
  const { modules, courseID, isPurchased } = useLoaderData();
  const [searchParams] = useSearchParams();
  const courseName = searchParams.get("name");
  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.courseName}>{courseName} Course</h1>
          <div className={styles.headerButtonContainer}>
            {isPurchased ? (
              <Link to={`/my-courses/${courseID}`} className={styles.btn}>
                Watch Now
              </Link>
            ) : (
              <Link to={`/payment/${courseID}`} className={styles.btn}>
                Buy Now
              </Link>
            )}

            <a className={styles.btn} href="#curriculum">
              View More
            </a>
          </div>
        </div>

        <img
          src={coding}
          alt="Illustration of person doing coding"
          className={styles.headerImg}
        />
      </header>
      <section id="curriculum" className={styles.curriculumSection}>
        <h2 className={styles.curriculumHeading}>Curriculum</h2>
        {modules
          .sort((a, b) => a.number - b.number)
          .map((module) => {
            const { id, number, name, description } = module;
            return (
              <div key={id} className={styles.module}>
                <h3 className={styles.chapterNumber}>Chapter {number}</h3>
                <h2>{name}</h2>
                <p className={styles.moduleDescription}>{description}</p>
              </div>
            );
          })}
        <br />
        {isPurchased ? (
          <Link to={`/my-courses/${courseID}`} className={styles.btn}>
            Watch Now
          </Link>
        ) : (
          <Link to={`/payment/${courseID}`} className={styles.btn}>
            Buy Now
          </Link>
        )}
      </section>
    </div>
  );
}

export default CourseDetail;
