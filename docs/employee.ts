export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  address: string;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  benefits: string[];
  training: string[];
  performanceReviews: PerformanceReview[];
  careerGoals: string;
  vacation: number;
  sickLeave: number;
  otherTimeOff: TimeOff[];
  policies: Policy[];
};

export type PerformanceReview = {
  date: Date;
  review: string;
};

export type TimeOff = {
  type: string;
  startDate: Date;
  endDate: Date;
};

export type Policy = {
  name: string;
  description: string;
};
