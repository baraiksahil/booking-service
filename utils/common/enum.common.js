const SERVICE_TYPES = {
  CLINIC: "Clinic",
  SALON: "Salon",
  CONSULTANCY: "Consultancy",
};

const SLOT_STATUS = {
  AVAILABLE: "AVAILABLE",
  LOCKED: "LOCKED",
  BOOKED: "BOOKED",
  MAINTENANCE: "MAINTENANCE",
};

export const APPOINTMENT_STATUS = {
  PENDING: "PENDING", // Created but not yet confirmed (useful if you add payments later)
  BOOKED: "BOOKED", // Confirmed slot
  COMPLETED: "COMPLETED", // Service is done
  CANCELLED: "CANCELLED", // User or Admin cancelled
  REJECTED: "REJECTED", // Admin denied the request
};

export default {
  SERVICE_TYPES,
  SLOT_STATUS,
  APPOINTMENT_STATUS,
};
