import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

import { prisma } from "@/constants/config/db";
import { ShipmentsPage } from "@/components/features/shipment/shipment.page";
import { ShipmentStatus } from "@/components/features/shipment/shipment.page";

export const metadata: Metadata = {
  title: "My Shipments | Shipping Dashboard",
  description: "Manage and track all your shipments in one place",
};

function mapStatus(dbStatus: string | null | undefined): ShipmentStatus {
  if (!dbStatus) return "Proccessing";
  
  const status = dbStatus.toLowerCase();
  
  if (status === "Delivered") return "Delivered";
  if (status === "In_transit" || status === "In-transit") return "In_transit";
  if (status === "Picked_up") return "Picked_up";
  if (status === "Departed") return "Departed";
  if (status === "Arrived") return "Arrived";
  if (status === "On_hold") return "On_hold";
  if (status === "Failed") return "Failed";
  if (status === "Returned") return "Returned";
  if (status === "Information_received") return "Information_received";
  
  return "Proccessing";
}

export default async function ShipmentsRoute() {
  const session = await auth();

  console.log("========== DEBUG ==========");
  console.log("SESSION:", session ? "EXISTS" : "NULL");
  console.log("USER ID:", session?.user?.id);
  console.log("USER ROLE:", session?.user?.role);

  if (!session) {
    console.log("NO SESSION - REDIRECTING TO LOGIN");
    redirect("/login");
  }

  // Get user-specific shipments
  const shipments = await prisma.shipment.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      userId: true,
      originCity: true,
      originCountry: true,
      destinationCity: true,
      destinationCountry: true,
      createdAt: true,
      estimatedDelivery: true,
      deliveredAt: true,
      trackingNumber: true,
      originPostalCode: true,
      destinationPostalCode: true,
      packages: {
        select: {
          id: true,
          weight: true,
          description: true,
          packageType: true,
          declaredValue: true,
        },
      },
      recipient: {
        select: {
          name: true,
          company: true,
          email: true,
          phone: true,
        },
      },
      serviceType: true,
      TrackingUpdates: {
        orderBy: {
          timestamp: "desc",
        },
        take: 1,
        select: {
          message: true,
          status: true,
          location: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("SHIPMENTS FOUND FOR USER:", shipments.length);
  
  if (shipments.length > 0) {
    console.log("FIRST SHIPMENT ID:", shipments[0].id);
    console.log("FIRST SHIPMENT USER_ID:", shipments[0].userId);
    console.log("FIRST SHIPMENT TRACKING:", shipments[0].trackingNumber);
    console.log("FIRST SHIPMENT STATUS:", shipments[0].TrackingUpdates[0]?.status);
  }
  
  console.log("========== END DEBUG ==========");

  const formattedShipments = shipments.map((shipment) => {
    const origin = `${shipment.originCity}, ${shipment.originCountry}`;
    const destination = `${shipment.destinationCity}, ${shipment.destinationCountry}`;

    const totalWeight = shipment.packages.reduce(
      (acc, pkg) => acc + (pkg.weight || 0),
      0
    );
    const totalValue = shipment.packages.reduce(
      (acc, pkg) => acc + (pkg.declaredValue || 0),
      0
    );

    const dateFormatted = new Date(shipment.createdAt).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" }
    );

    const etaFormatted = shipment.estimatedDelivery
      ? new Date(shipment.estimatedDelivery).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric",
        })
      : "N/A";

    const deliveredFormatted = shipment.deliveredAt
      ? new Date(shipment.deliveredAt).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric",
        })
      : null;

    const latestUpdate = shipment.TrackingUpdates[0];

    return {
      id: shipment.id,
      tracking_number: shipment.trackingNumber,
      origin,
      destination,
      date: dateFormatted,
      eta: etaFormatted,
      originPostalCode: shipment.originPostalCode,
      destinationPostalCode: shipment.destinationPostalCode,
      delivered: deliveredFormatted,
      items: shipment.packages.length,
      weight: `${totalWeight.toFixed(1)} kg`,
      type: shipment.serviceType,
      value: `$${totalValue.toFixed(2)}`,
      status: mapStatus(latestUpdate?.status),
      lastUpdate: latestUpdate?.message || "No updates available",
      recipient: {
        name: shipment.recipient?.name || "Unknown",
        imageUrl: null,
      },
    };
  });

  console.log("FORMATTED SHIPMENTS COUNT:", formattedShipments.length);

  return <ShipmentsPage shipments={formattedShipments} />;
}