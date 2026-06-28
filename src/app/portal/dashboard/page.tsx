import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import ClientDashboard from "@/components/portal/ClientDashboard";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/portal");

  // Fetch client's project
  const { data: client } = await supabase
    .from("pf_clients")
    .select("*")
    .eq("email", user.email)
    .single();

  return (
    <ClientDashboard
      client={client}
      userEmail={user.email || ""}
    />
  );
}