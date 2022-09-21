import { defineStore } from 'pinia'

export const useProductsStore = defineStore('ProductsStore', {
	state: () => ({
		products: [
			{
				"id": 1,
				"product_name": "iShares 20+ Year Treasury Bond ETF",
				"measure": "Una vez",
				"creation_date": "17/04/2020"
			},
			{
				"id": 2,
				"product_name": "Nordstrom, Inc.",
				"measure": "Semanalmente",
				"creation_date": "17/11/2021"
			},
			{
				"id": 3,
				"product_name": "Delta Technology Holdings Limited",
				"measure": "Diariamente",
				"creation_date": "09/06/2019"
			},
			{
				"id": 4,
				"product_name": "Cable One, Inc.",
				"measure": "Semanalmente",
				"creation_date": "11/03/2021"
			},
			{
				"id": 5,
				"product_name": "La Quinta Holdings Inc.",
				"measure": "Diariamente",
				"creation_date": "15/11/2021"
			},
			{
				"id": 6,
				"product_name": "MainStay DefinedTerm Municipal Opportunities Fund",
				"measure": "Una vez",
				"creation_date": "09/07/2019"
			},
			{
				"id": 7,
				"product_name": "LendingClub Corporation",
				"measure": "Semanalmente",
				"creation_date": "05/10/2019"
			},
			{
				"id": 8,
				"product_name": "Oracle Corporation",
				"measure": "Raramente",
				"creation_date": "10/03/2021"
			},
			{
				"id": 9,
				"product_name": "ConocoPhillips",
				"measure": "Raramente",
				"creation_date": "13/11/2020"
			},
			{
				"id": 10,
				"product_name": "Kulicke and Soffa Industries, Inc.",
				"measure": "Una vez",
				"creation_date": "02/06/2020"
			},
			{
				"id": 11,
				"product_name": "General Finance Corporation",
				"measure": "Con frecuencia",
				"creation_date": "03/07/2019"
			},
			{
				"id": 12,
				"product_name": "Capital Southwest Corporation",
				"measure": "Con frecuencia",
				"creation_date": "24/08/2022"
			},
			{
				"id": 13,
				"product_name": "Twin Disc, Incorporated",
				"measure": "Una vez",
				"creation_date": "21/08/2021"
			},
			{
				"id": 14,
				"product_name": "Communications Systems, Inc.",
				"measure": "Semanalmente",
				"creation_date": "21/03/2019"
			}
		]
	}),
	actions: {
		createProduct(newProduct) {
		 	this.products.push({ ...newProduct })
		},
		updateProduct(index, productUpdated) {
			this.products[index] = { ...productUpdated }
		},
		deleteProduct(index) {
			this.products.splice(index, 1)
		}
	}
})