export interface AuditLogEntry {
  id: string;
  adminUser: string;
  action:
    | "CREATED_DOCTOR"
    | "UPDATED_DOCTOR"
    | "DELETED_DOCTOR"
    | "ACTIVATED_DOCTOR"
    | "DEACTIVATED_DOCTOR"
    | "VERIFIED_DOCTOR"
    | "UNVERIFIED_DOCTOR"
    | "UPLOADED_IMAGE"
    | "DELETED_IMAGE";
  doctorId: string;
  doctorName: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __OPTICURE_AUDIT_LOGS__: AuditLogEntry[] | undefined;
}

const INITIAL_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    adminUser: "admin@opticurehealth.com",
    action: "VERIFIED_DOCTOR",
    doctorId: "doc-pooja-sankeshwar",
    doctorName: "Dr. Pooja Sankeshwar",
    details: "Verified Karnataka Medical Council Registration #KMC-54918 with NMC registry",
    timestamp: "2026-10-05T20:30:00Z"
  },
  {
    id: "log-2",
    adminUser: "admin@opticurehealth.com",
    action: "UPDATED_DOCTOR",
    doctorId: "doc-pooja-sankeshwar",
    doctorName: "Dr. Pooja Sankeshwar",
    details: "Updated subSpecialties: Added Robotic Laser Cataract (FLACS) and Contoura Vision SMILE Pro",
    timestamp: "2026-10-05T21:15:00Z"
  }
];

export function logAudit(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
  if (!global.__OPTICURE_AUDIT_LOGS__) {
    global.__OPTICURE_AUDIT_LOGS__ = [...INITIAL_LOGS];
  }

  const newLog: AuditLogEntry = {
    ...entry,
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString()
  };

  global.__OPTICURE_AUDIT_LOGS__ = [newLog, ...global.__OPTICURE_AUDIT_LOGS__];
  return newLog;
}

export function getAuditLogs(): AuditLogEntry[] {
  if (!global.__OPTICURE_AUDIT_LOGS__) {
    global.__OPTICURE_AUDIT_LOGS__ = [...INITIAL_LOGS];
  }
  return global.__OPTICURE_AUDIT_LOGS__;
}
