import { EmployeeTable } from "../components/employee/EmployeeTable";
import { AppLayout } from "../components/layouts/AppLayout";

import employeeData from "../data/employees.json";

const Account = () => {
  return (
    <AppLayout activeNav="Account">
      <EmployeeTable data={employeeData.data} />
    </AppLayout>
  );
};

export default Account;
