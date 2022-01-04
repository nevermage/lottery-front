<template>
  
    <ul class="lotGridCard">
        <div class="lotGridCardImgContainer">
            <img src="" alt="lot image">
        </div>
        <div class="lotGridCardInfo">
            <strong>{{ lot.name }}</strong>
            <div class="lotGridCardInfoBot">
                <p>by creator {{ lot.creator_id }}</p>
                <router-link :to="{name: 'lot', params: {id: lot.id}}">Join</router-link>
            </div>
        </div>
    </ul>
</template>

<script>
export default {
    props: {
        lot: {
            type: Object,
            default: {}
        }
    }
}
</script>
