<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="page === 1">Prev</button>
    <button v-for="n in nearPages" :key="n" @click="goToPage(n)" :class="{ active: n === page }">{{ n }}</button>
    <button @click="nextPage" :disabled="page === totalPages">Next</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    setPage: {
      type: Function,
      required: true
    }
  },
  computed: {
    nearPages() {
      const currentPage = this.page;
      const lastPage = this.totalPages;
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(lastPage, currentPage + 2);
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    nextPage() {
      this.$emit('update-page', this.page + 1);
      this.setPage(this.page + 1)
    },
    prevPage() {
      this.$emit('update-page', this.page - 1);
      this.setPage(this.page - 1)
    },
    goToPage(page) {
      this.$emit('update-page', page);
      this.setPage(page)
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 5px;
}

button.active {
  font-weight: bold;
}
</style>
