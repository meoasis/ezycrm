<template>
    <div class="container">
    <div class="row" v-if="$gate.isAdmin()">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users</h3>

            <div class="card-tools">
                <button class="btn btn-success" @click="newuserModal"><i class="fas fa-user-plus"></i> Add New User</button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Registered At</th>
                <th>Actions</th>
              </tr>

               <tr v-for="user in users.data" :key="user.id">
                <td>{{user.id}}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.type | upText}}</td>
                <td>{{user.created_at | myDate}}</td>
                <td>
                    <a href="#" @click="edituserModal(user)"><i class="fas fa-edit green"></i></a>
                    <a href="#" @click="deleteUser(user.id)"><i class="fas fa-trash red"></i></a>
                </td>
              </tr>
            </tbody></table>
          </div>
          <!-- /.card-body -->
          <div class="card-footer">
                <pagination :data="users" @pagination-change-page="getResults"></pagination>
          </div>
        </div>
        <!-- /.card -->
      </div>
    </div>

    <div v-if="!$gate.isAdmin()">
           <not-found></not-found>
    </div>

    <!-- Modal -->
<div class="modal fade" id="addnewuserModal" tabindex="-1" role="dialog" aria-labelledby="addnewuserModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addnewuserModalLabel" v-show="!editmode">Create New User</h5>
        <h5 class="modal-title" id="addnewuserModalLabel" v-show="editmode">Update User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <form @submit.prevent="editmode ? updateUser() : createUser()">
      <div class="modal-body">
            <div class="form-group">
                 <input v-model="form.name" type="text" name="name"
                 placeholder= "Name"
                 class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                 <has-error :form="form" field="name"></has-error>
             </div>

             <div class="form-group">
                  <input v-model="form.email" type="text" name="email"
                  placeholder= "Email"
                  class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                  <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                        <textarea v-model="form.bio" name="bio" id="bio"
                        placeholder="Short bio for user (Optional)"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                        <has-error :form="form" field="bio"></has-error>
                    </div>


                    <div class="form-group">
                        <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                            <option value="printer">Printer</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </div>

                    <div class="form-group">
                        <input v-model="form.password" type="password" name="password" id="password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
        <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
      </div>

      </form>

    </div>
  </div>
</div>

    </div>
</template>

<script>
    export default {
            data () {
                  return {
                  editmode: false,
                  users : {},
                  form: new Form({
                      id: '',
                      name: '',
                      email: '',
                      password: '',
                      type: '',
                      bio: '',
                      photo: ''
                  })
                  }
        },
        methods: {
        getResults(page = 1) {
                        axios.get('api/user?page=' + page)
                            .then(response => {
                                this.users = response.data;
                            });
        },
        updateUser(){
        this.$Progress.start();
              // console.log('Editing data');
              this.form.put('api/user/'+this.form.id)
              .then(() => {
                  // success
                  $('#addnewuserModal').modal('hide');
                   swal.fire(
                      'User Updated!',
                      'User Info has been updated.',
                      'success'
                      )
                      this.$Progress.finish();
                       Fire.$emit('AfterCreate');
              })
              .catch(() => {
                  this.$Progress.fail();
              });
        },
        edituserModal(user){
              this.editmode = true;
              this.form.reset();
               $('#addnewuserModal').modal('show');
               this.form.fill(user);
        },
        newuserModal(){
              this.editmode = false;
              this.form.reset();
               $('#addnewuserModal').modal('show')
        },
        deleteUser(id){
          swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                  // Send request to the server
                   if (result.value) {
                          this.form.delete('api/user/'+id).then(()=>{
                                  swal.fire(
                                  'Deleted!',
                                  'User has been deleted.',
                                  'success'
                                  )
                              Fire.$emit('AfterCreate');
                          }).catch(()=> {
                              swal.fire("Failed!", "There was something wronge.", "warning");
                          });
                   }
              })
      },
              loadUsers(){
                 if(this.$gate.isAdmin()){
                 axios.get("api/user").then(({ data }) => (this.users = data));
                 }
              },
              createUser(){
                   this.$Progress.start();

                   this.form.post('api/user')
                   .then(()=>{
                   Fire.$emit('AfterCreate');
                   $('#addnewuserModal').modal('hide')

                   toast.fire({
                     type: 'success',
                     title: 'User created successfully'
                   })
                   this.$Progress.finish();
                   })

                   .catch(()=>{

                   })

              }
        },
        created() {
            this.loadUsers();
            Fire.$on('AfterCreate', () =>{
              this.loadUsers();
            });
          //  setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
