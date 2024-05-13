<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-color">
        <div class="container" style="padding-left: 160px;">
            <a class="navbar-brand" href="#">ҶДММ "Ҷавонони Суғд"</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <button @click="logout" class="btn btn-warning">Выйти</button>
        </div>
    </nav>

</template>



<script>
export default {
    methods: {
        logout(event) {
            event.preventDefault(); // Отменяем стандартное поведение ссылки
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
}
</script>



<style scoped>
.container {
    width: 100%;
}

.navbar {
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
}

.bg-color {
    background-color: #6D38AF;
}

.navbar-brand {
    color: #fff;
    font-weight: bold;
}

.nav-link {
    color: #fff;
}

.dropdown-menu {
    background-color: #6D38AF;
}

.dropdown-item {
    color: #fff !important;
}

.dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
