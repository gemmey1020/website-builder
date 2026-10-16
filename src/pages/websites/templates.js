import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SelectTemplate() {
  const [templates, setTemplates] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/templates")
      .then((res) => res.json())
      .then((data) => {
        console.log("Templates received:", data); // 🔍 Debugging
        setTemplates(data);
      })
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  const handleSelect = (template) => {
    router.push({
      pathname: "/websites/new",
      query: { template: JSON.stringify(template) },
    });
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Select a Template</h1>
      <div className="row">
        {templates.length > 0 ? (
          templates.map((template) => (
            <div key={template.id} className="col-md-4">
              <div className="card mb-3 shadow-sm" onClick={() => handleSelect(template)} style={{ cursor: "pointer" }}>
                <img src={template.preview_image} className="card-img-top" alt={template.name} />
                <div className="card-body text-center">
                  <h5 className="card-title">{template.name}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Loading templates...</p>
        )}
      </div>
    </div>
  );
}
