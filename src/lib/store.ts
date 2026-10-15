import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LangCode } from "./languages";
import type { DeliveryJob, Diagnosis, Listing, Role, Season, SoilReading, SoilType } from "./types";
import { currentSeason } from "./crops";
import { uid } from "./format";

type State = {
  hydrated: boolean;
  lang: LangCode;
  role: Role | null;
  onboarded: boolean;
  name: string;
  village: string;
  state: string;
  acres: number;
  soilType: SoilType;
  irrigated: boolean;
  season: Season;
  soilTests: SoilReading[];
  diagnoses: Diagnosis[];
  listings: Listing[];
  jobs: DeliveryJob[];
  setHydrated: (v: boolean) => void;
  setLang: (lang: LangCode) => void;
  setRole: (role: Role) => void;
  completeOnboarding: (role: Role) => void;
  updateProfile: (p: Partial<Pick<State, "name" | "village" | "state" | "acres" | "soilType" | "irrigated" | "season">>) => void;
  addSoilTest: (t: SoilReading) => void;
  addDiagnosis: (d: Diagnosis) => void;
  addListing: (l: Omit<Listing, "id" | "createdAt">) => void;
  seedMarket: () => void;
  acceptJob: (id: string) => void;
  advanceJob: (id: string) => void;
  resetRole: () => void;
};

function seedJobs(): DeliveryJob[] {
  const now = new Date().toISOString();
  return [
    {
      id: "job-seed-1",
      cropId: "onion",
      qtyQtl: 24,
      pickup: "Saoner, Nagpur",
      drop: "Kalamna Mandi, Nagpur",
      km: 38,
      payInr: 920,
      status: "open",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "job-seed-2",
      cropId: "tomato",
      qtyQtl: 12,
      pickup: "Katol",
      drop: "Sitabuldi market",
      km: 52,
      payInr: 1180,
      status: "open",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "job-seed-3",
      cropId: "wheat",
      qtyQtl: 40,
      pickup: "Hingna",
      drop: "Kalambha mill gate",
      km: 22,
      payInr: 640,
      status: "open",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function seedListings(): Listing[] {
  const now = new Date().toISOString();
  return [
    {
      id: "lot-1",
      farmerName: "Savita Patil",
      village: "Saoner",
      state: "Maharashtra",
      cropId: "onion",
      qtyQtl: 24,
      pricePerQtl: 1850,
      grade: "A",
      notes: "Nashik red, cured 8 days.",
      needDelivery: true,
      createdAt: now,
      harvestDate: now,
    },
    {
      id: "lot-2",
      farmerName: "Harpreet Singh",
      village: "Khanna",
      state: "Punjab",
      cropId: "wheat",
      qtyQtl: 80,
      pricePerQtl: 2420,
      grade: "FAQ",
      notes: "HD-3086, moisture 11%.",
      needDelivery: false,
      createdAt: now,
      harvestDate: now,
    },
    {
      id: "lot-3",
      farmerName: "Lakshmi Reddy",
      village: "Guntur",
      state: "Andhra Pradesh",
      cropId: "tomato",
      qtyQtl: 18,
      pricePerQtl: 1400,
      grade: "A",
      notes: "Picked this morning.",
      needDelivery: true,
      createdAt: now,
      harvestDate: now,
    },
  ];
}

export const useApp = create<State>()(
  persist(
    (set, get) => ({
      hydrated: false,
      lang: "en",
      role: null,
      onboarded: false,
      name: "",
      village: "",
      state: "Maharashtra",
      acres: 4,
      soilType: "black",
      irrigated: true,
      season: currentSeason(),
      soilTests: [],
      diagnoses: [],
      listings: seedListings(),
      jobs: seedJobs(),
      setHydrated: (v) => set({ hydrated: v }),
      setLang: (lang) => set({ lang }),
      setRole: (role) => set({ role }),
      completeOnboarding: (role) => set({ role, onboarded: true }),
      updateProfile: (p) => set(p),
      addSoilTest: (t) => set({ soilTests: [t, ...get().soilTests] }),
      addDiagnosis: (d) => set({ diagnoses: [d, ...get().diagnoses] }),
      addListing: (l) => {
        const listing: Listing = { ...l, id: uid("lot"), createdAt: new Date().toISOString() };
        const jobs = [...get().jobs];
        if (listing.needDelivery) {
          const km = 18 + Math.round(Math.random() * 40);
          jobs.unshift({
            id: uid("job"),
            listingId: listing.id,
            cropId: listing.cropId,
            qtyQtl: listing.qtyQtl,
            pickup: `${listing.village}, ${listing.state}`,
            drop: `Nearest mandi, ${listing.state}`,
            km,
            payInr: 280 + km * 16,
            status: "open",
            createdAt: listing.createdAt,
            updatedAt: listing.createdAt,
          });
        }
        set({ listings: [listing, ...get().listings], jobs });
      },
      seedMarket: () => {
        if (get().listings.length === 0) set({ listings: seedListings(), jobs: seedJobs() });
      },
      acceptJob: (id) =>
        set({
          jobs: get().jobs.map((j) =>
            j.id === id ? { ...j, status: "accepted", updatedAt: new Date().toISOString() } : j,
          ),
        }),
      advanceJob: (id) =>
        set({
          jobs: get().jobs.map((j) => {
            if (j.id !== id) return j;
            const next = j.status === "accepted" ? "picked" : j.status === "picked" ? "delivered" : j.status;
            return { ...j, status: next, updatedAt: new Date().toISOString() };
          }),
        }),
      resetRole: () => set({ role: null, onboarded: false }),
    }),
    {
      name: "khetsaathi-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        lang: s.lang,
        role: s.role,
        onboarded: s.onboarded,
        name: s.name,
        village: s.village,
        state: s.state,
        acres: s.acres,
        soilType: s.soilType,
        irrigated: s.irrigated,
        season: s.season,
        soilTests: s.soilTests,
        diagnoses: s.diagnoses,
        listings: s.listings,
        jobs: s.jobs,
      }),
      onRehydrateStorage: () => () => {
        useApp.setState({ hydrated: true });
      },
    },
  ),
);
