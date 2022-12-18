import { BackOfficeLayout } from "../../components/backOffice/BackOfficeLayout";
import { EmployeeTable } from "../../components/employee/EmployeeTable";

import employeeData from "../../data/employees.json";

const Dummy = () => {
  return (
    <BackOfficeLayout navTitle="Back Office">
      <EmployeeTable data={employeeData.data} />
    </BackOfficeLayout>
  );
};

export default Dummy;
