import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/portal/AdminDashboard";

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/portal");
  }

  // Fetch all clients using service role
  const { createClient } = await import("@supabase/supabase-js");
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: clients } = await adminClient
    .from("pf_clients")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: currentProject } = await adminClient
    .from("pf_current_project")
    .select("*")
    .eq("is_active", true)
    .single();

  return (
    <AdminDashboard
      clients={clients || []}
      currentProject={currentProject}
    />
  );
}