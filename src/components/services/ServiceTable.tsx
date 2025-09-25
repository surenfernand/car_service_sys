import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, Edit, Calendar, Filter, Search, ArrowUpDown } from "lucide-react";

interface ServiceRecord {
  id: string;
  date: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  customerName: string;
  serviceType: string;
  status: "completed" | "scheduled" | "in-progress" | "cancelled";
  nextServiceDate?: string;
}

interface ServiceTableProps {
  title?: string;
  services?: ServiceRecord[];
  showFilters?: boolean;
  isUpcoming?: boolean;
}

const ServiceTable = ({
  title = "Service Records",
  services = defaultServices,
  showFilters = true,
  isUpcoming = false,
}: ServiceTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(
    null,
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter services based on search term and status filter
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      (service.customerName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (service.vehicleInfo?.licensePlate?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (service.serviceType?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (service: ServiceRecord) => {
    setSelectedService(service);
    setIsDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "scheduled":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-700">
            Scheduled
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="default" className="bg-amber-500">
            In Progress
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showFilters && (
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customer, plate, service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[250px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <div className="flex items-center gap-1 cursor-pointer">
                  Date <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Status</TableHead>
              {isUpcoming && <TableHead>Due Date</TableHead>}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.date}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {service.vehicleInfo?.make} {service.vehicleInfo?.model}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {service.vehicleInfo?.year} •{" "}
                        {service.vehicleInfo?.licensePlate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{service.customerName}</TableCell>
                  <TableCell>{service.serviceType}</TableCell>
                  <TableCell>{getStatusBadge(service.status)}</TableCell>
                  {isUpcoming && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {service.nextServiceDate}
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(service)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={isUpcoming ? 7 : 6}
                  className="h-24 text-center"
                >
                  No services found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Customer
                  </h3>
                  <p className="text-base">{selectedService.customerName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Service Date
                  </h3>
                  <p className="text-base">{selectedService.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Vehicle
                  </h3>
                  <p className="text-base">
                    {selectedService.vehicleInfo?.make}{" "}
                    {selectedService.vehicleInfo?.model} (
                    {selectedService.vehicleInfo?.year})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    License: {selectedService.vehicleInfo?.licensePlate}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Service Type
                  </h3>
                  <p className="text-base">{selectedService.serviceType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h3>
                  <div className="mt-1">
                    {getStatusBadge(selectedService.status)}
                  </div>
                </div>
                {selectedService.nextServiceDate && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Next Service Due
                    </h3>
                    <p className="text-base">
                      {selectedService.nextServiceDate}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Service Details
                </h3>
                <div className="bg-muted p-3 rounded-md">
                  <p>
                    Oil change performed with synthetic oil. Replaced oil filter
                    and performed multi-point inspection. All fluids topped off
                    and tire pressure adjusted.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Parts Used
                </h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Part Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Oil Filter</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell className="text-right">$12.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Synthetic Oil (5W-30)</TableCell>
                        <TableCell>5 qts</TableCell>
                        <TableCell className="text-right">$35.95</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="font-medium text-right"
                        >
                          Total:
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          $48.94
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
                <Button>Edit Service</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Sample data for demonstration
const defaultServices: ServiceRecord[] = [
  {
    id: "1",
    date: "2023-06-15",
    vehicleInfo: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      licensePlate: "ABC123",
    },
    customerName: "John Smith",
    serviceType: "Oil Change",
    status: "completed",
    nextServiceDate: "2023-12-15",
  },
  {
    id: "2",
    date: "2023-07-02",
    vehicleInfo: {
      make: "Honda",
      model: "Civic",
      year: 2019,
      licensePlate: "XYZ789",
    },
    customerName: "Sarah Johnson",
    serviceType: "Brake Replacement",
    status: "completed",
    nextServiceDate: "2024-01-02",
  },
  {
    id: "3",
    date: "2023-07-10",
    vehicleInfo: {
      make: "Ford",
      model: "F-150",
      year: 2021,
      licensePlate: "DEF456",
    },
    customerName: "Michael Brown",
    serviceType: "Tire Rotation",
    status: "scheduled",
    nextServiceDate: "2023-10-10",
  },
  {
    id: "4",
    date: "2023-07-15",
    vehicleInfo: {
      make: "Chevrolet",
      model: "Malibu",
      year: 2018,
      licensePlate: "GHI789",
    },
    customerName: "Emily Davis",
    serviceType: "Full Inspection",
    status: "in-progress",
  },
  {
    id: "5",
    date: "2023-07-20",
    vehicleInfo: {
      make: "Nissan",
      model: "Altima",
      year: 2022,
      licensePlate: "JKL012",
    },
    customerName: "David Wilson",
    serviceType: "A/C Repair",
    status: "cancelled",
  },
];

export default ServiceTable;