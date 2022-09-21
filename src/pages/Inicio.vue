<template>
	<q-table title="Enerbit" :rows="products" :columns="columns" row-key="id" :filter="filter" :loading="loading">

		<template v-slot:top-right>
			<q-input borderless debounce="300" color="primary" label="Filtrar" v-model="filter">
				<q-tooltip>Escribe lo que desees filtrar.</q-tooltip>

				<template v-slot:append>
					<q-icon name="search" />
				</template>
			</q-input>

			<q-separator inset vertical class="q-mx-md" />

			<q-btn label="crear nuevo producto" color="primary" @click="openCreate"><q-tooltip>Haz click para crear un nuevo producto.</q-tooltip></q-btn>
		</template>

		<template v-slot:body="props">
			<q-tr>
				<q-td key="id" :props="props">
					{{ props.row.id }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.product_name }}.</q-tooltip>
				</q-td>

				<q-td key="product_name" :props="props">
					{{ props.row.product_name }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.product_name }}.</q-tooltip>
				</q-td>

				<q-td key="measure" :props="props">
					{{ props.row.measure }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.product_name }}.</q-tooltip>
				</q-td>

				<q-td key="creation_date" :props="props">
					{{ props.row.creation_date }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.product_name }}.</q-tooltip>
				</q-td>

				<q-td key="actions" :props="props">
					<q-btn color="info" label="editar" icon-right="edit" class="q-mx-xs" @click="openEdit(props.row.id)">
						<q-tooltip>Haz click para editar este producto: {{ props.row.product_name }}.</q-tooltip>
					</q-btn>

					<q-btn color="negative" label="eliminar" icon-right="delete" class="q-mx-xs">
						<q-tooltip>Haz click para eliminar este producto: {{ props.row.product_name }}.</q-tooltip>
					</q-btn>
				</q-td>
			</q-tr>
		</template>
	</q-table>

	<q-dialog v-model="form">
		<q-card style="min-width: 90%;">
			<q-card-section>
				<div class="text-uppercase">{{ action }} producto</div>
			</q-card-section>

			<q-form>
				<q-card-section>
					<q-input outlined v-model="dataEdit.name" label="Nombre del producto" class="q-my-md">
						<q-tooltip>Nombre del producto.</q-tooltip>
					</q-input>

					<q-input outlined v-model="dataEdit.measure" label="Tipo de medida" class="q-my-md">
						<q-tooltip>Tipo de medida.</q-tooltip>
					</q-input>

					<q-input outlined v-model="dataEdit.date" label="Fecha de creación" class="q-my-md" readonly>
						<q-tooltip>Fecha de creación del producto.</q-tooltip>
					</q-input>
				</q-card-section>

				<q-card-actions vertical>
					<q-btn v-if="action === 'editar'" color="positive" label="editar" class="btn-large q-my-sm" icon-right="edit">
						<q-tooltip>Haz click para editar la información de este producto.</q-tooltip>
					</q-btn>

					<q-btn v-else color="positive" label="crear" class="btn-large q-my-sm" icon-right="add">
						<q-tooltip>Haz click para crear este nuevo producto.</q-tooltip>
					</q-btn>

					<q-btn color="negative" label="cancelar" class="btn-large q-my-sm" icon-right="cancel" @click="form = false">
						<q-tooltip>Haz click para cancelar.</q-tooltip>
					</q-btn>
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script setup>
	import { ref } from 'vue'

	const filter = ref('')

	const products = [
		{
			"id": 1,
			"product_name": "iShares 20+ Year Treasury Bond ETF",
			"measure": "Once",
			"creation_date": "17/04/2020"
		},
		{
			"id": 2,
			"product_name": "Nordstrom, Inc.",
			"measure": "Weekly",
			"creation_date": "17/11/2021"
		},
		{
			"id": 3,
			"product_name": "Delta Technology Holdings Limited",
			"measure": "Daily",
			"creation_date": "09/06/2019"
		},
		{
			"id": 4,
			"product_name": "Cable One, Inc.",
			"measure": "Weekly",
			"creation_date": "11/03/2021"
		},
		{
			"id": 5,
			"product_name": "La Quinta Holdings Inc.",
			"measure": "Daily",
			"creation_date": "15/11/2021"
		},
		{
			"id": 6,
			"product_name": "MainStay DefinedTerm Municipal Opportunities Fund",
			"measure": "Once",
			"creation_date": "09/07/2019"
		},
		{
			"id": 7,
			"product_name": "LendingClub Corporation",
			"measure": "Weekly",
			"creation_date": "05/10/2019"
		},
		{
			"id": 8,
			"product_name": "Oracle Corporation",
			"measure": "Seldom",
			"creation_date": "10/03/2021"
		},
		{
			"id": 9,
			"product_name": "ConocoPhillips",
			"measure": "Seldom",
			"creation_date": "13/11/2020"
		},
		{
			"id": 10,
			"product_name": "Kulicke and Soffa Industries, Inc.",
			"measure": "Once",
			"creation_date": "02/06/2020"
		},
		{
			"id": 11,
			"product_name": "General Finance Corporation",
			"measure": "Often",
			"creation_date": "03/07/2019"
		},
		{
			"id": 12,
			"product_name": "Capital Southwest Corporation",
			"measure": "Often",
			"creation_date": "24/08/2022"
		},
		{
			"id": 13,
			"product_name": "Twin Disc, Incorporated",
			"measure": "Once",
			"creation_date": "21/08/2021"
		},
		{
			"id": 14,
			"product_name": "Communications Systems, Inc.",
			"measure": "Weekly",
			"creation_date": "21/03/2019"
		}
	]

	const columns = [
	{
		name: 'id',
		label: '#',
		align: 'center',
		field: 'id',
		sortable: true	
	},
	{
		name: 'product_name',
		label: 'Nombre del producto',
		align: 'left',
		field: 'product_name',
		sortable: true	
	},
	{
		name: 'measure',
		label: 'Tipo de medida',
		align: 'center',
		field: 'measure',
		sortable: true	
	},
	{
		name: 'creation_date',
		label: 'Fecha de creación',
		align: 'center',
		field: 'creation_date',
		sortable: true	
	},
	{
		name: 'actions',
		label: 'Acciones',
		align: 'center'
	}
	]

	const form = ref(false)
	const action = ref('editar')

	const dataEdit = {
		id: 0,
		name: '',
		measure: '',
		date: ''
	}

	const openEdit = (id) => {
		console.clear()

		form.value = true
		action.value = 'editar'

		let product = products.filter(product => product.id === id)

		dataEdit.id = id
		dataEdit.name = product[0].product_name
		dataEdit.measure = product[0].measure
		dataEdit.date = product[0].creation_date

		console.clear()
	}

	const openCreate = () => {
		form.value = true
		action.value = 'crear'

		let date = new Date()
		let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)

		dataEdit.id = 0
		dataEdit.name = ''
		dataEdit.measure = ''
		dataEdit.date = date.getDate() + "/" + month + "/" + date.getFullYear()
	}
</script>