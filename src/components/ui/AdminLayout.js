import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/websites">Manage Websites</Link></li>
          <li><Link href="/admin/templates">Manage Templates</Link></li>
        </ul>
      </nav>
      <main className="admin-content">{children}</main>
      <style jsx>{`
        .admin-container {
          display: flex;
          height: 100vh;
        }
        .admin-sidebar {
          width: 250px;
          background: #222;
          color: white;
          padding: 20px;
        }
        .admin-sidebar ul {
          list-style: none;
          padding: 0;
        }
        .admin-sidebar li {
          margin: 15px 0;
        }
        .admin-sidebar a {
          color: white;
          text-decoration: none;
        }
        .admin-content {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
