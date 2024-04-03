import axios from "axios";

class employeeService {
  async createEmployee(newEmployee) {
    const re = await axios
      .post("/employees", {
        data: newEmployee,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        this.reloadData = !this.reloadData;
      })
      .catch((e) => {
        this.errors.push(e);
      });

    return re;
  }
  async getEmployees(props) {
    const params = new URLSearchParams();
    props?.search && params.append("search", props?.search);
    props?.sortBy &&
      props.sortBy != "sort" &&
      params.append("sortBy", props?.sortBy);
    props?.sortDirection &&
      params.append("sortDirection", props?.sortDirection);
    props.pagination?.page && params.append("page", props.pagination.page);
    props.pagination?.pageSize &&
      params.append("pageSize", props.pagination.pageSize);
    console.log(`/employees?${params.toString()}`);
    const re = await axios
      .get(`/employees?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    return re;
  }
  async getEmployee(id) {
    const re = await axios
      .get(`/employees/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    return re;
  }
  async updateEployee(employee) {
    axios
      .put(`/employees/${employee.id}`, {
        data: employee,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((e) => {
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      });
  }

  async deleteEmployee(id) {
    axios
      .delete(`/employees/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        this.reloadData = !this.reloadData;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  }
}

export default new employeeService();
