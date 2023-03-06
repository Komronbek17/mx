<script setup>

const props = defineProps({
    percent: Number,
    index: Number,
    activeIndex: Number,
})

function checkIconIndex(id) {
    return (props.index === id && props.activeIndex !== id)
}

const getWidth = () => {
    return props.percent * 0.36
}

const checkIsActive = () => {
    return props.activeIndex === props.index
}


</script>

<template>
    <div class="progress-star">
        <p
            class="progress-star__index"
            :class="checkIsActive()?'progress-star__index-default':'progress-star__index-active'"
        >
            {{ props.index }}
        </p>
        <div class="progress-star__icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M35.0315 16.5833L27.769 22.85L30.0667 32.5333C30.1723 32.9392 30.1868 33.3648 30.1091 33.7775C30.0314 34.1901 29.8635 34.5787 29.6183 34.9135C29.3731 35.2483 29.0572 35.5203 28.6948 35.7087C28.3325 35.897 27.9333 35.9967 27.528 36C27.0316 35.9977 26.5464 35.8472 26.1301 35.5667L18.0161 30.25H17.9839L10.4483 35.2C9.9615 35.5186 9.39413 35.6792 8.8188 35.6614C8.24347 35.6436 7.68635 35.4481 7.21874 35.1C6.73699 34.7354 6.37211 34.2289 6.17153 33.6463C5.97095 33.0637 5.94394 32.432 6.09402 31.8333L8.26312 22.9833L0.968499 16.5833C0.554642 16.2246 0.253863 15.7455 0.104944 15.2079C-0.0439748 14.6702 -0.0342061 14.0985 0.132991 13.5667C0.295806 13.0428 0.606413 12.5817 1.02463 12.243C1.44284 11.9043 1.94942 11.7035 2.47884 11.6667L11.9586 11.0333L15.5577 1.73333C15.7508 1.22401 16.0867 0.786506 16.5222 0.477473C16.9576 0.16844 17.4724 0.00210481 18 0C18.5276 0.00210481 19.0424 0.16844 19.4778 0.477473C19.9133 0.786506 20.2492 1.22401 20.4423 1.73333L23.9771 10.9833L33.5212 11.6667C34.0512 11.7013 34.5588 11.9012 34.9775 12.2402C35.3961 12.5793 35.7061 13.0416 35.867 13.5667C36.0342 14.0985 36.044 14.6702 35.8951 15.2079C35.7461 15.7455 35.4454 16.2246 35.0315 16.5833Z"
                    fill="#F5F5F5" fill-opacity="0.5"/>
                <mask id="mask0_127_10" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36"
                      height="36">
                    <path
                        d="M35.0315 16.5833L27.769 22.85L30.0667 32.5333C30.1723 32.9392 30.1868 33.3648 30.1091 33.7775C30.0314 34.1901 29.8635 34.5787 29.6183 34.9135C29.3731 35.2483 29.0572 35.5203 28.6948 35.7087C28.3325 35.897 27.9333 35.9967 27.528 36C27.0316 35.9977 26.5464 35.8472 26.1301 35.5667L18.0161 30.25H17.9839L10.4483 35.2C9.9615 35.5186 9.39413 35.6792 8.8188 35.6614C8.24347 35.6436 7.68635 35.4481 7.21874 35.1C6.73699 34.7354 6.37211 34.2289 6.17153 33.6463C5.97095 33.0637 5.94394 32.432 6.09402 31.8333L8.26312 22.9833L0.968499 16.5833C0.554642 16.2246 0.253863 15.7455 0.104944 15.2079C-0.0439748 14.6702 -0.0342061 14.0985 0.132991 13.5667C0.295806 13.0428 0.606413 12.5817 1.02463 12.243C1.44284 11.9043 1.94942 11.7035 2.47884 11.6667L11.9586 11.0333L15.5577 1.73333C15.7508 1.22401 16.0867 0.786506 16.5222 0.477473C16.9576 0.16844 17.4724 0.00210481 18 0C18.5276 0.00210481 19.0424 0.16844 19.4778 0.477473C19.9133 0.786506 20.2492 1.22401 20.4423 1.73333L23.9771 10.9833L33.5212 11.6667C34.0512 11.7013 34.5588 11.9012 34.9775 12.2402C35.3961 12.5793 35.7061 13.0416 35.867 13.5667C36.0342 14.0985 36.044 14.6702 35.8951 15.2079C35.7461 15.7455 35.4454 16.2246 35.0315 16.5833Z"
                        fill="white"/>
                </mask>
                <g mask="url(#mask0_127_10)">
                    <rect v-if="checkIconIndex(0)" :width="getWidth()" height="36"
                          fill="url(#paint0_linear_127_10)"/>
                    <rect v-else-if="checkIconIndex(1)" :width="getWidth()" height="36"
                          fill="url(#paint0_linear_127_11)"/>
                    <rect v-else-if="checkIconIndex(2)" :width="getWidth()" height="36"
                          fill="url(#paint0_linear_127_12)"/>
                    <rect v-else-if="checkIsActive" :width="getWidth()" height="36"
                          fill="url(#paint0_linear_127_13)"/>
                </g>
                <defs v-if="checkIconIndex(0)">
                    <linearGradient id="paint0_linear_127_10" x1="0" y1="0" x2="41.8231"
                                    y2="26.9699" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4ADAFF"/>
                        <stop offset="1" stop-color="#0062CA"/>
                    </linearGradient>
                </defs>
                <defs v-else-if="checkIconIndex(1)">
                    <linearGradient id="paint0_linear_127_11" x1="0" y1="0"
                                    x2="41.8231" y2="26.9699" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F2D207"/>
                        <stop offset="1" stop-color="#FFA329"/>
                    </linearGradient>
                </defs>
                <defs v-else-if="checkIconIndex(2)">
                    <linearGradient id="paint0_linear_127_12" x1="0" y1="0"
                                    x2="41.8231" y2="26.9699" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00FF85"/>
                        <stop offset="1" stop-color="#00B05C"/>
                    </linearGradient>
                </defs>
                <defs v-else-if="checkIsActive">
                    <linearGradient id="paint0_linear_127_13" x1="0" y1="0" x2="41.8231" y2="26.9699"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFFFFF"/>
                        <stop offset="1" stop-color="#FFFFFF"/>
                    </linearGradient>
                </defs>
            </svg>

        </div>
    </div>
</template>

<style lang="scss" src="./progress-star.scss"/>
