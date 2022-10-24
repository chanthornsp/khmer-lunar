<script setup>
	import {ref} from "@vue/reactivity"
	import useKhmerDate from "./Composables/useKhmerDate"
	import moment from "moment"
	const month = new Date().getMonth()
	const year = new Date().getFullYear()
	const masks = ref({
		weekdays: "WWW",
	})
	const attributes = ref([
		{
			key: 1,
			customData: {
				title: "event",
				class: "bg-red-600 text-white",
			},
			dates: new Date(year, month, 1),
		},
	])

	const {khmerDate} = useKhmerDate()
</script>

<template>
	<div class="p-5 container mx-auto aspect-video max-w-2xl">
		<div class="text-center section">
			<h2 class="h2">Custom Calendars</h2>
			<p class="text-lg font-medium text-gray-600 mb-6">
				Roll your own calendars using scoped slots
			</p>
			<v-calendar
				class="custom-calendar max-w-full"
				:masks="masks"
				:attributes="attributes"
				disable-page-swipe
				is-expanded
			>
				<template v-slot:day-content="{day, attributes}">
					<div class="flex flex-col h-full z-10 overflow-hidden">
						<span class="day-label text-gray-900 text-lg border">
							<div>
								{{ day.day }}
							</div>
							<div class="font-hanuman">
								{{ khmerDate(moment({d: day.day}).format()).toKhDate("dN") }}
							</div>
						</span>
						<div class="flex-grow overflow-y-auto overflow-x-auto">
							<p
								v-for="attr in attributes"
								:key="attr.key"
								class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
								:class="attr.customData.class"
							>
								{{ attr.customData.title }}
							</p>
						</div>
					</div>
				</template>
			</v-calendar>
		</div>
	</div>
</template>
