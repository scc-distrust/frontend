<script lang="ts">
    import Title from "../components/Title.svelte";
    import Role from "../components/Role.svelte";
</script>

<div class="main-container">
    <Title size="3rem" />
    <Role role="worker" />
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 400px;
        height: 85%;
        margin: auto;
    }
</style>