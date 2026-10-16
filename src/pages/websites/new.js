// import { useState } from "react";

// export default function NewWebsite() {
//   const [name, setName] = useState("");
//   const [domain, setDomain] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://127.0.0.1:8000/api/websites", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         domain,
//         content: JSON.stringify({ title: "Welcome!", sections: [] }),
//       }),
//     });

//     if (response.ok) {
//       alert("Website Created Successfully!");
//       setName("");
//       setDomain("");
//     } else {
//       alert("Error creating website!");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Create a New Website</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Website Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Domain:</label>
//           <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} required />
//         </div>
//         <button type="submit">Create Website</button>
//       </form>
//     </div>
//   );
// }
// ---------------------------------------------------------
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NewWebsite() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    if (router.query.template) {
      setSelectedTemplate(JSON.parse(router.query.template));
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/websites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        domain,
        content: selectedTemplate ? selectedTemplate.content : JSON.stringify({ title: "Empty Website", sections: [] }),
      }),
    });

    if (response.ok) {
      alert("Website Created Successfully!");
      setName("");
      setDomain("");
    } else {
      alert("Error creating website!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Create a New Website</h2>

        {selectedTemplate && (
          <div className="alert alert-info text-center">
            <strong>Using Template:</strong> {selectedTemplate.name}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Website Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Domain:</label>
            <input
              type="text"
              className="form-control"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Create Website</button>
        </form>
      </div>
    </div>
  );
}
