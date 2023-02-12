import { ClientAccountCategory } from "./ClientAccountCategoryID.model";

export interface Client {
  clientID: string;
  clientName: string;
  jobName: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  aboutMe: string;
  genderID: string;
  genderName?: string;
  knowUsID: string;
  knowUsName?: string;
  yearsOfExperienceID: string;
  yearsOfExperienceName?: string;
  countryID: string;
  countryName?: string;
  districtID: string;
  districtName?: string;
  governorateID: string;
  governorateName?: string;
  // cityID: string;
  // cityName?: string;
  accountTypeID: string;
  accountTypeName?: string;
  webSite : string
  faceBook : string;
  photo? : string;
  // accountCategoryID: string;
  // accountCategoryName?: string;
  loginType?: number;
  isActivated?: boolean;
  clientAccountCategories : ClientAccountCategory[];
}
