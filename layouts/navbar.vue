<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-color">
        <div class="container" style="padding-left: 160px;">
            <a class="navbar-brand" href="#">Чавонони Сугд</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <!-- User profile dropdown -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user"></i>
                            User
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('token');
            window.location.href = '/';
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
    background-color: #bed26e;
}

.navbar-brand {
    color: #fff;
    font-weight: bold;
}

.nav-link {
    color: #fff;
}

.dropdown-menu {
    background-color: #bed26e;
}

.dropdown-item {
    color: #fff !important;
}

.dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
