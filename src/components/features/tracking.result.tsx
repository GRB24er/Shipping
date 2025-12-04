"use client";

import { useState } from "react";
import { format, parseISO, differenceInHours, isAfter } from "date-fns";
import {
  Clock,
  Truck,
  MapPin,
  Package as PackageIcon,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  Bell,
  Calendar,
  Weight,
  Ruler,
  DollarSign,
  User,
  Building,
  Mail,
  Phone,
  FileText,
  Barcode,
  Navigation,
  Globe,
  Shield,
  Thermometer,
  BatteryCharging,
  Zap,
  Eye,
  Lock,
  RefreshCw,
  Printer,
  ChevronRight,
  Home,
  Store,
  Factory,
  Warehouse,
  Plane,
  Ship,
  Train,
  Car,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface TrackingEvent {
  id: string;
  timestamp: Date;
  location: string | null;
  status: string | null;
  message: string;
  city?: string | null;
  country?: string | null;
  signedBy?: string | null;
}

interface Package {
  height: number;
  width: number;
  length: number;
  packageType: string;
  declaredValue: number | null;
  weight: number;
  description: string;
  pieces: number;
  dangerous: boolean;
  insurance: boolean;
  trackingNumber?: string;
  referenceNumber?: string;
}

interface Recipient {
  name: string;
  company?: string | null;
  email?: string | null;
  phone: string;
  signatureRequired?: boolean;
}

interface Sender {
  name: string;
  email: string;
  phone?: string;
}

interface TrackingData {
  trackingNumber: string;
  estimatedDelivery: Date;
  deliveredAt?: Date | null;
  isPaid: boolean;
  
  originAddress: string;
  originCity: string;
  originState: string;
  originPostalCode: string;
  originCountry: string;
  
  destinationAddress: string;
  destinationCity: string;
  destinationState: string;
  destinationPostalCode: string;
  destinationCountry: string;
  
  serviceType: string;
  specialInstructions?: string | null;
  TrackingUpdates: TrackingEvent[];
  createdAt: Date;
  Sender: Sender | null;
  recipient: Recipient;
  packages: Package[];
  
  // New fields for enhanced UI
  carrier?: string;
  serviceLevel?: string;
  totalPieces?: number;
  requiresSignature?: boolean;
  isInternational?: boolean;
  customsCleared?: boolean;
  deliveryAttempts?: number;
  scheduledDelivery?: Date | null;
  podAvailable?: boolean;
  carbonNeutral?: boolean;
  temperatureControlled?: boolean;
}

type TrackingResultProps = {
  data: TrackingData;
};

export default function AdvancedTrackingResult({ data }: TrackingResultProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "details" | "map" | "documents">(
    "timeline"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatDate = (input: string | Date): string => {
    try {
      const date = input instanceof Date ? input : parseISO(input);
      return format(date, "EEEE, d MMMM yyyy 'at' h:mm a");
    } catch (error) {
      return typeof input === "string" ? input : input.toString();
    }
  };

  const formatShortDate = (input: string | Date): string => {
    try {
      const date = input instanceof Date ? input : parseISO(input);
      return format(date, "MMM d, h:mm a");
    } catch (error) {
      return "";
    }
  };

  const currentStatus =
    data.TrackingUpdates.length > 0
      ? data.TrackingUpdates[data.TrackingUpdates.length - 1].status
      : "pending";

  const isDelivered = currentStatus?.toLowerCase() === "delivered";
  const isInTransit = currentStatus?.toLowerCase() === "in_transit";
  const isFailed = currentStatus?.toLowerCase() === "failed";
  const isOutForDelivery = currentStatus?.toLowerCase() === "out_for_delivery";

  // Calculate time since last update
  const lastUpdate = data.TrackingUpdates[data.TrackingUpdates.length - 1]?.timestamp;
  const hoursSinceLastUpdate = lastUpdate ? differenceInHours(new Date(), lastUpdate) : null;

  const handleDownloadAirwayBill = async () => {
    try {
      toast.loading("Generating Airway Bill...");
      const response = await fetch(`/api/generate-airway-bill/${data.trackingNumber}`);
      if (!response.ok) throw new Error("Failed to generate Airway Bill");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Airway-Bill-${data.trackingNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.dismiss();
      toast.success("Airway Bill downloaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to download Airway Bill");
      console.error(error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Shipment Tracking - ${data.trackingNumber}`,
      text: `Track shipment ${data.trackingNumber}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tracking link copied to clipboard!");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast.success("Tracking information updated");
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateProgress = () => {
    const statusOrder = ["created", "picked_up", "in_transit", "out_for_delivery", "delivered"];
    const current = data.TrackingUpdates[data.TrackingUpdates.length - 1]?.status;
    const currentIndex = statusOrder.findIndex(s => s === current?.toLowerCase());
    return Math.min(((currentIndex + 1) / statusOrder.length) * 100, 100);
  };

  const totalWeight = data.packages.reduce((sum, pkg) => sum + pkg.weight, 0);
  const totalValue = data.packages.reduce((sum, pkg) => sum + (pkg.declaredValue || 0), 0);
  const totalPieces = data.packages.reduce((sum, pkg) => sum + pkg.pieces, 0);

  const getStatusColor = (status: string | null) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch(status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "exception":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "picked_up":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTransportIcon = (status: string | null) => {
    switch(status?.toLowerCase()) {
      case "in_transit":
        return Math.random() > 0.5 ? <Plane className="h-5 w-5" /> : <Truck className="h-5 w-5" />;
      case "out_for_delivery":
        return <Car className="h-5 w-5" />;
      case "at_sort_facility":
        return <Warehouse className="h-5 w-5" />;
      default:
        return <Truck className="h-5 w-5" />;
    }
  };

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Tracking Information Not Found</h2>
              <p className="text-muted-foreground">
                We couldn't find tracking information for this shipment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Carrier Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Truck className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {data.carrier || "CARRIER"} SHIPMENT TRACKING
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Barcode className="h-5 w-5" />
                <span className="font-mono text-lg font-semibold tracking-wider">
                  {data.trackingNumber}
                </span>
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-white/30">
                  {data.serviceLevel || data.serviceType}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <h3 className="text-xl font-bold mt-1">
                  {currentStatus?.replace(/_/g, " ").toUpperCase()}
                </h3>
              </div>
              <div className={`p-2 rounded-full ${getStatusColor(currentStatus)}`}>
                {isDelivered ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : isOutForDelivery ? (
                  <Car className="h-6 w-6 text-purple-600" />
                ) : (
                  <Truck className="h-6 w-6 text-blue-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Est. Delivery</p>
                <h3 className="text-xl font-bold mt-1">
                  {format(data.estimatedDelivery, "MMM d")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isAfter(new Date(), data.estimatedDelivery) ? "Past due" : "On time"}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Update</p>
                <h3 className="text-xl font-bold mt-1">
                  {lastUpdate ? format(lastUpdate, "h:mm a") : "N/A"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {hoursSinceLastUpdate !== null ? `${hoursSinceLastUpdate}h ago` : ""}
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shipment Details</p>
                <h3 className="text-xl font-bold mt-1">{totalPieces} pieces</h3>
                <p className="text-sm text-muted-foreground">{totalWeight} kg total</p>
              </div>
              <PackageIcon className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tracking Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Timeline & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Progress Tracking */}
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Shipment Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* Progress Bar with Milestones */}
                <div className="relative">
                  <div className="flex justify-between mb-2 text-sm font-medium">
                    <span className="text-blue-600">PICKED UP</span>
                    <span className="text-blue-600">IN TRANSIT</span>
                    <span className="text-blue-600">OUT FOR DELIVERY</span>
                    <span className="text-green-600">DELIVERED</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-3" />
                  
                  <div className="flex justify-between mt-4">
                    {["Origin", "In Transit", "Destination", "Delivered"].map((label, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          idx * 33 <= calculateProgress() 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-200 text-gray-400"
                        }`}>
                          {idx === 3 ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-bold">{idx + 1}</span>
                          )}
                        </div>
                        <span className="text-xs mt-2 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Timeline */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Tracking History
                  </h3>
                  
                  {data.TrackingUpdates.map((event, idx) => (
                    <div key={event.id} className="flex gap-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors">
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full ${
                          idx === 0 
                            ? "bg-green-500 text-white" 
                            : idx === data.TrackingUpdates.length - 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}>
                          {getTransportIcon(event.status)}
                        </div>
                        {idx !== data.TrackingUpdates.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 mt-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className={`px-3 py-1 ${getStatusColor(event.status)}`}
                              >
                                {event.status?.replace(/_/g, " ").toUpperCase()}
                              </Badge>
                              {event.signedBy && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Signed
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {formatDate(event.timestamp)}
                            </p>
                            {event.location && (
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm font-medium">{event.location}</span>
                                {event.city && (
                                  <span className="text-sm text-muted-foreground">
                                    • {event.city}, {event.country}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          {event.signedBy && (
                            <div className="text-right">
                              <p className="text-sm font-medium">Signed by:</p>
                              <p className="text-sm text-muted-foreground">{event.signedBy}</p>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded">
                          {event.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.temperatureControlled && (
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Thermometer className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Temperature Controlled</p>
                    <p className="text-sm text-muted-foreground">2-8°C maintained</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {data.carbonNeutral && (
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Carbon Neutral</p>
                    <p className="text-sm text-muted-foreground">Eco-friendly shipping</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {data.requiresSignature && (
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-800">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Signature Required</p>
                    <p className="text-sm text-muted-foreground">Direct delivery only</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {data.isInternational && (
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Shield className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold">International Shipment</p>
                    <p className="text-sm text-muted-foreground">
                      {data.customsCleared ? "Customs cleared" : "Customs pending"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column - Quick Actions & Details */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button 
                onClick={handleDownloadAirwayBill} 
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Airway Bill
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="w-full justify-start"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Tracking
              </Button>
              <Button 
                variant="outline"
                className="w-full justify-start"
              >
                <Bell className="h-4 w-4 mr-2" />
                Get Notifications
              </Button>
              <Button 
                variant="outline"
                className="w-full justify-start"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Proof of Delivery
              </Button>
            </CardContent>
          </Card>

          {/* Shipment Overview */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Shipment Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Service Level</span>
                  <span className="font-semibold">{data.serviceType}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Pieces</span>
                  <span className="font-semibold">{totalPieces}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Weight</span>
                  <span className="font-semibold">{totalWeight} kg</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Value</span>
                  <span className="font-semibold">${totalValue}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment Status</span>
                  <Badge variant={data.isPaid ? "default" : "destructive"}>
                    {data.isPaid ? "Paid" : "Pending"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Summary */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Route Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Origin</p>
                    <p className="text-sm text-muted-foreground">
                      {data.originCity}, {data.originState}
                    </p>
                    <p className="text-xs text-muted-foreground">{data.originCountry}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-muted-foreground">
                  <ChevronRight className="h-4 w-4 mx-4" />
                  <div className="h-0.5 w-12 bg-gray-300"></div>
                  <ChevronRight className="h-4 w-4 mx-4" />
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Store className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Destination</p>
                    <p className="text-sm text-muted-foreground">
                      {data.destinationCity}, {data.destinationState}
                    </p>
                    <p className="text-xs text-muted-foreground">{data.destinationCountry}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Shipment Details</CardTitle>
            <div className="text-sm text-muted-foreground">
              Created: {formatDate(data.createdAt)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="timeline">
                <Clock className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="details">
                <FileText className="h-4 w-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="map">
                <MapPin className="h-4 w-4 mr-2" />
                Route Map
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Accordion type="multiple" className="w-full">
                {/* Sender & Recipient Info */}
                <AccordionItem value="parties">
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Sender & Recipient
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-6 p-4">
                      {/* Sender */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Sender Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-semibold">{data.Sender?.name || "N/A"}</p>
                          </div>
                          {data.Sender?.email && (
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-semibold">{data.Sender.email}</p>
                            </div>
                          )}
                          {data.Sender?.phone && (
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-semibold">{data.Sender.phone}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-semibold">{data.originAddress}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.originCity}, {data.originState} {data.originPostalCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{data.originCountry}</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recipient */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Recipient Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="font-semibold">{data.recipient.name}</p>
                          </div>
                          {data.recipient.company && (
                            <div>
                              <p className="text-sm text-muted-foreground">Company</p>
                              <p className="font-semibold">{data.recipient.company}</p>
                            </div>
                          )}
                          {data.recipient.email && (
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-semibold">{data.recipient.email}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-semibold">{data.recipient.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-semibold">{data.destinationAddress}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.destinationCity}, {data.destinationState} {data.destinationPostalCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{data.destinationCountry}</p>
                          </div>
                          {data.recipient.signatureRequired && (
                            <Badge className="bg-red-50 text-red-700 border-red-200">
                              <Lock className="h-3 w-3 mr-1" />
                              Signature Required
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Package Details */}
                <AccordionItem value="packages">
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-2">
                      <PackageIcon className="h-5 w-5" />
                      Package Details ({data.packages.length} {data.packages.length === 1 ? "package" : "packages"})
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4">
                      {data.packages.map((pkg, idx) => (
                        <Card key={idx} className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-lg">Package {idx + 1}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{pkg.packageType}</Badge>
                                {pkg.trackingNumber && (
                                  <Badge variant="secondary" className="font-mono text-xs">
                                    {pkg.trackingNumber}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{pkg.weight} kg</p>
                              <p className="text-sm text-muted-foreground">Weight</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Dimensions</span>
                                <span className="font-semibold">
                                  {pkg.length} × {pkg.width} × {pkg.height} cm
                                </span>
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Pieces</span>
                                <span className="font-semibold">{pkg.pieces}</span>
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Declared Value</span>
                                <span className="font-semibold">${pkg.declaredValue || 0}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Description</p>
                                <p className="font-medium">{pkg.description}</p>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {pkg.dangerous && (
                                  <Badge variant="destructive">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Dangerous Goods
                                  </Badge>
                                )}
                                {pkg.insurance && (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Insured
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      
                      {/* Summary */}
                      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Total Packages</p>
                              <p className="text-2xl font-bold">{data.packages.length}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Total Weight</p>
                              <p className="text-2xl font-bold">{totalWeight} kg</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Total Value</p>
                              <p className="text-2xl font-bold">${totalValue}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      Route Visualization
                    </h3>
                    <p className="text-muted-foreground">
                      Interactive map showing shipment journey
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-2" />
                    View Full Map
                  </Button>
                </div>
                
                {/* Map Placeholder */}
                <div className="bg-gradient-to-r from-blue-100 via-white to-green-100 dark:from-blue-900/20 dark:via-gray-800 dark:to-green-900/20 rounded-lg h-64 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="font-medium">Interactive Map View</p>
                      <p className="text-sm text-muted-foreground">
                        Shows real-time shipment location and route
                      </p>
                    </div>
                  </div>
                  
                  {/* Route visualization */}
                  <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Home className="h-4 w-4" />
                    </div>
                    <p className="text-xs font-medium mt-2 text-center">{data.originCity}</p>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-xs font-medium mt-2 text-center">In Transit</p>
                  </div>
                  
                  <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Store className="h-4 w-4" />
                    </div>
                    <p className="text-xs font-medium mt-2 text-center">{data.destinationCity}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="text-lg font-bold">1,248 km</p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Transit Time</p>
                    <p className="text-lg font-bold">2-3 days</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Airway Bill</p>
                        <p className="text-sm text-muted-foreground">Download PDF</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Proof of Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          {isDelivered ? "Available" : "Pending"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4"
                      disabled={!isDelivered}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Commercial Invoice</p>
                        <p className="text-sm text-muted-foreground">
                          {data.isInternational ? "Available" : "N/A"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4"
                      disabled={!data.isInternational}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Special Instructions & Alerts */}
      {(data.specialInstructions || data.deliveryAttempts) && (
        <div className="space-y-4">
          {data.specialInstructions && (
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  Special Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  {data.specialInstructions}
                </p>
              </CardContent>
            </Card>
          )}
          
          {data.deliveryAttempts && data.deliveryAttempts > 0 && !isDelivered && (
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                  Delivery Attempts: {data.deliveryAttempts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  {data.deliveryAttempts} delivery attempt{data.deliveryAttempts > 1 ? 's' : ''} made. 
                  Please contact customer service if not delivered.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}