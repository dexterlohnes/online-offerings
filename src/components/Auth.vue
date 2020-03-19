<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
// import 'firebase/auth';

import { Auth } from '../firebase/auth.js'
import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'

export default {
  name: 'auth',
    mounted() {
        console.log("Auth is", firebase.auth())
        var uiConfig = {
            signInSuccessUrl: '/success',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        var ui = new firebaseui.auth.AuthUI(Auth);
        ui.start('#firebaseui-auth-container', uiConfig);
    },
}
</script>
