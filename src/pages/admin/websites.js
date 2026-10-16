import { useEffect, useState } from "react";
import AdminLayout from "@/components/ui/AdminLayout";

export default function ManageWebsites() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/websites")
      .then((res) => res.json())
      .then((data) => setWebsites(data))
      .catch((error) => console.error("Error fetching websites:", error));
  }, []);

  return (
    <AdminLayout>
      <h1>Manage Websites</h1>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Domain</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((site) => (
            <tr key={site.id}>
              <td>{site.id}</td>
              <td>{site.name}</td>
              <td>{site.domain}</td>
              <td>{site.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
