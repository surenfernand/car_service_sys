import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Car,
  User,
  Calendar,
  Bell,
  BarChart3,
} from "lucide-react";
import ServiceTable from "../services/ServiceTable";
import CustomerVehicleForm from "../customers/CustomerVehicleForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger, 
} from "@/components/ui/dialog";

interface DashboardContentProps {
  userRole?: "admin" | "staff";
}

const DashboardContent = ({ userRole = "admin" }: DashboardContentProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showCustomerForm, setShowCustomerForm] = React.useState(false);
  const [showVehicleForm, setShowVehicleForm] = React.useState(false);
  const [showServiceForm, setShowServiceForm] = React.useState(false);

  
  // Mock data for dashboard
  const upcomingServices = [
    {
      id: 1,
      date: "2023-06-15",
      vehicle: "Toyota Camry",
      plate: "ABC123",
      customer: "John Doe",
      service: "Oil Change",
      status: "Scheduled",
    },
    {
      id: 2,
      date: "2023-06-16",
      vehicle: "Honda Civic",
      plate: "XYZ789",
      customer: "Jane Smith",
      service: "Brake Inspection",
      status: "Scheduled",
    },
    {
      id: 3,
      date: "2023-06-17",
      vehicle: "Ford F-150",
      plate: "DEF456",
      customer: "Mike Johnson",
      service: "Full Service",
      status: "Scheduled",
    },
    {
      id: 4,
      date: "2023-06-18",
      vehicle: "Nissan Altima",
      plate: "GHI789",
      customer: "Sarah Williams",
      service: "Tire Rotation",
      status: "Scheduled",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      date: "2023-06-10",
      vehicle: "BMW X5",
      plate: "JKL012",
      customer: "Robert Brown",
      service: "Oil Change",
      status: "Completed",
    },
    {
      id: 2,
      date: "2023-06-09",
      vehicle: "Audi A4",
      plate: "MNO345",
      customer: "Emily Davis",
      service: "Brake Replacement",
      status: "Completed",
    },
    {
      id: 3,
      date: "2023-06-08",
      vehicle: "Mercedes C300",
      plate: "PQR678",
      customer: "David Wilson",
      service: "Diagnostic",
      status: "Completed",
    },
  ];

  return (
    <div className="flex flex-col p-6 bg-background w-full h-full overflow-auto">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers or vehicles..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setShowCustomerForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>
              <CustomerVehicleForm onSubmit={() => {}} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+6 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vehicles
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Services
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {userRole === "admin" ? "Revenue" : "Notifications"}
            </CardTitle>
            {userRole === "admin" ? (
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Bell className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            {userRole === "admin" ? (
              <>
                <div className="text-2xl font-bold">$24,780</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Pending reminders
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
            </DialogHeader>
            <CustomerVehicleForm onSubmit={() => {}} initialStep="vehicle" />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Schedule Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Schedule New Service</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p>Service scheduling form would go here</p>
              {/* Service form would be implemented here */}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="upcoming" className="flex-1">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Services</TabsTrigger>
          <TabsTrigger value="recent">Recent Activities</TabsTrigger>
          {userRole === "admin" && (
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ServiceTable services={upcomingServices} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ServiceTable services={recentActivities} />
            </CardContent>
          </Card>
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">
                    Analytics charts would be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default DashboardContent;
