<template>
    <div class="progress-bar">
        <progress :max="maxValue" :value="value" />
    </div>
</template>
  
<script>
export default {
    props: {
        maxValue: {
            type: Number,
            required: true,
            default: 100
        },
        value: {
            type: Number,
            required: true,
            default: 0
        }
    }
}
</script>
  
<style lang="scss" scoped>
.progress-bar {
    width: 100%;

    progress {
        display: block;
        height: 10px;
        width: 100%;
        border-radius: 6px;

        &[value]::-webkit-progress-bar {
            background: #f0f0f0;
            border-radius: 6px;
        }

        &[value]::-webkit-progress-value {
            border-radius: 6px;
            background-image: linear-gradient(90deg, rgb(233, 217, 67) 0%, rgb(47, 121, 196) 100%);
        }
    }
}
</style>
  