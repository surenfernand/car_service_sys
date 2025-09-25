import React from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "./dashboard/DashboardSidebar";
import DashboardContent from "./dashboard/DashboardContent";

interface HomeProps {
  userRole?: "admin" | "staff";
  userName?: string;
  userAvatar?: string;
}

const Home: React.FC<HomeProps> = ({
  userRole = "admin",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}) => {
  return (
    <div className="flex h-screen w-full bg-background">
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <DashboardSidebar
          userRole={userRole}
          userName={userName}
          userAvatar={userAvatar}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-auto"
      >
        <DashboardContent userRole={userRole} />
      </motion.div>
    </div>
  );
};

export default Home;
