<template>
        <div>
                <span class="btn primary" @click="showModal">Update Empployee</span>
                <div class="card">
                        <div class="card-header">
                                <h2>{{ employee.name }}</h2>
                        </div>
                        <div class="card-body">
                                <p>
                                        <strong>Email:</strong>
                                        {{ employee.email }}
                                </p>
                                <p>
                                        <strong>Phone:</strong>
                                        {{ employee.phone }}
                                </p>
                                <p><strong>Age:</strong> {{ employee.age }}</p>
                                <p>
                                        <strong>Salary:</strong>
                                        {{ employee.salary | salaryFormat }}
                                </p>
                                <p>
                                        <strong>Address:</strong>
                                        {{ employee.address }}
                                </p>
                        </div>
                </div>
                <Modal v-show="modal" @close="closeModal">
                        <template #header>
                                <span>Update Employee</span>
                        </template>
                        <div class="formCreate">
                                <div>
                                        <label for="name">Name:</label>
                                        <input type="text" id="name" v-model="employee.name" />
                                </div>
                                <div>
                                        <label for="email">Email:</label>
                                        <input type="email" id="email" v-model="employee.email" />
                                </div>
                                <div>
                                        <label for="phone">Phone:</label>
                                        <input type="tel" id="phone" v-model="employee.phone" />
                                </div>
                                <div>
                                        <label for="age">Age:</label>
                                        <input type="number" id="age" v-model.number="employee.age" />
                                </div>
                                <div>
                                        <label for="salary">Salary:</label>
                                        <input type="number" id="salary" v-model.number="employee.salary" />
                                </div>
                                <div>
                                        <label for="address">Address:</label>
                                        <textarea id="address" v-model="employee.address
                        "></textarea>
                                </div>
                        </div>

                        <template #footer>
                                <div class="primary submit" @click="submitModal">
                                        Submit
                                </div>
                        </template>
                </Modal>
        </div>
</template>

<script>
import employeeService from "../services/employeeService.js";
import Modal from "../components/modal";

export default {
        name: "EmployeeDetail",
        components: {
                Modal,
        },
        data() {
                return {
                        employeeId: "",
                        employee: {},
                        modal: false,
                };
        },
        methods: {
                showModal() {
                        this.modal = true;
                },
                closeModal() {
                        this.modal = false;
                },
                submitModal() {
                        employeeService.updateEployee(this.employee).then(() => { this.reloadData(); this.modal = false }).catch((e) => { console.log(e) })
                },
                reloadData() {

                        employeeService.getEmployee(this.employeeId)
                                .then((e) => {
                                        this.employee = e;
                                        console.log(e)
                                })
                                .catch((e) => {
                                        console.log(e);
                                });
                }
        },
        created() {
                this.employeeId = this.$route.params.id;
                this.reloadData()
        },
        filters: {
                salaryFormat: function (value) {
                        return (
                                value
                                        .toFixed(2)
                                        .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                                " USD"
                        );
                },
        },
};
</script>

<style scoped>
.card {
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
}

.card-header {
        background-color: #f0f0f0;
        padding: 10px;
        border-bottom: 1px solid #ccc;
}

.card-body {
        padding: 20px;
}
</style>
