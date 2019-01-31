<template>
    <div class="container">
        <div class="row">

                <div class="col-sm-12 col-md-12">
                    <div class="card">
                        <div class="card-body p-2">
                            <div class="media">
                                <div class="media-left">
                                    <a href="#" class="ad-click-event">
                                        <img width="150" src="/img/profile.png" alt="EZ-Avatar" class="media-object"/>
                                    </a>
                                </div>
                                <div class="media-body ml-3">
                                    <div class="clearfix">

                                        <h4 style="margin-top: 20px">Welcome, <b>{{this.form.name}}</b></h4>
                                        <p class="mb-1">You currently have #1 tickets open</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link active show" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane active show" id="activity">
                  <ul class="list-group list-group-unbordered mb-3">
           <li class="list-group-item">
             <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam urna nisi, cursus congue ante ut, tempor bibendum odio</b> <a class="float-right">12-20-2019</a>
           </li>
           <li class="list-group-item">
             <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam urna nisi, cursus congue ante ut, tempor bibendum odio</b> <a class="float-right">12-20-2019</a>
           </li>
           <li class="list-group-item">
             <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam urna nisi, cursus congue ante ut, tempor bibendum odio</b> <a class="float-right">12-20-2019</a>
           </li>
         </ul>
                  </div>
                  <!-- /.tab-pane -->


                  <div class="tab-pane" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                          <input type="email" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                          <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputName2" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputName2" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                        <div class="col-sm-10">
                          <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputSkills" class="col-sm-2 control-label">Skills</label>

                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" class="btn btn-danger">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>




        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
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
        mounted() {
            console.log('Component mounted.')
        },

        created(){
        axios.get("api/profile")
      .then(({ data }) => (this.form.fill(data)));
        }
    }
</script>
