import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, setDoc, deleteDoc, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { menuData as staticMenuData } from "@/lib/menuData";

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "menu">("orders");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Orders
      const ordersSnap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
      setOrders(ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch Menu
      const menuSnap = await getDocs(query(collection(db, "menu"), orderBy("order", "asc")));
      setMenuItems(menuSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMigrate = async () => {
    if (!confirm("This will overwrite your cloud menu with static data. Continue?")) return;
    
    setLoading(true);
    try {
      let order = 0;
      for (const category of staticMenuData) {
        for (const item of category.items) {
          await setDoc(doc(db, "menu", item.id), {
            ...item,
            categoryId: category.id,
            categoryName: category.name,
            order: order++,
            updatedAt: serverTimestamp(),
          });
        }
      }
      toast.success("Menu migration successful!");
      fetchData();
    } catch (error) {
      console.error("Migration failed:", error);
      toast.error("Migration failed");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="flex justify-center py-20 animate-spin"></div>;
  if (!isAdmin) return <Navigate to="/auth" />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <Button onClick={handleMigrate} variant="outline" className="border-primary text-primary">
            Sync Static Menu to Cloud
          </Button>
        </div>

        <div className="flex gap-4 mb-8">
          <Button 
            variant={activeTab === "orders" ? "default" : "outline"}
            onClick={() => setActiveTab("orders")}
          >
            Manage Orders ({orders.length})
          </Button>
          <Button 
            variant={activeTab === "menu" ? "default" : "outline"}
            onClick={() => setActiveTab("menu")}
          >
            Manage Menu ({menuItems.length})
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div>
            {activeTab === "orders" ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{order.name}</h3>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm space-y-1 mb-4">
                      <p><strong>Address:</strong> {order.address}</p>
                      {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
                    </div>
                    <div className="border-t border-border pt-4">
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm py-1">
                          <span>{item.name} {item.variant && `(${item.variant})`} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold mt-2 text-primary">
                        <span>Total</span>
                        <span>₹{order.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-card p-4 rounded-xl border border-border flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.categoryName}</p>
                      <p className="text-primary font-bold">₹{item.price || item.variants?.[0]?.price}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteDoc(doc(db, "menu", item.id)).then(fetchData)}>
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
