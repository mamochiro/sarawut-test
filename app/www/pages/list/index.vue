<template>
  <div class="container">
    <div class="title">
      <h3>Add List</h3>
    </div>
    <div>
      <ApolloMutation
        :mutation="creteListGQL"
        :variables="{ input: createListVariables }"
        v-on="{ error: errorHandler('createListErrorStates') }"
        @done="onCreateListSuccess"
        @loading="onCreateListLoading"
      >
        <template v-slot="{ mutate, loading }">
          <form method="POST" @submit.prevent="mutate()">
            <div class="form-input">
              <div class="name">
                <Input
                  v-model="createListVariables.name"
                  :error="createListErrorStates.name"
                  :disabled="loading"
                  type="text"
                  placeholder="name"
                  variant="block"
                />
              </div>
              <div class="info">
                <Input
                  v-model="createListVariables.info"
                  :error="createListErrorStates.info"
                  :disabled="loading"
                  type="text"
                  placeholder="info"
                  variant="block"
                />
              </div>
              <Button type="submit" :disabled="loading" variant="block add-list">
                Add List
              </Button>
            </div>
            <div v-if="createListErrorStates['_error']" class="general-error">
              {{ createListErrorStates._error }}
            </div>
          </form>
        </template>
      </ApolloMutation>
    </div>
    <ApolloQuery :deep="true" :query="getListsGQL">
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>
        <div v-else-if="data" class="table-responsive">
          <el-table :data="data.lists" style="width: 100%">
            <el-table-column prop="id" label="Id" width="180"> </el-table-column>
            <el-table-column prop="name" label="Name" width="180"> </el-table-column>
            <el-table-column prop="info" label="Info"> </el-table-column>
          </el-table>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import Input from '~/components/common/Input'
import Button from '~/components/common/Button'
import { getLists, createList } from '~/graphql/list'
import errorHandler from '~/plugins/apollo-error-handler'

export default {
  components: {
    Input,
    Button,
  },
  middleware: 'authenticated',
  mixins: [errorHandler],
  data() {
    return {
      getListsGQL: getLists,
      creteListGQL: createList,
      createListErrorStates: {},
      createListVariables: {
        name: '',
        info: '',
      },
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth.auth
    },
    isAuth() {
      return this.$store.state.auth.isAuth
    },
  },
  methods: {
    onCreateListSuccess({ data }) {
      window.location.reload(true)
    },
    onCreateListLoading(isLoading) {
      if (isLoading) {
        this.createListErrorStates = {}
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 40px auto;
  font-family: $kanit;
  max-width: 500px;
  .form-input {
    margin: 10px 10px 40px;
  }
  .title {
    text-align: center;
  }
  .name,
  .info {
    margin: 10px 10px;
  }
}
</style>
