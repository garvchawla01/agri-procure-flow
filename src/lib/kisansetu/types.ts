export const STATUS_FLOW = [
  "REQUESTED",
  "TOKEN_GENERATED",
  "SLOT_ASSIGNED",
  "REACHED_CENTRE",
  "WEIGHING",
  "VERIFICATION",
  "COMPLETED",
  "PAYMENT_INITIATED",
] as const;

export type ProcurementStatus = (typeof STATUS_FLOW)[number];

export const STATUS_LABEL: Record<ProcurementStatus, string> = {
  REQUESTED: "Request Submitted",
  TOKEN_GENERATED: "Token Generated",
  SLOT_ASSIGNED: "Slot Assigned",
  REACHED_CENTRE: "Reached Centre",
  WEIGHING: "Weighing",
  VERIFICATION: "Verification",
  COMPLETED: "Procurement Completed",
  PAYMENT_INITIATED: "Payment Initiated",
};

export type Farmer = {
  id: string;
  name: string;
  mobile: string;
  village: string;
  farmerId: string;
};

export type Centre = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  queue: number;
  availableSlots: number;
  status: "Open" | "Almost Full" | "Closed";
};

export type ProcurementRequest = {
  requestId: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  quantity: number;
  actualWeight?: number;
  centre: string;
  date: string;
  token: string;
  slot: string;
  status: ProcurementStatus;
  verification?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: string;
  farmerId: string;
  title: string;
  message: string;
  kind: "token" | "slot" | "scan" | "weighing" | "verification" | "payment" | "info";
  createdAt: string;
  read: boolean;
};

export const CROPS = ["Wheat", "Paddy (Rice)", "Maize", "Bajra", "Gram (Chana)", "Mustard"];

export const SLOTS = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
];

export const VERIFICATION_ITEMS = [
  "Farmer Identity",
  "Land / Farmer Documents",
  "Crop Details",
  "Token",
  "Weight Details",
];

export function statusIndex(status: ProcurementStatus) {
  return STATUS_FLOW.indexOf(status);
}
