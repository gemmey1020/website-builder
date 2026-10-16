import { useEffect, useState } from "react";
import AdminLayout from "@/components/ui/AdminLayout";

export default function ManageTemplates() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  return (
    <AdminLayout>
      <h1>Manage Templates</h1>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.id}</td>
              <td>{template.name}</td>
              <td>{template.category}</td>
              <td>{template.version}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
