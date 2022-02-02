<script lang="ts">
export default {
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
    scope: process.env.VUE_APP_GOOGLE_CLIENT_scope,
    prompt: process.env.VUE_APP_GOOGLE_CLIENT_prompt,
    fetch_basic_profile: process.env.VUE_APP_GOOGLE_CLIENT_fetch,
}
</script>