<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from './stores/account';
import { check } from './services/accountService';

const route = useRoute();
const account = useAccountStore();

//로그인 여부 확인
const checkAccount = async () => {
    console.log('로그인 체크');
    const res = await check();
    console.log('res:', res);
    if(res === undefined || res.status != 200) {
        account.setChecked(false);
        return;
    } 
    account.setChecked(true);
    account.setLoggedIn(res.data > 0);    
}

onMounted(() => {
    checkAccount();
})

watch(() => route.path, () => {
    checkAccount();
});
</script>

<template>
    <template v-if="account.state.checked">
        <Header />
        <router-view></router-view>
        <Footer />
    </template>
     <template v-else>
        서버 통신 오류
     </template>
</template>

<style scoped>
@font-face {
    font-family: 'LeeSeoyun';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
* {
    font-family: 'LeeSeoyun';
}
</style>