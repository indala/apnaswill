import { redirect } from "next/navigation";

export default function AdminPage() {
  // Automatically send users to the dashboard
  redirect("/admin/dashboard");
}
