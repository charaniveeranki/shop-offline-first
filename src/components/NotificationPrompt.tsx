import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if notifications are supported and not already granted
    if ("Notification" in window && Notification.permission === "default") {
      setShowPrompt(true);
    }
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        toast.success("Notifications enabled! You'll get updates on new products and offers.");
        setShowPrompt(false);
      } else {
        toast.error("Notification permission denied");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast.error("Could not enable notifications");
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Enable Notifications</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get notified about new products, sales, and special offers
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={requestNotificationPermission}>
              Enable
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowPrompt(false)}>
              Not now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
