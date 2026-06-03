export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
