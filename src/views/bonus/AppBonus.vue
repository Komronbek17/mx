<script setup>

</script>


<template>
    <div>

        <div class="bonus-block">

        </div>

        <div class="gifts-block">
            <div class="gift-card">
                <div class="gift-card__image">
                    <img src="@/assets/images/home-card-layout.png" alt="">
                </div>
                <div class="gift-card__content">
                    <h5>Наушники </h5>
                    <div class="price">
                        <img src="@/assets/images/coin.png" alt="">
                        <p>1000</p>
                    </div>
                </div>
                <div class="gift-card__button">
                    <p>В корзину</p>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.gift-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
    padding: 16px 10px;
    max-width: 161px;

    &__image {
        width: 100px;
        height: 100px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        h5 {
            @extend .head-h5;
        }
        .price{
            display: flex;
            column-gap: .5rem;
            img {
                max-width: 100%;
                object-fit: contain;
            }
        }
    }
}
</style>