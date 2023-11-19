<template>
    <exercise-title title="Flip menu with CSS animation" />
    
    <div class="menu">
        <div class="page p1" />
        <div class="page p2" />
    </div>
</template>

<script setup>
    import ExerciseTitle from '@/components/common/exercise-title.vue';
</script>

<style scoped lang="scss">
    $border-radius: 5px;
    $first-menu: url("@/assets/images/menu/1.jpeg");
    $second-menu: url("@/assets/images/menu/2.jpeg");
    $menu-width: calc(1000px / 2);
    $menu-height: calc(915px / 2);
    $bg-offset-y: 65%;

    .menu {
        transform-style: preserve-3d;
        transform: perspective(2000px);
        position: relative;
        width: $menu-width;
        height: $menu-height;
        box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.5);
        margin: 0px auto;
    }
    
    .page {
        position: absolute;
        height: inherit;
        width: calc($menu-width / 2);
        top: 0px;
        background-size: $menu-width auto;
        transition: 1s ease-in-out;
    
        &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: inherit;
            background-image: inherit;
            top: 0px;
            transform-origin: 0% 0%;
            transition: 1s ease-in-out;
            background-size: $menu-width auto;
            backface-visibility: hidden;
            box-shadow: inset 0px 0px 0px calc($menu-width / 2) rgba(0, 0, 0, 0);
        }
    }
    
    .page.p1 {
        left: 0px;
        background-image: $first-menu;
        background-position: 0% $bg-offset-y;
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
    
        &:after {
            left: calc($menu-width / 2);
            transform-origin: 0% 0%;
            z-index: 2;
            background-position: 100% $bg-offset-y;
            border-top-right-radius: $border-radius;
            border-bottom-right-radius: $border-radius;
        }
    }
    
    .page.p2 {
        right: 0px;
        background-image: $second-menu;
        background-position: 100% $bg-offset-y;
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
    
        &:after {
            left: calc(-1 * $menu-width / 2);
            transform-origin: 100% 0%;
            transform: rotateY(180deg);
            z-index: 1;
            background-position: 0% $bg-offset-y;
            box-shadow: inset 0px 0px 0px calc($menu-width / 2) rgba(0, 0, 0, 0.4);
            border-top-left-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
        }
    }
    
    .menu:hover .page {
        &.p1:after {
            transform: rotateY(-180deg);
            box-shadow: inset 0px 0px 0px calc($menu-width / 2) rgba(0, 0, 0, 0.4);
        }

        &.p2:after {
            transform: rotateY(0deg);
            box-shadow: inset 0px 0px 0px calc($menu-width / 2) rgba(0, 0, 0, 0);
        }
    }
</style>
