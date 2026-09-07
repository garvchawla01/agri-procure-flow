import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEMO_FARMER_ID,
  demoCentres,
  demoFarmers,
  demoNotifications,
  demoRequests,
} from "./data";
import {
  STATUS_FLOW,
  STATUS_LABEL,
  type Centre,
  type Farmer,
  type Notification,
  type ProcurementRequest,
  type ProcurementStatus,
} from "./types";

const STORAGE_KEY = "kisansetu:state:v1";

type State = {
  farmers: Farmer[];
  centres: Centre[];
  requests: ProcurementRequest[];
  notifications: Notification[];
  currentFarmerId: string;
};

const initialState: State = {
  farmers: demoFarmers,
  centres: demoCentres,
  requests: demoRequests,
  notifications: demoNotifications,
  currentFarmerId: DEMO_FARMER_ID,
};

type NewRequestInput = {
  farmerName: string;
  farmerId: string;
  crop: string;
  quantity: number;
  centre: string;
  date: string;
  contact: string;
  slot?: string;
};

type StoreValue = {
  state: State;
  currentFarmer: Farmer;
  farmerRequests: ProcurementRequest[];
  farmerNotifications: Notification[];
  createRequest: (input: NewRequestInput) => ProcurementRequest;
  advanceStatus: (requestId: string) => void;
  setStatus: (requestId: string, status: ProcurementStatus) => void;
  saveWeight: (requestId: string, weight: number) => void;
  completeVerification: (requestId: string, items: string[]) => void;
  assignSlot: (requestId: string, slot: string) => void;
  markAllRead: () => void;
  findByToken: (token: string) => ProcurementRequest | undefined;
  resetDemo: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function nowISO() {
  return new Date().toISOString();
}

function nextToken(requests: ProcurementRequest[]) {
  const numbers = requests
    .map((r) => Number(r.token.replace(/\D/g, "")))
    .filter((n) => !Number.isNaN(n));
  const next = (numbers.length ? Math.max(...numbers) : 100) + 1;
  return `A${String(next).padStart(3, "0")}`;
}

function notify(
  farmerId: string,
  title: string,
  message: string,
  kind: Notification["kind"],
): Notification {
  return {
    id: `n-${Math.random().toString(36).slice(2, 9)}`,
    farmerId,
    title,
    message,
    kind,
    createdAt: nowISO(),
    read: false,
  };
}

function notificationForStatus(req: ProcurementRequest): Notification | null {
  switch (req.status) {
    case "TOKEN_GENERATED":
      return notify(req.farmerId, "Token generated", `Your token ${req.token} has been generated.`, "token");
    case "SLOT_ASSIGNED":
      return notify(
        req.farmerId,
        "Slot confirmed",
        `Your procurement slot is confirmed for ${req.slot}.`,
        "slot",
      );
    case "REACHED_CENTRE":
      return notify(
        req.farmerId,
        "Token scanned",
        `Your token ${req.token} has been scanned at ${req.centre}.`,
        "scan",
      );
    case "WEIGHING":
      return notify(req.farmerId, "Weighing completed", `Weighing has been completed for token ${req.token}.`, "weighing");
    case "VERIFICATION":
      return notify(req.farmerId, "Verification completed", `Verification is completed for token ${req.token}.`, "verification");
    case "COMPLETED":
      return notify(req.farmerId, "Procurement completed", `Procurement completed for token ${req.token}.`, "info");
    case "PAYMENT_INITIATED":
      return notify(req.farmerId, "Payment initiated", `Payment has been initiated for token ${req.token}.`, "payment");
    default:
      return null;
  }
}

export function KisansetuProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as State) });
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  const updateRequest = useCallback(
    (requestId: string, patch: (req: ProcurementRequest) => ProcurementRequest) => {
      setState((prev) => {
        const target = prev.requests.find((r) => r.requestId === requestId);
        if (!target) return prev;
        const updated = { ...patch(target), updatedAt: nowISO() };
        const note = updated.status !== target.status ? notificationForStatus(updated) : null;
        return {
          ...prev,
          requests: prev.requests.map((r) => (r.requestId === requestId ? updated : r)),
          notifications: note ? [note, ...prev.notifications] : prev.notifications,
        };
      });
    },
    [],
  );

  const createRequest = useCallback((input: NewRequestInput) => {
    const token = nextToken(state.requests);
    const created: ProcurementRequest = {
      requestId: `REQ-${Math.floor(Math.random() * 9000 + 2000)}`,
      farmerId: input.farmerId || DEMO_FARMER_ID,
      farmerName: input.farmerName,
      crop: input.crop,
      quantity: input.quantity,
      centre: input.centre,
      date: input.date,
      token,
      slot: input.slot ?? "10:00 AM – 11:00 AM",
      status: "SLOT_ASSIGNED",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setState((prev) => ({
      ...prev,
      requests: [created, ...prev.requests],
      farmers: prev.farmers.some((f) => f.farmerId === created.farmerId)
        ? prev.farmers
        : [
            ...prev.farmers,
            {
              id: `f-${created.farmerId}`,
              name: created.farmerName,
              mobile: input.contact,
              village: "—",
              farmerId: created.farmerId,
            },
          ],
      notifications: [
        notify(created.farmerId, "Slot confirmed", `Your procurement slot is confirmed for ${created.slot}.`, "slot"),
        notify(created.farmerId, "Token generated", `Your token ${token} has been generated.`, "token"),
        notify(created.farmerId, "Request submitted", `Your procurement request for ${created.crop} was submitted.`, "info"),
        ...prev.notifications,
      ],
    }));
    return created;
  }, [state.requests]);

  const advanceStatus = useCallback(
    (requestId: string) => {
      updateRequest(requestId, (req) => {
        const idx = STATUS_FLOW.indexOf(req.status);
        const next = STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)]!;
        const patch: ProcurementRequest = { ...req, status: next };
        if (next === "WEIGHING" && !patch.actualWeight) {
          patch.actualWeight = Math.max(1, Math.round(req.quantity * 0.97));
        }
        return patch;
      });
    },
    [updateRequest],
  );

  const value = useMemo<StoreValue>(() => {
    const currentFarmer =
      state.farmers.find((f) => f.farmerId === state.currentFarmerId) ?? state.farmers[0]!;
    return {
      state,
      currentFarmer,
      farmerRequests: state.requests.filter((r) => r.farmerId === state.currentFarmerId),
      farmerNotifications: state.notifications.filter((n) => n.farmerId === state.currentFarmerId),
      createRequest,
      advanceStatus,
      setStatus: (requestId, status) => updateRequest(requestId, (req) => ({ ...req, status })),
      saveWeight: (requestId, weight) =>
        updateRequest(requestId, (req) => ({ ...req, actualWeight: weight, status: "WEIGHING" })),
      completeVerification: (requestId, items) =>
        updateRequest(requestId, (req) => ({ ...req, verification: items, status: "VERIFICATION" })),
      assignSlot: (requestId, slot) =>
        updateRequest(requestId, (req) => ({ ...req, slot, status: "SLOT_ASSIGNED" })),
      markAllRead: () =>
        setState((prev) => ({
          ...prev,
          notifications: prev.notifications.map((n) => ({ ...n, read: true })),
        })),
      findByToken: (token) =>
        state.requests.find((r) => r.token.toUpperCase() === token.trim().toUpperCase()),
      resetDemo: () => setState(initialState),
    };
  }, [state, createRequest, advanceStatus, updateRequest]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useKisansetu() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useKisansetu must be used inside KisansetuProvider");
  return ctx;
}

export { STATUS_LABEL };
