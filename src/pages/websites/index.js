import { useEffect, useState } from "react";

export default function WebsitesList() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/websites")
      .then((res) => res.json())
      .then((data) => setWebsites(data));
  }, []);

  return (
    <div className="container">
      <h1>All Websites</h1>
      <ul>
        {websites.map((site) => (
          <li key={site.id}>
            <strong>{site.name}</strong> - <a href={`http://${site.domain}`} target="_blank">{site.domain}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
