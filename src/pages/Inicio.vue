<template>
	<q-table title="Enerbit" :rows="products" :columns="columns" row-key="id" :filter="filter">

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

		<template v-slot:top-row>
			<q-tr>
				<q-td colspan="100%">
					<div class="row q-my-xs" style="width: 100%;">
						<div class="col-12 col-sm-5 q-px-xs">
							<q-select outlined dense v-model="measuresFilter" label="Filtrar por tipo de medida" :options="measures" @update:model-value="filterPerMeasure">
								<q-tooltip>Filtrar por tipo de medida.</q-tooltip>
							</q-select>
						</div>

						<div class="col-12 col-sm-5 q-px-xs">
							<q-input outlined dense v-model="datesFilter" label="Filtrar por fecha de creación" mask="date" disabled readonly>
								<template v-slot:append>
									<q-icon name="event" class="cursor-pointer">
										<q-popup-proxy cover transition-show="scale" transition-hide="scale">
											<q-date v-model="datesFilter" @update:model-value="filterPerDate">
												<div class="row items-center justify-end">
													<q-btn v-close-popup label="Cerrar" color="primary" flat />
												</div>
											</q-date>
										</q-popup-proxy>
									</q-icon>
								</template>
							</q-input>
						</div>

						<div class="col-12 col-sm-2 q-px-xs">
							<q-btn color="info" label="limpiar filtros" class="btn-large" icon-rigth="backspace" @click="clearFilters">
								<q-tooltip>Haz click para quitar los filtros aplicados.</q-tooltip>
							</q-btn>
						</div>
					</div>
				</q-td>
			</q-tr>
		</template>

		<template v-slot:body="props">
			<q-tr>
				<q-td @click="openOptions(props.row.id)" key="id" :props="props">
					{{ props.row.id }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
				</q-td>

				<q-td @click="openOptions(props.row.id)" key="serial" :props="props">
					{{ props.row.serial }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
				</q-td>

				<q-td @click="openOptions(props.row.id)" key="owner" :props="props">
					{{ props.row.owner }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
				</q-td>

				<q-td @click="openOptions(props.row.id)" key="connection_type" :props="props">
					{{ props.row.connection_type }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
				</q-td>

				<q-td @click="openOptions(props.row.id)" key="location" :props="props">
					{{ props.row.location }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
				</q-td>

				<q-td @click="openOptions(props.row.id)" key="created_at" :props="props">
					{{ props.row.created_at }}
					<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
				</q-td>

				<q-td key="actions" :props="props" style="display: block;" class="desktop-only">
					<q-btn color="info" label="editar" icon-right="edit" class="q-mx-xs" @click="openEdit(props.row.id)">
						<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
					</q-btn>

					<q-btn color="negative" label="eliminar" icon-right="delete" class="q-mx-xs" @click="openDelete(props.row.id)">
						<q-tooltip>Haz click para eliminar este producto: {{ props.row.serial }}.</q-tooltip>
					</q-btn>
				</q-td>

				<q-td key="actions" :props="props" class="mobile-only">
					<q-btn color="info" label="editar" icon-right="edit" class="q-mx-xs q-my-xs btn-large" style="display: block; position: relative;" @click="openEdit(props.row.id)">
						<q-tooltip>Haz click para editar este producto: {{ props.row.serial }}.</q-tooltip>
					</q-btn>

					<q-btn color="negative" label="eliminar" icon-right="delete" class="q-mx-xs q-my-xs btn-large" style="display: block; position: relative;" @click="openDelete(props.row.id)">
						<q-tooltip>Haz click para eliminar este producto: {{ props.row.serial }}.</q-tooltip>
					</q-btn>
				</q-td>
			</q-tr>
		</template> 
	</q-table>

	<q-dialog v-model="form">
		<q-card style="min-width: 90%;">
			<q-card-section class="text-center">
				<div class="text-uppercase text-h2">{{ action }} producto</div>
			</q-card-section>

			<q-form>
				<q-card-section class="row">
					<div class="col-12 col-sm-3 q-px-sm">
						<q-input outlined type="number" v-model="productsData.serial" label="Serial del producto" class="q-my-md">
							<q-tooltip>Serial del producto.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-sm-3 q-px-sm">
						<q-select outlined v-model="productsData.connection_type" :options="connectionTypes" label="Tipo de conexión" class="q-my-md">
							<q-tooltip>Tipo de conexión.</q-tooltip>
						</q-select>
					</div>

					<div class="col-12 col-sm-3 q-px-sm">
						<q-select outlined v-model="productsData.storage_system" :options="storageSystems" label="Sistema de almacenamiento" class="q-my-md">
							<q-tooltip>Sistema de almacenamiento.</q-tooltip>
						</q-select>
					</div>

					<div class="col-12 col-sm-3 q-px-sm">
						<q-select outlined v-model="productsData.condition" :options="conditions" label="Condición" class="q-my-md">
							<q-tooltip>Condición.</q-tooltip>
						</q-select>
					</div>

					<div class="col-12 col-md-3 q-px-sm">
						<q-select outlined v-model="productsData.owner" :options="['RF', 'OR']" label="Dueño" class="q-my-md">
							<q-tooltip>Dueño.</q-tooltip>
						</q-select>
					</div>

					<div class="col-12 col-md-3 q-px-sm">
						<q-input outlined v-model="productsData.location" label="Ubicación" class="q-my-md">
							<q-tooltip>Ubicación.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-md-3 q-px-sm">
						<q-select outlined v-model="productsData.manufacturer" :options="yesNot" label="Fabricante" class="q-my-md">
							<q-tooltip>Fabricante.</q-tooltip>
						</q-select>
					</div>

					<div class="col-12 col-md-3 q-px-sm">
						<q-input outlined v-model="productsData.purchase" label="Fecha y hora de compra" class="q-my-md">
							<q-tooltip>Fecha y hora de compra.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-sm-3 q-px-sm">
						<q-input outlined type="number" v-model="productsData.i_max" label="i_max" class="q-my-md">
							<q-tooltip>i_max.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-sm-3 q-px-sm">
						<q-input outlined type="number" v-model="productsData.i_b" label="i_b" class="q-my-md">
							<q-tooltip>i_b.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-sm-3 q-px-sm">
						<q-input outlined type="number" v-model="productsData.i_n" label="i_n" class="q-my-md">
							<q-tooltip>i_n.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-sm-3 q-px-sm">
						<q-input outlined type="number" v-model="productsData.seals" label="seals" class="q-my-md">
							<q-tooltip>seals.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-sm-6 q-px-sm">
						<q-input outlined v-model="productsData.created_at" label="Fecha de creación" class="q-my-md" readonly>
							<q-tooltip>Fecha de creación.</q-tooltip>
						</q-input>
					</div>

					<div class="col-12 col-sm-6 q-px-sm">
						<q-input outlined v-model="productsData.updated_at" label="Fecha de última modificación" class="q-my-md" readonly>
							<q-tooltip>Última modificación</q-tooltip>
						</q-input>
					</div>
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

	<q-dialog v-model="options">
		<q-card>
			<q-card-section class="text-center">
				<h4>¿Qué deseas hacer con este producto?</h4>
			</q-card-section>

			<q-card-actions vertical>
				<q-btn color="info" label="editar este producto" icon-right="edit" class="btn-large q-my-sm" @click="openEdit(productsData.id)">
					<q-tooltip>Haz click para editar este producto.</q-tooltip>
				</q-btn>

				<q-btn color="negative" label="eliminar este producto" icon-right="delete" class="btn-large q-my-sm" @click="openDelete(productsData.id)">
					<q-tooltip>Haz click para eliminar este producto.</q-tooltip>
				</q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { useQuasar } from 'quasar'

	import api from '../assets/plugins/api.js'

	import { useProductsStore } from '../assets/plugins/ProductsStore.js'

	const $q = useQuasar()

	const productsStore = useProductsStore();

	const filter = ref('')

	const columns = [
	{
		name: 'id',
		label: 'ID',
		align: 'center',
		field: 'id',
		sortable: true	
	},
	{
		name: 'serial',
		label: 'Serial',
		align: 'left',
		field: 'serial',
		sortable: true	
	},
	{
		name: 'owner',
		label: 'Dueño',
		align: 'left',
		field: 'owner',
		sortable: true	
	},
	{
		name: 'connection_type',
		label: 'Tipo de conexión',
		align: 'left',
		field: 'connection_type',
		sortable: true	
	},
	{
		name: 'location',
		label: 'Ubicación',
		align: 'left',
		field: 'location',
		sortable: true	
	},
	{
		name: 'created_at',
		label: 'Fecha de creación',
		align: 'left',
		field: 'created_at',
		sortable: true	
	},
	{
		name: 'actions',
		label: 'Acciones',
		align: 'center'
	}
	]

	const products = ref([{}])

	const connectionTypes = ['directa', 'semi-directa', 'indirecta']
	const storageSystems = ['interno', 'externo']
	const conditions = ['usado', 'nuevo']
	const yesNot = ['yes', 'no']

	const form = ref(false)
	const confirm = ref(false)
	const options = ref(false)
	const action = ref('editar')

	const measuresFilter = ref(null)
	const datesFilter = ref(null)

	const productsData = ref({
		id: productsStore.products.length + 1,
		serial: null,
		connection_type: null,
		storage_system: null,
		condition: null,
		owner: null,
		location: null,
		manufacturer: null,
		purchase: null,
		i_max: null,
		i_b: null,
		i_n: null,
		seals: null,
		created_at: null,
		updated_at: null
	})

	const readData = () => {
		api.get().then(response => {
			products.value = response.data.items
		}).catch(error => console.error('Ha ocurrido un error al leer los datos: ' + error))
	}

	onMounted(() => {
		readData()
		resetProductsData()
	})

	const openOptions = (id) => {
		productsData.value.id = id

		options.value = true
	}

	const openEdit = (id) => {
		form.value = true
		action.value = 'editar'

		api.get("/" + id).then(response => {
			productsData.value.id = id
			productsData.value.serial = response.data.serial
			productsData.value.connection_type = response.data.connection_type
			productsData.value.storage_system = response.data.storage_system
			productsData.value.condition = response.data.condition
			productsData.value.owner = response.data.owner
			productsData.value.location = response.data.location
			productsData.value.manufacturer = response.data.manufacturer
			productsData.value.purchase = response.data.purchase
			productsData.value.i_max = response.data.i_max
			productsData.value.i_b = response.data.i_b
			productsData.value.i_n = response.data.i_n
			productsData.value.seals = response.data.seals
			productsData.value.created_at = response.data.created_at
			productsData.value.updated_at = response.data.updated_at === null ? 'Sin actualizar' : response.data.updated_at
		}).catch(error => console.error(error))
	}

	const resetProductsData = () => {
		let date = new Date()
		let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
		let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
		let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()

		productsData.value.id = productsStore.products.length + 1
		productsData.value.serial = null
		productsData.value.connection_type = null
		productsData.value.storage_system = null
		productsData.value.condition = null
		productsData.value.owner = null
		productsData.value.location = null
		productsData.value.manufacturer = null
		productsData.value.purchase = null
		productsData.value.i_max = null
		productsData.value.i_b = null
		productsData.value.i_n = null
		productsData.value.seals = null
		productsData.value.created_at = date.getFullYear() + "/" + month + "/" + date.getDate() + 'T' + date.getHours() + ':' + minute + ':' + second + '.' + date.getMilliseconds()
		productsData.value.updated_at = null
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
		options.value = false

		resetProductsData()
	}

	const finishAction = () => {
		let index = productsStore.products.findIndex(product => product.id === productsData.value.id)
		let length = productsStore.products.length

		switch (action.value) {
			case 'crear':
			createProduct(length)
			break;

			case 'editar':
			updateProduct(index, productsData.value)
			break;

			case 'eliminar':
			deleteProduct(index, length)
			break;
		}
	}

	const createProduct = (length) => {
		api.post('', {
			"serial": productsData.value.serial,
			"connection_type": productsData.value.connection_type,
			"storage_system": productsData.value.storage_system,
			"condition": productsData.value.condition,
			"owner": productsData.value.owner,
			"location": productsData.value.location,
			"manufacturer": productsData.value.manufacturer,
			"purchase": productsData.value.purchase,
			"i_max": Number(productsData.value.i_max),
			"i_b": Number(productsData.value.i_b),
			"i_n": Number(productsData.value.i_n),
			"seals": Number(productsData.value.seals)
		}).then(response => {
			if (typeof response.data === 'object') {
				$q.notify({
					color: 'green-4',
					textColor: 'white',
					icon: 'check',
					message: 'Se ha creado el producto con éxito.'
				})

				readData()
				resetProductsData()
				closeEveryDialog()
			}else {
				$q.notify({
					color: 'red-5',
					textColor: 'white',
					icon: 'cancel',
					message: 'No se ha podido crear el producto nuevo.'
				})
			}
		}).catch(error => console.error(error))
	}

	const deleteProduct = (index, length) => {
		api.delete('/' + productsData.value.id).then(response => {
			if (typeof response.data === 'object') {
				$q.notify({
					color: 'green-4',
					textColor: 'white',
					icon: 'check',
					message: 'Se ha eliminado el producto con éxito.'
				})

				readData()
				resetProductsData()
				closeEveryDialog()
			}else {
				$q.notify({
					color: 'red-5',
					textColor: 'white',
					icon: 'cancel',
					message: 'No se ha eliminado el producto.'
				})
			}
		}).catch(error => console.error(error))
	}

	const updateProduct = (index, product) => {
		api.patch('/' + productsData.value.id, {
			"connection_type": productsData.value.connection_type,
			"storage_system": productsData.value.storage_system,
			"condition": productsData.value.condition,
			"owner": productsData.value.owner,
			"serial": productsData.value.serial,
			"location": productsData.value.location,
			"purchase": productsData.value.purchase,
			"i_max": Number(productsData.value.i_max),
			"i_b": Number(productsData.value.i_b),
			"i_n": Number(productsData.value.i_n),
			"manufacturer": productsData.value.manufacturer,
			"serial": productsData.value.serial,
		}).then(response => {
			if (typeof response.data === 'object') {
				$q.notify({
					color: 'green-4',
					textColor: 'white',
					icon: 'check',
					message: 'Se ha actualizado el producto con éxito.'
				})

				readData()
				resetProductsData()
				closeEveryDialog()
			}else {
				$q.notify({
					color: 'red-5',
					textColor: 'white',
					icon: 'check',
					message: 'No se ha podido actualizar el producto.'
				})
			}
		}).catch(error => console.error(error))
	}

	/*const filterPerMeasure = () => {
		products.value = productsStore.products

		let filterMeasure = productsStore.measures

		if (measuresFilter.value !== null) {
			products.value = filterMeasure(measuresFilter.value)
		}
	}

	const filterPerDate = () => {
		products.value = productsStore.products

		let filterDate = productsStore.date

		if (datesFilter.value !== null) {
			let newDate = datesFilter.value.split('/')
			let searchDate = newDate[2] + "/" + newDate[1] + "/" + newDate[0]

			products.value = filterDate(searchDate)
		}
	}*/

	const clearFilters = () => {
		filter.value = null
		measuresFilter.value = null
		datesFilter.value = null

		readData()
		resetProductsData()
	}
</script>