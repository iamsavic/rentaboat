export type Locale = "en" | "sr";

export type TourWithVessel = {
  id: string;
  nameSr: string;
  nameEn: string;
  slugSr: string;
  slugEn: string;
  durationHours: number;
  priceEur: number;
  fixedPrice: boolean;
  requiresDeposit: boolean;
  depositAmount: number | null;
  descriptionSr: string;
  descriptionEn: string;
  destinationsSr: string[];
  destinationsEn: string[];
  coverImage: string | null;
  gallery: string[];
  active: boolean;
  sortOrder: number;
  vessel: {
    id: string;
    name: string;
    capacity: number;
    location: {
      name: string;
      address: string;
      googleMapsUrl: string;
      whatsappNumber: string;
      contactPhone: string;
    };
  };
};

export type BookingFormData = {
  tourId: string;
  vesselId: string;
  date: string;
  startTime: string;
  persons: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  notes?: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  acceptMarketing?: boolean;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type BookingStep = 1 | 2 | 3 | 4;
