import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Profile {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
}

const Agents = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  // SEO
  useEffect(() => {
    document.title = "Real Estate Agents - EstateHub";
    const desc = "Browse EstateHub agents. Find trusted realtors and view their listings.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.href;
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [profilesRes, propertiesRes] = await Promise.all([
        supabase.from("profiles").select("user_id, full_name, avatar_url, phone"),
        supabase.from("properties").select("id, agent_id"),
      ]);

      if (!profilesRes.error && profilesRes.data) {
        setProfiles(profilesRes.data as Profile[]);
      }
      if (!propertiesRes.error && propertiesRes.data) {
        const map: Record<string, number> = {};
        for (const row of propertiesRes.data as { id: string; agent_id: string | null }[]) {
          if (!row.agent_id) continue;
          map[row.agent_id] = (map[row.agent_id] || 0) + 1;
        }
        setCounts(map);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return profiles;
    return profiles.filter((p) =>
      (p.full_name || "").toLowerCase().includes(query) || (p.phone || "").toLowerCase().includes(query)
    );
  }, [profiles, q]);

  return (
    <main className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Find an agent</h1>
        <p className="text-muted-foreground mt-2">Connect with a local expert and explore their active listings.</p>
      </header>

      <div className="mb-8 max-w-md">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search agents by name or phone" />
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading agents…</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const initials = (p.full_name || "Agent").split(" ").map((s) => s[0]).slice(0, 2).join("");
            const count = counts[p.user_id] || 0;
            return (
              <Card key={p.user_id}>
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={p.avatar_url || undefined} alt={(p.full_name || "Agent") + " avatar"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{p.full_name || "Unnamed Agent"}</CardTitle>
                    <p className="text-sm text-muted-foreground">{p.phone || "No phone"}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Active listings: <span className="font-medium">{count}</span></p>
                  <Button asChild variant="secondary">
                    <Link to="/properties">View listings</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Agents;
