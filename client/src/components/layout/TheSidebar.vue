<template>
    <div class="sidebar">
        <div class="sidebar-logo-container bg-black leading-[50px]">
            <a href="" class="flex justify-center items-center">
                <img class="w-8 h-8 align-middle mr-3 " src="../../assets/images/logo_small.png" alt="">
                <h1>UET Portal</h1>
            </a>
        </div>

        <div class="sidebar-scrollbar mt-3">
            <ul>
                <div class="h-12 hover:bg-[#2d3c50]">
                    <a class="item__list " href="">
                    <li class="flex items-center py-0 px-5">
                        <i class="fa-solid fa-file mr-6"></i>
                        <div>Khung chương trình ĐT</div>
                    </li>
                </a> 
                </div>

                <div class="h-12 hover:bg-[#2d3c50]">
                    <a class="item__list" href="">
                    <li class="flex items-center py-0 px-5">
                        <i class="fa-solid fa-graduation-cap mr-4"></i>
                        <div>Thời gian học tập</div>
                    </li>
                </a> 
                </div>

                <div class="h-12 hover:bg-[#2d3c50]">
                    <a class="item__list" href="">
                    <li class="flex items-center py-0 px-5">
                        <i class="fa-solid fa-graduation-cap mr-4"></i>
                        <div>Tư vấn học vụ</div>
                    </li>
                </a> 
                </div>

                <div class="h-12 hover:bg-[#2d3c50]">
                    <a class="item__list" href="">
                    <li class="flex items-center py-0 px-5">
                        <i class="fa-solid fa-graduation-cap mr-4"></i>
                        <div>Khả năng tốt nghiệp</div>
                    </li>
                </a> 
                </div>
            </ul>
        </div>
    </div>
</template>

<style scoped>
:root {
    --item-color: #b3bfce;
}
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #304156;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    color: #fff;
}

.item__list {
    color: var(--item-color);
}
</style>