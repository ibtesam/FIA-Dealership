export const LANGUAGE_ID = {
  ENGLISH: 1,
  SPANISH: 2,
};

export const Patterns = {
  passwordPattern:
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
  PASSWORD_PATTERN: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/,
  phoneNumberPattern: /^\+(92-)[3][0-9]{9}$/,
  passwordPattern3: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9]).{8,}$/,
  urlPattern:
    "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
  alphaNumeric: "^([a-zA-Z0-9 ]+)$",
  alphaWithSpecChar: "^[ A-Za-z_@./#&+-]*$",
  WEBSITE:
    /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
};

export const SORT_ORDER = {
  ASC: "ascend",
  DESC: "descend",
};

export const SORT_ORDER_VALUE = {
  ascend: "ASC",
  descend: "DESC",
};

export const PAGINATION_CONSTANT = {
  PAGE_SIZE: 10,
  PAGE_NUMBER: 1,
};

export const phoneMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const phoneMask2 = [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
export const TRANSMISSION_ENUMS = {1: "Automatic", 2: "Manual"};
export const USER_CONST = [
  {
    id: 1,
    name: "Admin"
  },
  {
    id: 2,
    name: "Customer"
  },
]
export const TRANSMISSION_CONST = [
  {
    id: 1,
    name: "Automatic"
  },
  {
    id: 2,
    name: "Manual"
  },
]

export const VEHICLE_STATUS_CONST = {
  0: "InValid",
  1: "Active",
  2: "Owned",
  3: "Inactive" 
}