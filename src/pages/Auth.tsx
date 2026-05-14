import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "customer" as "customer" | "admin",
  });
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Welcome back!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.name });

        // If they requested Admin, we still set role to customer initially
        const isRequestingAdmin = formData.role === "admin";
        
        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: formData.email,
          displayName: formData.name,
          role: "customer", // Default to customer
          adminRequested: isRequestingAdmin, // Flag for approval
          createdAt: new Date(),
        });

        if (isRequestingAdmin) {
          toast.success("Account created! Admin access is pending approval.");
        } else {
          toast.success("Account created successfully!");
        }
      }
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col items-center justify-center pt-32 pb-20 px-4">
        <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin ? "Login to manage your orders" : "Register to start ordering"}
            </p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-background/50"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}
            
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Email Address</label>
              <Input
                type="email"
                placeholder="email@example.com"
                className="bg-background/50"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-background/50"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {!isLogin && (
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                <label className="text-sm font-semibold mb-2 block">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "customer" })}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      formData.role === "customer"
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-background border border-border hover:border-primary/30"
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "admin" })}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      formData.role === "admin"
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-background border border-border hover:border-primary/30"
                    }`}
                  >
                    Admin
                  </button>
                </div>
                {formData.role === "admin" && (
                  <p className="text-[10px] text-primary mt-2 font-medium">
                    * Admin accounts require manual approval from the site owner.
                  </p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full py-6 text-lg font-bold glow-amber mt-2" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "New to Food Town?" : "Already have an account?"}
              {" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-amber-glow font-bold transition-colors"
              >
                {isLogin ? "Register Now" : "Login Here"}
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
