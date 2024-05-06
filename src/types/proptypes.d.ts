interface IJobDescription {
    companyName: string;
    jdLink: string;
    jdUid: string;
    jobDetailsFromCompany: string;
    jobRole: string;
    location: string;
    logoUrl: string;
    maxExp: number;
    maxJdSalary: number;
    minExp: number;
    minJdSalary: number;
    salaryCurrencyCode: string;
  }
  interface IFilterParams {
    role: string;
    experience: string;
    location: string;
    remote: string;
    searchCompany?:string,
  }

  export {IJobDescription,IFilterParams}