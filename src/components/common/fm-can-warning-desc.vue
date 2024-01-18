<template>
	<div class="row fm-warning-block fm-fnt-400-12-16 fm-fnt-black">
			<div class="fm-warning-content d-flex">
			<img :src="`${config.svgFolder()}/warning.svg`" alt="warning-icon" >
			<slot></slot>
			</div>
	</div>
</template>

<script>

import config from "/src/config.js";
export default({
		data: () => ({
		config,
	}),
})
</script>
<style scoped>
.fm-warning-block{
	padding: 15px 30px 0 30px;
	text-align: left;
}
.fm-warning-block img{
	margin-right: 10px;
}

@media screen and (max-width:415px) {
	.fm-warning-content{
		display: flex;
		align-items: flex-start;
	}
	.fm-warning-content img {
		padding-top : 4px;
	}
}

</style>