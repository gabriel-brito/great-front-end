import { useEffect, useState } from "react";
import "./styles.css";

const JOB_BOARD_IDS_URL =
  "https://hacker-news.firebaseio.com/v0/jobstories.json";

const JOB_DETAILS_URL = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const PAGE_SIZE = 6;

export default function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const hasJobs = jobs.length > 0;

  const fetchIds = async (currentPage) => {
    const ids = await fetch(JOB_BOARD_IDS_URL).then((data) => data.json());

    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return ids.slice(start, end);
  };

  const fetchJobs = async (currentPage) => {
    setIsFetching(true);

    const jobIds = await fetchIds(currentPage);
    const jobsDetailsUrls = jobIds.map((id) => JOB_DETAILS_URL(id));

    const fetchedJobs = await Promise.all(
      jobsDetailsUrls.map((url) => fetch(url).then((data) => data.json()))
    )
      .then((values) => values)
      .catch((err) => console.error(err));

    setJobs([...jobs, ...fetchedJobs]);

    setIsFetching(false);
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  return (
    <main>
      <h1 style={{ color: "#ff6d00" }}>Hacker News Jobs Board</h1>

      <div>
        {hasJobs &&
          jobs.map((job, index) => {
            const jobDate = new Date(job.time * 1000);
            const jobDateString = `${jobDate.getMonth()}/${jobDate.getDay()}/${jobDate.getFullYear()}, ${jobDate.getHours()}:${jobDate.getMinutes()}:${jobDate.getSeconds()}`;

            return (
              <div
                key={`job-${job.id}-${index}`}
                style={{
                  margin: "16px 0",
                  border: "1px solid lightgrey",
                  padding: "16px",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  <a
                    href={job.url}
                    target="_blank"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {job.title}
                  </a>
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  By {job.by} - {jobDateString}
                </div>
              </div>
            );
          })}
      </div>

      <button
        disabled={isFetching}
        onClick={() => {
          setPage(page + 1);
        }}
        style={{
          cursor: "pointer",
          color: "white",
          backgroundColor: "#ff6d00",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
        }}
      >
        {isFetching ? "Loading..." : "Load more jobs"}
      </button>
    </main>
  );
}
