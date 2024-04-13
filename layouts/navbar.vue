<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-color">
        <div class="container" style="padding-left: 160px;">
            <a class="navbar-brand" href="#">Your Logo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <!-- Example of user profile dropdown -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user"></i> User
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#" id="logoutLink">Logout</a></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/logout';
}
</script>

<style scoped>
.container {
    width: 100%;
}

.navbar {
    width: 100vw;
    /* 100% ширина окна */
    position: fixed;
    /* Фиксированное позиционирование */
    left: 0;
    /* Закрепить слева */
    top: 0;
    /* Закрепить сверху */
}

.bg-color {
    background-color: #bed26e;
}
</style>
