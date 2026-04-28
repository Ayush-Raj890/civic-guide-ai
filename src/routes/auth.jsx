// @ts-nocheck
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Loader2, LogIn, UserPlus } from "lucide-react";
export const Route = createFileRoute("/auth")({
    head: () => ({
        meta: [
            { title: "Sign in — CivicGuide AI" },
            { name: "description", content: "Sign in or create an account to save your CivicGuide AI conversations." },
        ],
    }),
    component: AuthPage,
});
function AuthPage() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        if (!authLoading && user)
            navigate({ to: "/chatbot" });
    }, [user, authLoading, navigate]);
    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting)
            return;
        setSubmitting(true);
        try {
            if (mode === "signup") {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/chatbot`,
                        data: { display_name: displayName || email.split("@")[0] },
                    },
                });
                if (error)
                    throw error;
                toast.success("Check your email to verify your account before signing in.");
                setMode("login");
            }
            else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error)
                    throw error;
                toast.success("Welcome back!");
                navigate({ to: "/chatbot" });
            }
        }
        catch (err) {
            toast.error(err?.message || "Authentication failed");
        }
        finally {
            setSubmitting(false);
        }
    }
    return (<Layout>
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
            ? "Sign in to save your chatbot conversations."
            : "Sign up to keep your chats and progress in one place."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (<div className="space-y-2">
                  <Label htmlFor="name">Display name</Label>
                  <Input id="name" type="text" placeholder="Alex" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                </div>)}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (<Loader2 className="h-4 w-4 animate-spin"/>) : mode === "login" ? (<>
                    <LogIn className="h-4 w-4"/> Sign in
                  </>) : (<>
                    <UserPlus className="h-4 w-4"/> Create account
                  </>)}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? "New here?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-medium text-primary hover:underline">
                {mode === "login" ? "Create an account" : "Sign in"}
              </button>
            </p>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:underline">← Back to home</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </Layout>);
}
