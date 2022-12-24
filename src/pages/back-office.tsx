import { BackOfficeLayout } from "~/components/back-office/BackOfficeLayout";
import { EmployeeTable } from "~/components/employee/EmployeeTable";
import employeeData from "~/data/employees.json";

const BackOffice = () => {
  return (
    <BackOfficeLayout navTitle="Back Office">
      <EmployeeTable data={employeeData.data} />
    </BackOfficeLayout>
  );
};

export default BackOffice;
