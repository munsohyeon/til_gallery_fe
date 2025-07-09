<script setup>
import { getItems } from '@/services/itemService';
import { onMounted, reactive } from 'vue';

const state = reactive({
    items: []
});
// 카트 뷰가 장바구니에 뜨게 해주세요.(router 처리)

const load = async () => {
    const res = await getItems();
    console.log("확인",res)
    if (res.status === 200) {
        state.items = res.data;
    }
}

onMounted(() => {
    load();
});

const remove = async itemId => {
    const res = await removeItem(itemId);

    if (res.state === 200) {
        alert()
        await load();
    }
}


</script>

<template>
<div class="cart">
    <div class="container">
    <template v-if="state.items.length">
        <ul class="items">
            <li v-for="item in state.items">
                <img :alt="`상품사진(${item.name})`" :src="`/pic/item/${item.imgPath}`"/>
                <b class="name">{{ item.name }}</b>
                <span class="price">
                    {{ (item.price - item.price * item.discountPer / 100).toLocaleString() }}원
                </span>
                <span class="remove float-end" @click="remove(item.id)" title="삭제">&times;</span>
            </li>
        </ul>
        <div class="act">
            <router-link to="/order" class="btn btn-primaray">주문하기</router-link>
        </div>
    </template>
    <template v-else>
        <div class="text-center py-5">장바구니가 비어있습니다.</div>
    </template>
 </div>
</div>
</template>

<style lang="scss" scoped>
.cart {
    .items {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li {
        border:1px solid #eee;
        margin-top:25px;
        margin-bottom: 25px;
    }
    img {
        width: 150px;
        height: 150px;
    }

    .name { margin-left: 25px;}
    .price { margin-left: 25px;}
    .remove {cursor: pointer; font-size: 30px; padding: 5px 15px;}
}

.act .btn {
    width:  300px;
    display: block;
    margin: 0 auto;
    padding: 30px 50px;
    font-size: 20px;
}
</style>