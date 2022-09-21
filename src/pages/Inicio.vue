<template>
	<q-table title="Enerbit" :rows="productsStore.products" :columns="columns" row-key="id" :filter="filter" :loading="loading">

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

					<q-btn color="negative" label="eliminar" icon-right="delete" class="q-mx-xs" @click="openDelete(props.row.id)">
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
					<q-input outlined v-model="productsData.product_name" label="Nombre del producto" class="q-my-md">
						<q-tooltip>Nombre del producto.</q-tooltip>
					</q-input>

					<q-select outlined v-model="productsData.measure" :options="measures" label="Tipo de medida" class="q-my-md">
						<q-tooltip>Tipo de medida.</q-tooltip>
					</q-select>

					<q-input outlined v-model="productsData.creation_date" label="Fecha de creación" class="q-my-md" readonly>
						<q-tooltip>Fecha de creación del producto.</q-tooltip>
					</q-input>
				</q-card-section>

				<q-card-actions vertical>
					<q-btn v-if="action === 'editar'" color="positive" label="editar" class="btn-large q-my-sm" icon-right="edit" @click="openConfirm(action)">
						<q-tooltip>Haz click para editar la información de este producto.</q-tooltip>
					</q-btn>

					<q-btn v-else color="positive" label="crear" class="btn-large q-my-sm" icon-right="add" @click="finishAction">
						<q-tooltip>Haz click para crear este nuevo producto.</q-tooltip>
					</q-btn>

					<q-btn color="negative" label="cancelar" class="btn-large q-my-sm" icon-right="cancel" @click="closeEveryDialog">
						<q-tooltip>Haz click para cancelar.</q-tooltip>
					</q-btn>
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>

	<q-dialog v-model="confirm">
		<q-card>
			<q-card-section class="text-center">
				<h2>¿Deseas {{ action }} este producto?</h2>
			</q-card-section>

			<q-card-actions vertical>
				<q-btn color="positive" :label="'confirmo que quiero ' + action + ' este producto'" class="q-my-sm" @click="finishAction">
					<q-tooltip>Haz click para confirmar que deseas {{ action }} este producto.</q-tooltip>
				</q-btn>

				<q-btn color="negative" :label="'no quiero ' + action + ' este producto'" class="q-my-sm" @click="closeEveryDialog">
					<q-tooltip>Haz click para cancelar.</q-tooltip>
				</q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
	import { ref } from 'vue'

	import { useProductsStore } from '../assets/plugins/ProductsStore.js'

	const productsStore = useProductsStore();

	const filter = ref('')

	var products = productsStore.products

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

	const measures = ['Una vez', 'Semanalmente', 'Diariamente', 'Raramente', 'Con frecuencia']

	const form = ref(false)
	const confirm = ref(false)
	const action = ref('editar')

	const productsData = ref({
		id: productsStore.products.length + 1,
		product_name: '',
		measure: '',
		creation_date: ''
	})

	const openEdit = (id) => {
		console.clear()

		form.value = true
		action.value = 'editar'

		let product = products.filter((product) => product.id === id)

		productsData.value.id = id
		productsData.value.product_name = product[0].product_name
		productsData.value.measure = product[0].measure
		productsData.value.creation_date = product[0].creation_date

		//console.clear()
	}

	const openCreate = () => {
		form.value = true
		action.value = 'crear'

		resetProductsData()
	}

	const openDelete = (id) => {
		openConfirm('eliminar')

		productsData.value.id = id
	}

	const openConfirm = (newAction) => {
		action.value = newAction
		confirm.value = true
	}

	const closeEveryDialog = () => {
		form.value = false
		confirm.value = false

		resetProductsData()
	}

	const resetProductsData = () => {
		let date = new Date()
		let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)

		productsData.value.id = productsStore.products.length + 1
		productsData.value.product_name = ''
		productsData.value.measure = ''
		productsData.value.creation_date = date.getDate() + "/" + month + "/" + date.getFullYear()
	}

	const finishAction = () => {
		let index = products.findIndex(product => product.id === productsData.value.id)

		switch (action.value) {
			case 'crear':
				productsStore.createProduct(productsData.value)
				closeEveryDialog()
				break;

			case 'editar':
				productsStore.updateProduct(index, productsData.value)
				closeEveryDialog()
				break;

			case 'eliminar':
				productsStore.deleteProduct(index)
				closeEveryDialog()
				break;
		}
	}
</script>