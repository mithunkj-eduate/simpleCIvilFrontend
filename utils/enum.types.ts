export enum LicenseTypes {
  NONE = "NONE",
  USER = "USER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  RESELLER = "RESELLER",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  PICE_WORKER = "PICE_WORKER",
  RAIDER = "raider"
}

export enum AuthMethod {
  NONE = "none",
  EMAIL_AUTH = "email",
  GOOGLE_AUTH = "google",
  PHONE_AUTH = "phone",
}

export enum UserType {
  USER = "user",
  ADMIN = "admin",
  SELLER = "seller",
  RESELLER = "reseller",
  PROJECT_MANAGER = "project_manager",
  SYSTEM_ADMIN = "system_admin",
  PICE_WORKER = "pice_worker",
  RAIDER = "raider"
}

export enum CategoryLevelType {
  GROUP = "group",
  CATEGORY = "category",
  SUBSIDIARY = "subsidiary",
}

export enum ApiPathType {
  USERS = "users",
  STROES = "stores",
  ALL_CATEGORIES = "categories",
  CATEGORIES_GROUP = `categories?level=${CategoryLevelType.GROUP}`,
  CATEGORIES_CATEGORIES = `categories?level=${CategoryLevelType.CATEGORY}`,
  CATEGORIES_SUBSIDIARY = `categories?level=${CategoryLevelType.SUBSIDIARY}`,
}

export enum CatrgroryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

