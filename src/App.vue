<script setup>
	import {ref} from "@vue/reactivity"
	import useKhmerDate from "./Composables/useKhmerDate"

	import {Calendar} from "v-calendar"
	import moment from "moment"

	const masks = ref({
		weekdays: "WWW",
	})
	const attributes = ref([
		{
			key: 1,
			customData: {
				title: "today",
				class: "bg-blue-600 text-white",
			},
			dates: moment.now(),
		},
	])
	const {khmerDate} = useKhmerDate()
	const onDayClick = (day) => {
		console.log(day)
	}
</script>

<template>
	<div class="p-5 container mx-auto aspect-video max-w-2xl">
		<div class="text-center section">
			<h2 class="p-2 text-xl font-bold">Khmer Calendar</h2>
			<Calendar
				class="custom-calendar max-w-full"
				:masks="masks"
				:attributes="attributes"
				disable-page-swipe
				is-expanded
			>
				<template #day-content="{day, attributes}">
					<button
						type="button"
						@click.prevent="onDayClick(day)"
						class="cursor-pointer p-0.5 transform hover:scale-110 transition-all duration-150 ease-linear w-full"
					>
						<div
							class="p-2 border rounded-md"
							:class="
								(
									attributes
										? !!attributes.filter(
												(item) => item.customData.title === 'today'
										  ).length
										: false
								)
									? attributes.filter(
											(item) => item.customData.title === 'today'
									  )[0].customData.class
									: ''
							"
						>
							<div>
								{{ day.day }}
							</div>
							<div class="font-hanuman">
								{{ khmerDate(day.date).toKhDate("d N") }}
							</div>
						</div>
					</button>
				</template>
				<template #footer> Footer</template>
			</Calendar>
		</div>
	</div>
</template>
