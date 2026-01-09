
export enum UserRole {
  GUEST = 'GUEST',
  INTERNAL_USER = 'INTERNAL_USER',
  TECH_MANAGER = 'TECH_MANAGER',
  ADMIN = 'ADMIN'
}

export enum ResourceType {
  SERVER = 'Server',
  VM = 'Virtual Machine',
  STORAGE = 'Storage',
  NETWORK = 'Network'
}

export enum ResourceStatus {
  AVAILABLE = 'Available',
  RESERVED = 'Reserved',
  MAINTENANCE = 'Maintenance',
  OFFLINE = 'Offline'
}

export enum ReservationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  ACTIVE = 'Active',
  COMPLETED = 'Completed'
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  specs: {
    cpu?: string;
    ram?: string;
    storage?: string;
    bandwidth?: string;
    os?: string;
    location: string;
  };
  managerId: string;
}

export interface Reservation {
  id: string;
  resourceId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: ReservationStatus;
  justification: string;
  rejectionReason?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}
