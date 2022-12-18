import { EmployeeTable } from "../components/employee/EmployeeTable";
import { AppLayout } from "../components/layouts/AppLayout";

import employeeData from "../data/employees.json";

const BackOffice = () => {
  return (
    <AppLayout activeNav="Back Office">
      <EmployeeTable data={employeeData.data} />
    </AppLayout>
  );
};

export default BackOffice;
