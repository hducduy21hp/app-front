<template>
  <div class="home_content" v-resize="handleResize">
    <div class="table-session">
      <!-- Employee management table -->
      <div class="toolTableBar">
        <!-- Create button -->
        <span class="btn primary" @click="changeCreateModal">Create Empployee</span>

        <div class="search">
          <input type="text" v-model="params.search">
          <select name="sortBy" id="sortBy" v-model="params.sortBy">
            <option value="sort">Sort</option>
            <option value="age">Age</option>
            <option value="salary">Salary</option>
          </select>
          <select name="sortDirection" id="sortDirection" v-model="params.sortDirection">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <div class="btn primary" @click="filterData">Search</div>
        </div>
      </div>
      <table>
        <!-- Table header -->
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Salary</th>
          <th>Address</th>
          <th colspan="2">Action</th>
        </tr>

        <!-- Loop each row of data -->
        <tr class="empl_row" v-for="(item, index) in employee" v-bind:key="item.id">
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.salary |salaryFormat }}</td>
          <td>{{ item.address }}</td>
          <td>
            <div class="detail_employee btn info" @click="
          gotoDetail(item.id)
          ">
              Detail
            </div>
          </td>
          <td>
            <div class="remove_employee btn dangerous" @click="changeDeleteModal(item.id)">Remove</div>
          </td>
        </tr>
      </table>
    </div>
    
    <Pagination :page="params.pagination.page" :total-pages="params.pagination.totalPages" :setPage="setPage" />

    <!-- Modal -->
    <Modal v-show="modal" @close="closeModal">
      <template #header>
        <span v-if="action == 'create'">Create Employee</span>
        <span v-if="action == 'delete'">Confirm delete employee</span>
      </template>
      <div class="formCreate" v-if="action == 'create'">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model.number="newEmployee.name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model.number="newEmployee.email" />
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input type="tel" id="phone" v-model.number="newEmployee.phone" />
        </div>
        <div>
          <label for="age">Age:</label>
          <input type="number" id="age" v-model.number="newEmployee.age" />
        </div>
        <div>
          <label for="salary">Salary:</label>
          <input type="number" id="salary" v-model.number="newEmployee.salary" />
        </div>
        <!-- <div>
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model.number="newEmployee.startDate" />
        </div> -->
        <div>
          <label for="address">Address:</label>
          <textarea id="address" v-model.number="newEmployee.address"></textarea>
        </div>
      </div>

      <template #footer>
        <div class="primary submit" @click="submitModal" v-if="action == 'create'">
          Submit
        </div>
        <div class="dangerous submit" @click="submitModal" v-if="action == 'delete'">
          Submit
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import router from "../utils/router"
import Modal from "../components/modal";
import Pagination from "../components/Pagination";
import employeeService from "../services/employeeService.js"
export default {
  name: "Employee",
  components: {
    Modal,
    Pagination
  },
  data() {
    return {
      newEmployee: {},
      deleteId: "",
      employee: [],
      errors: [],
      modal: false,
      action: "create",
      reloadData: true,
      params: {
        search: "",
        sortBy: "sort",
        sortDirection: "asc",
        pagination:{
          page: 1,
          pageSize: 10,
          totalEmployees: null,
          totalPages: 20
        }
      }
    };
  },
  watch: {
    async reloadData() {
      const empls = await employeeService.getEmployees(this.params)
      this.employee = empls.data
      this.params.pagination = {
          page: empls.page,
          pageSize: empls.pageSize,
          totalEmployees: empls.totalEmployees,
          totalPages: empls.totalPages
        }
    }
  },
  methods: {
    changeCreateModal() {
      this.action = 'create'
      this.modal = true;
    },
    changeDeleteModal(id) {
      this.action = 'delete'
      this.deleteId = id
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    async submitModal() {
      switch (this.action) {
        case "create":
          await employeeService.createEmployee(this.newEmployee)
          break;
        case "delete":
          await employeeService.deleteEmployee(this.deleteId)
          break;
      }
      this.reloadData = !this.reloadData;
      this.closeModal()
    },
    gotoDetail(id) {
      router.push({ name: 'employee-detail', params: { id: id } });
    },
    handleResize(width, height) {
      console.log(
        'Window dimensions changed:',
        width, height);
    },
    filterData(){
      this.reloadData = !this.reloadData;
    },
    setPage(page){
      this.params.pagination.page = page;
      this.reloadData = !this.reloadData;
    }
  },
  created() {
    this.reloadData = !this.reloadData;
  },
  directives: {
    resize: {
      bind: function (el, binding) {
        const handleResize = () => {
          binding.value(
            window.innerWidth,
            window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        el._handleResize = handleResize;

        // Call the handler once
        // to initialize the dimensions
        handleResize();
      },
      unbind(el) {
        window.removeEventListener('resize', el._handleResize);
      },
    }
  },
  filters:{
    salaryFormat: function (value){
      return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' USD';
    }
  }
};
</script>

<style>
table {
  border: 1px solid black;
  border-collapse: collapse;
  margin-top: 10px;
}

td,
th {
  padding: 10px 20px;
}

.detail_employee {
  border-radius: 5px;
  cursor: pointer;
}

.remove_employee {
  border-radius: 5px;
  cursor: pointer;
  padding-left: 5px !;
}

.formCreate {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.formCreate>input {
  width: auto;
  height: 25px;
  padding-left: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}

.home_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.toolTableBar {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.table-session{
  margin-bottom: 10px;
}

.search {
  display: flex;
}

.submit {
  width: 60px;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>
