import { createRouter, createWebHistory } from "vue-router"

	const routes = [
	    {path: "/home", component: () => import("@/views/home.vue")},
		{path: "/data",component: () => import("@/views/data/data.vue")},
		{path: "/individual_SNV", component: () => import("@/views/IndividualSNV/IndividualSNV.vue")},
		{path: "/gene", component: () => import("@/views/gene/gene.vue")},
		{path: "/SNVs", component: () => import("@/views/SNVs/snvs.vue")},
		{path: "/sample", component: () => import("@/views/sample/sample.vue")},
	];

	const router = createRouter({
	    history: createWebHistory(),//历史模式
	    routes
	});

	export default router