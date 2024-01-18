<template>
	<footer class="row fm-footer d-flex fm-bkg-greyblue ps-4" style="height: 63px; align-items: center">
		<div class="col-lg-1 col-xxl-2"></div>
		<div class="col-12 col-lg-10 col-xxl-8 fm-fnt-300-14-16 fm-fnt-black ps-0">
			<div>{{ footerText}}</div>
		</div>
		<div class="col-lg-1 col-xxl-2"></div>
	</footer>
</template>

<script>

export default({
	data :()=>({
		footerText: '© 2022 Apotheke LUX 99 - Alle Rechte vorbehalten.'	
	}),
})
</script>
