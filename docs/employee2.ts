export type Employee = {
  id: string;
  personalInformation: PersonalInformation;
  jobInformation: JobInformation;
  professionalDevelopment: ProfessionalDevelopment;
  timeOff: TimeOff;
  policies: Policy[];
};

type PersonalInformation = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  address: string;
};

type JobInformation = {
  jobTitle: string;
  jobDescription: string;
  salary: number;
  benefits: string[];
};

type ProfessionalDevelopment = {
  training: string[];
  performanceReviews: PerformanceReview[];
  careerGoals: string;
};

type TimeOff = {
  vacation: number;
  sickLeave: number;
  otherTimeOff: OtherTimeOff[];
};

type OtherTimeOff = {
  type: string;
  startDate: Date;
  endDate: Date;
};

type Policy = {
  name: string;
  description: string;
};

export type PerformanceReview = {
  date: Date;
  review: string;
};
