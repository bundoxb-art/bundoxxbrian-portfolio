import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import BlogAdmin from "@/components/blog/BlogAdmin";
import { createClient } from "@supabase/supabase-js";

export default async function BlogAdminPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/portal");
  }

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: posts } = await adminClient
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return <BlogAdmin posts={posts || []} />;
}